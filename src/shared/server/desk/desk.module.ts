import { SLOT_VALUE, SLOTS_DESK_INITIAL_VALUES } from "shared/constants.module";
import { BirdDisplayer } from "./bird-displayer.module";

export class Desk {
	private slotParts: Part[];
	private birdDisplayer: BirdDisplayer;

	constructor(slots: Folder) {
		this.slotParts = slots.GetChildren() as Part[];
		this.setupPartsNumberValue(this.slotParts);
		this.birdDisplayer = new BirdDisplayer();
	}

	init() {
		print("SHOULD INIT");

		SLOTS_DESK_INITIAL_VALUES.forEach((value, i) => {
			const slotPart = this.slotParts[i];
			const numberValue = slotPart.FindFirstChild("Value") as NumberValue;
			numberValue.Value = value;
		});

		this.birdDisplayer.update(this.slotParts);
	}

	private setupPartsNumberValue(slotParts: Part[]) {
		slotParts.forEach((slotPart) => {
			const numberValue = new Instance("NumberValue");
			numberValue.Parent = slotPart;
			numberValue.Value = SLOT_VALUE.Empty;
		});
	}
}
