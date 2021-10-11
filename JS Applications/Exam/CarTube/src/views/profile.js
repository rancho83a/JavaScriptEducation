import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyItems } from "../api/data.js"

import {createItem} from "../views/common/item.js"

// const createTemplateItem = (item)=> html`
//                 <div class="listing">
//     <div class="preview">
//         <img src=${item.imageUrl}>
//     </div>
//     <h2>${item.brand} ${item.model}</h2>
//     <div class="info">
//         <div class="data-info">
//             <h3>Year: ${item.year}</h3>
//             <h3>Price: ${item.price} $</h3>
//         </div>
//         <div class="data-buttons">
//             <a href="/details/${item._id}" class="button-carDetails">Details</a>
//         </div>
//     </div>
// </div>
// `;

const myItemsTemplate = (list) => html`
 <!-- My Listings Page -->
 <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">

                <!-- Display all records -->
                  ${list.length==0  ? html` <p class="no-cars"> You haven't listed any cars yet.</p>`  :     list.map(createItem)}


                <!-- Display if there are no records -->
               
            </div>
        </section>
            `;

            //  ${list.length==0  ? html`<p class="no-memes">No memes in database.</p>`  :     list.map(createTemplateItem)}

export async function myPage(ctx) {
   // ctx.setColorActiveBtn('profileLink');

    //если сервер медленний -то можно     ctx.render(<p>Loading...) || lit-html have specific function - next lecture;
    //console.log('dashboard Page');
    const list = await getMyItems();
    //console.log(list);
    // let userInfo={};
    // userInfo.username = sessionStorage.getItem('username');
    // userInfo.gender = sessionStorage.getItem('userGender');
    // userInfo.email = sessionStorage.getItem('email');
    ctx.render(myItemsTemplate(list));
}


