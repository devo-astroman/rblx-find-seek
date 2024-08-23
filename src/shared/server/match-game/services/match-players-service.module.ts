import { JUMP_HEIGHT_PLAYER } from "shared/constants.module";

export interface PLAYER_CHARACTER {
	Humanoid: Humanoid;
}

export class MatchPlayerService {
	private playersInMatch: PLAYER_CHARACTER[];
	constructor(playersInMatch: unknown[]) {
		this.playersInMatch = playersInMatch as PLAYER_CHARACTER[];
	}

	enablePlayersJump() {
		this.playersInMatch.forEach((player) => {
			player.Humanoid.JumpHeight = JUMP_HEIGHT_PLAYER;
		});
	}

	disablePlayersJump() {
		this.playersInMatch.forEach((player) => {
			player.Humanoid.JumpHeight = 0;
		});
	}

	getFirstPlayerModel() {
		if (this.playersInMatch.size() > 0) {
			return this.playersInMatch[0];
		}
	}
}
