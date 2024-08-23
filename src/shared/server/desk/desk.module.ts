import { SLOT_VALUE, SLOTS_DESK_INITIAL_VALUES } from "shared/constants.module";
import { BirdDisplayer } from "./bird-displayer.module";
import { BirdInteractor } from "./bird-interactor.module";

export class Desk {
	private playerHand = SLOT_VALUE.Empty; //extend to all players
	private slotParts: Part[];
	private birdDisplayer: BirdDisplayer;
	private birdInteractor: BirdInteractor;

	constructor(slots: Folder) {
		this.slotParts = slots.GetChildren() as Part[];
		this.setupPartsNumberValue(this.slotParts);
		this.birdDisplayer = new BirdDisplayer();
		this.birdInteractor = new BirdInteractor((player, data) => {
			if (data.value !== SLOT_VALUE.Empty) {
				this.playerHand = data.value;
				this.setSlotValue(data.part, SLOT_VALUE.Empty);
				this.birdDisplayer.update(this.slotParts);
			} else {
				if (this.playerHand !== SLOT_VALUE.Empty) {
					this.setSlotValue(data.part, this.playerHand);
					this.playerHand = SLOT_VALUE.Empty;
					this.birdDisplayer.update(this.slotParts);
				}
			}
		});

		this.birdInteractor.active(this.slotParts);
	}

	init() {
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

	private setSlotValue(slotPart: Part, newValue: SLOT_VALUE) {
		const numberValue = slotPart.FindFirstChild("Value") as NumberValue;
		numberValue.Value = newValue;
	}
}
