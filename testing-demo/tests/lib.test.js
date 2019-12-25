const lib = require('../lib')

test('Absolute-Result should return positive number if input is positive',()=>{

    let result = lib.absolute(2);
    expect(result).toBe(2);

});

test('Absolute-Result should return positive number if input is negative',()=>{

    let result = lib.absolute(-2);
    expect(result).toBe(2);

});

test('Absolute-Result should return 0 if input is 0',()=>{
    let result = lib.absolute(0);
    expect(result).toBe(0);
});
