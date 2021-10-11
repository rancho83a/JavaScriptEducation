import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAllItems } from "../api/data.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { loaderTemplate } from "./commom/loader.js";
import { createItem } from "./commom/teamTemplate.js";

const browseTemplate = (list) => html`
<section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>
    ${list.map(createItem)}
</section>
`;


export async function browsePage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');

    ctx.render(until(populateTemplate(),loaderTemplate()) );
}
async function populateTemplate() {
    const list = await getAllItems();
    return browseTemplate(list)
}