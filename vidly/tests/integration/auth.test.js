const request = require('supertest')
const { Genre } = require('../../models/genre')
const { User } = require('../../models/user')
let server;

describe('Auth Middleware',()=>{

    beforeEach(() => {
        server = require('../../index')
        token = new User().generateToken();
    })
    afterEach(async () => {

       await Genre.collection.deleteMany({});

        server.close();
    })

    callServer = async() =>{

        return await request(server)
        .post('/api/genres')
        .set('x-vidly-jwt', token)
        .send({name:'Thriller'});
    };

    it('Should return 401 if token is not passed',async ()=>{
        token = '';
        const res = await callServer();

        expect(res.status).toBe(401);

    });
    it('Should return 400 if invalid token is passed',async ()=>{
        token = 'Invalid Token';
        const res = await callServer();

        expect(res.status).toBe(400);

    });
    it('Should return 200 if valid token is passed',async ()=>{
        const res = await callServer();
        expect(res.status).toBe(200);

    });

    
})