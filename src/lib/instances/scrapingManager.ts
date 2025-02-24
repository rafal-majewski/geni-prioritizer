import {wait} from "./wait.ts";
import {ScrapingManager} from "../ScrapingManager.ts";
import {puppeteerScrapingWorker} from "./puppeteerScrapingWorker.ts";
export const scrapingManager = new ScrapingManager(puppeteerScrapingWorker);
(async () => {
	for (;;) {
		await scrapingManager.process();
		await wait(1);
	}
})();
