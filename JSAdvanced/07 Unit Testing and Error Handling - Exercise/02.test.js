const {assert} = require('chai');
const {isOddOrEven} = require('./02.js');

describe('testOddOrEven', ()=>{

    it('work correct',()=>{
        assert.equal(isOddOrEven('str'),'odd')
    });

    it('work correct Even',()=>{
        assert.equal(isOddOrEven('st'),'even')
    });

    it('wrong type',()=>{
        assert.isUndefined(isOddOrEven(1),'even')
    });

})
