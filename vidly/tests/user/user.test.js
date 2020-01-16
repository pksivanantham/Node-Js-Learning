const {User} = require('../../models/user')
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
 
describe('user.generateToken',()=>{

    it('should generate JWT token',()=>{

        const payload = {_id:mongoose.Types.ObjectId().toHexString(),isAdmin:true};
        const user = new User(payload);
        const token = user.generateToken();
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });

});