    class Person {
        constructor(name, email) {
            this.name = name;
            this.email = email;
        }
        toString(){
            return  `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name,email,subject){
            super(name,email);
            this.subject=subject;
        }
        toString(){
            return super.toString().slice(0,super.toString().length)+   `, subject: ${this.subject})`
        }

    }

    class Student extends Person{
        constructor(name, email,course){
            super(name,email);
            this.course=course;
        }

        toString(){
            return super.toString().slice(0,super.toString().length-1)+   `, course: ${this.course})`
        }
    }
const s = new Student('das','asdas','ppp');
//console.log(s);
console.log(s.toString());