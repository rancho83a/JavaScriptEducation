import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyTeams } from "../api/data.js"
import { until } from "../../node_modules/lit-html/directives/until.js"
import { loaderTemplate } from "./commom/loader.js";
import { createItem } from "./commom/teamTemplate.js";

const myTeamsTemplate = (list) => html`
 <section id="my-teams">

                <article class="pad-med">
                    <h1>My Teams</h1>
                </article>

                ${list.length==0 ? html`
                <article class="layout narrow">
                    <div class="pad-med">
                        <p>You are not a member of any team yet.</p>
                        <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                            team.</p>
                    </div>
                    <div class=""><a href="/create" class="action cta">Create Team</a></div>
                </article>
            </section>`:""}

            ${list.map(createItem)} `;


export async function myTeamsPage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');

    ctx.render(until(populateTemplate(),loaderTemplate()) );
}
async function populateTemplate() {
    const list = await getMyTeams();
    return myTeamsTemplate(list)
}