import type {Profile} from "./Profile.js";

export type ResultEntry = Readonly<{
	profile: Profile;
	work: number;
}>;
