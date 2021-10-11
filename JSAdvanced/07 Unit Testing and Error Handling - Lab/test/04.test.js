const {expect, assert} = require('chai');
const {sum} = require('./04.js');

describe('04TaskTest', ()=>{

    it('one number', ()=>{
        assert.equal(sum([1]),1);
    });
    it('multiple number', ()=>{
        assert.equal(sum([1,1]),2);
    });
    it('one number', ()=>{
        assert.equal(sum([2,3,4]),9);
    });
})