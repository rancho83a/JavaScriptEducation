const {assert} = require('chai');
const rgbToHexColor = require('./06.js');

describe('TestRGB', ()=>{
    it('valid inputs',()=>{
        assert.equal(rgbToHexColor(0,0,0), '#000000')
    });
    it('valid inputs',()=>{
        assert.equal(rgbToHexColor(5,5,5), '##050505')
    });
    it('invalid type inputs',()=>{
        assert.isUndefined(rgbToHexColor('0',1,1))
    });
    it('invalid type inputs',()=>{
        assert.isUndefined(rgbToHexColor(0,'1',1))
    });
    it('invalid type inputs',()=>{
        assert.isUndefined(rgbToHexColor(0,0,'1'))
    });
  
    it('invalid value <0 inputs',()=>{
        assert.isUndefined(rgbToHexColor(-1,0,0))
    });
    it('invalid value >255 inputs',()=>{
        assert.isUndefined(rgbToHexColor(256,0,0))
    });

    it('invalid value <0 inputs',()=>{
        assert.isUndefined(rgbToHexColor(0,-1,0))
    });
    it('invalid value >255 inputs',()=>{
        assert.isUndefined(rgbToHexColor(0,256,0))
    });
    it('invalid value <0 inputs',()=>{
        assert.isUndefined(rgbToHexColor(0,0,-1))
    });
    it('invalid value >255 inputs',()=>{
        assert.isUndefined(rgbToHexColor(0,0,256))
    });
})