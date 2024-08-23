import { SLOT_VALUE, SLOT_VALUE_COLORS } from "shared/constants.module";

export class SlotBirdDisplayer {
	private slotData: { id: number; part: Part; interactable: ProximityPrompt; value: SLOT_VALUE }[];
	private birds: { id: number; bird: Model }[];

	constructor(
		slotData: { id: number; part: Part; interactable: ProximityPrompt; value: SLOT_VALUE }[],
		birdsFolder: Folder,
	) {
		this.slotData = slotData;
		this.birds = birdsFolder.GetChildren().map((bird, i) => {
			return {
				bird: bird as Model,
				id: (bird.FindFirstChild("Id") as NumberValue).Value,
			};
		});
	}

	update(slotData: { id: number; part: Part; interactable: ProximityPrompt; value: SLOT_VALUE }[]) {
		this.slotData = slotData;
		print("******"); //Change this for the birds meshes and colors
		this.slotData.forEach((sData) => {
			print(sData.id, " - ", this.getSlotValueText(sData.value));
		});
		print("******");
		this.updateBirdsPositionsAndColors();
	}

	private updateBirdsPositionsAndColors() {
		this.slotData.forEach((sData) => {
			const bird = this.birds.find((b) => b.id === sData.id);

			if (!bird) {
				print("no bird found with the id ", sData.id);
				return;
			}

			if (sData.value !== 0) {
				(bird.bird.FindFirstChild("Base") as MeshPart).Transparency = 0;
				(bird.bird.FindFirstChild("Bird") as MeshPart).Transparency = 0;
				(bird.bird.FindFirstChild("Paws") as MeshPart).Transparency = 0;
				const colorCode = this.getColorFromSlotValue(sData.value);
				const color = new Color3(colorCode[0], colorCode[1], colorCode[2]);
				const partToColor = bird.bird.FindFirstChild("Paws") as MeshPart;
				partToColor.Color = color;
			} else {
				(bird.bird.FindFirstChild("Base") as MeshPart).Transparency = 1;
				(bird.bird.FindFirstChild("Bird") as MeshPart).Transparency = 1;
				(bird.bird.FindFirstChild("Paws") as MeshPart).Transparency = 1;
			}
		});
	}

	private getColorFromSlotValue(value: SLOT_VALUE) {
		switch (value) {
			case SLOT_VALUE.RED_BIRD:
				return SLOT_VALUE_COLORS.RED_BIRD;
			case SLOT_VALUE.GREEN_BIRD:
				return SLOT_VALUE_COLORS.GREEN_BIRD;
			case SLOT_VALUE.BLUE_BIRD:
				return SLOT_VALUE_COLORS.BLUE_BIRD;
			case SLOT_VALUE.PURPLE_BIRD:
				return SLOT_VALUE_COLORS.PURPLE_BIRD;
		}

		print("warning there is no color from slot value ", value);
		return [0, 0, 0];
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
