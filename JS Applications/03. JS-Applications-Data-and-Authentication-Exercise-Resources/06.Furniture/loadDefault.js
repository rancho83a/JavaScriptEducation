async function loadCatalog() {

    const data = await request("http://localhost:3030/data/furniture");
    console.log(data);

    const tbody = document.querySelector('tbody');

    const content = data.map(renderRow).join('');

    tbody.innerHTML = content  //+hardCoded();   
}
loadCatalog();
function renderRow(info) {
    return `<tr data-id="${info._id}">
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
</tr>`
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