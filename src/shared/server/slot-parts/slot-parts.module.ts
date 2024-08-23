import { SLOT_VALUE } from "shared/constants.module";
import { SlotBirdDisplayer } from "./slot-bird-displayers.module";

export class SlotParts {
	private slotData: { id: number; part: Part; interactable: ProximityPrompt; value: SLOT_VALUE }[] = [];
	private onSlotPlayerInteractionFn: (player: Player, slotSelected: { id: number; currentValue: SLOT_VALUE }) => void;
	private slotBirdDisplayer: SlotBirdDisplayer;

	constructor(
		slotsFolder: Folder,
		birdsFolder: Folder,
		onSlotPlayerInteractionCallback: (
			player: Player,
			slotSelected: { id: number; currentValue: SLOT_VALUE },
		) => void,
	) {
		const parts = slotsFolder.GetChildren() as Part[];
		this.onSlotPlayerInteractionFn = onSlotPlayerInteractionCallback;
		this.slotData = parts.map((part, i) => {
			const proximityPrompt = part.FindFirstChild("ProximityPrompt") as ProximityPrompt;

			proximityPrompt.Triggered.Connect((player) => {
				const value = this.getValueFromSlot(i);
				this.onSlotPlayerInteractionFn(player, { id: i, currentValue: value });
			});

			return {
				id: (part.FindFirstChild("Id") as NumberValue).Value,
				part,
				interactable: proximityPrompt,
				value: SLOT_VALUE.Empty,
			};
		});

		this.slotBirdDisplayer = new SlotBirdDisplayer(this.slotData, birdsFolder);
		this.slotBirdDisplayer.update();
	}

	setValues(values: SLOT_VALUE[]) {
		this.slotData.forEach((slot, i) => (slot.value = values[i]));
		this.slotBirdDisplayer.update();
	}

	setValueInSlot(value: SLOT_VALUE, slotId: number) {
		this.slotData[slotId].value = value;
		this.slotBirdDisplayer.update();
	}

	getValueFromSlot(slotId: number) {
		return this.slotData[slotId].value;
	}
}
