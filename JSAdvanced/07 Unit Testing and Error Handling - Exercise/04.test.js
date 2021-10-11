const { assert } = require('chai');
const { mathEnforcer } = require('./04.js');


describe('mathForcer', () => {
    let add5;

    beforeEach(function () {
        add5 = mathEnforcer.addFive;
    });

    //  describe('addFive', ()=>{
    it('corect work with positive number', () => {
        assert.equal(add5(1), 6);
    });
    it('corect work with negative number', () => {
        assert.equal(add5(-1), 4);
    });
    it('corect work with floating-point number', () => {
        assert.equal(add5(0.0001), 5.0001);
    });

    it('corect work with non- number', () => {
        assert.isUndefined(add5('1'));
    });


    // });

    describe('substructTen', () => {
        it('corect work with positive number', () => {
            assert.equal(mathEnforcer.subtractTen(1), -9);
        });
        it('corect work with negative number', () => {
            assert.equal(mathEnforcer.subtractTen(-1), -11);
        });
        it('corect work with negative number', () => {
            assert.equal(mathEnforcer.subtractTen(0.01), -9.99);
        });
        it('corect work with non- number', () => {
            assert.isUndefined(mathEnforcer.subtractTen('1'));
        });
    });

    describe('Testsum', () => {
        it('corect work with positive numbers', () => {
            assert.equal(mathEnforcer.sum(1, 1), 2);
        });
        it('corect work with negative numbers', () => {
            assert.equal(mathEnforcer.sum(-1, -1), -2);
        });
        it('corect work with positive numbers', () => {
            assert.equal(mathEnforcer.sum(1.001, 1.0001), 2.0011);
        });
        it('corect work with non- number', () => {
            assert.isUndefined(mathEnforcer.sum('1', 1));
        });

        it('corect work with non- number', () => {
            assert.isUndefined(mathEnforcer.sum(1, '1'));
        });

        it('corect work with non- number', () => {
            assert.isUndefined(mathEnforcer.sum('1', '1'));
        });

    });
})