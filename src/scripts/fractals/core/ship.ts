import { Mandelbrot } from "./mandelbrot"

export class Ship extends Mandelbrot {

	protected zta: number;
	protected ztb: number;

	constructor(
		width: number,
		height: number,
		max: number,
		pixelsize: number,
		centerx: number,
		centery: number,
		supersampling: number
	) {
		super(width, height, max, pixelsize, centerx, centery, supersampling)
	}

	protected getpoint(
		za: number,
		zb: number,
		ca: number,
		cb: number) {
		let zrsqr = za * za
		let zisqr = zb * zb
		let lvl = 0
		this.zta = null
		this.ztb = null
		while (zrsqr + zisqr < 4 && lvl < this.max) {
			// za = Math.abs(za)
			// zb = Math.abs(zb)
			za = za > 0 ? za : -za
			zb = zb > 0 ? zb : -zb
			this.zta = zrsqr - zisqr + ca
			this.ztb = 2 * za * zb + cb
			
			if (za == this.zta && zb == this.ztb) {
				lvl = this.max
				break
			}
			za = this.zta
			zb = this.ztb
			zrsqr = za * za
			zisqr = zb * zb
			lvl++
		}
		return lvl;
	}
}