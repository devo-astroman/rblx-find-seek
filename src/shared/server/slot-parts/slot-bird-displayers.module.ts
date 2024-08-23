import { SLOT_VALUE } from "shared/constants.module";

export class SlotBirdDisplayer {
	private slotData: { id: number; part: Part; interactable: ProximityPrompt; value: SLOT_VALUE }[];

	constructor(
		slotData: { id: number; part: Part; interactable: ProximityPrompt; value: SLOT_VALUE }[],
		birdsFolder: Folder,
	) {
		this.slotData = slotData;
	}

	update() {
		print("******"); //Change this for the birds meshes and colors
		this.slotData.forEach((sData) => {
			print(sData.id, " - ", this.getSlotValueText(sData.value));
		});
		print("******");
	}

	private getSlotValueText(value: SLOT_VALUE) {
		switch (value) {
			case SLOT_VALUE.Empty:
				return "Empty";
			case SLOT_VALUE.RED_BIRD:
				return "Red";
			case SLOT_VALUE.GREEN_BIRD:
				return "Green";
			case SLOT_VALUE.BLUE_BIRD:
				return "Blue";
			case SLOT_VALUE.PURPLE_BIRD:
				return "Purple";
		}
	}
}
