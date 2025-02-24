import type {PersonProfile} from "./PersonProfile.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export interface ScrapingWorker {
	scrape(url: PersonProfileUrl): Promise<PersonProfile>;
}
