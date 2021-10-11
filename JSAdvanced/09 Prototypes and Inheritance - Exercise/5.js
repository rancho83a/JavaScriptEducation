function company() {
    class Employee {
        constructor(name, age) {
            if (new.target=== Employee) {
                throw new Error("Cannot instantiate directly.")
            }
            this.name = name;
            this.age = age;
            this.task = [];
            this.salary = 0;
        }
        getSalary(){
            return this.salary;
        }

        work() {
            let currentTask = this.task.shift();
            this.task.push(currentTask);
            console.log(currentTask);
        }
        collectSalary() {
            return console.log(`${this.name} received ${this.getSalary()} this month.`);
        }
    }

    class Junior extends Employee{
        constructor(name,age){
            super(name,age);
            this.task.push(`${this.name} is working on a simple task.`); 
        }

    }

    class Senior extends Employee{
        constructor(name,age){
            super(name,age);
            this.task.push(`${this.name} is working on a complicated task.`);
            this.task.push(`${this.name} is taking time off work.`);
            this.task.push(`${this.name} is supervising junior workers.`);
        }
    }

    class Manager extends Employee{
        constructor(name, age){
            super(name,age);
            this.dividend=0;
            this.task.push(`${this.name} scheduled a meeting.`);
            this.task.push(`${this.name} is preparing a quarterly report.`)
        }
        getSalary(){
            return this.salary+this.dividend;
        }
    }



    return { Employee, Junior, Senior, Manager }
}