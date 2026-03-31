import { Request, Response } from "express";
import   { Op, fn, col, literal } from 'sequelize';
import Event from "../model/Event";
import Site from "../model/Site";
import { AuthRequest } from "../middleware/auth";

export const getStats = async (req: AuthRequest, res: Response ): Promise<void> => {
    try {
        const { siteId } = req.params;
        const period = (req.query.period as string) || '7d';

        // calculate date range based on period
        const days = period ==="30d" ? 30 : period === "90d" ? 90 : 7;
        const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        const where = {
            siteId,
            createdAt: { [Op.gte]: since},
        };

        // run all queries in parallel for speed
        const [
            pageViews,
            uniqueVisitors,
            topPages,
            topReferrers,
            deviceBreakdown,
            browserBreakdown,
            viewsOverTime,
             
        ] = await Promise.all([
            //Total page views
            Event.count({where: {...where, type: 'pageview'} }),

            // unique visitors (count distinct visitorId)
            Event.count({
                where: {...where, type: 'pageview'},
                distinct: true,
                col: 'visitorId',
            }),

            // Top pages
            Event.findAll({
                where: {...where, type: 'pageview'},
                attributes: ["url", [fn("COUNT", col("id")), "views" ]],
                group: ['url'],
                order: [[literal("views"), "DESC"]],
                limit: 10,
                raw: true,
            }),

            // Top referres
            Event.findAll({
                where: {...where, referrer: {[Op.ne]: null }},
                attributes: ["referrer", [fn("COUNT", col("id")), "views"]],
                group: ['referrer'],
                order: [[literal("views"), "DESC"]],
                limit: 10,
                raw: true,
            }),

            // Device Breakdown
            Event.findAll({
                where,
                attributes: ["device", [fn("COUNT", col("id")), "count"]],
                group: ['device'],
                raw: true,
            }),

            // Browser Breakdown
            Event.findAll({
                where,
                attributes: ["browser", [fn("COUNT", col("id")), "count"]],
                group: ['browser'],
                raw: true,
            }),

            // Views over time (daily)
            Event.findAll({
                where: {...where, type: 'pageview'},
                attributes: [
                    [fn("DATE", col("createdAt")), "date"],
                    [fn("COUNT", col("id")), "views"],
                ], 
                group: [fn('DATE', col('createdAt'))],
                order: [[literal("date"), "ASC"]],
                raw: true,
            }),

        ]);
        
        res.json({  
            pageviews: pageViews,
            uniqueVisitors,
            topPages,
            topReferrers,
            deviceBreakdown,
            browserBreakdown,
            viewsOverTime,
        });

    }catch(error: unknown) {
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
};

// Get - last N events for live feed
export const getLiveEvents = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { siteId } = req.params;

        const site = await Site.findOne({
            where: { siteId, userId: req.userId },
        });

        if (!site) {
            res.status(404).json({message: 'Site not found'});
            return;
        }

        const events = await Event.findAll({
            where: { siteId },
            order: [['createdAt', 'DESC']],
            limit: 20,
            raw: true,
        });

        const formatted = events.map((e: any) => ({
            type: e.type,
            url: e.url,
            browser: e.browser,
            os: e.os,
            device: e.device,
            timestamp: e.createdAt,
        }));

        res.json(formatted);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
};
