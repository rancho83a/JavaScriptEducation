class Hex {
    constructor(num) {
        this.num = num;

    }
    valueOf() {
        return this.num;
    }
    plus(number) {
        return new Hex(this.num + number);
    }
    minus(number) {
        return new Hex(this.num - number);
    }

    toString() {
        return '0x' + this.num.toString(16).toUpperCase();
    }

    parse(string) {
        return string.slice(2).toString(10);
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');