function addItem() {
    let input = document.getElementById('newText');
    if(input.value.length ===0) return;
   


  let liElement = document.createElement('li');
  liElement.textContent=input.value;


  let btnDel = document.createElement('a');
  btnDel.textContent='[Delete]';
  btnDel.href = '#';
  btnDel.addEventListener('click', (ev)=>{
  
    ev.target.parentNode.remove()
  });

  liElement.appendChild(btnDel);
  document.getElementById('items').appendChild(liElement);
}


