const request = require('supertest')
let server;
describe('/api/genres',()=>{

    beforeEach(()=>{
        server = require('../../index')
    })
    afterEach(()=>{
        server.close();
    })
    describe('GET /',()=>{
        it('should return all the genres', async ()=>{
            let req =await request(server).get('/api/genres');
            expect(req.status).toBe(200);
        });
    })

});