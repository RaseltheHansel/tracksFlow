import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import Event from "../model/Event";
import Site from "../model/Site";
import { getIO } from '../config/socket';


export const collect = async (req: Request, res: Response): Promise<void> =>{
    try{
        const { siteId, type, url, referrer, userAgent, visitorId, sessionId, props, width } = req.body;

        // verify siteId exists and is valid
        const site = await Site.findOne({where: {siteId }});
        if(!site) {
            res.status(404).json({message: 'Site not found'});
            return;
        }
        // parse user agent to get device/browser/OS
        const parser = new UAParser(userAgent);
        const browser = parser.getBrowser().name || "Unknown";
        const os = parser.getOS().name || "Unknown";
        const device = width < 768 ? "mobile"
                    :width < 1024 ? "tablet"
                    :"desktop";

        // get IP from request headers
        const ip = (req.headers["x-forwarded-for"] as string)
            ?.split(",")[0]?.trim() || req.ip || null;

        const event = await Event.create({
            siteId, type, url, referrer, userAgent, visitorId, sessionId, props, ip, browser, os, device,
        });

        // emit to dashboard in real-time via Socket.io
    try {
        const io = getIO();
            io.to(`site:${siteId}`).emit('new_event', {
            type, url, browser, os, device,
            timestamp: event.createdAt,
        });
    } catch {
      // Socket.io might not be ready — still save the event
    }



    }catch(error: unknown){
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
};