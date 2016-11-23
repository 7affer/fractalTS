import { IFractalCalculator } from '../interfaces/IFractalCalculator'

export class MandelbrotCalculator implements IFractalCalculator {

	constructor(public limit: number) {

	}

	public calculatepoint(
		za: number,
		zb: number,
		ca: number,
		cb: number) {
		let zta: number
		let ztb: number
		let zrsqr = za * za;
		let zisqr = zb * zb;
		let lvl = 0;
		while (zrsqr + zisqr < 4 && lvl < this.limit) {
			zta = zrsqr - zisqr + ca
			ztb = 2 * za * zb + cb
			if (za == zta && zb == ztb) {
				return this.limit
			}
			za = zta
			zb = ztb
			zrsqr = za * za
			zisqr = zb * zb
			lvl++
		}
		return lvl;
	}
}