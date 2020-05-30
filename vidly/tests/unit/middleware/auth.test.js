const {User}= require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('AUTH middleware',()=>{

    it('should return user details in req',()=>{

        const user = {
            _id :mongoose.Types.ObjectId().toHexString(),
            isAdmin:true
        }

        const token = new User(user).generateToken();
        const res  = {}

        const req  = {

            header:jest.fn().mockReturnValue(token)
        };
        const next = jest.fn();

        auth(req,res,next);

        console.log(new User())
        expect(req.user).not.toBeNull();
    });

});

