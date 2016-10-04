import * as Utils from "./fractals/utils";
import {GradBody, GradData, GradOptions, GradPlugin} from "./gradient/grad";
import {Color} from "./color";
import { FractalBuilder } from "./fractals/fractalbuilder";
import { JuliaBuilder } from "./fractals/juliabuilder";
import { Point } from "./fractals/point";

const
	canvasm = <HTMLCanvasElement>document.getElementById("canvasm"),
	canvasj = <HTMLCanvasElement>document.getElementById("canvasj"),
	inputs = <HTMLInputElement>document.getElementById("in_steps"),
	inputss = <NodeListOf<Element>>document.getElementsByName("supersampling"),
	inputtype = <NodeListOf<Element>>document.getElementsByName("type"),
	reset = <HTMLButtonElement>document.getElementById("reset"),
	form = <HTMLFormElement>document.getElementById("mainform"),
	addcolors = <HTMLButtonElement>document.getElementById("addcolor"),
	deletecolors = <HTMLButtonElement>document.getElementById("deletecolor"),
	save = <HTMLButtonElement>document.getElementById("save")
var
	mandelbrot: FractalBuilder,
	julia: JuliaBuilder,
	windowwidth = $(window).width(),
	windowheight = $(window).height()

function init() {

	var values = new Array<GradData>();
	values.push(new GradData(0, new Color(0, 0, 0)))
	values.push(new GradData(99, new Color(255, 255, 255)))
	var data = new GradOptions(values, sliderclick, repaintgradient);

	$.fn.grad = GradPlugin;

	(<any>$('.gradslider')).grad(data);

	(<any>$('.colorpicker')).minicolors({
		inline: true,
		changeDelay: 200,
		change: function (value: string, opacity: any) {
			let color = new Color();
			color.parsehex(value);
			(<any>$('.gradslider')).grad().setcolor(color)
			repaintgradient((<any>$('.gradslider')).grad().getgradient())
		}
	});

	initevents()
	initfractals(values)
}

function sliderclick(el: any, data: GradData) {
	(<any>$('.colorpicker')).minicolors('value', data.color.tohex())
}

function repaintgradient(gradient: Array<GradData>) {
	mandelbrot.setgradient(gradient)
	mandelbrot.redraw(false)
	julia.setgradient(gradient)
	julia.redraw(false)
}

function initfractals(gradient: Array<GradData>) {
	canvasm.width = canvasj.width = $(window).width();
	canvasm.height = canvasj.height = $(window).height();
	mandelbrot = new FractalBuilder('mandelbrot');
	julia = new JuliaBuilder('julia');

	mandelbrot.setcanvas(canvasm);
	julia.setcanvas(canvasj);

	mandelbrot.beforeevent = () => $('.label-mandel').addClass('loading')
	mandelbrot.afterevent = () => $('.label-mandel').removeClass('loading')
	julia.beforeevent = () => $('.label-julia').addClass('loading')
	julia.afterevent = () => $('.label-julia').removeClass('loading')

	mandelbrot.setgradient(gradient)
	julia.setgradient(gradient)

	mandelbrot.redraw()
	julia.redraw()
}

function initevents() {
	form.addEventListener("submit", onsubmit, false)
	reset.addEventListener("click", onreset, false)
	canvasm.addEventListener("click", mouseclick, false)

	addcolors.addEventListener("click", addcolor, false)
	deletecolors.addEventListener("click", deletecolor, false)
	save.addEventListener("click", saveclick, false)

	for (let i = 0; i < inputss.length; i++) {
		inputss[i].addEventListener("change", onsubmit, false);
	}

	for (let i = 0; i < inputtype.length; i++) {
		inputtype[i].addEventListener("change", onsubmit, false);
	}

	setInterval(function () {
		let currentw = $(window).width()
		let currenth = $(window).height()
		if (currentw != windowwidth || currenth != windowheight) {
			onresizewindow()
		}
	}, 300)
}

function saveclick() {
	let canvas = $('.fakecheck:checked + label canvas')[0]
	var image = canvasm.toDataURL("image/png");
	image = image.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
	image = image.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

	this.href = image;
}

function addcolor() {
	(<GradBody>(<any>$('.gradslider')).grad()).addcolor(new Color(255, 255, 255));

	var gradient = (<GradBody>(<any>$('.gradslider')).grad()).getgradient();
	repaintgradient(gradient);
}

function deletecolor() {
	var index = $('.gradslider .handle.selected').index();
	$('.gradslider .handle.selected').remove();
	(<GradBody>(<any>$('.gradslider')).grad()).deletecolor(index);

	var gradient = (<GradBody>(<any>$('.gradslider')).grad()).getgradient();
	repaintgradient(gradient);
}

function onresizewindow() {
	windowwidth = $(window).width()
	windowheight = $(window).height()
	canvasm.width = canvasj.width = windowwidth;
	canvasm.height = canvasj.height = windowheight;
	mandelbrot.redraw()
	julia.redraw()
}

function onsubmit(e: Event) {
	mandelbrot.steps = parseInt(inputs.value, 10)
	julia.steps = parseInt(inputs.value, 10)
	for (let i = 0; i < inputss.length; i++) {
		if ((<HTMLInputElement>inputss[i]).checked) {
			mandelbrot.supersampling = parseInt((<HTMLInputElement>inputss[i]).value, 10)
			julia.supersampling = parseInt((<HTMLInputElement>inputss[i]).value, 10)
		}
	}
	for (let i = 0; i < inputtype.length; i++) {
		if ((<HTMLInputElement>inputtype[i]).checked) {
			mandelbrot.type = (<HTMLInputElement>inputtype[i]).value == "mandelbrot" ? "mandelbrot" : "ship";
			julia.type = (<HTMLInputElement>inputtype[i]).value == "mandelbrot" ? "julia" : "juliaship";
		}
	}

	var gradient = (<GradBody>(<any>$('.gradslider')).grad()).getgradient();
	mandelbrot.setgradient(gradient)
	julia.setgradient(gradient)

	mandelbrot.redraw()
	julia.redraw()
	e.preventDefault();
}

function mouseclick(e: MouseEvent) {
	var juliapoint = Utils.getcoords(e, canvasm, mandelbrot.pixelratio, mandelbrot.center);
	julia.jconstant = juliapoint;
	julia.redraw()
}

function onreset(e: MouseEvent) {
	julia.center = mandelbrot.center = new Point(0, 0);
	julia.pixelratio = mandelbrot.pixelratio = 0.008;
	mandelbrot.redraw()
	julia.redraw()
}

init()