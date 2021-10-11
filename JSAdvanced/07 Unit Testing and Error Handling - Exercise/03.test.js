const {assert} = require('chai');
const {lookupChar} = require('./03.js');

describe("testLookupFunc", ()=>{

    it('test with Correct types', ()=>{
        assert.equal(lookupChar('qwerty',1),'w');
    });
    it('test with Correct types', ()=>{
        assert.equal(lookupChar('qwerty',0),'q');
    });
    it('test with Correct types', ()=>{
        assert.equal(lookupChar('qwerty',5),'y');
    });
    it('test with Correct types', ()=>{
        assert.equal(lookupChar('',0),'Incorrect index');
    });
    it('test with inCorrect type instead String', ()=>{
        assert.isUndefined (lookupChar(2,1));
    });

    it('test with inCorrect type instead Integer Index', ()=>{
        assert.isUndefined (lookupChar('qwerty','1'));
    });

    it('test with inCorrect type Float instead Integer Index', ()=>{
        assert.isUndefined (lookupChar('qwerty',1.1));
    });

    it('test with inCorrect type index<0', ()=>{
        assert.equal (lookupChar('qwerty',-1),'Incorrect index');
    });

    it('test with inCorrect type index>Length', ()=>{
        assert.equal (lookupChar('qwerty',111),'Incorrect index');
    });
    it('test with inCorrect type index=Length', ()=>{
        assert.equal (lookupChar('qwerty',6),'Incorrect index');
    });

    it('test with inCorrect 2 types', ()=>{
        assert.isUndefined (lookupChar(6,'1'));
    });
});