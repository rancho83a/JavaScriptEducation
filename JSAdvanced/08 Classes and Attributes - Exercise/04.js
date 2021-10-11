class List {
    constructor() {
        this.size = 0;
        this.arr = [];
    }
    add(element) {
        this.arr.push(element);
        this.size++;
        return this.sortArr(this.arr);
    }

    remove(index){
        this.validateIndex(index);

        this.arr.splice(index,1);

        this.size--;
        return this.sortArr(this.arr);
    }

    get(index){
        this.validateIndex(index);
        return this.arr[index];
    }

    sortArr(arr) {
        return arr.sort((a, b) => a - b)
    }
    validateIndex(index){
        if(index<0 || index>=this.size){
            throw new Error('Index is out of bounds')
        }
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
