import { html, render } from "../node_modules/lit-html/lit-html.js"
const listTemplate = (data) => html`
<ul>
    ${data.map(t => html`<li>${t}</li>`)}
</ul>`;

document.getElementById("btnLoadTowns").addEventListener('click', updateList);

function updateList(ev) {
    //parse input

    ev.preventDefault();
    const townsString = document.querySelector('#towns').value
    if(!townsString){
        return alert("Please put some towns")
    }
    const towns=townsString.split(',').map(x=>x.trim());
    
    const result = listTemplate(towns);
    
    const root = document.getElementById('root');
    render(result, root);
}

