import 'mocha';
import expect from 'expect';
import request from 'supertest';

import app from '../../server';

import { populateUsers } from '../seed/seed';

beforeEach(populateUsers);

describe('POST /users', () => {

    it('should create new user', (done) => {

        const email = 'testuser20@gmail.com';
        const password = 'mysecret';
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .end((err: any, res: any) => {
                if (err)
                    done(err);
                    
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
                done();
            });
    });
});