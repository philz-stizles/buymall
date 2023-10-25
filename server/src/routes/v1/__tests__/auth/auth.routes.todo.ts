import request from 'supertest';
import app from '../../../app';
import User from '../../../models/mongoose/user.model';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
});

beforeEach(async () => {
  // Clear the User DB to have a clean slate
  await User.deleteMany();
});

describe('Auth API endpoints', () => {
  describe('Signup user @ POST /api/auth', () => {
    describe('A valid username and password', () => {
      const mockSignupUser = {
        name: 'theophilus',
        email: 'theophilus@gmail.com',
        password: 'ighalo',
        confirmPassword: 'ighalo',
      };

      it('should respond with a 201 status code', async () => {
        const res = await request(app)
          .post('/api/v1/auth/signup')
          .send(mockSignupUser);
        expect(res.statusCode).toBe(201); // Don't use toBe() with floating point numbers.
      });

      it('should return a response header with a Content-Type of json', async () => {
        const res = await request(app)
          .post('/api/v1/auth/signup')
          .send(mockSignupUser);
        expect(res.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
      });

      it('should return a response body with a boolean status', async () => {
        const res = await request(app)
          .post('/api/v1/auth/signup')
          .send(mockSignupUser);
        expect(res.body).toEqual(
          expect.objectContaining({
            status: true,
          })
        );
      });

      it('should return a response body with a data object containing a token', async () => {
        const res = await request(app)
          .post('/api/v1/auth/signup')
          .send(mockSignupUser);
        expect(res.body).toEqual(
          expect.objectContaining({
            data: expect.objectContaining({
              token: expect.any(String),
            }),
          })
        );
      });
    });

    describe('An invalid username and password', () => {
      const mockSignupUser = {};

      it('should respond with a 400 status code', async () => {
        const res = await request(app)
          .post('/api/v1/auth/signup')
          .send(mockSignupUser);
        expect(res.statusCode).toBe(400); // Don't use toBe() with floating point numbers.
      });
    });
  });
});
