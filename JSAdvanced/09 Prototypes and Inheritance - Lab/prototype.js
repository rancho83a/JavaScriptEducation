function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
Person.prototype.write = function (msg) {
    console.log(`${this.firstName} wrote: ${msg}`);
}



function newOperator(constructor, ...params) {
    //allocate and assign prototype
    const result = Object.create(Person.prototype);

    //assign prototype
   // Object.setPrototypeOf(result, Person.prototype); 

    //execute constructor with params inside memory context
    constructor.apply(result, params)

    // return memory contest
    return result;
}

const myPerson = newOperator(Person,'S','P');
const otherPerson = newOperator(Person, 'Sa','Pa');
console.log(myPerson, otherPerson);

 myPerson.write('hello');
 otherPerson.write('ff');

console.log(myPerson.write == otherPerson.write);

















