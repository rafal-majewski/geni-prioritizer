import {fail} from "@sveltejs/kit";
import {computeScrapingQueryFormDataFromRawFormData} from "../../lib/computeScrapingQueryFormDataFromRawFormData.ts";
import {computeScrapingQueryFromScrapingQueryFormData} from "../../lib/computeScrapingQueryFromScrapingQueryFormData.ts";
import puppeteer from "puppeteer";
import {PriorityQueue} from "../../lib/PriorityQueue.ts";
import type {PersonUrl} from "../../lib/PersonUrl.ts";
import {computePersonReferencesSectionParsingNodeFromPersonReferencesSectionNode} from "../../lib/computePersonReferencesSectionParsingNodeFromPersonReferencesSectionNode.ts";
import {parsePersonReferencesSectionParsingNode} from "../../lib/parsePersonReferencesSectionParsingNode.ts";
const browser = await puppeteer.launch({
	headless: false,
});
const page = await browser.newPage();
await page.goto("https://www.geni.com/login");
// #profile_username
await page.type("#profile_username", process.env["GENI_EMAIL"]);
// #profile_password
await page.type("#password", process.env["GENI_PASSWORD"]);
// #form_login > div.ft.txt_c > a
const personsUrlsQueue = new PriorityQueue<PersonUrl>();
personsUrlsQueue.push("https://www.geni.com/people/Rafa%C5%82-Majewski/6000000205276832840", 0);
export const actions = {
	async default({request}) {
		const rawQueryFormData = await request.formData();
		const queryFormData = computeScrapingQueryFormDataFromRawFormData(rawQueryFormData);
		if (queryFormData === null) {
			return fail(400);
		}
		const query = computeScrapingQueryFromScrapingQueryFormData(queryFormData);
		if (query === null) {
			return fail(400);
		}
		for (const root of query.roots) {
			personsUrlsQueue.push(root.url, root.priority);
		}
		for (;;) {
			const personUrl = personsUrlsQueue.pop();
			if (personUrl === undefined) {
				break;
			}
			await page.goto(personUrl);
			// #profile-basics > div.module.mbl > div > div.unit.size_2of3 > div > div.bd.identity-module > h2 > span.strong.quiet
			// read text content
			const name = await page.$eval(
				"#profile-basics > div.module.mbl > div > div.unit.size_2of3 > div > div.bd.identity-module > h2 > span.strong.quiet",
				(element) => element.textContent,
			);
			if (name === null) {
				throw new Error("name is null.");
			}
			// const personReferences = await page.$eval("#family_handprint > td > p", (element) => {
			// 	console.log(element.childNodes);
			// });
			// const nodes = await page.evaluateHandle("#family_handprint > td > p", (element) =>
			// 	[...element.childNodes].map((node) => JSON.parse(JSON.stringify({...node}))),
			// );

			const parsingNodes = await page.$eval(
				"#family_handprint > td > p",
				computePersonReferencesSectionParsingNodeFromPersonReferencesSectionNode,
			);
			const personReferences = parsePersonReferencesSectionParsingNode(parsingNodes);
			console.log(personReferences);
		}
	},
};
