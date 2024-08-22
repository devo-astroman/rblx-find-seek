interface ROOM_GAME_TREE {
	Room: {
		Door1: MeshPart;
		Door2: MeshPart;
	};
	PreRoom: Model;
}

export class GomService {
	private root: ROOM_GAME_TREE;
	constructor(root: unknown) {
		this.root = root as ROOM_GAME_TREE;
	}

	getDoor1() {
		return this.root.Room.Door1;
	}

	getDoor2() {
		return this.root.Room.Door2;
	}

	getPreroomModel() {
		return this.root.PreRoom;
	}
}
