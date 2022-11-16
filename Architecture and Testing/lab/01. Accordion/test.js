const {chromium} = require("playwright-chromium");
const {expect} = require("chai");

let browser, page;
describe('E2E tests', async function () {
    this.timeout(8000);
    before(async () => {
        browser = await chromium.launch({headless: false, slowMo: 500});
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

    it('should load articles', async function () {
        await page.goto('http://localhost:63342/JS-Applications/Architecture%20and%20Testing/lab/01.%20Accordion/');
        const content = await page.textContent('#main');
        expect(content).contains('Scalable Vector Graphics');
        expect(content).contains('Open standard');
        expect(content).contains('Unix');
        expect(content).contains('ALGOL');
    });

    it('should More button work as expected', async function () {
        await page.goto('http://localhost:63342/JS-Applications/Architecture%20and%20Testing/lab/01.%20Accordion/');

        await page.click('text="More"');
        await page.waitForSelector('.extra p');

        const text = await page.textContent('.extra p');
        const btn = await page.textContent('.accordion >> button');
        expect(btn).to.equal('Less');
        expect(text).to.contains('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)');
    });

    it('should Less button work as expected', async function () {
        await page.goto('http://localhost:63342/JS-Applications/Architecture%20and%20Testing/lab/01.%20Accordion/');

        await page.click('text="More"');
        await page.waitForSelector('.extra p');
        await page.click('.accordion >> text="Less"');

        expect(await page.isVisible('.extra p')).to.be.false;
        expect(await page.textContent('.accordion >> button')).to.equal("More");
    });
});