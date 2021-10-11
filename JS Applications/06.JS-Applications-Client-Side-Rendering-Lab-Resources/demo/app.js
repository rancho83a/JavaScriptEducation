import { renderTemplate } from "./engine.js"
async function start(){
    const article = await (await  fetch('./article.json')).json();
    const articleTemplate = await  (await fetch("./article.html")).text();

    const main = document.querySelector('main');
    main.innerHTML = article.map(article=> renderTemplate(articleTemplate, article)).join("");


   // document.querySelector('main').innerHTML= article.map(createArticle).join('');
}
start();