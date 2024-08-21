import { PLAYER_CHARACTER_TAG } from "shared/constants.module";

export const isPlayer = (candidate: unknown) => {
	const tags = (candidate as Instance).GetTags();

	return tags.some((tag) => tag === PLAYER_CHARACTER_TAG);
};

export const isPlayerUpperTorso = (possibleTorso: unknown) => {
	const possiblePlayer = <unknown>(possibleTorso as Instance).Parent;

	const tags = (possiblePlayer as Instance).GetTags();

	const isPlayer = tags.some((tag) => tag === PLAYER_CHARACTER_TAG);

	if (isPlayer) {
		return (possibleTorso as Instance).Name === "UpperTorso";
	}

	return false;
};
