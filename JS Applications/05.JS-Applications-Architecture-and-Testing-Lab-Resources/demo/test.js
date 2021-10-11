const { chromium } = require('playwright-chromium');

const { expect, assert } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', function () {
    this.timeout(6000);
    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 400 });
        //browser = await chromium.launch();
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

    it('loads static page', async () => {
        await page.goto("http://127.0.0.1:5500/index.html");
        await page.screenshot({ path: "index.png" });

        const content = await page.content();
        assert.include(content, 'Unix')
        assert.include(content, 'Scalable Vector Graphics')
        assert.include(content, 'Open standard')
        assert.include(content, 'ALGOL')
        expect(content).to.contains('Unix');
        const content1 = await page.textContent('.accordion .head span')
        assert.include(content1, 'Scalable Vector Graphics')
    });

    it('loads static page', async () => {
        await page.goto("http://127.0.0.1:5500/index.html");

        const content = await page.$$eval('.accordion .head span', (spans)=> spans.map(s=>s.textContent));
        console.log(content);
        assert.include(content, 'Unix')
        assert.include(content, 'Scalable Vector Graphics')
        assert.include(content, 'Open standard')
        assert.include(content, 'ALGOL')
        
    });
    it('toggle content', async () => {
        await page.goto("http://127.0.0.1:5500/index.html");
        await page.click('text=More');
        //await page.waitForSelector('.extra p');
        const visible = await page.isVisible('.extra p');
        assert.isTrue(visible);
        //expect(visible).to.be.true;
    });

    it('toggle content', async () => {
        await page.goto("http://127.0.0.1:5500/index.html");
        await page.click('#main>.accordion:first-child >> text=More');
       // await page.waitForSelector('#main>.accordion:first-child >> .extra p');
        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        assert.isTrue(visible);
        //expect(visible).to.be.true;
    });

    it('toggle content', async () => {
        await page.goto("http://127.0.0.1:5500/index.html");
        await page.click('#main>.accordion:first-child >> text=More');
        await page.waitForSelector('#main>.accordion:first-child >> .extra p');

        await page.click('#main>.accordion:first-child >> text=Less');

        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        assert.isFalse(visible);
        //expect(visible).to.be.true;
    });

});