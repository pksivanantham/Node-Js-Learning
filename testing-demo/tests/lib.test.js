const lib = require('../lib')
const db = require('../db');
describe('absolute', () => {

    it('should return positive number if input is positive', () => {

        let result = lib.absolute(2);
        expect(result).toBe(2);

    });

    it('should return positive number if input is negative', () => {

        let result = lib.absolute(-2);
        expect(result).toBe(2);

    });

    it('should return 0 if input is 0', () => {
        let result = lib.absolute(0);
        expect(result).toBe(0);
    });
});
describe('greet', () => {
    it('should return the text with the passed input', () => {
        let result = lib.greet('Siva');
        expect(result).toMatch(/Siva/);
        expect(result).toContain('Siva');
    });
});
describe('getCurrencies', () => {
    // it('should return the currencies array with the lengh of three', () => {
    //     let result = lib.getCurrencies();
    //     expect(result).toHaveLength(3);
    // });
    it('should contains the USD currency ', () => {
        let result = lib.getCurrencies();
        expect(result).toContain('USD');
    });
    it('should contains the AUD currency ', () => {
        let result = lib.getCurrencies();
        expect(result).toContain('AUD');
    });
    it('should contains the EUR currency ', () => {
        let result = lib.getCurrencies();
        expect(result).toContain('EUR');
    });
    it('should contains the all supported currencies ', () => {
        let result = lib.getCurrencies();
        //Instead of passing array here we are passing the expect.arrayContaining 
        //because this will skip the order of items inside array(Exact location)
        expect(result).toEqual(expect.arrayContaining(['USD','EUR','AUD']));

    });
});

describe('getProduct', () => {
    it('should return the JSON with the properties id and price', () => {
        let result = lib.getProduct(1);

        expect(result).toHaveProperty('id',1);
        expect(result).toHaveProperty('price',10);
        //expect(result).toEqual({id:1,price:10})
        expect(result).toMatchObject({id:1,price:10});

    });
   
    it.each([[1,10],
             [2,10]])('For each input %i it should return same price', (a,expected)=>{
        let result = lib.getProduct(a);
        expect(result.price).toBe(expected);    
    });


});

describe('registerUser',()=>{

    it.each([null,undefined,NaN,0,false,''])('For falsy username value -> [%p], it should throw error',(username)=>{
        expect(()=>{lib.registerUser(username) }).toThrowError();
    });

    it('should return valid object if username is valid',()=>{

        let result = lib.registerUser('Siva');
        expect(result).toMatchObject({username:'Siva'});
        expect(result.id).toBeGreaterThan(0);
    })
});

describe('applyDiscount',()=>{

    it('should return 10% discount if customer has more than 10 points',()=>{

        //Mock with monkey patching

        db.getCustomerSync = (id)=>{

            console.log('Reading a customer from Mock function...');
            return { id: id, points: 50 };
        };
        let order = {customerId:1,totalPrice:100};

        lib.applyDiscount(order);

        expect(order.totalPrice).toBe(90);

    })
});

