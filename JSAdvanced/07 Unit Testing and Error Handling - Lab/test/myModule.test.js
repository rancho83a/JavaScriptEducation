 const {sum} = require('./myModule');
 const {expect, assert} = require('chai');

 describe('sumFunc', ()=> {

    it('it works',()=>{
       // expect(sum(1,2)).to.equal (3);
        assert.equal(sum(1,2),3);
        
    });

    it('Failed with invalid values', ()=>{
       // expect(sum('a','a')).to.be.NaN;
        assert.isNaN(sum('a','a'));
    });
 });