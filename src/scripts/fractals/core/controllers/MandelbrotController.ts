import { IIterationController } from '../interfaces/IIterationController'
import { IFractalCalculator } from '../interfaces/IFractalCalculator'

export class MandelbrotController implements IIterationController {

	constructor(
		private supersampling: number,
		private calculator: IFractalCalculator
	) {

	}

	public getpixellevel(posx: number, posy: number, sspix: number, sspix2: number) {		
		if (this.supersampling == 4) {
			return this.calcss4(posx, posy, sspix, sspix2)
		} 
		if (this.supersampling == 2) {
			return this.calcss2(posx, posy, sspix, sspix2)
		} 		
		return this.calcss1(posx, posy, sspix, sspix2)
	}

	private calcss4(posx: number, posy: number, sspix: number, sspix2: number) {
		let tempx1 = posx - sspix;
		let tempx2 = posx + sspix;
		let tempy1 = posy - sspix;
		let tempy2 = posy + sspix;
		return (
			this.calculator.calculatepoint(tempx1, tempy1, tempx1, tempy1) +
			this.calculator.calculatepoint(tempx1, tempy2, tempx1, tempy2) +
			this.calculator.calculatepoint(tempx2, tempy1, tempx2, tempy1) +
			this.calculator.calculatepoint(tempx2, tempy2, tempx2, tempy2)
		) >> 2;
	}

	private calcss2(posx: number, posy: number, sspix: number, sspix2: number) {
		let tempx1 = posx - sspix;
		let tempx2 = posx + sspix;
		let tempy1 = posy - sspix;
		let tempy2 = posy + sspix;
		return (
			this.calculator.calculatepoint(tempx1, tempy1, tempx1, tempy1) +
			this.calculator.calculatepoint(tempx2, tempy2, tempx2, tempy2)
		) >> 1;
	}

	private calcss1(posx: number, posy: number, sspix: number, sspix2: number) {
		return this.calculator.calculatepoint(posx, posy, posx, posy)
	}
}