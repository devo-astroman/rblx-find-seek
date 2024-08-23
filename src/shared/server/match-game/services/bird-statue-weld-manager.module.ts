import { JUMP_HEIGHT_PLAYER } from "shared/constants.module";
import { AttachementWelder } from "shared/utils/attachment-welder.module";
import { BirdStatueWeld } from "../bird-statue-weld/bird-statue-weld.module";

export interface PLAYER_CHARACTER extends Model {
	Humanoid: Humanoid;
}

export class BirdStatueWeldManager {
	private playersInMatch: PLAYER_CHARACTER[];
	private weldsData!: { playerName: string; weldPart: BasePart }[];
	constructor(playersInMatch: unknown[]) {
		this.playersInMatch = playersInMatch as PLAYER_CHARACTER[];
	}

	active() {
		const sS = game.GetService("ServerStorage");
		const referenceDummy = sS.FindFirstChild("ReferenceDummy") as Model;
		const attachementWelder = new AttachementWelder(referenceDummy);

		this.weldsData = this.playersInMatch.map((player) => {
			const weldPart = attachementWelder.setupWeld(player, "BirdStatue");

			return {
				playerName: player.Parent ? player.Parent.Name : "",
				weldPart,
				birdStatueWeld: new BirdStatueWeld(weldPart),
			};
		});
	}

	deactivate() {}
}
