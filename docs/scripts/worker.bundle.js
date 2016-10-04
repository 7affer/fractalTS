!function(t){function i(s){if(e[s])return e[s].exports;var a=e[s]={exports:{},id:s,loaded:!1};return t[s].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}([function(t,i,e){t.exports=e(15)},,,,,,,,,,,,,,,function(t,i,e){"use strict";var s=e(16),a=e(17),n=e(18),h=e(19),r=self;self.addEventListener("message",function(t){var i;switch(t.data.type){case"mandelbrot":i=new s.Mandelbrot(t.data.width,t.data.height,t.data.steps,t.data.pixelratio,t.data.x,t.data.y,t.data.supersampling);break;case"ship":i=new n.Ship(t.data.width,t.data.height,t.data.steps,t.data.pixelratio,t.data.x,t.data.y,t.data.supersampling);break;case"julia":i=new a.Julia(t.data.width,t.data.height,t.data.steps,t.data.pixelratio,t.data.x,t.data.y,t.data.supersampling,t.data.cx,t.data.cy);break;case"juliaship":i=new h.JuliaShip(t.data.width,t.data.height,t.data.steps,t.data.pixelratio,t.data.x,t.data.y,t.data.supersampling,t.data.cx,t.data.cy)}var e=i.getfractaldata();r.postMessage(e,[e.buffer])},!1)},function(t,i){"use strict";var e=function(){function t(t,i,e,s,a,n,h){this.width=t,this.height=i,this.max=e,this.pixelsize=s,this.centerx=a,this.centery=n,this.supersampling=h}return t.prototype.getfractaldata=function(){for(var t=new Uint32Array(this.height*this.width),i=this.centerx-this.width*this.pixelsize*.5,e=this.centery-this.height*this.pixelsize*.5,s=.25*this.pixelsize,a=.5*this.pixelsize,n=0,h=0;h<this.height;h++){e+=this.pixelsize;for(var r=0;r<this.width;r++)i+=this.pixelsize,t[n++]=this.getpixellevel(i,e,s,a);i=this.centerx-this.width*this.pixelsize*.5}return t},t.prototype.getpixellevel=function(t,i,e,s){if(this.supersampling>2){var a=t-e,n=t+e,h=i-e,r=i+e;return this.getpoint(a,h,a,h)+this.getpoint(a,r,a,r)+this.getpoint(n,h,n,h)+this.getpoint(n,r,n,r)>>2}if(2==this.supersampling){var a=t-e,n=t+e,h=i-e,r=i+e;return this.getpoint(a,h,a,h)+this.getpoint(n,r,n,r)>>1}return this.getpoint(t,i,t,i)},t.prototype.getpoint=function(t,i,e,s){for(var a,n,h=t*t,r=i*i,o=0;h+r<4&&o<this.max;){if(a=h-r+e,n=2*t*i+s,t==a&&i==n){o=this.max;break}t=a,i=n,h=t*t,r=i*i,o++}return o},t}();i.Mandelbrot=e},function(t,i,e){"use strict";var s=this&&this.__extends||function(t,i){function e(){this.constructor=t}for(var s in i)i.hasOwnProperty(s)&&(t[s]=i[s]);t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)},a=e(16),n=function(t){function i(i,e,s,a,n,h,r,o,p){t.call(this,i,e,s,a,n,h,r),this.cx=o,this.cy=p}return s(i,t),i.prototype.getpixellevel=function(t,i,e,s){if(this.supersampling>2){var a=t-e,n=t+e,h=i-e,r=i+e;return this.getpoint(a,h,this.cx,this.cy)+this.getpoint(a,r,this.cx,this.cy)+this.getpoint(n,h,this.cx,this.cy)+this.getpoint(n,r,this.cx,this.cy)>>2}if(2==this.supersampling){var a=t-e,n=t+e,h=i-e,r=i+e;return this.getpoint(a,h,this.cx,this.cy)+this.getpoint(n,r,this.cx,this.cy)>>1}return this.getpoint(t,i,this.cx,this.cy)},i}(a.Mandelbrot);i.Julia=n},function(t,i,e){"use strict";var s=this&&this.__extends||function(t,i){function e(){this.constructor=t}for(var s in i)i.hasOwnProperty(s)&&(t[s]=i[s]);t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)},a=e(16),n=function(t){function i(i,e,s,a,n,h,r){t.call(this,i,e,s,a,n,h,r)}return s(i,t),i.prototype.getpoint=function(t,i,e,s){var a=t*t,n=i*i,h=0;for(this.zta=null,this.ztb=null;a+n<4&&h<this.max;){if(t=t>0?t:-t,i=i>0?i:-i,this.zta=a-n+e,this.ztb=2*t*i+s,t==this.zta&&i==this.ztb){h=this.max;break}t=this.zta,i=this.ztb,a=t*t,n=i*i,h++}return h},i}(a.Mandelbrot);i.Ship=n},function(t,i,e){"use strict";var s=this&&this.__extends||function(t,i){function e(){this.constructor=t}for(var s in i)i.hasOwnProperty(s)&&(t[s]=i[s]);t.prototype=null===i?Object.create(i):(e.prototype=i.prototype,new e)},a=e(18),n=function(t){function i(i,e,s,a,n,h,r,o,p){t.call(this,i,e,s,a,n,h,r),this.cx=o,this.cy=p}return s(i,t),i.prototype.getpixellevel=function(t,i,e,s){if(this.supersampling>2){var a=t-e,n=t+e,h=i-e,r=i+e;return this.getpoint(a,h,this.cx,this.cy)+this.getpoint(a,r,this.cx,this.cy)+this.getpoint(n,h,this.cx,this.cy)+this.getpoint(n,r,this.cx,this.cy)>>2}if(2==this.supersampling){var a=t-e,n=t+e,h=i-e,r=i+e;return this.getpoint(a,h,this.cx,this.cy)+this.getpoint(n,r,this.cx,this.cy)>>1}return this.getpoint(t,i,this.cx,this.cy)},i}(a.Ship);i.JuliaShip=n}]);
//# sourceMappingURL=worker.bundle.js.map