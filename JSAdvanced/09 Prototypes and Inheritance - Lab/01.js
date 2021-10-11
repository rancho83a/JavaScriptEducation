class Person {
    constructor(firstName, lastName){
        this.firstName=firstName;
        this.lastName=lastName;
    }

    get fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    set fullName(value){
        [this.firstName,this.lastName] = value.split(' ');
    }
    toString(){
        return  `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
    }
}

let p= new Person('Sasa', 'Pi');
// console.log(p.fullName);

// p.fullName = 'Rara KEy';
// console.log(p.firstName);
// console.log(p.lastName);
console.log(p.constructor.name);
console.log(p.toString());