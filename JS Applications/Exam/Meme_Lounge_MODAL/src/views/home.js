import { html } from '../../node_modules/lit-html/lit-html.js'
// import { getAllItems } from "../api/data.js"
// import {createTemplateItem} from "../views/common/item.js"


const homeTemplate = () => html`
 <section id="welcome">
            <div id="welcome-container">
                <h1>Welcome To Meme Lounge</h1>
                <img src="/images/welcome-meme.jpg" alt="meme">
                <h2>Login to see our memes right away!</h2>
                <div id="button-div">
                    <a href="/login" class="button">Login</a>
                    <a href="/register" class="button">Register</a>
                </div>
            </div>
        </section>

`;

export async function homePage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');


    //mojno tyt ne delat, a v app.js -> gustUserOnly()
    //esli user Login to ne davat vhod na home, a redirect v catalog
    
    // const token = sessionStorage.getItem('authToken');
    // if(token!=null){
    //     //obyazatelno FETURN ,inache poudet next line ctx.render
    //     return ctx.page.redirect('/catalog');
    // }

    ctx.render(homeTemplate());
}