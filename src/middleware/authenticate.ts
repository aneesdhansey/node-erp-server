import { Request, Response, NextFunction } from 'express';

import { User } from '../models/user.model';
import { IUser } from '../interfaces';

export const authenticate = async (req: any, res: any, next: any) => {
    const token: any = req.header('x-auth');

    try {
        const user: IUser = await User.findByToken(token);
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(400).send({ error });
    }
}