//@ts-check
const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');
const mockData = require("./mock-data.json");

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}


let browser;
let context;
let page;

describe('E2E tests', function () {
    this.timeout(5000);

    before(async () => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Catalog', () => {
        it('loads and displays recepies', async () => {
            await page.route('**/data/recipes*', (request) => request.fulfill(json(mockData.list)));

            //await page.goto("http://127.0.0.1:5500/index.html");
            await page.goto("http://localhost:3000");
            await page.waitForSelector('article');
            const titles = await page.$$eval('h2', titles => titles.map(t => t.textContent));
            assert.include(titles[0], "Easy Lasagna")
            assert.equal(titles[0], "Easy Lasagna")
            assert.include(titles[1], "Grilled Duck Fillet")
            assert.include(titles[2], "Roast Trout")
        })
    });

    describe('Authentication', () => {

        it('register', async () => {
            await page.route('**/users/register*', route => route.fulfill(json({ _id: '001', email, accessToken: "AAA" })));
            const email = 'jonh@abv.bg';
            const password = '123456';
            await page.goto("http://localhost:3000");
            await page.click('text=Register');
            await page.waitForSelector('form')

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            await page.fill('[name="rePass"]', password);


            const [request] = await Promise.all([
                page.waitForRequest(request => request.url().includes("/users/register") && request.method() == 'POST'),
                page.click('[type="submit"]')
            ]);
            const postData = JSON.parse(request.postData());

            assert.equal(postData.email, email);
            assert.equal(postData.password, password);
        });

        it('login', async () => {
            await page.route('**/users/login*', route => route.fulfill(json({ _id: '001', email, accessToken: "AAA" })));
            const email = 'jonh@abv.bg';
            const password = '123456';
            await page.goto("http://localhost:3000");
            await page.click('text=Login');
            await page.waitForSelector('form')

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            const [request] = await Promise.all([
                page.waitForRequest(request => request.url().includes("/users/login") && request.method() == 'POST'),
                page.click('[type="submit"]')
            ]);
            const postData = JSON.parse(request.postData());

            assert.equal(postData.email, email);
            assert.equal(postData.password, password);
        });
    });

    describe('Crude operations', () => {
        beforeEach(async () => {
            await page.route('**/users/login*', route => route.fulfill(json({ _id: '001', email, accessToken: "AAA" })));
            const email = 'jonh@abv.bg';
            const password = '123456';
            await page.goto("http://localhost:3000");
            await page.click('text=Login');
            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            const [request] = await Promise.all([
                page.waitForResponse(response => response.url().includes("/users/login")),
                page.click('[type="submit"]')
            ]);
        });

        it.only("Create send corect request", async () => {
            await page.click('text="Create Recipe"');
            const data = {
                _id:"001",
                name:"nameR",
                img: "url",
                ingredients: ['1','2','3'],
                steps: ['st1', 'st2']
            }
            
            await page.route('**/data/recipes*', route => route.fulfill(json(data)));

            await page.waitForSelector('form');
            await page.fill('[name="name"]', data.name);
            await page.fill('[name="img"]', data.img);
            await page.fill('[name="ingredients"]', data.ingredients.join('\n'));
            await page.fill('[name="steps"]', data.steps.join('\n'));

            const [request] = await Promise.all([
                page.waitForRequest(request => request.url().includes("/data/recipes") && request.method() == 'POST'),
                page.click('[type="submit"]')
            ]);
            const postData = JSON.parse(request.postData());
            console.log(postData);
            assert.equal(postData.name, data.name);
            assert.equal(postData.img, data.img);
            assert.deepEqual(postData.ingredients, data.ingredients);
            assert.deepEqual(postData.steps, data.steps);

        });

    });
});