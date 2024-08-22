import { MatchPlayerService } from "./services/match-players-service.module";

export class MatchGame {
	private matchPlayerService: MatchPlayerService;

	constructor(playersInMatch: Model[]) {
		this.matchPlayerService = new MatchPlayerService(playersInMatch);
	}

	init() {
		this.matchPlayerService.enablePlayersJump();
		/* Should start logic the the match */
		print("Start match logic");
	}

	end() {}
}
