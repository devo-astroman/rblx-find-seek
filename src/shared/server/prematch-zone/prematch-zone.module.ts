import { WAIT_PLAYERS_PREGAME } from "shared/constants.module";
import { isPlayerUpperTorso } from "shared/utils/player-utils.module";
import { TimerClock } from "shared/utils/timer.module";

export class PrematchZone {
	private part: BasePart;
	private touchedConnection!: RBXScriptConnection;
	private touchedEndedConnection!: RBXScriptConnection;
	private timerClock: TimerClock;
	private playerModelsInZone: Model[] = [];
	private billboardGui: BillboardGui;
	private secDisplayerGUI: TextLabel;
	private billboardGUIToStart: BillboardGui;

	private originalJumpHeight = 0;

	constructor(model: Model, cb: (players: Model[]) => void) {
		print("-PrematchZone-");
		const zonePart = model.FindFirstChild("ZonePart") as BasePart;
		this.part = zonePart;

		this.billboardGui = model.FindFirstChild("BillboardGui", true) as BillboardGui;
		this.billboardGUIToStart = model.FindFirstChild("BillboardToStartGui", true) as BillboardGui;

		this.secDisplayerGUI = this.billboardGui.FindFirstChild("SecsTextLabel") as TextLabel;
		this.billboardGui.Enabled = false;
		this.secDisplayerGUI.Text = "";
		this.billboardGUIToStart.Enabled = false;

		this.timerClock = new TimerClock();
		this.timerClock.onOneSecDo((sec: number) => {
			this.secDisplayerGUI.Text = WAIT_PLAYERS_PREGAME - sec + "";
		});

		this.timerClock.onTimeCompleted(() => {
			this.billboardGui.Enabled = false;
			this.billboardGUIToStart.Enabled = false;
			cb(this.playerModelsInZone);
		});
	}

	activate() {
		print("-PrematchZone- activate");
		this.touchedConnection = this.part.Touched.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				const playerAlreadyPushed = this.playerModelsInZone.some(
					(player) => player.Name === touchedPart.Parent?.Name,
				);

				!playerAlreadyPushed && this.playerModelsInZone.push(touchedPart.Parent as Model);
				!this.timerClock.isTimerRunning() && this.timerClock.startTime(WAIT_PLAYERS_PREGAME);
				this.billboardGui.Enabled = true;
				this.billboardGUIToStart.Enabled = true;

				const humanoid = touchedPart.Parent?.FindFirstChild("Humanoid") as Humanoid;

				this.originalJumpHeight = humanoid.JumpHeight;
				humanoid.JumpHeight = 0;
			}
		});

		this.touchedEndedConnection = this.part.TouchEnded.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				this.playerModelsInZone = this.playerModelsInZone.filter(
					(player) => player.Name !== touchedPart.Parent?.Name,
				);
				if (this.playerModelsInZone.size() === 0) {
					this.timerClock.stop();
					this.billboardGui.Enabled = false;
					this.billboardGUIToStart.Enabled = false;
				}
				const humanoid = touchedPart.Parent?.FindFirstChild("Humanoid") as Humanoid;
				humanoid.JumpHeight = this.originalJumpHeight;
			}
		});
	}

	dactivate() {
		this.touchedConnection && this.touchedConnection.Disconnect();
		this.touchedEndedConnection && this.touchedEndedConnection.Disconnect();
		this.timerClock.stop();
	}
}
