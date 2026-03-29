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
        const issue = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        // Gather data to send to AI
        // adsasdas
        // sdadadad
 



    }catch(error: unknown) {
        if(error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
};