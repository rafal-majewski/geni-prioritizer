import {puppeteerBrowser} from "./puppeteerBrowser.ts";
export const puppeteerPage = await puppeteerBrowser.newPage();
await puppeteerPage.goto("https://www.geni.com/login");
await puppeteerPage.type("#profile_username", process.env["GENI_EMAIL"] as string);
await puppeteerPage.type("#password", process.env["GENI_PASSWORD"] as string);
await puppeteerPage.waitForNavigation({
	timeout: 0,
});
