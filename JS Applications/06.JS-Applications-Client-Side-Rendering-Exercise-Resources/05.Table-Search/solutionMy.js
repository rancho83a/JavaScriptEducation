import {html, render } from "../node_modules/lit-html/lit-html.js"
function solve() {
   load();
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   async function onClick() {
      const match = document.getElementById('searchField').value;
      load( match)
   }
}
solve();

async function load(match='') {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const info = Object.values(data);
   update(info,match);
}

function update(info,match) {
   const tbody = document.querySelector('tbody');
   render(info.map(i=> rowTemplate(i, match)), tbody);
}


const rowTemplate = (data, match) => html`
<tr   class =  ${(match && Object.values(data).splice(0,4).some(x=> x.toLowerCase().includes(match.toLowerCase()))) ? "select" : ""}
>
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>
`;
//${console.log(Object.values(data).splice(0,4))}
  // ${console.log(Object.values(data).splice(0,3).find(x=> x.toLowerCase().includes(match.toLowerCase())))}

