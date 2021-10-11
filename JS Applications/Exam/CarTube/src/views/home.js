import { html } from '../../node_modules/lit-html/lit-html.js'
import { styleMap } from "../../node_modules/lit-html/directives/style-map.js";
import {classMap } from "../../node_modules/lit-html/directives/class-map.js"

// import { getAllItems } from "../api/data.js"
// import {createTemplateItem} from "../views/common/item.js"


// const homeTemplate = () => html`

//   <section id="main">
//             <div id="welcome-container">
//                 <h1>Welcome To Car Tube</h1>
//                 <img class="hero" src="/images/car-png.webp" alt="carIntro">
//                 <h2>To see all the listings click the link below:</h2>
//                 <div>
//                     <a href="/catalog" class="button" style= ${styleMap({
           

//                         backgroundColor:    sessionStorage.userId ? "red" : "blue"
                        
                        
//                         })}>Listings</a>
//                 </div>
//             </div>
//         </section>

// `;


const homeTemplate = () => html`



  <section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/catalog" class = ${classMap({
           

                        button: sessionStorage.userId ? true : false,
                        buttonClazzMap: sessionStorage.userId ? false : true
                        
                        
                    })}>Listings</a>
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