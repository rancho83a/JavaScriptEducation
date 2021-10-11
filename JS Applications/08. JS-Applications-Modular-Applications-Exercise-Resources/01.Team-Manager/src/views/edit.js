import { getItemById, editItem } from "../api/data.js"
import { html } from "../../node_modules/lit-html/lit-html.js"
import { loaderTemplate } from "./commom/loader.js";
import {until} from "../../node_modules/lit-html/directives/until.js"


const editTemplate = (item, onsubmit, errMsg) => html`
            <section id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form @submit=${onsubmit} id="edit-form" class="main-form pad-large">
                       ${errMsg ?  html`<div class="error">${errMsg}</div>` : ""}
                        <label>Team name: <input type="text" name="name" .value = ${item.name}></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value = ${item.logoUrl}></label>
                        <label>Description: <textarea name="description" .value = ${item.description }></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>

`;

export async function editPage(ctx) {
   // ctx.setColorActiveBtn();
    //console.log('edit Page', ctx.params.id);
    const id = ctx.params.id;   
    ctx.render(until(populateTemplate(), loaderTemplate()));

    async function populateTemplate(){
        const item = await getItemById(id);
        return editTemplate(item, onsubmit);


        async function onsubmit(ev) {
            ev.preventDefault();    
    const formData = new FormData(ev.target);
    const name = formData.get('name');
    const logoUrl = formData.get('logoUrl');
    const description = formData.get('description');
    
    [...ev.target.querySelectorAll('input')].forEach(e=>e.disabled=true);
    
    try {
        if(name.length<4){
            throw new Error ("Team name field must be at least 4 symbols long");
        }
        if(!logoUrl){
            throw new Error ("Logo  is required");
        }
        if(description.length<10){
            throw new Error ("Description field must be at least 10 symbols long");
        }
        const data = {name,logoUrl,description};
    
        const item = await editItem(id, data);
        ev.target.reset(); 
        ctx.page.redirect('/details/' + item._id);
    
    } catch (err){
    
        ctx.render(editTemplate(item, onsubmit,err.message))    
    
    } finally {
        [...ev.target.querySelectorAll('input')].forEach(e=>e.disabled=false);
    }      
    
        }
    }

   
}