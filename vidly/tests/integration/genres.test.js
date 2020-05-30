const request = require('supertest')
const { Genre } = require('../../models/genre')
const { User } = require('../../models/user')
let server;
describe('/api/genres', () => {

    beforeEach(() => {
        server = require('../../index')
    })
    afterEach(async () => {
        server.close();
        await Genre.collection.deleteMany({});
    })
    describe('GET /', () => {
        it('should return all the genres', async () => {
            await Genre.collection.insertMany([
                { name: 'Genre1' },
                { name: 'Genre2' }
            ]);
            let req = await request(server).get('/api/genres');
            expect(req.status).toBe(200);
            expect(req.body.length).toBe(2);
            expect(req.body.some(q => q.name === 'Genre1')).toBeTruthy();
            expect(req.body.some(q => q.name === 'Genre2')).toBeTruthy();
        });
    })

    describe('GET /:Id', () => {
        it('should return the genre if valid id passed', async () => {
            // let insResult = await Genre.collection.insertMany([
            //     { name: 'Genre1' }
            // ]);
            // let req = await request(server).get(`/api/genres/${insResult.insertedIds['0']}`);
            let genre = new Genre({ name: 'Genre1' });
            await genre.save();
            let req = await request(server).get(`/api/genres/${genre._id}`);
            expect(req.status).toBe(200);
            expect(req.body).toHaveProperty('name', genre.name);
        });
        it('should return the 404 status  if invalid valid genre id  is passed', async () => {
            let req = await request(server).get(`/api/genres/1234`);
            expect(req.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let token;
        let name;


        beforeEach(() => {
            token = new User().generateToken();
            name = 'Thriller';
        })

        callServer = async () => {
            return await request(server)
                .post(`/api/genres`)
                .set('x-vidly-jwt', token)
                .send({ name });

        };

        it('should return 401 if the user is not logged in', async () => {

            token = '';
            const res = await callServer();

            expect(res.status).toBe(401);
        })

        it('should return 400 if the genre is less then 3 chars', async () => {

            name = '12';

            const res = await callServer();

            expect(res.status).toBe(400);
        })
        it('should return 400 if the genre is greater then 50 chars', async () => {

            name = new Array(52).join('A');

            const res = await callServer();

            expect(res.status).toBe(400);
        })

        it('should save genre if valid genre is passed', async () => {


            const res = await callServer();

            const genre = Genre.find({ name })

            expect(genre).not.toBeNull();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'Thriller');

        })

    })
});