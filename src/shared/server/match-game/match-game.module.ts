import { AttachementWelder } from "shared/utils/attachment-welder.module";
import { MatchPlayerService, PLAYER_CHARACTER } from "./services/match-players-service.module";
import { BirdStatueWeldManager } from "./services/bird-statue-weld-manager.module";

export class MatchGame {
	private matchPlayerService: MatchPlayerService;
	private birdStatueWeldManager: BirdStatueWeldManager;

	constructor(playersInMatch: Model[]) {
		this.matchPlayerService = new MatchPlayerService(playersInMatch);
		this.birdStatueWeldManager = new BirdStatueWeldManager(playersInMatch);
	}

	init() {
		this.matchPlayerService.enablePlayersJump();
		this.birdStatueWeldManager.active();
		/* Should start logic the the match */
	}

	end() {}
}
