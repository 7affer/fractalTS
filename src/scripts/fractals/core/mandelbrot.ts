import {IFractal} from './ifractal'

export class Mandelbrot implements IFractal {

	constructor(
		public width: number,
		public height: number,
		public max: number,
		public pixelsize: number,
		public centerx: number,
		public centery: number,
		public supersampling: number
	) {

	}

	public getfractaldata() {
		//let array: Array<number> = [];
		let array = new Uint32Array(this.height * this.width)
		let posx = this.centerx - this.width * this.pixelsize * 0.5;
		let posy = this.centery - this.height * this.pixelsize * 0.5;
		let sspix = this.pixelsize * 0.25;
		let sspix2 = this.pixelsize * 0.5;
		let i = 0;
		for (let y = 0; y < this.height; y++) {
			posy += this.pixelsize;
			for (let x = 0; x < this.width; x++) {
				posx += this.pixelsize;
				array[i++] = this.getpixellevel(posx, posy, sspix, sspix2);
			}
			posx = this.centerx - this.width * this.pixelsize * 0.5;
		}
		return array;
	}

	protected getpixellevel(posx: number, posy: number, sspix: number, sspix2: number) {
		if (this.supersampling > 2) {
			let tempx1 = posx - sspix;
			let tempx2 = posx + sspix;
			let tempy1 = posy - sspix;
			let tempy2 = posy + sspix;
			return (
				this.getpoint(tempx1, tempy1, tempx1, tempy1) +
				this.getpoint(tempx1, tempy2, tempx1, tempy2) +
				this.getpoint(tempx2, tempy1, tempx2, tempy1) +
				this.getpoint(tempx2, tempy2, tempx2, tempy2)
			) >> 2;
		} else if (this.supersampling == 2) {
			let tempx1 = posx - sspix;
			let tempx2 = posx + sspix;
			let tempy1 = posy - sspix;
			let tempy2 = posy + sspix;
			return (
				this.getpoint(tempx1, tempy1, tempx1, tempy1) +
				this.getpoint(tempx2, tempy2, tempx2, tempy2)
			) >> 1;
		} else {
			return this.getpoint(posx, posy, posx, posy);
		}
	}

	protected getpoint(
		za: number,
		zb: number,
		ca: number,
		cb: number) {
		let zta: number
		let ztb: number
		let zrsqr = za * za;
		let zisqr = zb * zb;
		let lvl = 0;
		while (zrsqr + zisqr < 4 && lvl < this.max) {
			zta = zrsqr - zisqr + ca
			ztb = 2 * za * zb + cb
			if (za == zta && zb == ztb) {
				lvl = this.max
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