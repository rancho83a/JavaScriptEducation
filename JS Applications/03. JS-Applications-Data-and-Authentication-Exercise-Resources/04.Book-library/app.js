function start() {
    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    const createForm = document.getElementById('createForm');
    createForm.addEventListener('submit', createBook);

    document.getElementById('editForm').style.display = 'none';
    document.querySelector('table').addEventListener('click', handleEditDelete);
    getAllBooks();
}
start();

async function getAllBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books'
    const data = await request(url);
    console.log(data);
    console.log(Object.entries(data));
    const renderedBook = Object.entries(data).map(renderBook).join('');
    document.querySelector('tbody').innerHTML = renderedBook;
}

async function createBook(ev) {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const title = data.get('title');
    const author = data.get('author');

    request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title })
    })
    ev.target.reset();
    getAllBooks();
}

async function handleEditDelete(ev) {
    if (ev.target.className == "editBtn") {
        document.querySelector('form').style.display = 'none';
        const editForm=document.getElementById('editForm');
        editForm.style.display = 'block';     

        const _id = ev.target.parentNode.parentNode.dataset.id;
        const book = await loadBookForEdit(_id);
        document.querySelector('#editForm [name="title"]').value = book.title;
        document.querySelector('#editForm [name="author"]').value = book.author;
        document.querySelector('#editForm [name="id"]').value = _id;

        editForm.addEventListener('submit', editBook);
        
        document.getElementById('cancel').addEventListener('click', ()=>{
            document.querySelector('form').style.display = 'block';
            document.getElementById('editForm').style.display = 'none';
        });


    } else if (ev.target.className == "deleteBtn") {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const _id = ev.target.parentNode.parentNode.dataset.id;
            await request('http://localhost:3030/jsonstore/collections/books/' + _id, {
                method: 'delete'
            })
            getAllBooks();
        }
    }
}

async function editBook(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const _id = formData.get('id');

    await request('http://localhost:3030/jsonstore/collections/books/' + _id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title })
    });

    document.querySelector('form').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    ev.target.reset();
    getAllBooks();
}

async function loadBookForEdit(id) {
    return await request('http://localhost:3030/jsonstore/collections/books/' + id)
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

function renderBook([id, book]) {
    return `<tr data-id = ${id}>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                        <td>
                                <button class ="editBtn">Edit</button>
                                <button class ="deleteBtn">Delete</button>
                        </td>
                 </tr>`
}