const {expect, assert} = require('chai');
const isSymmetric = require('./05.js');

describe('05TestTest', ()=>{

    it('returnFalseIfNon-Array',()=> {
        assert.isFalse(isSymmetric(5));
    });
    it('trueIfSymetricArray', ()=>{
        assert.isTrue(isSymmetric([1,2,3,2,1]));
    });
    it('falseIfNon-SymetricArray', ()=>{
        assert.isFalse(isSymmetric([1,2,3,2]));
    });

    it('trueIfSymetricArray1Element', ()=>{
        assert.isTrue(isSymmetric([1]));
    });
    it('trueIfSymetricArrayEmptyArrayt', ()=>{
        assert.isTrue(isSymmetric([]));
    });

    it('return false  with type coerced elemets ',()=> {
        assert.isFalse(isSymmetric([1,'1']));
    });
})