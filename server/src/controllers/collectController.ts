import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import Event from "../model/Event";
import Site from "../model/Site";

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



    }catch(error: unknown){
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
};