import { GradData } from './graddata'
import { GradOptions } from './gradoptions'
import { Color } from './../color'

export class GradBody {

	private instance: JQuery
	private values: Array<GradData>
	private sliderclick: (el: any, value: GradData) => void
	private setgradient: (gradient:Array<GradData>) => void
	private datalabel = "graddata"
	private colorvalues: Array<Color>

	public constructor(instance: JQuery, options: GradOptions) {
		this.instance = instance
		this.sliderclick = options.sliderclick
		this.setgradient = options.setgradient
		this.values = options.values ||
			[
				new GradData(0),
				new GradData(100, new Color(255, 255, 255))
			];
		this.render();
		this.updatehandlespositions();
		this.instance.find('.handle').first().addClass('selected');
	}

	public getgradient() {
		return _.orderBy(this.values, ['value', 'asc']);
	}

	private renderhtml() {
		let _this = <GradBody>this;
		_this.instance.addClass('bwslider')
		let handles = _this.instance.find('.handle')

		while (handles.length < _this.values.length) {
			_this.instance.append(
				$('<span>')
					.addClass('handle')
					.draggable({
						containment: 'parent',
						axis: 'x',
						drag: function () {
							_this.instance.find('.handle').removeClass('selected');
							$(this).addClass('selected'); _this.updatevalues();
							_this.updatehandlesstyles();
							_this.updatecontrolgradient();
						},
						stop: function () {
							_this.instance.find('.handle').removeClass('selected');
							$(this).addClass('selected'); _this.updatevalues();
							_this.updatehandlesstyles();
							_this.updatecontrolgradient();
							_this.setgradient(_this.values)
						}
					})
					.click(function () {
						_this.instance.find('.handle').removeClass('selected')
						$(this).addClass('selected')
						_this.sliderclick(this, <GradData>$(this).data(_this.datalabel))
					})
			);
			handles = _this.instance.find('.handle')
		}
	}

	private sethandledata() {
		let _this = <GradBody>this;
		_this.instance.find('.handle').each(function (i) {
			$(this).data(_this.datalabel, _this.values[i])
		});
	}

	private updatehandlesstyles() {
		let _this = <GradBody>this;
		_this.instance.find('.handle').each(function () {
			let data = <GradData>$(this).data(_this.datalabel)
			$(this).css({
				background: data.color.tohex()
			})
		})
	}

	private updatehandlespositions() {
		let _this = <GradBody>this;
		_this.instance.find('.handle').each(function () {
			let data = <GradData>$(this).data(_this.datalabel)
			$(this).css({
				left: `${data.value}%`
			})
		})
	}

	private updatecontrolgradient() {
		let _this = <GradBody>this;
		let css = "";
		let values = _.orderBy(_this.values, ['value', 'asc'])
		for (var i = 0; i < values.length; i++) {
			css += `, ${values[i].color.tohex()} ${values[i].value}%`;
		}
		_this.instance.css("background-image", `-webkit-linear-gradient(left ${css})`);
		_this.instance.css("background-image", `-moz-linear-gradient(to right ${css})`);
		_this.instance.css("background-image", `-o-linear-gradient(left ${css})`);
		_this.instance.css("background-image", `linear-gradient(left ${css})`);
	}

	private render() {
		let _this = <GradBody>this;
		_this.instance.addClass('bwslider')
		_this.renderhtml()
		_this.sethandledata()
		_this.updatehandlesstyles()
		_this.updatecontrolgradient()
	}

	private updatevalues() {
		let _this = <GradBody>this;

		_this.instance.find('.handle').each(function (i: number) {
			let data = <GradData>$(this).data(_this.datalabel);
			data.value = Math.floor($(this).position().left / _this.instance.width() * 100.0);
			$(this).data(_this.datalabel, data)
			_this.values[i] = data
		});
	}

	public addcolor(color: Color) {
		let _this = <GradBody>this;
		_this.values.push(new GradData(50, color));
		_this.render();
		_this.updatehandlespositions();
		_this.instance.find('.handle').removeClass('selected');
		_this.instance.find('.handle').last().addClass('selected');
	}

	public setcolor(color: Color) {
		let _this = <GradBody>this
		let handle = _this.instance.find('.handle.selected')

		if (handle.length > 0) {
			let data = <GradData>handle.data(_this.datalabel)
			if (data != null) {
				data.color = color
				handle.data(_this.datalabel, data)
				_this.updatevalues()
				_this.updatehandlesstyles()
				_this.updatecontrolgradient()
			}
		}
	}

	public deletecolor(index: number) {
		let _this = <GradBody>this;
		_this.values = _.remove(this.values, function (val: any, i: number) { return i != index });
		_this.render();
	}

	public click(callback: (el: any, data: GradData) => void) {
		let _this = <GradBody>this;
		_this.sliderclick = callback
	}
}