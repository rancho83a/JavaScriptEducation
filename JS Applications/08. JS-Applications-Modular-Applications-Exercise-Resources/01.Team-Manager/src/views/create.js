
import { createItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"

const createTemplate = (onSubmit, errMsg) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${errMsg ? html`<div class="error">${errMsg}</div>` : ""}
            <label>Team name: <input type="text" name="name" id="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl" id="logo"></label>
            <label>Description: <textarea name="description" id="desc"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>
`;

export async function createPage(ctx) {
    //console.log('edit Page', ctx.params.id);

    ctx.render(createTemplate(onSubmit));
    // ctx.setColorActiveBtn('createLink');

    async function onSubmit(ev) {
        ev.preventDefault();

        [...ev.target.querySelectorAll('input')].forEach(e =>e.disabled=true );

        let errorList = [];
        const name = document.getElementById('name').value.trim();

        if (!name && name.length < 4) {
            errorList.push("Team name field must be at least 4 symbols long")
        }

        const logoUrl = document.getElementById('logo').value.trim();

        if (!logoUrl) {
            errorList.push("Logo  is required")
        }
        const description = document.getElementById('desc').value.trim();

        if (!description || description.length < 10) {
            errorList.push("Description field must be at least 10 symbols long")
        }

        if (errorList.length > 0) {
           [...ev.target.querySelectorAll('input')].forEach(e =>e.disabled=false );
            return ctx.render(createTemplate(onSubmit, errorList.join('\n')));
        }

       // ctx.render(createTemplate(onSubmit));


        const data = { name, logoUrl, description }
        const team = await createItem(data);
        //TODO add creator as member and aprove request
        [...ev.target.querySelectorAll('input')].forEach(e =>e.disabled=false );
        ev.target.reset();
        ctx.page.redirect('/details/' + team._id);

    }
}
