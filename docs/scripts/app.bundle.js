!function(t){function e(n){if(a[n])return a[n].exports;var r=a[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e,a){a(1),t.exports=a(13)},function(t,e,a){"use strict";function n(){var t=new Array;t.push(new y.GradData(0,new w.Color(0,0,0))),t.push(new y.GradData(99,new w.Color(255,255,255)));var e=new y.GradOptions(t,r,i);$.fn.grad=y.GradPlugin,$(".gradslider").grad(e),$(".colorpicker").minicolors({inline:!0,changeDelay:200,change:function(t,e){var a=new w.Color;a.parsehex(t),$(".gradslider").grad().setcolor(a),i($(".gradslider").grad().getgradient())}}),o(),s(t)}function r(t,e){$(".colorpicker").minicolors("value",e.color.tohex())}function i(t){v.setgradient(t),v.redraw(!1),f.setgradient(t),f.redraw(!1)}function s(t){C.width=B.width=$(window).width(),C.height=B.height=$(window).height(),v=new b.FractalBuilder("mandelbrot"),f=new x.JuliaBuilder("julia"),v.setcanvas(C),f.setcanvas(B),v.beforeevent=function(){return $(".label-mandel").addClass("loading")},v.afterevent=function(){return $(".label-mandel").removeClass("loading")},f.beforeevent=function(){return $(".label-julia").addClass("loading")},f.afterevent=function(){return $(".label-julia").removeClass("loading")},v.setgradient(t),f.setgradient(t),v.redraw(),f.redraw()}function o(){L.addEventListener("submit",h,!1),G.addEventListener("click",g,!1),C.addEventListener("click",p,!1),j.addEventListener("click",l,!1),M.addEventListener("click",c,!1),_.addEventListener("click",d,!1);for(var t=0;t<E.length;t++)E[t].addEventListener("change",h,!1);for(var t=0;t<I.length;t++)I[t].addEventListener("change",h,!1);setInterval(function(){var t=$(window).width(),e=$(window).height();t==A&&e==O||u()},300)}function d(){var t=$(".fakecheck:checked + label canvas")[0],e=t.toDataURL("image/png");e=e.replace(/^data:image\/[^;]*/,"data:application/octet-stream"),e=e.replace(/^data:application\/octet-stream/,"data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"),this.href=e}function l(){$(".gradslider").grad().addcolor(new w.Color(255,255,255));var t=$(".gradslider").grad().getgradient();i(t)}function c(){var t=$(".gradslider .handle.selected").index();$(".gradslider .handle.selected").remove(),$(".gradslider").grad().deletecolor(t);var e=$(".gradslider").grad().getgradient();i(e)}function u(){A=$(window).width(),O=$(window).height(),C.width=B.width=A,C.height=B.height=O,v.redraw(),f.redraw()}function h(t){v.steps=parseInt(D.value,10),f.steps=parseInt(D.value,10);for(var e=0;e<E.length;e++)E[e].checked&&(v.supersampling=parseInt(E[e].value,10),f.supersampling=parseInt(E[e].value,10));for(var e=0;e<I.length;e++)I[e].checked&&(v.type="mandelbrot"==I[e].value?"mandelbrot":"ship",f.type="mandelbrot"==I[e].value?"julia":"juliaship");var a=$(".gradslider").grad().getgradient();v.setgradient(a),f.setgradient(a),v.redraw(),f.redraw(),t.preventDefault()}function p(t){var e=m.getcoords(t,C,v.pixelratio,v.center);f.jconstant=e,f.redraw()}function g(t){f.center=v.center=new k.Point(0,0),f.pixelratio=v.pixelratio=.008,v.redraw(),f.redraw()}var v,f,m=a(2),y=a(4),w=a(6),b=a(9),x=a(12),k=a(3),C=document.getElementById("canvasm"),B=document.getElementById("canvasj"),D=document.getElementById("in_steps"),E=document.getElementsByName("supersampling"),I=document.getElementsByName("type"),G=document.getElementById("reset"),L=document.getElementById("mainform"),j=document.getElementById("addcolor"),M=document.getElementById("deletecolor"),_=document.getElementById("save"),A=$(window).width(),O=$(window).height();n()},function(t,e,a){"use strict";function n(t,e,a){return t/a*e}function r(t,e){var a=t.getBoundingClientRect(),n=t.width/a.width,r=t.height/a.height,i={x:(e.clientX-a.left)*n,y:(e.clientY-a.top)*r};return i}function i(t,e,a,n){var i=r(e,t);return new s.Point((i.x-e.width/2)*a+n.x,(e.height/2-i.y)*a+n.y)}var s=a(3);e.scaleto=n,e.getclickposition=r,e.getcoords=i},function(t,e){"use strict";var a=function(){function t(t,e){this.x=t,this.y=e}return t}();e.Point=a},function(t,e,a){"use strict";function n(t){var e=this,a=e.data("gradbw");return null==a&&(a=new s.GradBody(e,t),e.data("gradbw",a)),a}var r=a(5);e.GradData=r.GradData;var i=a(7);e.GradOptions=i.GradOptions;var s=a(8);e.GradBody=s.GradBody,e.GradPlugin=n},function(t,e,a){"use strict";var n=a(6);e.Color=n.Color;var r=function(){function t(t,e){void 0===e&&(e=new n.Color),this.value=t,this.color=e}return t}();e.GradData=r},function(t,e){"use strict";var a=function(){function t(t,e,a){void 0===t&&(t=0),void 0===e&&(e=0),void 0===a&&(a=0),this.r=t,this.g=e,this.b=a}return t.prototype.tohex=function(){var t=this.r.toString(16);t=t.length<2?"0"+t:t;var e=this.g.toString(16);e=e.length<2?"0"+e:e;var a=this.b.toString(16);return a=a.length<2?"0"+a:a,"#"+t+e+a},t.prototype.torgb=function(){return"rgb("+this.r+","+this.g+","+this.b+")"},t.prototype.parsehex=function(t){var e=t.substr(1,2),a=t.substr(3,2),n=t.substr(5,2);this.r=parseInt(e,16),this.g=parseInt(a,16),this.b=parseInt(n,16)},t}();e.Color=a},function(t,e){"use strict";var a=function(){function t(t,e,a){void 0===e&&(e=function(){}),void 0===a&&(a=function(){}),this.values=t,this.sliderclick=e,this.setgradient=a}return t}();e.GradOptions=a},function(t,e,a){"use strict";var n=a(5),r=a(6),i=function(){function t(t,e){this.datalabel="graddata",this.instance=t,this.sliderclick=e.sliderclick,this.setgradient=e.setgradient,this.values=e.values||[new n.GradData(0),new n.GradData(100,new r.Color(255,255,255))],this.render(),this.updatehandlespositions(),this.instance.find(".handle").first().addClass("selected")}return t.prototype.getgradient=function(){return _.orderBy(this.values,["value","asc"])},t.prototype.renderhtml=function(){var t=this;t.instance.addClass("bwslider");for(var e=t.instance.find(".handle");e.length<t.values.length;)t.instance.append($("<span>").addClass("handle").draggable({containment:"parent",axis:"x",drag:function(){t.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),t.updatevalues(),t.updatehandlesstyles(),t.updatecontrolgradient()},stop:function(){t.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),t.updatevalues(),t.updatehandlesstyles(),t.updatecontrolgradient(),t.setgradient(t.values)}}).click(function(){t.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),t.sliderclick(this,$(this).data(t.datalabel))})),e=t.instance.find(".handle")},t.prototype.sethandledata=function(){var t=this;t.instance.find(".handle").each(function(e){$(this).data(t.datalabel,t.values[e])})},t.prototype.updatehandlesstyles=function(){var t=this;t.instance.find(".handle").each(function(){var e=$(this).data(t.datalabel);$(this).css({background:e.color.tohex()})})},t.prototype.updatehandlespositions=function(){var t=this;t.instance.find(".handle").each(function(){var e=$(this).data(t.datalabel);$(this).css({left:e.value+"%"})})},t.prototype.updatecontrolgradient=function(){for(var t=this,e="",a=_.orderBy(t.values,["value","asc"]),n=0;n<a.length;n++)e+=", "+a[n].color.tohex()+" "+a[n].value+"%";t.instance.css("background-image","-webkit-linear-gradient(left "+e+")"),t.instance.css("background-image","-moz-linear-gradient(to right "+e+")"),t.instance.css("background-image","-o-linear-gradient(left "+e+")"),t.instance.css("background-image","linear-gradient(left "+e+")")},t.prototype.render=function(){var t=this;t.instance.addClass("bwslider"),t.renderhtml(),t.sethandledata(),t.updatehandlesstyles(),t.updatecontrolgradient()},t.prototype.updatevalues=function(){var t=this;t.instance.find(".handle").each(function(e){var a=$(this).data(t.datalabel);a.value=Math.floor($(this).position().left/t.instance.width()*100),$(this).data(t.datalabel,a),t.values[e]=a})},t.prototype.addcolor=function(t){var e=this;e.values.push(new n.GradData(50,t)),e.render(),e.updatehandlespositions(),e.instance.find(".handle").removeClass("selected"),e.instance.find(".handle").last().addClass("selected")},t.prototype.setcolor=function(t){var e=this,a=e.instance.find(".handle.selected");if(a.length>0){var n=a.data(e.datalabel);null!=n&&(n.color=t,a.data(e.datalabel,n),e.updatevalues(),e.updatehandlesstyles(),e.updatecontrolgradient())}},t.prototype.deletecolor=function(t){var e=this;e.values=_.remove(this.values,function(e,a){return a!=t}),e.render()},t.prototype.click=function(t){var e=this;e.sliderclick=t},t}();e.GradBody=i},function(t,e,a){"use strict";var n=a(2),r=a(10),i=a(3),s=a(11),o=function(){function t(t){this.type=t,this.center=new i.Point(0,0),this.steps=80,this.pixelratio=.008,this.supersampling=1,this.handleEvent=function(t){var e=t,a=t,r=this;if(r.ready)switch(t.type){case"mousedown":r.dragcoords=n.getclickposition(r.canvas,e);break;case"mousewheel":case"DOMMouseScroll":if("DOMMouseScroll"==t.type&&a.detail>0||"mousewheel"==t.type&&a.deltaY>0){var i=n.getcoords(e,r.canvas,r.pixelratio,r.center);r.zoomin(i)}else r.zoomout();a.preventDefault();break;case"mouseup":var s=n.getclickposition(r.canvas,e);r.drag(s)}};var e=this;e.ready=!0,e.dataparts=new Array,e.threadsnumber=navigator.hardwareConcurrency,"undefined"==typeof e.threadsnumber&&(e.threadsnumber=4),e.workers=[];for(var a=function(t){e.workers.push(new Worker("./scripts/worker.bundle.js")),e.workers[t].onmessage=function(a){var n=new r.ResponseData;n.data=new Uint32Array(a.data),n.threadid=t,e.dataparts.push(n),e.checkready()}},s=0;s<e.threadsnumber;s++)a(s)}return t.prototype.setcanvas=function(t){var e=this;e.canvas=t,e.canvas.addEventListener("mousedown",e,!1),e.canvas.addEventListener("mousewheel",e,!1),e.canvas.addEventListener("DOMMouseScroll",e,!1),e.canvas.addEventListener("mouseup",e,!1),e.canvas.addEventListener("gestureend",e,!1)},t.prototype.zoomin=function(t){this.center=t,this.pixelratio*=.5,this.redraw(!0)},t.prototype.zoomout=function(){2*this.pixelratio<=.008&&(this.pixelratio*=2),this.redraw(!0)},t.prototype.drag=function(t){if(null!=this.dragcoords){var e={x:this.dragcoords.x-t.x,y:this.dragcoords.y-t.y};this.center.x+=e.x*this.pixelratio,this.center.y-=e.y*this.pixelratio,this.redraw(!0)}},t.prototype.generate=function(){var t=this;t.timer=(new Date).getTime(),t.ready=!1;for(var e=Math.floor(t.canvas.height/t.threadsnumber),a={type:t.type,width:t.canvas.width,height:e,steps:t.steps,pixelratio:t.pixelratio,x:t.center.x,y:-t.center.y-t.pixelratio*e*(t.threadsnumber/2-.5),supersampling:t.supersampling},n=0;n<t.threadsnumber;n++)t.workers[n].postMessage(a),a.y+=t.pixelratio*e},t.prototype.checkready=function(){this.dataparts.length==this.threadsnumber&&(this.data=_.chain(this.dataparts).sortBy("threadid").map(function(t){return t.data}).value(),this.repaint(),this.dataparts=new Array,this.ready=!0,"undefined"!=typeof console&&console.log("\n\t\t\t\t\tType: "+this.type+"\n\t\t\t\t\tSubsampling: "+this.supersampling+" \n\t\t\t\t\tthreadsnumber: "+this.threadsnumber+"\n\t\t\t\t\tTime: "+((new Date).getTime()-this.timer)))},t.prototype.redraw=function(t){void 0===t&&(t=!0),this.ready&&(null!=this.beforeevent&&this.beforeevent(),t?this.generate():this.repaint())},t.prototype.repaint=function(){for(var t=this.canvas.getContext("2d"),e=this.canvas.width,a=this.canvas.height,n=t.createImageData(e,a),r=0,i=0;i<this.data.length;i++)for(var s=0;s<this.data[i].length;s++)n.data[r++]=this.redcolorchanel[this.data[i][s]],n.data[r++]=this.greencolorchanel[this.data[i][s]],n.data[r++]=this.bluecolorchanel[this.data[i][s]],n.data[r++]=255;t.putImageData(n,0,0),null!=this.afterevent&&this.afterevent()},t.prototype.setgradient=function(t){this.redcolorchanel=new Int16Array(this.steps+1),this.greencolorchanel=new Int16Array(this.steps+1),this.bluecolorchanel=new Int16Array(this.steps+1);for(var e=new s.ColorComputer(t),a=0;a<=this.steps;a++){var n=e.getcolor(this.steps,a);this.redcolorchanel[a]=n.r,this.greencolorchanel[a]=n.g,this.bluecolorchanel[a]=n.b}},t}();e.FractalBuilder=o},function(t,e){"use strict";var a=function(){function t(){}return t}();e.ResponseData=a},function(t,e,a){"use strict";var n=a(5),r=a(6),i=function(){function t(t){if(t=_.orderBy(t,["value"]),t[0].value>0){var e=new Array;e.push(new n.GradData(0,t[0].color)),t=e.concat(t)}if(t[t.length-1].value<100){var a=new Array;a.push(new n.GradData(100,t[t.length-1].color)),t=t.concat(a)}t=_.chain(t).groupBy("value").map(function(t){return t[0]}).value(),this.gradient=t}return t.prototype.getcolor=function(t,e){var a=e/t*100,n=this.getedges(a),i=n[0].value-n[1].value,s=n[0].value+n[1].value,o=(n[0].color.r-n[1].color.r)/i,d=(n[0].color.r+n[1].color.r-o*s)/2,l=function(t){return t*o+d},c=(n[0].color.g-n[1].color.g)/i,u=(n[0].color.g+n[1].color.g-c*s)/2,h=function(t){return t*c+u},p=(n[0].color.b-n[1].color.b)/i,g=(n[0].color.b+n[1].color.b-p*s)/2,v=function(t){return t*p+g};return new r.Color(l(e),h(e),v(e))},t.prototype.getedges=function(t){return 100==t?[this.gradient[this.gradient.length-2],this.gradient[this.gradient.length-1]]:[_.findLast(this.gradient,function(e){return e.value<=t}),_.find(this.gradient,function(e){return e.value>t})]},t}();e.ColorComputer=i},function(t,e,a){"use strict";var n=this&&this.__extends||function(t,e){function a(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)},r=a(9),i=a(3),s=function(t){function e(e){t.call(this,e),this.jconstant=new i.Point(.12,.63)}return n(e,t),e.prototype.generate=function(){var t=this;t.timer=(new Date).getTime(),t.ready=!1;for(var e=Math.floor(t.canvas.height/t.threadsnumber),a={type:t.type,width:t.canvas.width,height:e,steps:t.steps,pixelratio:t.pixelratio,x:t.center.x,y:-t.center.y-t.pixelratio*e*(t.threadsnumber/2-.5),supersampling:t.supersampling,cx:t.jconstant.x,cy:-t.jconstant.y},n=0;n<t.threadsnumber;n++)t.workers[n].postMessage(a),a.y+=t.pixelratio*e},e}(r.FractalBuilder);e.JuliaBuilder=s},function(t,e){}]);
//# sourceMappingURL=app.bundle.js.map