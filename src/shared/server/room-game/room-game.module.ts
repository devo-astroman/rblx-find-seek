import { AttachementWelder } from "shared/utils/attachment-welder.module";
import { MatchGame } from "../match-game/match-game.module";
import { PrematchZone } from "../prematch-zone/prematch-zone.module";
import { GomService } from "./services/gom-service.module";

export class RoomGame {
	private gomService: GomService;
	private door1: MeshPart;
	private door2: MeshPart;
	private prematchZone: PrematchZone;
	private matchGame!: MatchGame;
	private attachementWelder!: AttachementWelder;

	constructor(root: Model) {
		print("-RoomGame-");
		this.gomService = new GomService(root);
		this.door1 = this.gomService.getDoor1();
		this.door2 = this.gomService.getDoor2();
		const preroomModel = this.gomService.getPreroomModel();

		this.prematchZone = new PrematchZone(preroomModel, (playerModels) => {
			print("players to match ", playerModels);
			this.initMatch(playerModels);
		});
	}

	activate() {
		print("-RoomGame activate-");
		//should activate the preroom (here)
		//open the preroom door (here)
		//start the preroom
		//listen to when the the preroom time is completed
		this.initPreMatch();
	}
	dactivate() {}

	private openPreroomDoor1() {
		this.door1.CanCollide = false;
		this.door1.Transparency = 1;
	}

	private closePreroomDoor1() {
		this.door1.CanCollide = true;
		this.door1.Transparency = 0;
	}

	private openPreroomDoor2() {
		this.door2.CanCollide = false;
		this.door2.Transparency = 1;
	}

	private closePreroomDoor2() {
		this.door2.CanCollide = true;
		this.door2.Transparency = 0;
	}

	private initPreMatch() {
		this.prematchZone.activate();
		this.openPreroomDoor1();
		this.closePreroomDoor2();
	}

	private initMatch(players: Model[]) {
		this.closePreroomDoor1();
		this.openPreroomDoor2();
		this.prematchZone.dactivate();

		this.matchGame = new MatchGame(players);
		this.matchGame.init();
	}
}
