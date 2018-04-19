import { Router, Request, Response } from 'express';
import _ from 'lodash';

import { authenticate } from '../middleware/authenticate';
import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface'

const router: Router = Router();

router
    .post('/', async (req: Request, res: Response) => {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);

        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch (error) {
            res.status(400).send({ error });
        }
    })
    .get('/me', authenticate, async (req: any, res: any) => {
        res.send(req.user);
    })
    .post('/login', async (req , res) => {
        const { email, password } = req.body;

        try {
            const user : IUser = await User.findByCredentials(email, password);
            const token: string = user.generateAuthToken();
            res.header('x-auth', token).send({ user });
        } catch (error) {
            res.status(400).send({ error });
        }
    })
    .delete('/me/token', authenticate, async (req: any, res: any) => {
        try {
            const user = req.user as IUser;
            user.removeToken(req.token);
            res.send();
        } catch (error) {
            res.status(400).send({ error });
        }
    });

const UsersController: Router = router;

module.exports = UsersController;