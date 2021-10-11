function actionController() {
    document.getElementById('logoutBtn').addEventListener('click', logOut);
    document.getElementById('catalogBtn').addEventListener('click', loadCatalog);
    document.getElementById('buyBtn').addEventListener('click', buy);
    document.getElementById('orderBtn').addEventListener('click', allOrders);
    document.getElementById('createForm').addEventListener('submit', create);
    //document.querySelector(".orders").style.display='none';
    loadCatalog();
}
actionController();
async function allOrders() {
    const ownerId = sessionStorage.getItem("_ownerId");
    console.log(ownerId);
    const url = `http://localhost:3030/data/orders?where=_ownerId%3D"${ownerId}"`;

    const orders = await request(url);
    let res = { totalPrice: 0, names: [] };

    orders.forEach(o => {
        res.totalPrice += Number(o.price);
        res.names.push(o.name)
    });

    document.getElementById('orderedNames').textContent=`${res.names.join(', ')}`
    document.getElementById('totalPrice').textContent=`${res.totalPrice} $`
}

async function buy() {
    const token = sessionStorage.getItem('userToken');
    const checkedBoxes = [...document.querySelectorAll('[type="checkbox"]')].filter(b => b.checked);

    checkedBoxes.forEach(async b => {

        const id = b.parentNode.parentNode.dataset.id;
        const furniture = await request('http://localhost:3030/data/furniture/' + id);

        await request('http://localhost:3030/data/orders', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify({ name: furniture.name, price: furniture.price })
        });
    });
    checkedBoxes.forEach(b=>b.checked=false);

}

async function loadCatalog() {
    const data = await request("http://localhost:3030/data/furniture");

    if(data)
    const tbody = document.querySelector('tbody');
 
    const content = data.map(renderRow).join('');

    tbody.innerHTML = content  //+hardCoded();
    console.log(tbody.innerHTML);
}
function renderRow(info) {
    return `
    <tr data-id="${info._id}">
    <td>
        <img
            src="${info.img}">
    </td>
    <td>
        <p>${info.name}</p>
    </td>
    <td>
        <p>${info.price}</p>
    </td>
    <td>
        <p>${info.factor}</p>
    </td>
    <td>
        <input type="checkbox"/>
    </td>
</tr>`;
}

async function create(ev) {
    ev.preventDefault();

    const dataForm = new FormData(ev.target);
    const name = dataForm.get('name');
    const price = dataForm.get('price');
    const factor = dataForm.get('factor');
    const img = dataForm.get('img');
    validation({ name, price, factor, img });
    const token = sessionStorage.getItem('userToken')
    const data = await request('http://localhost:3030/data/furniture', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ name, price, factor, img })
    })
    loadCatalog();
    ev.target.reset();
}

function validation({ name, price, factor, img }) {
    if (!name || !price || !factor) {
        alert('required all fields');
        throw new Error('required name, price,factor fields')
    }


    if (Number(price) <= 0 || isNaN(price) || isNaN(factor) || Number(factor) <= 0) {
        alert('The price and factor must be >0');
        throw new Error('The price must be>0')
    }
}

function logOut() {
    const token = sessionStorage.getItem('userToken');
    const url = 'http://localhost:3030/users/logout';

    request(url, {
        method: 'get',
        headers: { 'X-Authorization': token }
    });

    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('_ownerId');

    window.location.pathname = "06.Furniture/login.html"
}

async function request(url, option) {
    const response = await fetch(url, option);

    if (response.status == 404) {
        return [];
    }
    if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        throw new Error(err.message);
    }
    return await response.json();
}

// function hardCoded(){
//     return `<tr>
//     <td>
//         <img
//             src="https://www.lidl-shop.nl/media/fcf868f9526b38d0b0a43cc2ace72b80.jpeg">
//     </td>
//     <td>
//         <p>Office chair</p>
//     </td>
//     <td>
//         <p>160</p>
//     </td>
//     <td>
//         <p>0.5</p>
//     </td>
//     <td>
//         <input type="checkbox"/>
//     </td>
// </tr>
// <tr>
//     <td>
//         <img
//             src="https://res.cloudinary.com/maisonsdumonde/image/upload/q_auto,f_auto/w_200/img/grey-3-seater-sofa-bed-200-13-0-175521_9.jpg">
//     </td>
//     <td>
//         <p>Sofa</p>
//     </td>
//     <td>
//         <p>259</p>
//     </td>
//     <td>
//         <p>1.2</p>
//     </td>
//     <td>
//         <input type="checkbox"/>
//     </td>
// </tr>`
// }