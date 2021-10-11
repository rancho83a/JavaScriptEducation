import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from "../api/data.js"
import {createTemplateItem} from "../views/common/item.js"


const dashboardTemplate = (list) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${list.map(createTemplateItem)};
</div>
`;

export async function dashboardPage(ctx) {
    ctx.setColorActiveBtn('catalogLink');

    //если сервер медленний -то можно     ctx.render(<p>Loading...) || lit-html have specific function - next lecture;
    //console.log('dashboard Page');
    const list = await getAllItems();
    //console.log(list);
    ctx.render(dashboardTemplate(list));
}