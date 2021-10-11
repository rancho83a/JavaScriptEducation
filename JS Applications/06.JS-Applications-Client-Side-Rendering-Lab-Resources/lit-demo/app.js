import { html, render } from 'https://unpkg.com/lit-html?module';
import createArticle from "./article.js"

const articleTemplate = (article) => html`

<article>
    <header>
        <h3>${article.title}</h3>
        <h4>
            Clicked: ${article.counter}
        </h4>
    </header>
    <div clas=${article.className}>
        <p>
            ${article.content}
        </p>
    </div>
    <footer>
        Author: ${article.author}
        <button @click=${()=> alert('clicked')}>EDIT</button>
    
    </footer>
</article>
`;
async function start() {
    const articles = await (await fetch('./article.json')).json();
   
    const main = document.querySelector('main');

    document.getElementById('btn').addEventListener('click', onclick);


    function onclick() {
        
        render(articles.map(articleTemplate), main);

    }
}
start();