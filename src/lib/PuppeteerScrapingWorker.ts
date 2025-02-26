import type {Page} from "puppeteer";
import {computePersonProfileRelationsParsingNodesFromPersonProfileRelationsNode} from "./computePersonProfileRelationsParsingNodesFromPersonProfileRelationsNode.ts";
import {parsePersonProfileRelationsParsingNodes} from "./parsePersonProfileRelationsParsingNodes.ts";
import type {PersonProfile} from "./PersonProfile.ts";
import type {ScrapingWorker} from "./ScrapingWorker.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import {exmptyRelationTypeToPersonProfileReferences} from "./emptyRelationTypeToPersonProfileReferences.ts";
export class PuppeteerScrapingWorker implements ScrapingWorker {
	private readonly page: Page;
	public constructor(page: Page) {
		this.page = page;
	}
	public async scrape(url: PersonProfileUrl): Promise<PersonProfile> {
		await this.page.goto(url);
		const name = await this.page.$eval(
			"#profile-basics > div.module.mbl > div > div.unit.size_2of3 > div > div.bd.identity-module > h2 > span.strong.quiet",
			(element) => element.textContent,
		);
		if (name === null) {
			throw new Error("name is null.");
		}
		const parsingNodes = await this.page
			.$eval(
				"#family_handprint > td > p",
				computePersonProfileRelationsParsingNodesFromPersonProfileRelationsNode,
			)
			.catch(() => null);
		const relations =
			parsingNodes === null
				? exmptyRelationTypeToPersonProfileReferences
				: parsePersonProfileRelationsParsingNodes(parsingNodes);
		const profile: PersonProfile = {
			name,
			relations,
		};
		return profile;
	}
}
