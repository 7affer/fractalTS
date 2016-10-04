import { IFractal } from "./core/ifractal"
import { Mandelbrot } from "./core/mandelbrot"
import { Julia } from "./core/julia"
import { Ship } from "./core/ship"
import { JuliaShip } from "./core/juliaship"

const selfAny: any = self;

self.addEventListener('message', function (e: MessageEvent) {

	let fractal: IFractal

	switch (e.data.type) {
		case 'mandelbrot':
			fractal = new Mandelbrot(
				e.data.width,
				e.data.height,
				e.data.steps,
				e.data.pixelratio,
				e.data.x,
				e.data.y,
				e.data.supersampling
			)
			break
		case 'ship':
			fractal = new Ship(
				e.data.width,
				e.data.height,
				e.data.steps,
				e.data.pixelratio,
				e.data.x,
				e.data.y,
				e.data.supersampling
			)
			break
		case 'julia':
			fractal = new Julia(
				e.data.width,
				e.data.height,
				e.data.steps,
				e.data.pixelratio,
				e.data.x,
				e.data.y,
				e.data.supersampling,
				e.data.cx,
				e.data.cy
			)
			break
		case 'juliaship':
			fractal = new JuliaShip(
				e.data.width,
				e.data.height,
				e.data.steps,
				e.data.pixelratio,
				e.data.x,
				e.data.y,
				e.data.supersampling,
				e.data.cx,
				e.data.cy
			)
			break
	}

	var data = fractal.getfractaldata()
	selfAny.postMessage(data, [data.buffer]);
}, false);