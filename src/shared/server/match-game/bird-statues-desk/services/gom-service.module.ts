import { DESK_BIRDS_TAG } from "shared/constants.module";

export class GomService {
	constructor() {}

	getDeskBirds() {
		const collectionService = <CollectionService>game.GetService("CollectionService");
		const deskBirdsCollection = collectionService.GetTagged(DESK_BIRDS_TAG) as Folder[];

		if (deskBirdsCollection.size() !== 1) {
			print("deskBirdsCollection is different from 1 ", deskBirdsCollection.size(), deskBirdsCollection);
			return;
		}

		return deskBirdsCollection[0];
	}

	getDeskSlotFolder() {
		const deskFolder = this.getDeskBirds();
		const slotFolder = deskFolder?.FindFirstChild("Slots");
		return slotFolder;
	}

	getDeskBirdsFolder() {
		const deskFolder = this.getDeskBirds();
		const birdsFolder = deskFolder?.FindFirstChild("Birds");
		return birdsFolder;
	}

	getDeskSlotParts() {
		const deskFolder = this.getDeskBirds();
		const slotFolder = deskFolder?.FindFirstChild("Slots");
		return slotFolder?.GetChildren();
	}
}
