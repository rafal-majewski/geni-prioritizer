import {wait} from "./wait.ts";
import {Manager} from "../Manager.ts";
import {puppeteerScrapingWorker} from "./puppeteerScrapingWorker.ts";
export const manager = new Manager(puppeteerScrapingWorker);
(async () => {
	for (;;) {
		await manager.process();
		await wait(0.1);
	}
})();
