export class BirdInteractor {
	constructor() {}

	active(slotParts: Part[]) {
		slotParts.forEach((slot) => {
			const pp = slot.FindFirstChild("ProximityPrompt") as ProximityPrompt;
		});
	}
}
