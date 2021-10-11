import { html, render } from "../node_modules/lit-html/lit-html.js"
const input = document.getElementById('searchField');
const tbody = document.querySelector('tbody');
load();


async function load() {
   document.querySelector('#searchBtn').addEventListener('click', () => update(info, input.value));
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const info = Object.values(data);
   update(info);
}

function update(info, match="") {
   const result = info.map(i => rowTemplate(i, compare(i,match)));
   render(result, tbody);
   input.value="";
}

function compare(data,match){
   return match && Object.values(data).splice(0, 4).some(x => x.toLowerCase().includes(match.toLowerCase()));
}

const rowTemplate = (data, select) => html`
<tr class= ${select ?   "select" : ""}   >
   <td>${data.firstName} ${data.lastName}</td>
   <td>${data.email}</td>
   <td>${data.course}</td>
</tr>
`;
//${console.log(Object.values(data).splice(0,4))}
  // ${console.log(Object.values(data).splice(0,3).find(x=> x.toLowerCase().includes(match.toLowerCase())))}

