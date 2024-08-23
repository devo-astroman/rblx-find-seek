import { AttachementWelder } from "shared/utils/attachment-welder.module";
import { MatchPlayerService, PLAYER_CHARACTER } from "./services/match-players-service.module";
import { BirdStatueWeldManager } from "./services/bird-statue-weld-manager.module";
import { BirdStatuesDesk } from "./bird-statues-desk/bird-statues-desk.module";
import { SLOTS_DESK_INITIAL_VALUES } from "shared/constants.module";

export class MatchGame {
	private matchPlayerService: MatchPlayerService;
	private birdStatueWeldManager: BirdStatueWeldManager;
	private birdStatuesDesk: BirdStatuesDesk;

	constructor(playersInMatch: Model[]) {
		this.matchPlayerService = new MatchPlayerService(playersInMatch);
		this.birdStatueWeldManager = new BirdStatueWeldManager(playersInMatch);
		this.birdStatuesDesk = new BirdStatuesDesk(SLOTS_DESK_INITIAL_VALUES);
	}

	init() {
		this.matchPlayerService.enablePlayersJump();
		this.birdStatueWeldManager.active();

		/* Should start logic the the match */
	}

	end() {}
}
