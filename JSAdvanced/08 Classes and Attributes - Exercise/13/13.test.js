const { assert } = require('chai');
const { PaymentPackage } = require('./13.js');

describe('testFunctionality', () => {
  let test=undefined;

  beforeEach(function () {
    test = new PaymentPackage("name", 1500);
  });

  it(' constructor type', () => {
    test = new PaymentPackage("name", 1500);

    assert.equal(test._name, 'name');
    assert.equal(test._value, 1500);
    assert.equal(test._VAT, 20);
    assert.equal(test._active, true);
  });

  it('name', () => {
    let test = new PaymentPackage("name", 1500);
    assert.equal(test.name,'name');
    test.name='name2';
    assert.equal(test.name,'name2');
    assert.throw (() => {test.name = ''}, 'Name must be a non-empty string');
    assert.throw (() => {test.name = 2}, 'Name must be a non-empty string');
  });

  it('value', () => {
    let test = new PaymentPackage("name", 1);
    assert.equal(test.value,1);
    test.value=2;
    assert.equal(test.value,2);
    assert.throw (() => {test.value = 'ddd'}, 'Value must be a non-negative number');
    assert.throw (() => {test.value = -2}, 'Value must be a non-negative number');
    assert.doesNotThrow(()=>{test.value=0});

  });

  it('VAT', () => {
    let test = new PaymentPackage("name", 1);
    assert.equal(test.VAT,20);
    test.VAT=2;
    assert.equal(test.VAT,2);
    assert.throw (() => {test.VAT = 'ddd'}, 'VAT must be a non-negative number');
    assert.throw (() => {test.VAT = -2}, 'VAT must be a non-negative number');
  });

  it('active', () => {
    let test = new PaymentPackage("name", 1);
    assert.equal(test.active,true);
    test.active=false;
    assert.equal(test.active,false);
    assert.throw (() => {test.active = 'ddd'}, 'Active status must be a boolean');
  });
  it('toString', () => {
    
    function getString(name,value,VAT=20,active=true){
      return [
        `Package: ${name}` + (active === false ? ' (inactive)' : ''),
        `- Value (excl. VAT): ${value}`,
        `- Value (VAT ${VAT}%): ${value * (1 + VAT / 100)}`
      ].join('\n');
    }
    let test = new PaymentPackage("ss", 1000);
      assert.equal(test.toString(),getString('ss',1000));
      test.active=false;
      assert.equal(test.toString(),getString('ss',1000,20,false));    
  });

  
})