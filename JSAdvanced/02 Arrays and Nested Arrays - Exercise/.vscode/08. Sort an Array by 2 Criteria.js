const solve = (arr) => {
    arr.sort((a, b) => {
        let res = a.length - b.length;
        if (res == 0) {
            return a.localeCompare(b);
        }
        return res;
    });
    console.log(arr.join('\n'));
}
solve(['test', 
'Deny', 
'omen', 
'Default'])
