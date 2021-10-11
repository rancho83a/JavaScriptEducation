let obj = {
    city:'Kiev',
    property2: 'fff',
    street: "neSTREETw",
    sayHi() {
        console.log("Hi9");
    },

    address() {
        return `${this.city} + ${this.street}`;
    }
}

console.log(obj.address());

const fullAdres = obj.address;
console.log(fullAdres());

//console.log(obj);

let obj2 = {
    city:'Sofia',
    property2: 'fff',
    street: "nenova",
    sayHi() {
        console.log("Hi9");
    },
}

obj2.address = fullAdres;

console.log(obj2.address());