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
    const [articleData] = await (await fetch('./article.json')).json();
    articleData.counter = 0;
    articleData.className = "article-content1"
    const main = document.querySelector('main');
    const main2 = document.querySelector('#content2');

    document.getElementById('btn').addEventListener('click', onclick);


    function onclick() {
        articleData.counter++;
        const article = articleTemplate(articleData);
        const article2 = createArticle(articleData);
        render(article, main);
        main2.innerHTML = article2;

    }
}
start();