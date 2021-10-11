const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');

let browser, page; // Declare reusable variables
const debug = false;
const endpoint = 'http://localhost:3000/';
//PUT YOUR URL HERE: (don`t forget to put comment on line 6)
//const endpoint = '';

describe('E2E tests', function () {
    this.timeout(5000);
    before(async () => {
        if (debug) {
            browser = await chromium.launch({ headless: false, slowMo: 400 });
        } else {
            browser = await chromium.launch();
        }
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    // it('test Does all setting  of testing work', async () => {
    //     await page.goto(endpoint);
    //     await page.screenshot({ path: "index.png" });
    // });

    describe('Load books', () => {
        it('load books clicking btn', async () => {

            await page.goto(endpoint);
            await page.click('#loadBooks');
            await page.waitForSelector('tbody tr');//textarea
            const rows = await page.$$eval('td', (row) => row.map(t => t.textContent));
            //console.log(rows);
            assert.include(rows, "Harry Potter and the Philosopher's Stone")
            assert.include(rows, "J.K.Rowling")
            assert.include(rows, "C# Fundamentals")
            assert.include(rows, "Svetlin Nakov")
        });
    })

    describe('Testing: add book', () => {
        it('Test the right request with the correct parameters is send to the back-end.', async () => {

            const author = 'Noname';
            const title = 'newTitle'
            await page.goto(endpoint);

            await page.fill('#createForm [name = "title"]', title);
            await page.fill('#createForm [name = "author"]', author);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/collections/books'),
                page.click('text=Submit')
            ]);

            const postData = JSON.parse(response.request().postData());
            assert.equal(postData.author, author);
            assert.equal(postData.title, title);

        });
        it('Test with the wrong parameters is send to the back-end.', async () => {

            const author = '';
            const title = 'newTitle'
            await page.goto(endpoint);

            await page.fill('#createForm [name = "title"]', title);
            await page.fill('#createForm [name = "author"]', author);

            page.on('dialog', dialog => {
                dialog.accept();
                console.log(dialog.message());
            });
            await page.click('text=Submit');
        });
    });

    describe('Testing: edit book', () => {
        const expect = {
            title: "Harry Potter and the Philosopher's Stone",
            author: "J.K.Rowling"
        }

        const expectEdit = {
            title: "changedTitle",
            author: "chengedAuthor"
        }

        it('edit loads correct article data ', async () => {
            await page.goto(endpoint);
            await page.click('#loadBooks');
            await page.waitForSelector('tbody tr');
            await page.click('button:text("Edit")');
            await page.waitForSelector('#editForm');

            const title = await page.$eval('#editForm [name="title"]', e => e.value);
            const author = await page.$eval('#editForm [name="author"]', e => e.value);

            assert.equal(title, expect.title);
            assert.equal(author, expect.author);
        });
        it('edit makes correct API call', async () => {

            await page.goto(endpoint);
            await page.click('#loadBooks');
            await page.waitForSelector('tbody tr');

            await page.click('button:text("Edit")');
            await page.waitForSelector('#editForm');
            const id = await page.$eval('#editForm [name="id"]', e => e.value)

            await page.fill('#editForm [name="title"]', expectEdit.title)
            await page.fill('#editForm [name="author"]', expectEdit.author)

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/collections/books/' + id),
                page.click('text=Save')
            ]);

            const postData = JSON.parse(response.request().postData());
            assert.equal(postData.author, expectEdit.author);
            assert.equal(postData.title, expectEdit.title);
        });
    });

    describe('Testing: delete book', () => {
        it('delete makes correct API', async () => {

            await page.goto(endpoint);
            await page.click('#loadBooks');
            await page.waitForSelector('tbody tr');
            const id = await page.getAttribute('tbody  tr', 'data-id');
            console.log("id =",id);

            page.on('dialog', dialog => {
                dialog.accept();
                console.log(dialog.message());
            });

            const [request] = await Promise.all([
                page.waitForRequest('**/jsonstore/collections/books/' + id),
                page.click('button:text("Delete")')
            ]);

            expect(request.method()).to.equal('DELETE');
        });

    });
});
