function addItem() {

    let newLi =document.createElement('li');
    newLi.textContent = document.getElementById('newItemText').value;

    console.log(document.querySelector('ul').appendChild(newLi));
    document.getElementById('newItemText').value="";

}