import {IFractal} from './interfaces/IFractal'
import {IFractalCalculator} from './interfaces/IFractalCalculator'
import {IIterationController} from './interfaces/IIterationController'
import {Point} from '../Point'

export class Fractal implements IFractal {

	public controller: IIterationController

	constructor(
		public width: number,
		public height: number,
		public limit: number,
		public pixelsize: number,
		public z: Point,
		public supersampling: number,		
	) {

	}

	public setcontroller(controller:IIterationController) {
		this.controller = controller
	}

	public getfractaldata() {
		let array = new Uint32Array(this.height * this.width)
		let posx = this.z.x - this.width * this.pixelsize * 0.5
		let posy = this.z.y - this.height * this.pixelsize * 0.5
		let sspix = this.pixelsize * 0.25
		let sspix2 = this.pixelsize * 0.5
		let i = 0;
		for (let y = 0; y < this.height; y++) {
			posy += this.pixelsize;
			for (let x = 0; x < this.width; x++) {
				posx += this.pixelsize
				array[i++] = this.controller.getpixellevel(posx, posy, sspix, sspix2)
			}
			posx = this.z.x - this.width * this.pixelsize * 0.5
		}
		return array;
	}
}