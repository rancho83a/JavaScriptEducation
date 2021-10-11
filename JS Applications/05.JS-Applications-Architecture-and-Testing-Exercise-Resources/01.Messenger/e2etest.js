const { chromium } = require('playwright-chromium');

const { expect, assert } = require('chai');

let browser, page; // Declare reusable variables
const endpoint = "http://localhost:3000/";
const debug = true;

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
    //     await page.goto("http://localhost:3000/");
    //     await page.screenshot({ path: "index.png" });
    // });

    it('all messages load after Refresh button clicked', async () => {

        await page.goto(endpoint);
        await page.click('text=Refresh');
        await page.waitForSelector('#messages');//textarea
        const text = await page.$$eval('#messages', (textarea) => textarea.map(t => t.value));
        assert.include(text[0], 'Spami: Hello, are you there?')
        assert.include(text[0], 'Garry: Yep, whats up :?')
        assert.include(text[0], 'Spami: How are you? Long time no see? :)')
        assert.include(text[0], 'George: Hello, guys! :))')
        assert.include(text[0], 'Spami: Hello, George nice to see you! :)))')
    });

    it('Send nessage', async () => {

        const name = 'any';
        const msg = 'someMsg'
        await page.goto(endpoint);


        await page.fill('#author', name);
        await page.fill('#content', msg);

        const [response] = await Promise.all([
            page.waitForResponse('**/jsonstore/messenger'),
            page.click('text=Send')
        ]);

        const postData = JSON.parse(response.request().postData());
        assert.equal(postData.author, name);
        assert.equal(postData.content, msg);

    });
});