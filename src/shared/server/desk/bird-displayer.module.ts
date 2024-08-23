import { SLOT_VALUE, SLOT_VALUE_COLORS } from "shared/constants.module";

export class BirdDisplayer {
	constructor() {}

	update(slotParts: Part[]) {
		print("BirdDisplayer - update");
		slotParts.forEach((slotPart) => {
			const part = slotPart;
			const bird = part.FindFirstChild("BirdStatue") as Model;
			const numberValue = part.FindFirstChild("Value") as NumberValue;

			const slotValue = numberValue.Value;

			if (slotValue === SLOT_VALUE.Empty) {
				this.hideBird(bird);
			} else {
				this.showBird(bird);
				const color = this.getColorValueFromSlotValue(slotValue);
				this.colorBird(bird, color);
			}
		});
	}

	private hideBird(bird: Model) {
		const base = bird.FindFirstChild("Base") as MeshPart;
		base.Transparency = 1;
		const birdBody = bird.FindFirstChild("Bird") as MeshPart;
		birdBody.Transparency = 1;
		const paws = bird.FindFirstChild("Paws") as MeshPart;
		paws.Transparency = 1;
	}

	private showBird(bird: Model) {
		const base = bird.FindFirstChild("Base") as MeshPart;
		base.Transparency = 0;
		const birdBody = bird.FindFirstChild("Bird") as MeshPart;
		birdBody.Transparency = 0;
		const paws = bird.FindFirstChild("Paws") as MeshPart;
		paws.Transparency = 0;
	}

	private colorBird(bird: Model, color: number[]) {
		const paws = bird.FindFirstChild("Paws") as MeshPart;
		paws.Color = new Color3(color[0], color[1], color[2]);
	}

	private getColorValueFromSlotValue(value: SLOT_VALUE) {
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
}
