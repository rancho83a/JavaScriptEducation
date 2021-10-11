import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyItems } from "../api/data.js"


const createItem = (item)=>
     html`
      <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">${item.title}</p>
            </div>
            <img class="card-image" src="${item.img}" alt="Card image cap">
            <a class="btn" href="/details/${item._id}">Details</a>
        </div>

`;
const myItemsTemplate = (list) => html`
<div id="dashboard-holder">
  ${list.length>0 ? list.map(createItem) : html`     </div>
        <h1>No ideas yet! Be the first one :)</h1>
    </div>`}
`;


export async function myPage(ctx) {
    ctx.setColorActiveBtn('profile');

    //если сервер медленний -то можно     ctx.render(<p>Loading...) || lit-html have specific function - next lecture;
    //console.log('dashboard Page');
    const list = await getMyItems();
   console.log(list);
   
    ctx.render(myItemsTemplate(list));
}


