import type {Page} from "puppeteer";
import {computePersonProfileRelationsParsingNodeFromPersonProfileRelationsNode} from "./computePersonProfileRelationsParsingNodeFromPersonProfileRelationsNode.ts";
import {parsePersonProfileRelationsParsingNodes} from "./parsePersonProfileRelationsParsingNodes.ts";
import type {PersonProfile} from "./PersonProfile.ts";
import type {ScrapingWorker} from "./ScrapingWorker.ts";
export class PuppeteerScrapingWorker implements ScrapingWorker {
	private readonly page: Page;
	public constructor(page: Page) {
		this.page = page;
	}
	public async scrape(url: string): Promise<PersonProfile> {
		await this.page.goto(url);
		const name = await this.page.$eval(
			"#profile-basics > div.module.mbl > div > div.unit.size_2of3 > div > div.bd.identity-module > h2 > span.strong.quiet",
			(element) => element.textContent,
		);
		if (name === null) {
			throw new Error("name is null.");
		}
		const id = await this.page.$eval(
			"body > div.document > div.page_responsive.page_body > div.profile-decoration",
			(element) => element.dataset["profileId"],
		);
		if (id === undefined) {
			throw new Error("profileId is undefined.");
		}
		const parsingNodes = await this.page.$eval(
			"#family_handprint > td > p",
			computePersonProfileRelationsParsingNodeFromPersonProfileRelationsNode,
		);
		const relations = parsePersonProfileRelationsParsingNodes(parsingNodes);
		const profile: PersonProfile = {
			name,
			relations,
			id,
		};
		return profile;
	}
}
