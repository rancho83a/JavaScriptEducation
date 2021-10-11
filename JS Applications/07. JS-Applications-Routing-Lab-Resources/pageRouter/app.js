import page from "//unpkg.com/page/page.mjs";
const pages = {
    '/home': '<h2>Home Page</h2> <p>Home page Content</p>',
    '/catalog': '<h2>Catalog Page</h2> <p>List of recipes <a href="/catalog/action/123"> click<a/></p>',
    '/catalog/123': '<h2>Item 123</h2> <p>Item details</p>',
    '/about': '<h2>About</h2> <p>Contact info </p>',
    '/buy': '<h2>BOUGHT PRODUCT</h2>'
};
const defaultPage = '<h2>404</h2> <p>PAge not found</p>';

const main = document.querySelector('main');

page('/home', updateContent);
page('/catalog', updateContent);
page('/catalog/:category/:id', itemDetails);
page('/about', updateContent);
page('/buy', updateContent);
page.redirect('/', '/home')
page.start();

function updateContent(context) {
    console.log(context)
    main.innerHTML = pages[context.pathname] || defaultPage;
}

function itemDetails(context) {
    const id = context.params.id;
    const category = context.params.category;
    const html = `<h2>Category ${category}</h2> 
    <h3>Item ${id}:<h2>    
    <p> Details for ${id} </p>`;
    main.innerHTML = html;

    const btn = document.createElement('button');
    btn.textContent = "Buy";
    main.appendChild(btn);
    btn.addEventListener('click', () => {
        context.page.redirect('/buy');
    });
}