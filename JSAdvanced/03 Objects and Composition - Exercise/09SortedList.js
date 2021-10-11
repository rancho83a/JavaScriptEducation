function createSortedList() {
    let list = [];

    let sortList = {
        size: 0,
        add,
        remove,
        get
    };

    function add(element) {
        list.push(element);
        this.size++;
        list.sort((a, b) => a - b);
    }

    function remove(index) {
        if (index >= 0 && index < list.length) {
            delete list[index];
            this.size--;
            list.sort((a, b) => a - b);
        }
    }

    function get(index){
        return list[index];
    }



    return sortList;
}
let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
