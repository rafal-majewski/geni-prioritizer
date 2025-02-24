import {PuppeteerScrapingWorker} from "../PuppeteerScrapingWorker.ts";
import {puppeteerPage} from "./puppeteerPage.ts";
export const puppeteerScrapingWorker = new PuppeteerScrapingWorker(puppeteerPage);
