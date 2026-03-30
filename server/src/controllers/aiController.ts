import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Event from "../model/Event";
import {Op, fn, col, literal } from 'sequelize';
import { AuthRequest } from "../middleware/auth";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Get - getInsights from gemini ai
export const getInsights = async (req: AuthRequest, res: Response): Promise<void> => {
    try{
        const { siteId } = req.params;
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        // Gather data to send to AI
        const [ pageViews, uniqueVisitors, topPages, devices ] = await Promise.all([
            Event.count({where: {siteId, type: 'pageview', createdAt: {[Op.gte]: since} }}),  
            Event.count({where: {siteId, createdAt: {[Op.gte]: since} }, distinct: true, col: 'visitorId' }),

            Event.findAll({
                where: { siteId, type: 'pageview', createdAt: { [Op.gte]: since}},
                attributes: ['url', [fn('COUNT', col('url')), 'views']],
                group: [ 'url' ], order: [[literal('views'), 'DESC']], limit: 5, raw: true,
            }),

            Event.findAll({
                where: { siteId, createdAt: { [Op.gte]: since}}, 
                attributes: ['deviceType', [fn('COUNT', col('deviceType')), 'count']],
                group: ['deviceType'], raw: true,   

            }),
        ]);

        const prompt = `You are a web analytics expert. Analyze this website data from the last 7 days and provide 3-5 actionable insights. Be specifcic and concise.
        
        Data:
        - Total page views: ${pageViews}
        - Unique visitors: ${uniqueVisitors}
        - Top pages: ${JSON.stringify(topPages)}
        - Device breakdown: ${JSON.stringify(devices)}
        
        Provide insights in this format:
        1. [Insight Title]: [1-2 sentence explanation]`;

        const model = genAi.getGenerativeModel({model: "gemini-2.5-flash"});
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        
        res.json({ insights: text });

    }catch(error: unknown) {
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
};