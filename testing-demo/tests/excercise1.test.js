const excercise = require('../exercise1')


describe('fizzBuzz',()=>{

    it.each([null,undefined,true,'','1',{},NaN])('For invalid input value -> [%p], it should throw error',(i)=>{
        expect(()=>{excercise.fizzBuzz(i) }).toThrowError();
    });

    it.each`
    input | expected
    ${15} | ${'FizzBuzz'}
    ${3}  | ${'Fizz'}
    ${5}  | ${'Buzz'}
    ${1}  | ${1}
    `('For input value -> [$input], it should return [$expected]',({input,expected})=>{
        let result =excercise.fizzBuzz(input) 
        expect(result).toBe(expected);
    });

});