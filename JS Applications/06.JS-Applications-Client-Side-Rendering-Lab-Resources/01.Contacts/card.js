import {html} from "./node_modules/lit-html/lit-html.js";

const cardTemplate = (data)=> html`
 <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>${data.name}</h2>
                <button @click=${onclick}class="detailsBtn">Details</button>
                <div class="details" id="${data.id}">
                    <p>Phone number: ${data.phoneNumber}</p>
                    <p>Email: ${data.email}</p>
                </div>
            </div>
        </div>
`;

function onclick(ev){
    const details = ev.target.parentNode.querySelector('div .details');
    details.style.display=  details.style.display =='block' ? "none" : "block";

}

export default cardTemplate;