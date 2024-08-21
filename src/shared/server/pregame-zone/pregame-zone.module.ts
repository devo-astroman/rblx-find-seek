import { isPlayerUpperTorso } from "shared/utils/player-utils.module";
import { TimerClock } from "shared/utils/timer.module";

export class PregameZone {
	private part: BasePart;
	private touchedConnection!: RBXScriptConnection;
	private touchedEndedConnection!: RBXScriptConnection;
	private timerClock: TimerClock;
	private playersInZone: Model[] = [];
	private billboardGui: BillboardGui;
	private secDisplayerGUI: TextLabel;
	private originalJumpHeight = 0;

	constructor(model: Model, cb: (players: Model[]) => void) {
		const zonePart = model.FindFirstChild("ZonePart") as BasePart;

		this.part = zonePart;
		this.activate();

		this.billboardGui = model.FindFirstChild("BillboardGui", true) as BillboardGui;
		this.secDisplayerGUI = this.billboardGui.FindFirstChild("SecsTextLabel") as TextLabel;
		this.billboardGui.Enabled = false;
		this.secDisplayerGUI.Text = "";
		this.timerClock = new TimerClock();
		this.timerClock.onOneSecDo((sec: number) => {
			if (15 - sec > 0) {
				this.secDisplayerGUI.Text = 15 - sec + "";
			}
		});

		this.timerClock.onTimeCompleted(() => {
			this.billboardGui.Enabled = false;
			cb(this.playersInZone);
		});
	}

	activate() {
		this.touchedConnection = this.part.Touched.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				this.playersInZone.push(touchedPart.Parent as Model);
				!this.timerClock.isTimerRunning() && this.timerClock.startTime(15);
				this.billboardGui.Enabled = true;

				const humanoid = touchedPart.Parent?.FindFirstChild("Humanoid") as Humanoid;

				this.originalJumpHeight = humanoid.JumpHeight;
				humanoid.JumpHeight = 0;
			}
		});

		this.touchedEndedConnection = this.part.TouchEnded.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				this.playersInZone = this.playersInZone.filter((player) => player.Name !== touchedPart.Parent?.Name);
				if (this.playersInZone.size() === 0) {
					this.timerClock.stop();
					this.billboardGui.Enabled = false;
				}
				const humanoid = touchedPart.Parent?.FindFirstChild("Humanoid") as Humanoid;
				humanoid.JumpHeight = this.originalJumpHeight;
			}
		});
	}

	dactivate() {
		this.touchedConnection && this.touchedConnection.Disconnect();
		this.touchedEndedConnection && this.touchedEndedConnection.Disconnect();
	}
}
