import request from 'supertest';
import { app } from '../../src/app'; // Assuming you have an Express app instance in app.js
import { connectDB } from '../../src/Models/index.js';
import { ObjectId } from 'mongodb';

let db;

beforeAll(async () => {
    db = await connectDB();
});

afterAll(async () => {
    await db.close();
});

describe('Users API', () => {
    let userId;

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' })
            .expect(201);

        expect(response.body.message).toBe('Created');
        const user = await db.collection('users').findOne({ email: 'john@example.com' });
        expect(user).not.toBeNull();
        userId = user._id;
    });

    it('should get all users', async () => {
        const response = await request(app)
            .get('/users')
            .expect(200);

        expect(response.body.results).toBeInstanceOf(Array);
        expect(response.body.results.length).toBeGreaterThan(0);
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .send({ name: 'Jane Doe' })
            .expect(200);

        expect(response.body.message).toBe('Updated');
        const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        expect(updatedUser.name).toBe('Jane Doe');
    });

    it('should delete a user', async () => {
        const response = await request(app)
            .delete(`/users/${userId}`)
            .expect(200);

        expect(response.body.message).toBe('Deleted');
        const deletedUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
        expect(deletedUser).toBeNull();
    });

    it('should return 404 for non-existing user update', async () => {
        const nonExistingId = new ObjectId();
        const response = await request(app)
            .put(`/users/${nonExistingId}`)
            .send({ name: 'Non Existing' })
            .expect(404);

        expect(response.body.message).toBe('Usuario no encontrado');
    });

    it('should return 404 for non-existing user delete', async () => {
        const nonExistingId = new ObjectId();
        const response = await request(app)
            .delete(`/users/${nonExistingId}`)
            .expect(404);

        expect(response.body.message).toBe('Usuario no encontrado');
    });
});