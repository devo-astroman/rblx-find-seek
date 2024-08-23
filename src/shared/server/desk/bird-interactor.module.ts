import { SLOT_VALUE } from "shared/constants.module";

export class BirdInteractor {
	private onTriggerFn: (
		player: Player,
		data: {
			part: Part;
			value: SLOT_VALUE;
		},
	) => void;
	constructor(
		fn: (
			player: Player,
			data: {
				part: Part;
				value: SLOT_VALUE;
			},
		) => void,
	) {
		this.onTriggerFn = fn;
	}

	active(slotParts: Part[]) {
		slotParts.forEach((slot) => {
			const pp = slot.FindFirstChild("ProximityPrompt") as ProximityPrompt;
			pp.Enabled = true;

			pp.Triggered.Connect((player) => {
				const numberValue = slot.FindFirstChild("Value") as NumberValue;

				const data = {
					part: slot,
					value: numberValue.Value,
				};
				this.onTriggerFn(player, data);
			});
		});
	}

	deactive(slotParts: Part[]) {
		slotParts.forEach((slot) => {
			const pp = slot.FindFirstChild("ProximityPrompt") as ProximityPrompt;
			pp.Enabled = false;
		});
	}
}
