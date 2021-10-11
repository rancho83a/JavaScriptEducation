'use strict'
function Person (name){
    this.name=name;

}
Person.prototype.sayHi = function (){
    console.log(`${this.name} says Hi` );
}


function Employee(name, salary){
    Person.call(this,name);
    this.salary=salary;
}
Employee.prototype=Object.create(Person.prototype);

Employee.prototype.collectSalary = function(){
    console.log(`${this.name} collect ${this.salary}`);
}

const p = new Person('SS');
//p.sayHi();

const myEmpl = new Employee('PP', 5000);
console.log(myEmpl);
myEmpl.collectSalary();
myEmpl.sayHi();