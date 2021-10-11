import { html, render } from "../node_modules/lit-html/lit-html.js"
import { styleMap } from "../node_modules/lit-html/directives/style-map.js";

const template = () => html`

<ul>
<slot></slot>
</ul>

`;

class ExpandingList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        render(template(), this.shadowRoot, { eventContext: this });
    }
}

window.customElements.define('x-ul',ExpandingList);