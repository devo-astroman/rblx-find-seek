export class BirdStatueWeld {
	private base: BasePart;
	private bird: BasePart;
	private paws: BasePart;

	constructor(weld: BasePart) {
		this.base = weld.FindFirstChild("Base") as BasePart;
		this.bird = weld.FindFirstChild("Bird") as BasePart;
		this.paws = weld.FindFirstChild("Paws") as BasePart;
		if (!this.base || !this.bird || !this.paws) {
			print("some is undefined ", this.base, this.bird, this.paws);
		}

		this.hide(); //starts being hided
	}

	show() {
		this.showBasePart(this.base);
		this.showBasePart(this.bird);
		this.showBasePart(this.paws);
	}

	hide() {
		this.hideBasePart(this.base);
		this.hideBasePart(this.bird);
		this.hideBasePart(this.paws);
	}

	setColor(color: Color3) {
		this.paws.Color = color;
	}

	private hideBasePart(part: BasePart) {
		part.Transparency = 1;
	}
	private showBasePart(part: BasePart) {
		part.Transparency = 0;
	}
}
