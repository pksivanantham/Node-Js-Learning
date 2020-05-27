const request = require('supertest')
const {Genre} = require('../../models/genre')
let server;
describe('/api/genres',()=>{

    beforeEach(()=>{
        server = require('../../index')
    })
    afterEach(async ()=>{
        server.close();
        await Genre.collection.remove({});
    })
    describe('GET /',()=>{
        it('should return all the genres', async ()=>{
            await Genre.collection.insertMany([
                { name:'Genre1'},
                { name:'Genre2'}
            ]);
            let req =await request(server).get('/api/genres');
            expect(req.status).toBe(200);
            expect(req.body.length).toBe(2);
            expect(req.body.some(q=>q.name==='Genre1')).toBeTruthy();            
            expect(req.body.some(q=>q.name==='Genre2')).toBeTruthy();            
        });
    })

    describe('GET /:Id',()=>{
        it('should return the genre if valid id passed',async ()=>{
            // let insResult = await Genre.collection.insertMany([
            //     { name: 'Genre1' }
            // ]);
            // let req = await request(server).get(`/api/genres/${insResult.insertedIds['0']}`);
            let genre = new Genre({name:'Genre1'});
            await genre.save();
            let req = await request(server).get(`/api/genres/${genre._id}`);
            expect(req.status).toBe(200);
            expect(req.body).toHaveProperty('name',genre.name);
        });
        it('should return the 404 status  if invalid valid genre id  is passed', async () => {
            let req = await request(server).get(`/api/genres/1234`);
            expect(req.status).toBe(404);
        });
    });
});