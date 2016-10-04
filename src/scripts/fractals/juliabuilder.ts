import * as Utils from "./utils"
import { ResponseData } from "./responsedata"
import { FractalBuilder } from "./fractalbuilder"
import { Point } from './point'

export class JuliaBuilder extends FractalBuilder {

	public jconstant:Point;


	constructor(type: string) {
		super(type)
		this.jconstant = new Point(0.12, 0.63);		
	}

	protected generate() {
		let _this = this;
		_this.timer = (new Date()).getTime()
		_this.ready = false;

		let height = Math.floor(_this.canvas.height / _this.threadsnumber)
		let postdata = {
			type: _this.type,
			width: _this.canvas.width,
			height: height,
			steps: _this.steps,
			pixelratio: _this.pixelratio,
			x: _this.center.x,
			y: - _this.center.y - (_this.pixelratio * height) * (_this.threadsnumber / 2.0 - 0.5),
			supersampling: _this.supersampling,
			cx: _this.jconstant.x,
			cy: -_this.jconstant.y
		}
		for (let i = 0; i < _this.threadsnumber; i++) {
			_this.workers[i].postMessage(postdata)
			postdata.y += (_this.pixelratio * height)
		}
	}
}