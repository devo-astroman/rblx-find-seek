import { SlotParts } from "shared/server/slot-parts/slot-parts.module";
import { NO_BIRD, RED_BIRD, GREEN_BIRD, BLUE_BIRD, PURPLE_BIRD, SLOT_VALUE } from "../../../constants.module";
import { GomService } from "./services/gom-service.module";

export class BirdStatuesDesk {
	private slots: {
		value: typeof NO_BIRD | typeof RED_BIRD | typeof GREEN_BIRD | typeof BLUE_BIRD | typeof PURPLE_BIRD;
	}[] = [];

	private gomService: GomService;

	constructor(slotInitialValues: SLOT_VALUE[]) {
		this.gomService = new GomService();
		const deskRootFolder = this.gomService.getDeskBirds();
		const slotFolder = this.gomService.getDeskSlotFolder() as Folder;
		const birdsFolder = this.gomService.getDeskBirdsFolder() as Folder;

		const slotParts = new SlotParts(slotFolder, birdsFolder, (player, data) => {
			print("interaction --- ", player, data);
		});

		slotParts.setValues(slotInitialValues);
	}

	activate() {
		/* Alow user interactions */
	}
}
