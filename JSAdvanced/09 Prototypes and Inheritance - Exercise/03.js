function solve(){
//const inst ={};
const proto={};
//Object.setPrototypeOf(inst,proto);

const inst = Object.create(proto);
inst.extend = function (template){
    Object.entries(template).forEach(([k,v]) => {
        if(typeof v === 'function'){
            //Object.getPrototypeOf(inst)[k]=v;
            proto[k]=v;
        } else {
            inst[k]=v;
        }
    });
}
    return inst;
}