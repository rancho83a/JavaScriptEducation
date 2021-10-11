const {assert,expect} = require('chai');
const createCalculator = require('./07.js');

describe('testTask07',()=>{

    let calc;
 
    beforeEach(function () {
        calc = createCalculator();
    });

    it('get initial value', ()=>{
        assert.equal(calc.get(),0);
    });
    it('add', ()=>{
        calc.add(1);
        assert.equal(calc.get(),1);
    });

    it('subtrackt', ()=>{
        calc.subtract(1);
        assert.equal(calc.get(),-1);
    });

    it('add type String', ()=>{
        calc.add('1');
        assert.equal(calc.get(),1);
    });
    it('subtrackt type string', ()=>{
        calc.subtract('1');
        assert.equal(calc.get(),-1);
    }); 

    it('add type StringNonNumber', ()=>{
        calc.add('u');
        assert.isNaN(calc.get());
    });
    it('subtrackt String', ()=>{       
        calc.subtract('r')
        assert.isNaN(calc.get());    
    });  
  
    it('aa+subtrackt', ()=>{
        calc.add(1);
        calc.subtract(1);
        calc.add(1);
        assert.equal(calc.get(),1);
    }); 

    it("should return 5 after add(2); add(3);", function () {
        calc.add(2);
        calc.add(3);
        let value = calc.get();
        expect(value).to.be.equal(5);
    });

    it("shoul return -5 after subtract(3); subtract(2)", function () {
        calc.subtract(3);
        calc.subtract(2);
        let value = calc.get();
        expect(value).to.be.equal(-5);
    });

    it("should return 4.2 after add(5.3); subtract(1.1);", function () {
        calc.add(5.3);
        calc.subtract(1.1);
        let value = calc.get();
        expect(value).to.be.equal(5.3 - 1.1);
    });

    it("should return 2 after add(10); subtract('7'); add('-2'); subtract(-1)", function () {
        calc.add(10);
        calc.subtract('7');
        calc.add('-2');
        calc.subtract(-1);
        let value = calc.get();
        expect(value).to.be.equal(2);
    });

})