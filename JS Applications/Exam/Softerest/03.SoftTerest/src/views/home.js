import { html } from '../../node_modules/lit-html/lit-html.js'
// import { getAllItems } from "../api/data.js"
// import {createTemplateItem} from "../views/common/item.js"



const homeTemplate = () => html`

<div class="container home wrapper  my-md-5 pl-md-5">
        <div class="d-md-flex flex-md-equal ">
            <div class="col-md-5">
                <img class="responsive" src="./images/01.svg" />
            </div>
            <div class="home-text col-md-7">
                <h2 class="featurette-heading">Do you wonder if your idea is good?</h2>
                <p class="lead">Join our family =)</p>
                <p class="lead">Post your ideas!</p>
                <p class="lead">Find what other people think!</p>
                <p class="lead">Comment on other people's ideas.</p>
            </div>
        </div>
        <div class="bottom text-center">
            <a class="btn btn-secondary btn-lg " href="/catalog">Get Started</a>
        </div>
    </div>

`;

export async function homePage(ctx) {
    ctx.setColorActiveBtn('home');


    //mojno tyt ne delat, a v app.js -> gustUserOnly()
    //esli user Login to ne davat vhod na home, a redirect v catalog
    
    // const token = sessionStorage.getItem('authToken');
    // if(token!=null){
    //     //obyazatelno FETURN ,inache poudet next line ctx.render
    //     return ctx.page.redirect('/catalog');
    // }

    ctx.render(homeTemplate());
}