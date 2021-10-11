function addItem() {
  let input = document.getElementById('newText');
let liElement = createElement('li',input.value);
let btnDel = createElement('a','[Delete]');
btnDel.href = '#';

btnDel.addEventListener('click', (ev)=>{
  
  ev.target.parentNode.remove()
});

liElement.appendChild(btnDel);
document.getElementById('items').appendChild(liElement);
input.value="";

}

function createElement(type, content){
let el = document.createElement(type);
el.textContent = content;
return el;
}


