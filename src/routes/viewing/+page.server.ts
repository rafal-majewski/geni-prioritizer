import {scrapingManager} from "../../lib/instances/scrapingManager.ts";
export function load() {
	return {
		persons: scrapingManager.getPersons(),
	};
}
