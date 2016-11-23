import * as Utils from "./utils"
import { ResponseData } from "./responsedata"
import { GradData, Color } from "../gradient/graddata"
import { Point } from './point'
import { ColorComputer } from '../colorcomputer'

export class FractalBuilder {

	private dataparts: Array<ResponseData>
	private data: Array<Uint32Array>
	private dragcoords: { x: number, y: number }
	protected workers: Array<Worker>
	protected threadsnumber: number
	protected timer: number
	protected ready: boolean
	protected canvas: HTMLCanvasElement

	public center: Point = new Point(0, 0)
	public steps: number = 80
	public pixelratio: number = 0.008
	public supersampling: number = 1

	public beforeevent: () => void
	public afterevent: () => void

	public onzoomin: () => void
	public onzoomout: () => void
	public ondrag: () => void
	public onclick: (e: Point) => void

	public redcolorchanel: Uint16Array
	public greencolorchanel: Uint16Array
	public bluecolorchanel: Uint16Array

	constructor(public type: string) {
		let instance = this
		instance.ready = true;
		instance.dataparts = new Array<ResponseData>()
		instance.threadsnumber = (<any>navigator).hardwareConcurrency
		if (typeof (instance.threadsnumber) == "undefined") instance.threadsnumber = 4
		instance.workers = [];

		for (let i = 0; i < instance.threadsnumber; i++) {
			instance.workers.push(new Worker("./scripts/worker.bundle.js"));
			instance.workers[i].onmessage = function (e: MessageEvent) {
				let data = new ResponseData()
				data.data = new Uint32Array(e.data)
				data.threadid = i
				instance.dataparts.push(data)
				instance.checkready()
			}
		}
	}

	public setcanvas(canvas: HTMLCanvasElement) {
		let instance = this
		instance.canvas = canvas;
		let mc = new Hammer(canvas);
		mc.get('pan').set({ direction: Hammer.DIRECTION_ALL })
		mc.get('pinch').set({ enable: true })
		mc.on("pinchend tap panend", function (e) { instance.hammerevents(e, instance) })

		instance.canvas.addEventListener("mousewheel", instance, false)
		instance.canvas.addEventListener("DOMMouseScroll", instance, false)
	}

	hammerevents = function (e: HammerInput, instance: FractalBuilder) {
		console.log(`type: ${e.type}, point: ${e.center.x} ${e.center.y}, delta: ${e.deltaX} ${e.deltaY}`)
		let center = Utils.getcoordsfrompoint(e.center, instance.canvas, instance.pixelratio, instance.center)
		switch (e.type) {
			case 'tap': instance.onclick(center); break
			case 'pinchend': e.scale > 1 ? instance.zoomin(center) : instance.zoomout(); break
			case 'panend': instance.drag(new Point(-e.deltaX * instance.pixelratio, -e.deltaY * instance.pixelratio)); break
		}
	}

	handleEvent = function (e: Event) {
		let mevent = <MouseEvent>e
		let wevent = <WheelEvent>e
		let instance = <FractalBuilder>this
		let coords = Utils.getcoords(mevent, instance.canvas, instance.pixelratio, instance.center)

		if (instance.ready) {
			switch (e.type) {
				case 'mousewheel':
					if (wevent.deltaY > 0) instance.zoomout()
					else instance.zoomin(coords)					
					break
				case 'DOMMouseScroll':
					if (wevent.detail > 0) instance.zoomout()
					else instance.zoomin(coords)
					break
			}
			wevent.preventDefault()
		}
	}

	public zoomin(coords: Point) {
		if (coords != null) this.center = coords
		this.pixelratio *= 0.5
		this.redraw(true)
		this.onzoomin()
	}

	public zoomout() {
		if (this.pixelratio * 2 <= 0.008) {
			this.pixelratio *= 2
			this.redraw(true)
			this.onzoomout()
		}
	}

	protected drag(change: Point) {
		this.center.x += change.x
		this.center.y -= change.y
		this.redraw(true)
		this.ondrag()
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
			supersampling: _this.supersampling
		}
		for (let i = 0; i < _this.threadsnumber; i++) {
			_this.workers[i].postMessage(postdata)
			postdata.y += (_this.pixelratio * height)
		}
	}

	private checkready() {
		if (this.dataparts.length == this.threadsnumber) {
			this.data = _.chain(this.dataparts).sortBy("threadid").map(n => n.data).value()
			this.repaint()
			this.dataparts = new Array<ResponseData>()
			this.ready = true
		}
	}

	public redraw(regenerate = true) {
		if (this.ready) {
			if (this.beforeevent != null) {
				this.beforeevent()
			}
			if (regenerate) {
				this.generate()
			} else {
				this.repaint()
			}
		}
	}

	private repaint() {
		let cx = this.canvas.getContext("2d")
		let width = this.canvas.width
		let height = this.canvas.height
		let pxdata = cx.createImageData(width, height)
		let datapos = 0
		for (let i = 0; i < this.data.length; i++) {
			for (let j = 0; j < this.data[i].length; j++) {
				pxdata.data[datapos++] = this.redcolorchanel[this.data[i][j]];
				pxdata.data[datapos++] = this.greencolorchanel[this.data[i][j]];
				pxdata.data[datapos++] = this.bluecolorchanel[this.data[i][j]];
				pxdata.data[datapos++] = 255;
			}
		}
		cx.putImageData(pxdata, 0, 0)

		if (this.afterevent != null) {
			this.afterevent()
		}
	}

	public setgradient(gradient: Array<GradData>) {
		this.redcolorchanel = new Int16Array(this.steps + 1)
		this.greencolorchanel = new Int16Array(this.steps + 1)
		this.bluecolorchanel = new Int16Array(this.steps + 1)

		let comp = new ColorComputer(gradient)

		for (let i = 0; i <= this.steps; i++) {
			let color = comp.getcolor(this.steps, i)
			this.redcolorchanel[i] = color.r
			this.greencolorchanel[i] = color.g
			this.bluecolorchanel[i] = color.b
		}
	}
}