import { FractalBuilder } from '../src/scripts/fractals/fractalbuilder'
import { GradData, Color } from '../src/scripts/gradient/graddata'
import { expect } from 'chai';

describe('FractalBuilder', () => {

	describe('setgradient', () => {
		it('should init colorchanels tables', () => {
			var grad = [new GradData(0, new Color(0, 100, 100)), new GradData(50, new Color(100, 0, 0)), new GradData(100, new Color(100, 0, 0))]
			var fract = new FractalBuilder('mandelbrot');
			fract.steps = 100
			fract.setgradient(grad)
			expect(fract.redcolorchanel.length).to.be.equal(101);
			expect(fract.greencolorchanel.length).to.be.equal(101);
			expect(fract.bluecolorchanel.length).to.be.equal(101);
		})

		it('should set colors for each step', () => {
			var grad = [new GradData(0, new Color(0, 100, 100)), new GradData(50, new Color(100, 0, 0)), new GradData(100, new Color(100, 0, 0))]
			var fract = new FractalBuilder('mandelbrot');
			fract.steps = 100
			fract.setgradient(grad)
			
			expect(fract.redcolorchanel[0]).to.be.equal(0);
			expect(fract.redcolorchanel[25]).to.be.equal(50);
			expect(fract.redcolorchanel[80]).to.be.equal(100);

			expect(fract.greencolorchanel[0]).to.be.equal(100);
			expect(fract.greencolorchanel[25]).to.be.equal(50);
			expect(fract.greencolorchanel[80]).to.be.equal(0);
		})
	})
})