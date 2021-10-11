import { html } from '../../node_modules/lit-html/lit-html.js'
import { getHomeInfo } from '../api/data.js';
// import { getAllItems } from "../api/data.js"
// import {createTemplateItem} from "../views/common/item.js"

const homeTemplate = (arr) => html`
 <section id="home-page" class="content">
            <h1>Recent Articles</h1>
            <section class="recent js">
                <h2>JavaScript</h2>

                ${ arr[0] ?   
                    html`
                    <article>
                    <h3>${arr[0].title}</h3>
                    <p>${arr[0].content}</p>
                    <a href="/details/${arr[0]._id}" class="btn details-btn">Details</a>
                </article>`
                    
                    : html`                <h3 class="no-articles">No articles yet</h3>`
                    }                
            </section>
            <section class="recent csharp">
                <h2>C#</h2>
                ${ arr[1] ?   
                    html`
                    <article>
                    <h3>${arr[1].title}</h3>
                    <p>${arr[1].content}</p>
                    <a href="/details/${arr[1]._id}" class="btn details-btn">Details</a>
                </article>`
                    
                    : html`                <h3 class="no-articles">No articles yet</h3>`
                    }                
            </section>
            <section class="recent java">
                <h2>Java</h2>
                ${ arr[2] ?   
                    html`
                    <article>
                    <h3>${arr[2].title}</h3>
                    <p>${arr[2].content}</p>
                    <a href="/details/${arr[2]._id}" class="btn details-btn">Details</a>
                </article>`
                    
                    : html`                <h3 class="no-articles">No articles yet</h3>`
                    }                
            </section>
            <section class="recent python">
                <h2>Python</h2>
                ${ arr[3] ?   
                    html`
                    <article>
                    <h3>${arr[3].title}</h3>
                    <p>${arr[3].content}</p>
                    <a href="/details/${arr[3]._id}" class="btn details-btn">Details</a>
                </article>`
                    
                    : html`                <h3 class="no-articles">No articles yet</h3>`
                    }                
            </section>


`;

export async function homePage(ctx) {
    //ctx.setColorActiveBtn('catalogLink');


   
    const list = await getHomeInfo();
    //console.log(list);
    let javaScript = list.find(c=> c.category=="JavaScript");
    let c = list.find(c=> c.category=="C#");
    let java = list.find(c=> c.category=="Java");
    let python = list.find(c=> c.category=="Python");

    let arr = [javaScript,c,java,python]
    //console.log(arr);


   ctx.render(homeTemplate(arr));
}