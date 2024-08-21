import { isPlayerUpperTorso } from "shared/utils/player-utils.module";

export class PregameZone {
	private part: BasePart;
	private touchedConnection!: RBXScriptConnection;
	private touchedEndedConnection!: RBXScriptConnection;

	constructor(part: BasePart) {
		this.part = part;
		this.activate();
	}

	activate() {
		this.touchedConnection = this.part.Touched.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				print("base part touched ", touchedPart.Parent?.Name, touchedPart);
			}
		});

		this.touchedEndedConnection = this.part.TouchEnded.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				print("base part touchedended ", touchedPart.Parent?.Name, touchedPart);
			}
		});
	}

	dactivate() {
		this.touchedConnection && this.touchedConnection.Disconnect();
		this.touchedEndedConnection && this.touchedEndedConnection.Disconnect();
	}
}
