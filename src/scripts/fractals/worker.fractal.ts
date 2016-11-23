import { Fractal } from "./core/fractal"
import { MandelbrotController } from './core/controllers/MandelbrotController'
import { JuliaController } from './core/controllers/JuliaController'
import { MandelbrotCalculator } from './core/calculators/MandelbrotCalcuator'
import { ShipCalculator } from './core/calculators/ShipCalculator'

const selfAny: any = self;

self.addEventListener('message', function (e: MessageEvent) {

	let fractal = new Fractal(
		e.data.width,
		e.data.height,
		e.data.steps,
		e.data.pixelratio,
		{ x: e.data.x, y: e.data.y },
		e.data.supersampling
	)

	switch (e.data.type) {
		case 'mandelbrot': fractal.setcontroller(new MandelbrotController(e.data.supersampling, new MandelbrotCalculator(e.data.steps))); break
		case 'ship': fractal.setcontroller(new MandelbrotController(e.data.supersampling, new ShipCalculator(e.data.steps))); break
		case 'julia': fractal.setcontroller(new JuliaController({x: e.data.cx, y: e.data.cy}, e.data.supersampling, new MandelbrotCalculator(e.data.steps))); break
		case 'juliaship': fractal.setcontroller(new JuliaController({x: e.data.cx, y: e.data.cy}, e.data.supersampling, new ShipCalculator(e.data.steps))); break
	}

	var data = fractal.getfractaldata()
	selfAny.postMessage(data, [data.buffer]);
}, false);