function solution() {
    let str = '';
    return { append,print,removeStart, removeEnd };

    function append(text) {
        str += text;
    }
    function print(){
        console.log(str);
    }
    function removeStart(n){
        str=str.substring(n);
   }
    function removeEnd(n){
        str = str.slice(0,-n);
    }

}
let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);

firstZeroTest.print();