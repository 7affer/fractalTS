import { Ship } from "./ship"

export class JuliaShip extends Ship {

	constructor(
		width: number,
		height: number,
		max: number,
		pixelsize: number,
		centerx: number,
		centery: number,
		supersampling: number,
		protected cx: number,
		protected cy: number
	) {
		super(width, height, max, pixelsize, centerx, centery, supersampling);
	}

	protected getpixellevel(posx: number, posy: number, sspix: number, sspix2: number) {
		if (this.supersampling > 2) {
			let tempx1 = posx - sspix;
			let tempx2 = posx + sspix;
			let tempy1 = posy - sspix;
			let tempy2 = posy + sspix;
			return (
				this.getpoint(tempx1, tempy1, this.cx, this.cy) +
				this.getpoint(tempx1, tempy2, this.cx, this.cy) +
				this.getpoint(tempx2, tempy1, this.cx, this.cy) +
				this.getpoint(tempx2, tempy2, this.cx, this.cy)
			) >> 2;
		} else if (this.supersampling == 2) {
			let tempx1 = posx - sspix;
			let tempx2 = posx + sspix;
			let tempy1 = posy - sspix;
			let tempy2 = posy + sspix;
			return (
				this.getpoint(tempx1, tempy1, this.cx, this.cy) +
				this.getpoint(tempx2, tempy2, this.cx, this.cy)
			) >> 1;
		} else {
			return this.getpoint(posx, posy, this.cx, this.cy);
		}
	}
}