const lib = require('../lib')

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
describe('greet',()=>{
    it('should return the text with the prefix of welcome',()=>{
        let result = lib.greet('Siva');
        expect(result).toBe('Welcome Siva')
    });
});
describe('getCurrencies',()=>{
    it('should return the currencies array with the lengh of three',()=>{
        let result = lib.getCurrencies();
        expect(result).toHaveLength(3);
    });
    it('should contains the USD currency ',()=>{
        let result = lib.getCurrencies();
        expect(result).toContain('USD');
    });
    it('should contains the AUD currency ',()=>{
        let result = lib.getCurrencies();
        expect(result).toContain('AUD');
    });
    it('should contains the EUR currency ',()=>{
        let result = lib.getCurrencies();
        expect(result).toContain('EUR');
    });
});

describe('getProduct',()=>{
    it('should return the JSON with the properties id and price',()=>{
        let result = lib.getProduct(1);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('price');
    });
    it('id property should contain the passed input productid ',()=>{
        let result = lib.getProduct(1);
        expect(result.id).toBe(1);
    });
    it('should always returns same price for diff product ids ',()=>{
        let result1 = lib.getProduct(1);
        expect(result1.price).toBe(10);
        let result2 = lib.getProduct(2);
        expect(result2.price).toBe(10);    
    });
    
});



