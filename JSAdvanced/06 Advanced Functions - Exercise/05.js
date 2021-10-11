function add(num){

    function innerSum(a){
        num+=a;
        return innerSum;
    }
    innerSum.toString = () => num;


    return innerSum;
}
add(1)(6)(-3)(10);