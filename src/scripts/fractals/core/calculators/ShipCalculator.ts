import { IFractalCalculator } from '../interfaces/IFractalCalculator'

export class ShipCalculator implements IFractalCalculator {

	constructor(public limit: number) {

	}

	public calculatepoint(
		za: number,
		zb: number,
		ca: number,
		cb: number) {

		let zta: number
		let ztb: number
		let zrsqr = za * za
		let zisqr = zb * zb
		let lvl = 0

		while (zrsqr + zisqr < 4 && lvl < this.limit) {
			za = za > 0 ? za : -za
			zb = zb > 0 ? zb : -zb
			zta = zrsqr - zisqr + ca
			ztb = 2 * za * zb + cb

			if (za == zta && zb == ztb) {
				lvl = this.limit
				break
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