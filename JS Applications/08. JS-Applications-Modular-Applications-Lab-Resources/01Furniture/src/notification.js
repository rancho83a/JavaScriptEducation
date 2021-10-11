import {html,render} from "../node_modules/lit-html/lit-html.js"

const notificationTemplate = (msg,clear)=> html`
<section id = "notification" @click=${clear}> ${msg}
<span style="margin-left:32px">\u2716</span>
</section>
`;

const container = document.createElement('div');


document.body.appendChild(container);

export function notify(msg){
    render(notificationTemplate(msg,clear), container);
    setTimeout(clear,3000);
}

export function clear(){
    render("", container);
}