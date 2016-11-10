import * as Utils from "./fractals/utils";
import {GradBody, GradData, GradOptions, GradPlugin} from "./gradient/grad";
import {Color} from "./color";
import { FractalBuilder } from "./fractals/fractalbuilder";
import { JuliaBuilder } from "./fractals/juliabuilder";
import { Point } from "./fractals/point";
import { Tutorial} from "./tutorial"

const
	canvasm = <HTMLCanvasElement>document.getElementById("canvasm"),
	canvasj = <HTMLCanvasElement>document.getElementById("canvasj"),
	initialpixelratio = 0.008
var
	mandelbrot: FractalBuilder,
	julia: JuliaBuilder,
	windowwidth = $(window).width(),
	windowheight = $(window).height(),
	tutorial = new Tutorial('.tutorial-message')

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

	tutorial.setlevel(1)

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

	mandelbrot.onzoomin = () => { tutorial.setlevel(2) }
	mandelbrot.onzoomout = () => { tutorial.setlevel(3) }
	mandelbrot.ondrag = () => { tutorial.setlevel(4) }
	mandelbrot.onclick = mouseclick

	julia.onzoomin = () => { tutorial.setlevel(2) }
	julia.onzoomout = () => { tutorial.setlevel(3) }
	julia.ondrag = () => { tutorial.setlevel(4) }
}

function mouseclick(e: MouseEvent) {
	var juliapoint = Utils.getcoords(e, canvasm, mandelbrot.pixelratio, mandelbrot.center)
	julia.jconstant = juliapoint
	julia.center = new Point(0,0)
	julia.pixelratio = initialpixelratio
	julia.redraw()
	tutorial.setlevel(5)
}

function initevents() {
	let inputss = <NodeListOf<Element>>document.getElementsByName("supersampling")
	let inputtype = <NodeListOf<Element>>document.getElementsByName("type")
	let reset = <HTMLButtonElement>document.getElementById("reset")
	let form = <HTMLFormElement>document.getElementById("mainform")
	let addcolors = <HTMLButtonElement>document.getElementById("addcolor")
	let deletecolors = <HTMLButtonElement>document.getElementById("deletecolor")
	let save = <HTMLButtonElement>document.getElementById("save")
	let fractalradio = <NodeListOf<Element>>document.getElementsByName("fakecheck")
	let configbutton = <HTMLElement>document.getElementById("menu-toggle")
	let zoomin = <HTMLElement>document.getElementById('zoomin')
	let zoomout = <HTMLElement>document.getElementById('zoomout')

	form.addEventListener("submit", onsubmit, false)
	reset.addEventListener("click", onreset, false)

	addcolors.addEventListener("click", addcolor, false)
	deletecolors.addEventListener("click", deletecolor, false)
	save.addEventListener("click", saveclick, false)
	configbutton.addEventListener("click", function () { tutorial.setlevel(7) }, false)
	zoomin.addEventListener("click", zoomincurrent, false)
	zoomout.addEventListener("click", zoomoutcurrent, false)

	for (let i = 0; i < inputss.length; i++) {
		inputss[i].addEventListener("change", onsubmit, false);
	}

	for (let i = 0; i < inputtype.length; i++) {
		inputtype[i].addEventListener("change", function () {
			julia.center = mandelbrot.center = new Point(0, 0);
			julia.pixelratio = mandelbrot.pixelratio = initialpixelratio;
			onsubmit(null);
		}, false);
	}

	for (let i = 0; i < fractalradio.length; i++) {
		fractalradio[i].addEventListener("change", function () { tutorial.setlevel(6) }, false);
	}

	setInterval(function () {
		let currentw = $(window).width()
		let currenth = $(window).height()
		if (currentw != windowwidth || currenth != windowheight) {
			onresizewindow()
		}
	}, 300)
}

function zoomincurrent() {
	let mandel = <HTMLInputElement>document.getElementById('radiomandel')
	if(mandel.checked) mandelbrot.zoomin(null)
	else julia.zoomin(null)
}

function zoomoutcurrent() {
	let mandel = <HTMLInputElement>document.getElementById('radiomandel')
	if(mandel.checked) mandelbrot.zoomout()
	else julia.zoomout()
}

function saveclick() {
	let canvas = <HTMLCanvasElement>$('.fakecheck:checked + label canvas')[0]
	var image = canvas.toDataURL("image/png");
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
	let inputs = <HTMLInputElement>document.getElementById("in_steps")
	let inputss = <NodeListOf<Element>>document.getElementsByName("supersampling")
	let inputtype = <NodeListOf<Element>>document.getElementsByName("type")

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

function onreset(e: MouseEvent) {
	julia.center = mandelbrot.center = new Point(0, 0);
	julia.pixelratio = mandelbrot.pixelratio = initialpixelratio;
	mandelbrot.redraw()
	julia.redraw()
}

init()