import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from "../api/data.js"



function createItem(item){
    return html`<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>
`;
}
const catalogTemplate = (list) => html`

<section id="meme-feed">
                <h1>All Memes</h1>
                <div id="memes">
                    ${list.length>0 ? list.map(createItem) : html`<p class="no-memes">No memes in database.</p>`}
                    <!-- Display : All memes in database ( If any ) -->
                    
                    <!-- Display : If there are no memes in database -->
                    
                </div>
            </section>
`;

export async function catalogPage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');

    //если сервер медленний -то можно     ctx.render(<p>Loading...) || lit-html have specific function - next lecture;
    //console.log('dashboard Page');
    const list = await getAllItems();
    //console.log(list);
    ctx.render(catalogTemplate(list));
}