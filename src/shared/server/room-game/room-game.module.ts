import { PrematchZone } from "../prematch-zone/prematch-zone.module";
import { GomService } from "./services/gom-service.module";

export class RoomGame {
	private gomService: GomService;
	private door1: MeshPart;
	private prematchZone: PrematchZone;
	constructor(root: Model) {
		this.gomService = new GomService(root);
		this.door1 = this.gomService.getDoor1();
		const preroomModel = this.gomService.getPreroomModel();
		this.prematchZone = new PrematchZone(preroomModel, (players) => {
			print("players to match ", players);
		});
	}

	activate() {
		//should activate the preroom (here)
		//open the preroom door (here)
		//start the preroom
		//listen to when the the preroom time is completed
		this.prematchZone.activate();
		this.openPreroomDoor1();
	}

	private openPreroomDoor1() {
		this.door1.CanCollide = false;
		this.door1.Transparency = 1;
	}

	private closePreroomDoor1() {
		this.door1.CanCollide = true;
		this.door1.Transparency = 0;
	}

	dactivate() {}
}
