import { Color } from '../src/scripts/color';
import { expect } from 'chai';

describe('Color', () => {
  describe('tohex()', () => {
	it('should convert object to hex', () => {
	  var data = new Color(255, 255, 255)
	  expect(data.tohex().toUpperCase()).to.be.equal('#FFFFFF');
	  var data = new Color(0, 0, 0)
	  expect(data.tohex().toUpperCase()).to.be.equal('#000000');
	})
  })

  describe('torgb()', () => {
	it('should convert object to rgb', () => {
	  var data = new Color(255, 255, 255)
	  expect(data.torgb()).to.be.equal('rgb(255,255,255)');
	})
  })

  describe('parsehex()', () => {
	it('should parse hex color', () => {
	  var data = new Color()
	  data.parsehex("#00ff0f")
	  expect(data.r).to.be.equal(0)
	  expect(data.g).to.be.equal(255)
	  expect(data.b).to.be.equal(15)
	})
  })
})