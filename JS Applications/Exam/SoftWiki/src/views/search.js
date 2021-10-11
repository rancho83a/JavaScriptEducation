import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchByTitle } from "../api/data.js"
//import { createItem } from "../views/common/item.js"


const searchTemplateExp = (list, onsearch, year) => html`

<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year
            || '' }>
        <button @click=${onsearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        ${list.length > 0 ? list.map(createItem) : html`<p class="no-cars"> No results.</p>`}

    </div>

</section>
            
`;

const createItem = (item) => html`
<a class="article-preview" href="/details/${item._id}">
    <article>
        <h3>Topic: <span>${item.title}</span></h3>
        <p>Category: <span>${item.category}</span></p>
    </article>
</a>

`;


const searchTemplate = (list, onsearch, title) => html`
<!-- Search  -->
<section id="search-page" class="content">
    <h1>Search</h1>
    <form @submit=${onsearch} id="search-form">
        <p class="field search">
            <input id="search-input" type="text" placeholder="Search by article title" name="search" .value=${title
         || '' }>
        </p>
        <p class="field submit">
            <input class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">

        ${list.length > 0 ? list.map(createItem) : html`<h3 class="no-articles">No matching articles</h3>`}




    </div>
</section>
`;


export async function searchPageExp(ctx) {
    const title = ctx.querystring.split("=")[1];//
    console.log(title)

    const arts = await searchByTitle(title);
    console.log(arts);

    ctx.render(searchTemplate(arts, onClick, title));


    async function onClick(ev) {
        ev.preventDefault();
        //     const formData= new FormData(ev.target);
        //     const query = formData.get('serach');
        //    // const query =document.getElementById('search-input').value;
        //     ctx.page.redirect('/search?query=' + query);
        const query = document.getElementById('search-input').value.toLowerCase();
        if (query != '') {
            ctx.page.redirect('/search?query=' + query);
        } else {
            alert('Please fill search field');
        }

    }
}

export async function searchPage(ctx) {


    ctx.render(searchTemplate([], onClick, ''));

    async function onClick(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const query = formData.get('search');
        const arts = await searchByTitle(query);

        console.log(arts);

        ctx.render(searchTemplate(arts, onClick, query));
        
    }



}



    // console.log(arts);

    // ctx.render(searchTemplate(arts, onClick, title));


    // async function onClick(ev) {
    //     ev.preventDefault();
    //     //     
    //     //     ctx.page.redirect('/search?query=' + query);
    //     if (query != '') {
    //         ctx.page.redirect('/search?query=' + query);
    //     } else {
    //         alert('Please fill search field');
    //     }

