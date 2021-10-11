function Person(firstName,lastName){

    this.firstName=firstName;
    this.lastName=lastName;

    Object.defineProperty(this, 'fullName', {
        get: function(){
            return  `${this.firstName} ${this.lastName}`
        },
        set : function(value){
            [this.firstName,this.lastName]=value.split(' ');
        } 

    });
    

}

let p = new Person('sasa', 'Pi');

console.log(p);
console.log(p.fullName);
p.fullName = 'R K';
console.log(p.firstName);
console.log(p.lastName);