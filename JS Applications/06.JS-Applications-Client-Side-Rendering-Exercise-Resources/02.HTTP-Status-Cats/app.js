import { html, render } from "../node_modules/lit-html/lit-html.js"
import { styleMap } from "../node_modules/lit-html/directives/style-map.js"
import { cats } from "./catSeeder.js"

const catCardTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn"> ${cat.info ? "Hide": "Show"} status code</button>
       <!-- <div class="status" style="display: none" id="${cat.id}">-->
       <div class="status" style=${styleMap(cat.info ? {} : {display:"none"})} id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>
`;
cats.forEach(c=>c.info=false);
update();

function update(){
const catUL = html`
    <ul @click=${toggleInfo}>${ cats.map(catCardTemplate)}</ul>
    `;
const section = document.getElementById('allCats');
render(catUL, section);
}
//предимството е, че при необходимост на ре-рендинг няма да се обновят състоянията на отворините инфота -те ще си останат отворени - в другото решение, ще се обновят всички
 function toggleInfo(ev){
      const catId = ev.target.parentNode.querySelector('.status').id;
    const currentCat = cats.find(c=>c.id==catId);
  currentCat.info = !currentCat.info;
  update();
  
  //ev.target.textContent =  ev.target.textContent=="Show status code" ? "Hide status code" : "Show status code";
  // const info = ev.target.parentNode.querySelector('.status');
  // info.style.display = info.style.display=='block' ? "none" : "block";
 }
