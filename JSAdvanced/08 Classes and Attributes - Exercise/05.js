class Stringer {
    constructor(str, num) {
        this.innerString = str;
        this.innerLength = num;
    }

    increase(length) {
       this.innerLength+=length;
    }

    decrease(length) {
           this.innerLength-= length;
        this.innerLength = this.innerLength < 0 ? 0 : this.innerLength; 
    }

    toString() {
        if (this.innerLength === 0) {
            return '...'
        }
        if (this.innerString.length > this.innerLength){
            const index = this.innerString.length - this.innerLength;
            return this.innerString.slice(0,index)+"...";
        }
        return this.innerString;
    }
}
let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); 