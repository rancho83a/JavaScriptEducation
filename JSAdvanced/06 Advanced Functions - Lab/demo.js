

myObj = {
    name: "Sasa",
    outer () {
        console.log('My name is' + this);        
    }
};

function myFunc(a,b){
    console.log(this.name);
    console.log(a,b);
}


myFunc(3,4);

myFunc.call(myObj,3,4);
const boundFunc = myFunc.bind(myObj);
 boundFunc(3,4);


