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
})

