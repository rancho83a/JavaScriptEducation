function solve() {
  let textAreas = document.querySelectorAll('textarea');

  let btns = document.querySelectorAll('button');
  btns[0].addEventListener('click', generate);

  function generate(ev) {
    arr = JSON.parse(textAreas[0].value);
    let tbody = document.querySelector('tbody');

    document.querySelector('input').disabled = false;

    function createItem(type,content,attribute,attrType){
      let item = document.createElement(type);
      item.textContent = content;
      if(attribute){
        item.setAttribute(attribute,attrType)
      }
      let td = document.createElement('td');
      td.appendChild(item);
      return td;
    }


    arr.forEach(row => {
      let tr = document.createElement('tr');
      tr.appendChild(createItem('img','','src',row.img));
      tr.appendChild(createItem('p',row.name));
      tr.appendChild(createItem('p',row.price))
      tr.appendChild(createItem('p',row.decFactor))
      tr.appendChild(createItem('input','','type','checkbox'));
      tbody.appendChild(tr);
    });

    btns[1].addEventListener('click', result);

    result = {
      furniture:[],
      price:0,
      avg:0
    }

    function result(ev) {

      const bougth = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))

      for (input of bougth) {
        let row = input.parentNode.parentNode;
        let item = row.children[1].firstElementChild.textContent;
        result.furniture.push(item);
        let iPrice = row.children[2].firstElementChild.textContent;
        result.price+=Number(iPrice);
        let iAvg=row.children[3].firstElementChild.textContent;
        result.avg+=Number(iAvg);
      }
      textAreas[1].value = 
                          `Bought furniture: ${result.furniture.join(', ')}\nTotal price: ${result.price.toFixed(2)}\nAverage decoration factor: ${result.avg/bougth.length}`;
    }
  }
}