import expect from 'expect';
import app from '../../server';
import request from 'supertest';

import 'mocha';

describe('GET /welcome', () => {
    it('should return welcome message', (done) => {
        request(app)
            .get('/welcome')
            .expect(200)
            .then((res: any) => {
                expect(res.text).toBe('Hello, world!');
                done();
            })
            .catch((error) => done(error));
    });
});