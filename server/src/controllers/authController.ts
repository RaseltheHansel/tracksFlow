import { Request, Response } from "express";    
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from 'jsonwebtoken';
import User from "../model/User";
import { sendWelcomeEmail } from "../utils/mailer";


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({where: {email }});
        if(exists) {
            res.status(401).json({message: 'Email already in use'});
            return;
        }

        const hashed = await bcrypt.hash(password, 12);
        const user   = await User.create({ name, email, password: hashed });

        sendWelcomeEmail(email, name).catch(console.error);

        const signOptions: SignOptions = {
            expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
        };

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            signOptions
        );
        
        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
        
    } catch (error: unknown) {
        if(error instanceof Error) {
        res.status(500).json({message: error.message});
        }
    }   
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({where: { email }});
        if(!user) {
            res.status(401).json({message: "Invalid Credentials"});
            return;
        }

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            res.status(401).json({message: "Invalid Credentials"});
            return;
        }
        const signOptions: SignOptions = {
             expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
        };

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            signOptions
        );
        
        res.json({
            token, 
            user: {id: user, name: user.name, email: user.email}
        })

    }catch(error: unknown) {
        if(error instanceof Error) {
        res.status(500).json({message: error.message});
        }
    }
};

