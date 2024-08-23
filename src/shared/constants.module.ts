/* TAGS */
export const ROOM_GAME_TAG = "ROOM_GAME_TAG";
export const PREGAME_ZONE_TAG = "PREGAME_ZONE_TAG";
export const PLAYER_CHARACTER_TAG = "PLAYER_CHARACTER_TAG";
export const PLAYER_UPPER_TORSO_TAG = "PLAYER_UPPER_TORSO_TAG";
export const DESK_BIRDS_TAG = "DESK_BIRDS_TAG";

/* PREMATCH */
export const WAIT_PLAYERS_PREGAME = 2; // 2 for testing

/* PLAYER */
export const JUMP_HEIGHT_PLAYER = 7.2;

/* DESK AND STAGE */
export const NO_BIRD = 0;
export const RED_BIRD = 1;
export const GREEN_BIRD = 2;
export const BLUE_BIRD = 3;
export const PURPLE_BIRD = 4;

/*SLOTS*/
export enum SLOT_VALUE {
	Empty = 0,
	RED_BIRD = 1,
	GREEN_BIRD = 2,
	BLUE_BIRD = 3,
	PURPLE_BIRD = 4,
}

export const SLOTS_DESK_INITIAL_VALUES = [
	SLOT_VALUE.RED_BIRD,
	SLOT_VALUE.PURPLE_BIRD,
	SLOT_VALUE.GREEN_BIRD,
	SLOT_VALUE.BLUE_BIRD,
];

export const SLOT_VALUE_COLORS = {
	RED_BIRD: [1, 0, 0],
	GREEN_BIRD: [0, 1, 0],
	BLUE_BIRD: [0, 0, 1],
	PURPLE_BIRD: [0.502, 0, 0.502],
};
