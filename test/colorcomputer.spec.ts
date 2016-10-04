import { Color } from '../src/scripts/color';
import { ColorComputer } from '../src/scripts/colorcomputer';
import { GradData } from '../src/scripts/gradient/graddata'
import { expect } from 'chai';

describe('ColorComputer', () => {
    describe('constructor', () => {
        it('should set gradient', () => {
            let values = [new GradData(0, new Color()), new GradData(100, new Color())]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.gradient.length).to.be.equal(2);
        })

       it('should set ordered gradient', () => {
            let values = [new GradData(100, new Color(1,1,1)), new GradData(0, new Color(2,2,2))]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.gradient.length).to.be.equal(2);
            expect(gradcalc.gradient[0].value).to.be.equal(0);
            expect(gradcalc.gradient[1].value).to.be.equal(100);
        })

        it('should extend endings', () => {
            let values = [new GradData(10, new Color()), new GradData(90, new Color())]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.gradient.length).to.be.equal(4);
            expect(gradcalc.gradient[0].value).to.be.equal(0);
            expect(gradcalc.gradient[3].value).to.be.equal(100);
        })

        it('should normalize array', () => {
            let values = [new GradData(10, new Color(0, 0, 0)), new GradData(10, new Color(5, 5, 5)), new GradData(100, new Color(10, 10, 10))]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.gradient.length).to.be.equal(3);
            expect(gradcalc.gradient[gradcalc.gradient.length - 2].color.tohex()).to.be.equal('#000000');
        })
    })

    describe('getcolor', () => {
        it('should get color from gradient', () => {
            let values = [new GradData(0, new Color(0, 100, 100)), new GradData(50, new Color(100, 0, 0)), new GradData(100, new Color(100, 0, 0))]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.getcolor(100, 25).tohex()).to.be.equal('#323232');
            expect(gradcalc.getcolor(100, 50).tohex()).to.be.equal('#640000');
            expect(gradcalc.getcolor(100, 80).tohex()).to.be.equal('#640000');
        })
    })

    describe('getedges', () => {
        it('should return two edges from value', () => {
            let values = [new GradData(0, new Color(0, 0, 0)), new GradData(50, new Color(100, 100, 100)), new GradData(100, new Color(100, 100, 100))]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.getedges(25)[0].value).to.be.equal(0);
            expect(gradcalc.getedges(25)[1].value).to.be.equal(50);
            expect(gradcalc.getedges(80)[0].value).to.be.equal(50);
            expect(gradcalc.getedges(80)[1].value).to.be.equal(100);
        })

        it('should two last gradient values for max value', () => {
            let values = [new GradData(0, new Color(0, 0, 0)), new GradData(25, new Color(100, 100, 100)), new GradData(100, new Color(100, 100, 100))]
            let gradcalc = new ColorComputer(values);
            expect(gradcalc.getedges(100)[0].value).to.be.equal(25);
            expect(gradcalc.getedges(100)[1].value).to.be.equal(100);
        })
    })
})