import { SLOT_VALUE, SLOTS_DESK_INITIAL_VALUES } from "shared/constants.module";
import { BirdDisplayer } from "./bird-displayer.module";

export class Desk {
	private slots: SLOT_VALUE[] = [];
	private slotParts: Part[];
	private birdDisplayer: BirdDisplayer;

	constructor(slots: Folder) {
		this.slotParts = slots.GetChildren() as Part[];
		this.birdDisplayer = new BirdDisplayer();
	}

	init() {
		print("SHOULD INIT");
		this.slots = [...SLOTS_DESK_INITIAL_VALUES];
		this.birdDisplayer.update(this.slots, this.slotParts);
	}
}
