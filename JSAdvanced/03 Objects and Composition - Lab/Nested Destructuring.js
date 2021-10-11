const department = {

    name: "Engineering",

    data: {
        director: {
            name: 'John',
            position: 'Engineering Director'
        },
        employees: {},
        company: "Quick build"
    }
};

const employees = [
    {name: 'emp1', position: "woker"},
    {name: 'emp2', position: 'secretary'}
];

let [{name}]=employees;
console.log(employees);


const {data : {director}} = department;

console.log(director);

const{data: {employees}}