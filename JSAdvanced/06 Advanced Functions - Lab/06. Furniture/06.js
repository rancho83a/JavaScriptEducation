function solve(input){
let arr=[]
    command={
        add:x=>arr.push(x),
        remove:x=>arr = arr.filter(i=>x!=i),
        print:()=>console.log(arr.join(','))
    }
    input.map( x=>{ 
        [com,item]=x.split(' ');
        command[com.trim()](item);
    }); 
}
solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
