import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from "../api/data.js"



const createItem = (item)=>html`
<a class="article-preview" href="/details/${item._id}">
<article>
    <h3>Topic: <span>${item.title}</span></h3>
    <p>Category: <span>${item.category}</span></p>
</article>
</a>
`;
const catalogTemplate = (list) => html`
 <!-- catalogue -->
 <section id="catalog-page" class="content catalogue">
            <h1>All Articles</h1>

             ${list.length>0 ? list.map(createItem) : html`<h3 class="no-articles">No articles yet</h3>`}

        </section>


`;


export async function catalogPage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');

    const list = await getAllItems();
    //console.log(list);
    ctx.render(catalogTemplate(list));
}