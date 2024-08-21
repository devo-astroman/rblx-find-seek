import { isPlayerUpperTorso } from "shared/utils/player-utils.module";
import { TimerClock } from "shared/utils/timer.module";

export class PregameZone {
	private part: BasePart;
	private touchedConnection!: RBXScriptConnection;
	private touchedEndedConnection!: RBXScriptConnection;
	private timerClock: TimerClock;
	private playersInZone: Model[] = [];

	constructor(part: BasePart, cb: (players: Model[]) => void) {
		this.part = part;
		this.activate();
		this.timerClock = new TimerClock();
		this.timerClock.onOneSecDo((sec: number) => {
			print("SECS: ", 15 - sec);
		});

		this.timerClock.onTimeCompleted(() => {
			cb(this.playersInZone);
		});
	}

	activate() {
		this.touchedConnection = this.part.Touched.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				this.playersInZone.push(touchedPart.Parent as Model);
				!this.timerClock.isTimerRunning() && this.timerClock.startTime(15);
				print("this.playersInZone: - ", this.playersInZone);
			}
		});

		this.touchedEndedConnection = this.part.TouchEnded.Connect((touchedPart: BasePart) => {
			if (isPlayerUpperTorso(touchedPart)) {
				this.playersInZone = this.playersInZone.filter((player) => player.Name !== touchedPart.Parent?.Name);
				if (this.playersInZone.size() === 0) {
					this.timerClock.stop();
				}
			}
		});
	}

	dactivate() {
		this.touchedConnection && this.touchedConnection.Disconnect();
		this.touchedEndedConnection && this.touchedEndedConnection.Disconnect();
	}
}
