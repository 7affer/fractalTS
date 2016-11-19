!function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1),e.exports=n(14)},function(e,t,n){"use strict";function a(){var e=new Array;e.push(new w.GradData(0,new b.Color(0,0,0))),e.push(new w.GradData(99,new b.Color(255,255,255)));var t=new w.GradOptions(e,r,i);$.fn.grad=w.GradPlugin,$(".gradslider").grad(t),$(".colorpicker").minicolors({inline:!0,changeDelay:200,change:function(e,t){var n=new b.Color;n.parsehex(e),$(".gradslider").grad().setcolor(n),i($(".gradslider").grad().getgradient())}}),L.setlevel(1),l(),o(e)}function r(e,t){$(".colorpicker").minicolors("value",t.color.tohex())}function i(e){m.setgradient(e),m.redraw(!1),y.setgradient(e),y.redraw(!1)}function o(e){E.width=I.width=$(window).width(),E.height=I.height=$(window).height(),m=new x.FractalBuilder("mandelbrot"),y=new k.JuliaBuilder("julia"),m.setcanvas(E),y.setcanvas(I),m.beforeevent=function(){return $(".label-mandel").addClass("loading")},m.afterevent=function(){return $(".label-mandel").removeClass("loading")},y.beforeevent=function(){return $(".label-julia").addClass("loading")},y.afterevent=function(){return $(".label-julia").removeClass("loading")},m.setgradient(e),y.setgradient(e),m.redraw(),y.redraw(),m.onzoomin=function(){L.setlevel(2)},m.onzoomout=function(){L.setlevel(3)},m.ondrag=function(){L.setlevel(4)},m.onclick=s,y.onzoomin=function(){L.setlevel(2)},y.onzoomout=function(){L.setlevel(3)},y.ondrag=function(){L.setlevel(4)}}function s(e){y.jconstant=e,y.center=new C.Point(0,0),y.pixelratio=D,y.redraw(),L.setlevel(5)}function l(){var e=document.getElementsByName("supersampling"),t=document.getElementsByName("type"),n=document.getElementById("reset"),a=document.getElementById("mainform"),r=document.getElementById("addcolor"),i=document.getElementById("deletecolor"),o=document.getElementById("save"),s=document.getElementsByName("fakecheck"),l=document.getElementById("menu-toggle"),w=document.getElementById("zoomin"),b=document.getElementById("zoomout");a.addEventListener("submit",v,!1),n.addEventListener("click",f,!1),r.addEventListener("click",h,!1),i.addEventListener("click",p,!1),o.addEventListener("click",u,!1),l.addEventListener("click",function(){L.setlevel(7)},!1),w.addEventListener("click",d,!1),b.addEventListener("click",c,!1);for(var x=0;x<e.length;x++)e[x].addEventListener("change",v,!1);for(var x=0;x<t.length;x++)t[x].addEventListener("change",function(){y.center=m.center=new C.Point(0,0),y.pixelratio=m.pixelratio=D,v(null)},!1);for(var x=0;x<s.length;x++)s[x].addEventListener("change",function(){L.setlevel(6)},!1);setInterval(function(){var e=$(window).width(),t=$(window).height();e==z&&t==G||g()},300)}function d(){var e=document.getElementById("radiomandel");e.checked?m.zoomin(null):y.zoomin(null)}function c(){var e=document.getElementById("radiomandel");e.checked?m.zoomout():y.zoomout()}function u(){var e=$(".fakecheck:checked + label canvas")[0],t=e.toDataURL("image/png");t=t.replace(/^data:image\/[^;]*/,"data:application/octet-stream"),t=t.replace(/^data:application\/octet-stream/,"data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"),this.href=t}function h(){$(".gradslider").grad().addcolor(new b.Color(255,255,255));var e=$(".gradslider").grad().getgradient();i(e)}function p(){var e=$(".gradslider .handle.selected").index();$(".gradslider .handle.selected").remove(),$(".gradslider").grad().deletecolor(e);var t=$(".gradslider").grad().getgradient();i(t)}function g(){z=$(window).width(),G=$(window).height(),E.width=I.width=z,E.height=I.height=G,m.redraw(),y.redraw()}function v(e){var t=document.getElementById("in_steps"),n=document.getElementsByName("supersampling"),a=document.getElementsByName("type");m.steps=parseInt(t.value,10),y.steps=parseInt(t.value,10);for(var r=0;r<n.length;r++)n[r].checked&&(m.supersampling=parseInt(n[r].value,10),y.supersampling=parseInt(n[r].value,10));for(var r=0;r<a.length;r++)a[r].checked&&(m.type="mandelbrot"==a[r].value?"mandelbrot":"ship",y.type="mandelbrot"==a[r].value?"julia":"juliaship");var i=$(".gradslider").grad().getgradient();m.setgradient(i),y.setgradient(i),m.redraw(),y.redraw(),e.preventDefault()}function f(e){y.center=m.center=new C.Point(0,0),y.pixelratio=m.pixelratio=D,m.redraw(),y.redraw()}var m,y,w=n(4),b=n(6),x=n(9),k=n(12),C=n(3),B=n(13),E=document.getElementById("canvasm"),I=document.getElementById("canvasj"),D=.008,z=$(window).width(),G=$(window).height(),L=new B.Tutorial(".tutorial-message");a()},function(e,t,n){"use strict";function a(e,t,n){return e/n*t}function r(e,t){var n=e.getBoundingClientRect(),a=e.width/n.width,r=e.height/n.height,i={x:(t.clientX-n.left)*a,y:(t.clientY-n.top)*r};return i}function i(e,t,n,a){var i=r(t,e);return new s.Point((i.x-t.width/2)*n+a.x,(t.height/2-i.y)*n+a.y)}function o(e,t,n,a){return new s.Point((e.x-t.width/2)*n+a.x,(t.height/2-e.y)*n+a.y)}var s=n(3);t.scaleto=a,t.getclickposition=r,t.getcoords=i,t.getcoordsfrompoint=o},function(e,t){"use strict";var n=function(){function e(e,t){this.x=e,this.y=t}return e}();t.Point=n},function(e,t,n){"use strict";function a(e){var t=this,n=t.data("gradbw");return null==n&&(n=new o.GradBody(t,e),t.data("gradbw",n)),n}var r=n(5);t.GradData=r.GradData;var i=n(7);t.GradOptions=i.GradOptions;var o=n(8);t.GradBody=o.GradBody,t.GradPlugin=a},function(e,t,n){"use strict";var a=n(6);t.Color=a.Color;var r=function(){function e(e,t){void 0===t&&(t=new a.Color),this.value=e,this.color=t}return e}();t.GradData=r},function(e,t){"use strict";var n=function(){function e(e,t,n){void 0===e&&(e=0),void 0===t&&(t=0),void 0===n&&(n=0),this.r=e,this.g=t,this.b=n}return e.prototype.tohex=function(){var e=this.r.toString(16);e=e.length<2?"0"+e:e;var t=this.g.toString(16);t=t.length<2?"0"+t:t;var n=this.b.toString(16);return n=n.length<2?"0"+n:n,"#"+e+t+n},e.prototype.torgb=function(){return"rgb("+this.r+","+this.g+","+this.b+")"},e.prototype.parsehex=function(e){var t=e.substr(1,2),n=e.substr(3,2),a=e.substr(5,2);this.r=parseInt(t,16),this.g=parseInt(n,16),this.b=parseInt(a,16)},e}();t.Color=n},function(e,t){"use strict";var n=function(){function e(e,t,n){void 0===t&&(t=function(){}),void 0===n&&(n=function(){}),this.values=e,this.sliderclick=t,this.setgradient=n}return e}();t.GradOptions=n},function(e,t,n){"use strict";var a=n(5),r=n(6),i=function(){function e(e,t){this.datalabel="graddata",this.instance=e,this.sliderclick=t.sliderclick,this.setgradient=t.setgradient,this.values=t.values||[new a.GradData(0),new a.GradData(100,new r.Color(255,255,255))],this.render(),this.updatehandlespositions(),this.instance.find(".handle").first().addClass("selected")}return e.prototype.getgradient=function(){return _.orderBy(this.values,["value","asc"])},e.prototype.renderhtml=function(){var e=this;e.instance.addClass("bwslider");for(var t=e.instance.find(".handle");t.length<e.values.length;)e.instance.append($("<span>").addClass("handle").draggable({containment:"parent",axis:"x",drag:function(){e.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),e.updatevalues(),e.updatehandlesstyles(),e.updatecontrolgradient()},stop:function(){e.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),e.updatevalues(),e.updatehandlesstyles(),e.updatecontrolgradient(),e.setgradient(e.values)}}).click(function(){e.instance.find(".handle").removeClass("selected"),$(this).addClass("selected"),e.sliderclick(this,$(this).data(e.datalabel))})),t=e.instance.find(".handle")},e.prototype.sethandledata=function(){var e=this;e.instance.find(".handle").each(function(t){$(this).data(e.datalabel,e.values[t])})},e.prototype.updatehandlesstyles=function(){var e=this;e.instance.find(".handle").each(function(){var t=$(this).data(e.datalabel);$(this).css({background:t.color.tohex()})})},e.prototype.updatehandlespositions=function(){var e=this;e.instance.find(".handle").each(function(){var t=$(this).data(e.datalabel);$(this).css({left:t.value+"%"})})},e.prototype.updatecontrolgradient=function(){for(var e=this,t="",n=_.orderBy(e.values,["value","asc"]),a=0;a<n.length;a++)t+=", "+n[a].color.tohex()+" "+n[a].value+"%";e.instance.css("background-image","-webkit-linear-gradient(left "+t+")"),e.instance.css("background-image","-moz-linear-gradient(to right "+t+")"),e.instance.css("background-image","-o-linear-gradient(left "+t+")"),e.instance.css("background-image","linear-gradient(left "+t+")")},e.prototype.render=function(){var e=this;e.instance.addClass("bwslider"),e.renderhtml(),e.sethandledata(),e.updatehandlesstyles(),e.updatecontrolgradient()},e.prototype.updatevalues=function(){var e=this;e.instance.find(".handle").each(function(t){var n=$(this).data(e.datalabel);n.value=Math.floor($(this).position().left/e.instance.width()*100),$(this).data(e.datalabel,n),e.values[t]=n})},e.prototype.addcolor=function(e){var t=this;t.values.push(new a.GradData(50,e)),t.render(),t.updatehandlespositions(),t.instance.find(".handle").removeClass("selected"),t.instance.find(".handle").last().addClass("selected")},e.prototype.setcolor=function(e){var t=this,n=t.instance.find(".handle.selected");if(n.length>0){var a=n.data(t.datalabel);null!=a&&(a.color=e,n.data(t.datalabel,a),t.updatevalues(),t.updatehandlesstyles(),t.updatecontrolgradient())}},e.prototype.deletecolor=function(e){var t=this;t.values=_.remove(this.values,function(t,n){return n!=e}),t.render()},e.prototype.click=function(e){var t=this;t.sliderclick=e},e}();t.GradBody=i},function(e,t,n){"use strict";var a=n(2),r=n(10),i=n(3),o=n(11),s=function(){function e(e){this.type=e,this.center=new i.Point(0,0),this.steps=80,this.pixelratio=.008,this.supersampling=1,this.hammerevents=function(e,t){console.log("type: "+e.type+", point: "+e.center.x+" "+e.center.y+", delta: "+e.deltaX+" "+e.deltaY);var n=a.getcoordsfrompoint(e.center,t.canvas,t.pixelratio,t.center);switch(e.type){case"tap":t.onclick(n);break;case"pinchend":e.scale>1?t.zoomin(n):t.zoomout();break;case"panend":t.drag(new i.Point(-e.deltaX*t.pixelratio,-e.deltaY*t.pixelratio))}},this.handleEvent=function(e){var t=e,n=e,r=this,i=a.getcoords(t,r.canvas,r.pixelratio,r.center);if(r.ready)switch(e.type){case"mousewheel":n.deltaY>0?r.zoomout():r.zoomin(i),n.preventDefault();break;case"DOMMouseScroll":n.detail>0?r.zoomout():r.zoomin(i),n.preventDefault()}};var t=this;t.ready=!0,t.dataparts=new Array,t.threadsnumber=navigator.hardwareConcurrency,"undefined"==typeof t.threadsnumber&&(t.threadsnumber=4),t.workers=[];for(var n=function(e){t.workers.push(new Worker("./scripts/worker.bundle.js")),t.workers[e].onmessage=function(n){var a=new r.ResponseData;a.data=new Uint32Array(n.data),a.threadid=e,t.dataparts.push(a),t.checkready()}},o=0;o<t.threadsnumber;o++)n(o)}return e.prototype.setcanvas=function(e){var t=this;t.canvas=e;var n=new Hammer(e);n.get("pan").set({direction:Hammer.DIRECTION_ALL}),n.on("pinchend tap panend",function(e){t.hammerevents(e,t)}),t.canvas.addEventListener("mousewheel",t,!1),t.canvas.addEventListener("DOMMouseScroll",t,!1)},e.prototype.zoomin=function(e){null!=e&&(this.center=e),this.pixelratio*=.5,this.redraw(!0),this.onzoomin()},e.prototype.zoomout=function(){2*this.pixelratio<=.008&&(this.pixelratio*=2,this.redraw(!0),this.onzoomout())},e.prototype.drag=function(e){this.center.x+=e.x,this.center.y-=e.y,this.redraw(!0),this.ondrag()},e.prototype.generate=function(){var e=this;e.timer=(new Date).getTime(),e.ready=!1;for(var t=Math.floor(e.canvas.height/e.threadsnumber),n={type:e.type,width:e.canvas.width,height:t,steps:e.steps,pixelratio:e.pixelratio,x:e.center.x,y:-e.center.y-e.pixelratio*t*(e.threadsnumber/2-.5),supersampling:e.supersampling},a=0;a<e.threadsnumber;a++)e.workers[a].postMessage(n),n.y+=e.pixelratio*t},e.prototype.checkready=function(){this.dataparts.length==this.threadsnumber&&(this.data=_.chain(this.dataparts).sortBy("threadid").map(function(e){return e.data}).value(),this.repaint(),this.dataparts=new Array,this.ready=!0)},e.prototype.redraw=function(e){void 0===e&&(e=!0),this.ready&&(null!=this.beforeevent&&this.beforeevent(),e?this.generate():this.repaint())},e.prototype.repaint=function(){for(var e=this.canvas.getContext("2d"),t=this.canvas.width,n=this.canvas.height,a=e.createImageData(t,n),r=0,i=0;i<this.data.length;i++)for(var o=0;o<this.data[i].length;o++)a.data[r++]=this.redcolorchanel[this.data[i][o]],a.data[r++]=this.greencolorchanel[this.data[i][o]],a.data[r++]=this.bluecolorchanel[this.data[i][o]],a.data[r++]=255;e.putImageData(a,0,0),null!=this.afterevent&&this.afterevent()},e.prototype.setgradient=function(e){this.redcolorchanel=new Int16Array(this.steps+1),this.greencolorchanel=new Int16Array(this.steps+1),this.bluecolorchanel=new Int16Array(this.steps+1);for(var t=new o.ColorComputer(e),n=0;n<=this.steps;n++){var a=t.getcolor(this.steps,n);this.redcolorchanel[n]=a.r,this.greencolorchanel[n]=a.g,this.bluecolorchanel[n]=a.b}},e}();t.FractalBuilder=s},function(e,t){"use strict";var n=function(){function e(){}return e}();t.ResponseData=n},function(e,t,n){"use strict";var a=n(5),r=n(6),i=function(){function e(e){if(e=_.orderBy(e,["value"]),e[0].value>0){var t=new Array;t.push(new a.GradData(0,e[0].color)),e=t.concat(e)}if(e[e.length-1].value<100){var n=new Array;n.push(new a.GradData(100,e[e.length-1].color)),e=e.concat(n)}e=_.chain(e).groupBy("value").map(function(e){return e[0]}).value(),this.gradient=e}return e.prototype.getcolor=function(e,t){var n=t/e*100,a=this.getedges(n),i=a[0].value-a[1].value,o=a[0].value+a[1].value,s=(a[0].color.r-a[1].color.r)/i,l=(a[0].color.r+a[1].color.r-s*o)/2,d=function(e){return e*s+l},c=(a[0].color.g-a[1].color.g)/i,u=(a[0].color.g+a[1].color.g-c*o)/2,h=function(e){return e*c+u},p=(a[0].color.b-a[1].color.b)/i,g=(a[0].color.b+a[1].color.b-p*o)/2,v=function(e){return e*p+g};return new r.Color(d(t),h(t),v(t))},e.prototype.getedges=function(e){return 100==e?[this.gradient[this.gradient.length-2],this.gradient[this.gradient.length-1]]:[_.findLast(this.gradient,function(t){return t.value<=e}),_.find(this.gradient,function(t){return t.value>e})]},e}();t.ColorComputer=i},function(e,t,n){"use strict";var a=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},r=n(9),i=n(3),o=function(e){function t(t){e.call(this,t),this.jconstant=new i.Point(.12,.63)}return a(t,e),t.prototype.generate=function(){var e=this;e.timer=(new Date).getTime(),e.ready=!1;for(var t=Math.floor(e.canvas.height/e.threadsnumber),n={type:e.type,width:e.canvas.width,height:t,steps:e.steps,pixelratio:e.pixelratio,x:e.center.x,y:-e.center.y-e.pixelratio*t*(e.threadsnumber/2-.5),supersampling:e.supersampling,cx:e.jconstant.x,cy:-e.jconstant.y},a=0;a<e.threadsnumber;a++)e.workers[a].postMessage(n),n.y+=e.pixelratio*t},t}(r.FractalBuilder);t.JuliaBuilder=o},function(e,t){"use strict";var n=function(){function e(e){this.selector=e,this.storagekey="tutorial",this.classmessage=".message",this.showcurrent=function(){$(""+this.selector).hide(),$(this.selector+" + .tooltip").hide(),$(""+this.selector+this.classmessage+this.getlevel()).show(),$(""+this.selector+this.classmessage+this.getlevel()+" + .tooltip").show()},this.setlevel=function(e){var t=this.getlevel();t+1==e&&localStorage.setItem(this.storagekey,e.toString()),this.showcurrent()},this.getlevel=function(){var e=parseInt(localStorage.getItem(this.storagekey),10);return isNaN(e)?0:e},$(""+this.selector).tooltip({trigger:"manual"}),$(""+this.selector).tooltip("show"),$(""+this.selector).hide(),$(this.selector+" + .tooltip").hide()}return e}();t.Tutorial=n},function(e,t){}]);
//# sourceMappingURL=app.bundle.js.map