import { html } from "../../../node_modules/lit-html/lit-html.js"


export const createTemplateItem = (item)=> html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <!-- через рутер при нажатии на кнопку перейдем в детали (раньше делали через ид и евентЛистенер и делегирование-->
                    <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
    `;
