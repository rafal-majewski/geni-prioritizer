import type {PersonLoadingStatus} from "./PersonLoadingStatus.ts";
export const personLoadingStatusToPersonLoadingStatusEmoji = {
	loaded: "🟢",
	loading: "🟠",
} as const satisfies Record<PersonLoadingStatus, string>;
