import {GradData} from './gradient/graddata'
import {Color} from './color'

export class ColorComputer {
    public gradient: Array<GradData>

    public constructor(gradient: Array<GradData>) {

		gradient = _.orderBy(gradient, ['value'])

        if (gradient[0].value > 0) {
            let head = new Array<GradData>();
            head.push(new GradData(0, gradient[0].color));
            gradient = head.concat(gradient);
        }

        if (gradient[gradient.length - 1].value < 100) {
            let tail = new Array<GradData>();
            tail.push(new GradData(100, gradient[gradient.length - 1].color));
            gradient = gradient.concat(tail);
        }

		gradient = _.chain(gradient)
			.groupBy('value')
			.map(function (el: Array<GradData>) {
				return el[0];
			})
			.value()

        this.gradient = gradient;
    }

	public getcolor(max: number, val: number) {
		let x = val / max * 100
		let edges = this.getedges(x)

		let diffvalue = edges[0].value - edges[1].value;
		let addvalue = edges[0].value + edges[1].value;

		let ar = (edges[0].color.r - edges[1].color.r) / diffvalue;
		let br = (edges[0].color.r + edges[1].color.r - ar * addvalue) / 2.0;
		let funR = (x: number) => { return x * ar + br }

		let ag = (edges[0].color.g - edges[1].color.g) / diffvalue;
		let bg = (edges[0].color.g + edges[1].color.g - ag * addvalue) / 2.0;
		let funG = (x: number) => { return x * ag + bg }

		let ab = (edges[0].color.b - edges[1].color.b) / diffvalue;
		let bb = (edges[0].color.b + edges[1].color.b - ab * addvalue) / 2.0;
		let funB = (x: number) => { return x * ab + bb }

		return new Color(funR(val), funG(val), funB(val));
	}

	public getedges(val: number) {
		if (val == 100) {
			return [
				this.gradient[this.gradient.length - 2],
				this.gradient[this.gradient.length - 1]
			]
		}
		return [
			_.findLast(this.gradient, function (el) { return el.value <= val }),
			_.find(this.gradient, function (el) { return el.value > val })
		]
	}
}