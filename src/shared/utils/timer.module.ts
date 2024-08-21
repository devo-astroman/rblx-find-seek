export class TimerClock {
	private totalSecs = 0;
	private onOneSecDoFn!: (sec: number) => void;
	private onTimeCompletedFn!: () => void;
	private promiseFn!: (
		resolve: (value: unknown) => void,
		reject: (reason?: unknown) => void,
		onCancel: (abortHandler?: (() => void) | undefined) => boolean,
	) => void;
	private activePromise!: Promise<unknown>;
	private cancelPromise = false;
	private isClockRunning = false;

	constructor() {
		this.promiseFn = (resolve, reject) => {
			for (let i = 0; i < this.totalSecs; i++) {
				if (this.cancelPromise) {
					reject(i);
					i = this.totalSecs;
				}
				wait(1);
				this.onOneSecDoFn(i);
			}

			resolve("");
		};
	}

	onOneSecDo(cb: (sec: number) => void) {
		this.onOneSecDoFn = cb;
	}

	onTimeCompleted(cb: () => void) {
		this.onTimeCompletedFn = cb;
	}

	startTime(totalSecs: number) {
		this.cancelPromise = false;
		this.isClockRunning = true;
		this.totalSecs = totalSecs;

		this.activePromise = new Promise(this.promiseFn);
		const resolve = () => {
			this.onTimeCompletedFn();
			this.isClockRunning = false;
		};
		const reject = (msg: unknown) => {
			print("Time cancelled at sec: ", msg as string);
			this.isClockRunning = false;
		};

		this.activePromise.then(resolve, reject);
	}

	stop() {
		this.cancelPromise = true;
	}

	isTimerRunning() {
		return this.isClockRunning;
	}
}
