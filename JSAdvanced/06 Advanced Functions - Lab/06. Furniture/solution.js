function solve() {
  [generataBtn, outputBtn] = [...document.querySelectorAll('button')];
  let tbody = document.querySelector('tbody');

  let furniture = [];

  generataBtn.addEventListener('click', () => {
    let furnitureArray = JSON.parse(document.querySelector('textarea').value);
    tbody.innerHTML = '';

    furnitureArray.forEach(row => {
      let item = createRow(row);
      furniture.push(item);
      tbody.appendChild(item.element);
    });
  })

outputBtn.addEventListener('click', () => {
  furniture.forEach(f => console.log(f.getValues().name,f.isChecked()));
})


const td = createEl.bind(null,'td');

  function createRow(row) {
    let img = createEl('img');
    img.src = row.img;

    let checkbox = createEl('input');
    checkbox.type = 'checkbox';

    const element =  createEl('tr',
      td( img),
      td( createEl('p',row.name)),
      td( createEl('p',row.price)),
      td( createEl('p',row.decFactor)),
      td(checkbox));

      return {element, isChecked, getValues}
  

  function isChecked(){
    return checkbox.checked;
  }

  function getValues(){
    return row;
  }

}

  function createEl(type, ...content) {
    let result = document.createElement(type);

    content.forEach(e => {
      if (typeof (e) == 'string') {
        const node = document.createTextNode(e);
        result.appendChild(node);
      } else {
        result.appendChild(e);
      }
    });
    return result;
}
}
