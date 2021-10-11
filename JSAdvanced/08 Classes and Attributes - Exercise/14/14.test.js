const { assert, expect } = require('chai');
const { StringBuilder } = require('./14.js');

describe('test', () => {
    let correct;

    beforeEach(function () {
        correct = new StringBuilder('ss');
    });

    it('constructor undef', () => {
        let empty = () => new StringBuilder();
        assert.doesNotThrow(empty);
    });
    it('constructor corect', () => {
        correct = () => builder = new StringBuilder('ss');
        assert.doesNotThrow(correct);
    });

    it('constructor wrong type', () => {
        let num = () => new StringBuilder(3);
        assert.throw(num);
    });

    it('constructor corect', () => {
        let actual = ['s', 's'];
        assertArrays(correct._stringArray, actual);
    });


   it('append corect', () => {
        correct.append('a')
        let actual = ['s', 's', 'a'];
        assertArrays(correct._stringArray, actual);
    });
    it('append wrong', () => {
        let er = () => correct.append(3);
        assert.throw(er);
    });

    it('prepend corect', () => {
        correct.prepend('ab')
        let actual = ['a', 'b', 's', 's'];
        assertArrays(correct._stringArray, actual);
    });
    it('prepend wrong', () => {
        let er = () => correct.prepend(1);
        assert.throw(er);
    });

    it('insert corect', () => {
        correct.insertAt('ab', 1)
        let actual = ['s', 'a', 'b', 's'];
        assertArrays(correct._stringArray, actual);
    });
    it('insert corect', () => {
        correct.insertAt('ab', 2)
        let actual = ['s', 's', 'a', 'b'];
        assertArrays(correct._stringArray, actual);
    });

    it('insert corect', () => {
        correct.insertAt('ab', 0)
        let actual = ['a', 'b', 's', 's'];
        assertArrays(correct._stringArray, actual);
    });

    it('insert wrong', () => {
        let er = () => correct.insertAt(1, 1);
        assert.throw(er);
    });
    
    it('has all properties', function () {
        expect(builder.hasOwnProperty('_stringArray')).to.equal(true, "Missing _stringArray property");
    });

    it('must initialize data to a string array', function () {
        let startingString = 'hello';
        let builder = new StringBuilder(startingString);
        assert.isTrue(builder._stringArray instanceof Array);
    });

    it('has functions attached to prototype', function () {
        let startingString = 'hello';
        let builder = new StringBuilder(startingString);
        assert.isTrue(Object.getPrototypeOf(builder).hasOwnProperty('append'));//"Missing append function"
        assert.isTrue(Object.getPrototypeOf(builder).hasOwnProperty('insertAt'));
        assert.isTrue(Object.getPrototypeOf(builder).hasOwnProperty('remove'));
        assert.isTrue(Object.getPrototypeOf(builder).hasOwnProperty('toString'));
        assert.isTrue(Object.getPrototypeOf(builder).hasOwnProperty('prepend'));
    });

    it('must initialize data to an empty array', function () {
        let builder = new StringBuilder();
        assert.isTrue(builder._stringArray instanceof Array);
        assert.equal(builder._stringArray.length,0);
    });


    it('remove corect', () => {
        let test = new StringBuilder('01234')
        test.remove(2, 2)
        let actual = ['0', '1', '4'];
        assertArrays(test._stringArray, actual);
    });

    it('remove corect', () => {
        let test = new StringBuilder('01234')
        test.remove(2, 22)
        let actual = ['0', '1'];
        assertArrays(test._stringArray, actual);
    });

    it('remove corect', () => {
        let test = new StringBuilder('01234')
        test.remove(0, 22)
        let actual = [];
        assertArrays(test._stringArray, actual);
    });


    it('tostring corect', () => {
        let test = new StringBuilder('01234')
        assert.equal(test.toString(), '01234')
        test.remove(2, 2)
        assert.equal(test.toString(), '014')

    });

    function assertArrays(arr1, arr2) {
        assert.equal(arr1.length, arr2.length, "Arrays don't match");
        for (let i = 0; i < arr1.length; i++) {
            assert.equal(arr1[i], arr2[i], 'Element ' + i + ' mismatch')
        }
    }  
})
