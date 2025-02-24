import {launch} from "puppeteer";
export const puppeteerBrowser = await launch({
	headless: false,
});
