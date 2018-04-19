import { ObjectID } from 'mongodb';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user.model';
import { IUserDocument } from '../../interfaces';

const JWT_SECRET = process.env.JWT_SECRET || '';

const user1id = new ObjectID();
const user2id = new ObjectID();

const users: Array<any> = [
    {
        _id: user1id,
        email: 'testuser1@gmail.com',
        password: 'secret1234',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: user1id, access: 'auth' }, JWT_SECRET).toString()
            }
        ]
    },
    {
        _id: user2id,
        email: 'testuser2@gmail.com',
        password: 'secret5678',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: user2id, access: 'auth' }, JWT_SECRET).toString()
            }
        ]
    }
];

const populateUsers = async () => {

    try {
        await User.remove({});
        const user1 = new User(users[0]);
        const user2 = new User(users[1]);
        await Promise.all([user1.save(), user2.save()]);
    } catch (error) {
        throw error;
    }
}

export { populateUsers };