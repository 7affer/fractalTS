!function(e){function t(n){if(a[n])return a[n].exports;var r=a[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){a(1),e.exports=a(13)},function(e,t,a){"use strict";function n(){var e=new Array;e.push(new y.GradData(0,new m.Color(0,0,0))),e.push(new y.GradData(99,new m.Color(255,255,255)));var t=new y.GradOptions(e,r,i);$.fn.grad=y.GradPlugin,$(".gradslider").grad(t),$(".colorpicker").minicolors({inline:!0,changeDelay:200,change:function(e,t){var a=new m.Color;a.parsehex(e),$(".gradslider").grad().setcolor(a),i($(".gradslider").grad().getgradient())}}),o(),s(e)}function r(e,t){$(".colorpicker").minicolors("value",t.color.tohex())}function i(e){v.setgradient(e),v.redraw(!1),f.setgradient(e),f.redraw(!1)}function s(e){C.width=B.width=$(window).width(),C.height=B.height=$(window).height(),v=new b.FractalBuilder("mandelbrot"),f=new x.JuliaBuilder("julia"),v.setcanvas(C),f.setcanvas(B),v.beforeevent=function(){return $(".label-mandel").addClass("loading")},v.afterevent=function(){return $(".label-mandel").removeClass("loading")},f.beforeevent=function(){return $(".label-julia").addClass("loading")},f.afterevent=function(){return $(".label-julia").removeClass("loading")},v.setgradient(e),f.setgradient(e),v.redraw(),f.redraw()}function o(){L.addEventListener("submit",h,!1),G.addEventListener("click",g,!1),C.addEventListener("click",p,!1),j.addEventListener("click",l,!1),M.addEventListener("click",c,!1),_.addEventListener("click",d,!1);for(var e=0;e<E.length;e++)E[e].addEventListener("change",h,!1);for(var e=0;e<I.length;e++)I[e].addEventListener("change",h,!1);setInterval(function(){var e=$(window).width(),t=$(window).height();e==A&&t==O||u()},300)}function d(){var e=($(".fakecheck:checked + label canvas")[0],C.toDataURL("image/png"));e=e.replace(/^data:image\/[^;]*/,"data:application/octet-stream"),e=e.replace(/^data:application\/octet-stream/,"data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"),this.href=e}function l(){$(".gradslider").grad().addcolor(new m.Color(255,255,255));var e=$(".gradslider").grad().getgradient();i(e)}function c(){var e=$(".gradslider .handle.selected").index();$(".gradslider .handle.selected").remove(),$(".gradslider").grad().deletecolor(e);var t=$(".gradslider").grad().getgradient();i(t)}function u(){A=$(window).width(),O=$(window).height(),C.width=B.width=A,C.height=B.height=O,v.redraw(),f.redraw()}function h(e){v.steps=parseInt(D.value,10),f.steps=parseInt(D.value,10);for(var t=0;t<E.length;t++)E[t].checked&&(v.supersampling=parseInt(E[t].value,10),f.supersampling=parseInt(E[t].value,10));for(var t=0;t<I.length;t++)I[t].checked&&(v.type="mandelbrot"==I[t].value?"mandelbrot":"ship",f.type="mandelbrot"==I[t].value?"julia":"juliaship");var a=$(".gradslider").grad().getgradient();v.setgradient(a),f.setgradient(a),v.redraw(),f.redraw(),e.preventDefault()}function p(e){var t=w.getcoords(e,C,v.pixelratio,v.center);f.jconstant=t,f.redraw()}function g(e){f.center=v.center=new k.Point(0,0),f.pixelratio=v.pixelratio=.008,v.redraw(),f.redraw()}var v,f,w=a(2),y=a(4),m=a(6),b=a(9),x=a(12),k=a(3),C=document.getElementById("canvasm"),B=document.getElementById("canvasj"),D=document.getElementById("in_steps"),E=document.getElementsByName("supersampling"),I=document.getElementsByName("type"),G=document.getElementById("reset"),L=document.getElementById("mainform"),j=document.getElementById("addcolor"),M=document.getElementById("deletecolor"),_=document.getElementById("save"),A=$(window).width(),O=$(window).height();n()},function(e,t,a){"use strict";function n(e,t,a){return e/a*t}function r(e,t){var a=e.getBoundingClientRect(),n=e.width/a.width,r=e.height/a.height,i={x:(t.clientX-a.left)*n,y:(t.clientY-a.top)*r};return i}function i(e,t,a,n){var i=r(t,e);return new s.Point((i.x-t.width/2)*a+n.x,(t.height/2-i.y)*a+n.y)}var s=a(3);t.scaleto=n,t.getclickposition=r,t.getcoords=i},function(e,t){"use strict";var a=function(){function e(e,t){this.x=e,this.y=t}return e}();t.Point=a},function(e,t,a){"use strict";function n(e){var t=this,a=t.data("gradbw");return null==a&&(a=new s.GradBody(t,e),t.data("gradbw",a)),a}var r=a(5);t.GradData=r.GradData;var i=a(7);t.GradOptions=i.GradOptions;var s=a(8);t.GradBody=s.GradBody,t.GradPlugin=n},function(e,t,a){"use strict";var n=a(6);t.Color=n.Color;var r=function(){function e(e,t){void 0===t&&(t=new n.Color),this.value=e,this.color=t}return e}();t.GradData=r},function(e,t){"use strict";var a=function(){function e(e,t,a){void 0===e&&(e=0),void 0===t&&(t=0),void 0===a&&(a=0),this.r=e,this.g=t,this.b=a}return e.prototype.tohex=function(){var e=this.r.toString(16);e=e.length<2?"0"+e:e;var t=this.g.toString(16);t=t.length<2?"0"+t:t;var a=this.b.toString(16);return a=a.length<2?"0"+a:a,"#"+e+t+a},e.prototype.torgb=function(){return"rgb("+this.r+","+this.g+","+this.b+")"},e.prototype.parsehex=function(e){var t=e.substr(1,2),a=e.substr(3,2),n=e.substr(5,2);this.r=parseInt(t,16),this.g=parseInt(a,16),this.b=parseInt(n,16)},e}();t.Color=a},function(e,t){"use strict";var a=function(){function e(e,t,a){void 0===t&&(t=function(){}),void 0===a&&(a=function(){}),this.values=e,this.sliderclick=t,this.setgradient=a}return e}();t.GradOptions=a},function(e,t,a){"use strict";var n=a(5),r=a(6),i=function(){function e(e,t){this.datalabel="graddata",this.instance=e,this.sliderclick=t.sliderclick,this.setgradient=t.setgradient,this.values=t.values||[new n.GradData(0),new n.GradData(100,new r.Color(255,255,255))],this.render(),this.updatehandlespositions(),this.instance.find(".handle").first().addClass("selected")}return e.prototype.getgradient=function(){return _.orderBy(this.values,["value","asc"])},e.prototype.renderhtml=function(){var e=this;e.instance.addClass("bwslider");for(var t=e.instance.find(".handle");t.length<e.values.length;)e.instance.append($("<span>").addClass("handle").draggable({containment:"parent",axis:"x",drag:function(){e.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),e.updatevalues(),e.updatehandlesstyles(),e.updatecontrolgradient()},stop:function(){e.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),e.updatevalues(),e.updatehandlesstyles(),e.updatecontrolgradient(),e.setgradient(e.values)}}).click(function(){e.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),e.sliderclick(this,$(this).data(e.datalabel))})),t=e.instance.find(".handle")},e.prototype.sethandledata=function(){var e=this;e.instance.find(".handle").each(function(t){$(this).data(e.datalabel,e.values[t])})},e.prototype.updatehandlesstyles=function(){var e=this;e.instance.find(".handle").each(function(){var t=$(this).data(e.datalabel);$(this).css({background:t.color.tohex()})})},e.prototype.updatehandlespositions=function(){var e=this;e.instance.find(".handle").each(function(){var t=$(this).data(e.datalabel);$(this).css({left:t.value+"%"})})},e.prototype.updatecontrolgradient=function(){for(var e=this,t="",a=_.orderBy(e.values,["value","asc"]),n=0;n<a.length;n++)t+=", "+a[n].color.tohex()+" "+a[n].value+"%";e.instance.css("background-image","-webkit-linear-gradient(left "+t+")"),e.instance.css("background-image","-moz-linear-gradient(to right "+t+")"),e.instance.css("background-image","-o-linear-gradient(left "+t+")"),e.instance.css("background-image","linear-gradient(left "+t+")")},e.prototype.render=function(){var e=this;e.instance.addClass("bwslider"),e.renderhtml(),e.sethandledata(),e.updatehandlesstyles(),e.updatecontrolgradient()},e.prototype.updatevalues=function(){var e=this;e.instance.find(".handle").each(function(t){var a=$(this).data(e.datalabel);a.value=Math.floor($(this).position().left/e.instance.width()*100),$(this).data(e.datalabel,a),e.values[t]=a})},e.prototype.addcolor=function(e){var t=this;t.values.push(new n.GradData(50,e)),t.render(),t.updatehandlespositions(),t.instance.find(".handle").removeClass("selected"),t.instance.find(".handle").last().addClass("selected")},e.prototype.setcolor=function(e){var t=this,a=t.instance.find(".handle.selected");if(a.length>0){var n=a.data(t.datalabel);null!=n&&(n.color=e,a.data(t.datalabel,n),t.updatevalues(),t.updatehandlesstyles(),t.updatecontrolgradient())}},e.prototype.deletecolor=function(e){var t=this;t.values=_.remove(this.values,function(t,a){return a!=e}),t.render()},e.prototype.click=function(e){var t=this;t.sliderclick=e},e}();t.GradBody=i},function(e,t,a){"use strict";var n=a(2),r=a(10),i=a(3),s=a(11),o=function(){function e(e){this.type=e,this.center=new i.Point(0,0),this.steps=80,this.pixelratio=.008,this.supersampling=1,this.handleEvent=function(e){var t=e,a=e,r=this;if(r.ready)switch(e.type){case"mousedown":r.dragcoords=n.getclickposition(r.canvas,t);break;case"mousewheel":case"DOMMouseScroll":if("DOMMouseScroll"==e.type&&a.detail>0||"mousewheel"==e.type&&a.deltaY>0){var i=n.getcoords(t,r.canvas,r.pixelratio,r.center);r.center=i,r.pixelratio*=.5}else 2*r.pixelratio<=.008&&(r.pixelratio*=2);r.redraw(!0),a.preventDefault();break;case"mouseup":var s=n.getclickposition(r.canvas,t);if(null!=r.dragcoords){var o={x:r.dragcoords.x-s.x,y:r.dragcoords.y-s.y};r.center.x+=o.x*r.pixelratio,r.center.y-=o.y*r.pixelratio,r.redraw(!0)}}};var t=this;t.ready=!0,t.dataparts=new Array,t.threadsnumber=navigator.hardwareConcurrency,"undefined"==typeof t.threadsnumber&&(t.threadsnumber=4),t.workers=[];for(var a=function(e){t.workers.push(new Worker("./scripts/worker.bundle.js")),t.workers[e].onmessage=function(a){var n=new r.ResponseData;n.data=new Uint32Array(a.data),n.threadid=e,t.dataparts.push(n),t.checkready()}},s=0;s<t.threadsnumber;s++)a(s)}return e.prototype.setcanvas=function(e){var t=this;t.canvas=e,t.canvas.addEventListener("mousedown",t,!1),t.canvas.addEventListener("mousewheel",t,!1),t.canvas.addEventListener("DOMMouseScroll",t,!1),t.canvas.addEventListener("mouseup",t,!1)},e.prototype.generate=function(){var e=this;e.timer=(new Date).getTime(),e.ready=!1;for(var t=Math.floor(e.canvas.height/e.threadsnumber),a={type:e.type,width:e.canvas.width,height:t,steps:e.steps,pixelratio:e.pixelratio,x:e.center.x,y:-e.center.y-e.pixelratio*t*(e.threadsnumber/2-.5),supersampling:e.supersampling},n=0;n<e.threadsnumber;n++)e.workers[n].postMessage(a),a.y+=e.pixelratio*t},e.prototype.checkready=function(){this.dataparts.length==this.threadsnumber&&(this.data=_.chain(this.dataparts).sortBy("threadid").map(function(e){return e.data}).value(),this.repaint(),this.dataparts=new Array,this.ready=!0,"undefined"!=typeof console&&console.log("\n\t\t\t\t\tType: "+this.type+"\n\t\t\t\t\tSubsampling: "+this.supersampling+" \n\t\t\t\t\tthreadsnumber: "+this.threadsnumber+"\n\t\t\t\t\tTime: "+((new Date).getTime()-this.timer)))},e.prototype.redraw=function(e){void 0===e&&(e=!0),this.ready&&(null!=this.beforeevent&&this.beforeevent(),e?this.generate():this.repaint())},e.prototype.repaint=function(){for(var e=this.canvas.getContext("2d"),t=this.canvas.width,a=this.canvas.height,n=e.createImageData(t,a),r=0,i=0;i<this.data.length;i++)for(var s=0;s<this.data[i].length;s++)n.data[r++]=this.redcolorchanel[this.data[i][s]],n.data[r++]=this.greencolorchanel[this.data[i][s]],n.data[r++]=this.bluecolorchanel[this.data[i][s]],n.data[r++]=255;e.putImageData(n,0,0),null!=this.afterevent&&this.afterevent()},e.prototype.setgradient=function(e){this.redcolorchanel=new Int16Array(this.steps+1),this.greencolorchanel=new Int16Array(this.steps+1),this.bluecolorchanel=new Int16Array(this.steps+1);for(var t=new s.ColorComputer(e),a=0;a<=this.steps;a++){var n=t.getcolor(this.steps,a);this.redcolorchanel[a]=n.r,this.greencolorchanel[a]=n.g,this.bluecolorchanel[a]=n.b}},e}();t.FractalBuilder=o},function(e,t){"use strict";var a=function(){function e(){}return e}();t.ResponseData=a},function(e,t,a){"use strict";var n=a(5),r=a(6),i=function(){function e(e){if(e=_.orderBy(e,["value"]),e[0].value>0){var t=new Array;t.push(new n.GradData(0,e[0].color)),e=t.concat(e)}if(e[e.length-1].value<100){var a=new Array;a.push(new n.GradData(100,e[e.length-1].color)),e=e.concat(a)}e=_.chain(e).groupBy("value").map(function(e){return e[0]}).value(),this.gradient=e}return e.prototype.getcolor=function(e,t){var a=t/e*100,n=this.getedges(a),i=n[0].value-n[1].value,s=n[0].value+n[1].value,o=(n[0].color.r-n[1].color.r)/i,d=(n[0].color.r+n[1].color.r-o*s)/2,l=function(e){return e*o+d},c=(n[0].color.g-n[1].color.g)/i,u=(n[0].color.g+n[1].color.g-c*s)/2,h=function(e){return e*c+u},p=(n[0].color.b-n[1].color.b)/i,g=(n[0].color.b+n[1].color.b-p*s)/2,v=function(e){return e*p+g};return new r.Color(l(t),h(t),v(t))},e.prototype.getedges=function(e){return 100==e?[this.gradient[this.gradient.length-2],this.gradient[this.gradient.length-1]]:[_.findLast(this.gradient,function(t){return t.value<=e}),_.find(this.gradient,function(t){return t.value>e})]},e}();t.ColorComputer=i},function(e,t,a){"use strict";var n=this&&this.__extends||function(e,t){function a(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)},r=a(9),i=a(3),s=function(e){function t(t){e.call(this,t),this.jconstant=new i.Point(.12,.63)}return n(t,e),t.prototype.generate=function(){var e=this;e.timer=(new Date).getTime(),e.ready=!1;for(var t=Math.floor(e.canvas.height/e.threadsnumber),a={type:e.type,width:e.canvas.width,height:t,steps:e.steps,pixelratio:e.pixelratio,x:e.center.x,y:-e.center.y-e.pixelratio*t*(e.threadsnumber/2-.5),supersampling:e.supersampling,cx:e.jconstant.x,cy:-e.jconstant.y},n=0;n<e.threadsnumber;n++)e.workers[n].postMessage(a),a.y+=e.pixelratio*t},t}(r.FractalBuilder);t.JuliaBuilder=s},function(e,t){}]);
//# sourceMappingURL=app.bundle.js.map