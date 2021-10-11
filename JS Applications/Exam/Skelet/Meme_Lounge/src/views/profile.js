import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyItems } from "../api/data.js"


const createTemplateItemExp = (item)=> html`
  <div class="user-meme">
                        <p class="user-meme-title">${item.title}</p>
                        <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
                        <a class="button" href="/details/${item._id}">Details</a>
                    </div>

`;

const createTemplateItem = (item)=> html`

`;
const myItemsTemplateExp = (list, userInfo) => html`
<section id="user-profile-page" class="user-profile">
                <article class="user-info">
                    <img id="user-avatar-url" alt="user-profile" 
                    src= ${userInfo.gender =='male' ? "/images/male.png" : "/images/female.png"}/>
                    <div class="user-content">
                        <p>Username: ${userInfo.username}</p>
                        <p>Email: ${userInfo.email}</p>
                        <p>My memes count: ${list.length}</p>
                    </div>
                </article>
                <h1 id="user-listings-title">User Memes</h1>
                <div class="user-meme-listings">
                    ${list.length==0  ? html`<p class="no-memes">No memes in database.</p>`
                                     :     list.map(createTemplateItem)}
                </div>
            </section>
            `;

const myItemsTemplate = (list, userInfo) => html`

            `;


export async function myPage(ctx) {
   // ctx.setColorActiveBtn('profileLink');

    //если сервер медленний -то можно     ctx.render(<p>Loading...) || lit-html have specific function - next lecture;
    //console.log('dashboard Page');
    const list = await getMyItems();
    //console.log(list);
    let userInfo={};
    userInfo.username = sessionStorage.getItem('username');
    userInfo.gender = sessionStorage.getItem('userGender');
    userInfo.email = sessionStorage.getItem('email');
    ctx.render(myItemsTemplate(list, userInfo));
}


