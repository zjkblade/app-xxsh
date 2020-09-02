"use strict";var BMapLib=window.BMapLib=BMapLib||{};!function(){var t,s=s||{version:"1.5.0"};s.guid="$BAIDU$",window[s.guid]=window[s.guid]||{},s.dom=s.dom||{},s.dom.g=function(t){return"string"==typeof t||t instanceof String?document.getElementById(t):t&&t.nodeName&&(1==t.nodeType||9==t.nodeType)?t:null},s.g=s.G=s.dom.g,s.lang=s.lang||{},s.lang.isString=function(t){return"[object String]"==Object.prototype.toString.call(t)},s.isString=s.lang.isString,s.dom._g=function(t){return s.lang.isString(t)?document.getElementById(t):t},s._g=s.dom._g,s.dom.getDocument=function(t){return 9==(t=s.dom.g(t)).nodeType?t:t.ownerDocument||t.document},s.browser=s.browser||{},s.browser.ie=s.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?document.documentMode||+RegExp.$1:void 0,s.dom.getComputedStyle=function(t,e){t=s.dom._g(t);var i,o=s.dom.getDocument(t);return o.defaultView&&o.defaultView.getComputedStyle&&(i=o.defaultView.getComputedStyle(t,null))?i[e]||i.getPropertyValue(e):""},s.dom._styleFixer=s.dom._styleFixer||{},s.dom._styleFilter=s.dom._styleFilter||[],s.dom._styleFilter.filter=function(t,e,i){for(var o,n=0,r=s.dom._styleFilter;o=r[n];n++)(o=o[i])&&(e=o(t,e));return e},s.string=s.string||{},s.string.toCamelCase=function(t){return t.indexOf("-")<0&&t.indexOf("_")<0?t:t.replace(/[-_][^-_]/g,function(t){return t.charAt(1).toUpperCase()})},s.dom.getStyle=function(t,e){var i=s.dom;t=i.g(t),e=s.string.toCamelCase(e);var o,n=t.style[e]||(t.currentStyle?t.currentStyle[e]:"")||i.getComputedStyle(t,e);return n||(o=i._styleFixer[e])&&(n=o.get?o.get(t):s.dom.getStyle(t,o)),(o=i._styleFilter)&&(n=o.filter(e,n,"get")),n},s.getStyle=s.dom.getStyle,s.dom._NAME_ATTRS=(t={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",usemap:"useMap",frameborder:"frameBorder"},s.browser.ie<8?(t.for="htmlFor",t.class="className"):(t.htmlFor="for",t.className="class"),t),s.dom.setAttr=function(t,e,i){return t=s.dom.g(t),"style"==e?t.style.cssText=i:(e=s.dom._NAME_ATTRS[e]||e,t.setAttribute(e,i)),t},s.setAttr=s.dom.setAttr,s.dom.setAttrs=function(t,e){for(var i in t=s.dom.g(t),e)s.dom.setAttr(t,i,e[i]);return t},s.setAttrs=s.dom.setAttrs,s.dom.create=function(t,e){var i=document.createElement(t),o=e||{};return s.dom.setAttrs(i,o)},s.object=s.object||{},s.extend=s.object.extend=function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t};var e=BMapLib.LuShu=function(t,e,i){!e||e.length<1||(this._map=t,this._path=e,this.i=0,this._setTimeoutQuene=[],this._projection=this._map.getMapType().getProjection(),this._opts={icon:null,speed:4e3,defaultContent:""},this._setOptions(i),this._rotation=0,!this._opts.icon instanceof BMap.Icon&&(this._opts.icon=defaultIcon))};function i(t,e){this._point=t,this._html=e}e.prototype._setOptions=function(t){if(t)for(var e in t)t.hasOwnProperty(e)&&(this._opts[e]=t[e])},e.prototype.start=function(){var t=this,e=t._path.length;if(t.i&&t.i<e-1){if(!t._fromPause)return;t._fromStop||t._moveNext(++t.i)}else t._addMarker(),t._timeoutFlag=setTimeout(function(){t._addInfoWin(),""==t._opts.defaultContent&&t.hideInfoWindow(),t._moveNext(t.i)},400);this._fromPause=!1,this._fromStop=!1},e.prototype.stop=function(){this.i=0,this._fromStop=!0,clearInterval(this._intervalFlag),this._clearTimeout();for(var t=0,e=this._opts.landmarkPois,i=e.length;t<i;t++)e[t].bShow=!1},e.prototype.pause=function(){clearInterval(this._intervalFlag),this._fromPause=!0,this._clearTimeout()},e.prototype.hideInfoWindow=function(){this._overlay._div.style.visibility="hidden"},e.prototype.showInfoWindow=function(){this._overlay._div.style.visibility="visible"},s.object.extend(e.prototype,{_addMarker:function(){this._marker&&(this.stop(),this._map.removeOverlay(this._marker),clearTimeout(this._timeoutFlag)),this._overlay&&this._map.removeOverlay(this._overlay);var t=new BMap.Marker(this._path[0]);this._opts.icon&&t.setIcon(this._opts.icon),this._map.addOverlay(t),t.setAnimation(BMAP_ANIMATION_DROP),this._marker=t},_addInfoWin:function(){var t=new i(this._marker.getPosition(),this._opts.defaultContent);t.setRelatedClass(this),this._overlay=t,this._map.addOverlay(t)},_getMercator:function(t){return this._map.getMapType().getProjection().lngLatToPoint(t)},_getDistance:function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},_move:function(n,r,s){var a=this,l=0,t=this._opts.speed/100,u=this._projection.lngLatToPoint(n),h=this._projection.lngLatToPoint(r),_=Math.round(a._getDistance(u,h)/t);_<1?a._moveNext(++a.i):a._intervalFlag=setInterval(function(){if(_<=l){if(clearInterval(a._intervalFlag),a.i>a._path.length)return;a._moveNext(++a.i)}else{l++;var t,e=s(u.x,h.x,l,_),i=s(u.y,h.y,l,_),o=a._projection.pointToLngLat(new BMap.Pixel(e,i));1==l&&(t=null,0<=a.i-1&&(t=a._path[a.i-1]),1==a._opts.enableRotation&&a.setRotation(t,n,r),a._opts.autoView&&(a._map.getBounds().containsPoint(o)||a._map.setCenter(o))),a._marker.setPosition(o),a._setInfoWin(o)}},10)},setRotation:function(t,e,i){var o,n,r=0;e=this._map.pointToPixel(e),(i=this._map.pointToPixel(i)).x!=e.x?(o=(i.y-e.y)/(i.x-e.x),r=360*Math.atan(o)/(2*Math.PI),r=i.x<e.x?90-r+90:-r,this._marker.setRotation(-r)):(n=(n=0)<i.y-e.y?-1:1,this._marker.setRotation(90*-n))},linePixellength:function(t,e){return Math.sqrt(Math.abs(t.x-e.x)*Math.abs(t.x-e.x)+Math.abs(t.y-e.y)*Math.abs(t.y-e.y))},pointToPoint:function(t,e){return Math.abs(t.x-e.x)*Math.abs(t.x-e.x)+Math.abs(t.y-e.y)*Math.abs(t.y-e.y)},_moveNext:function(t){t<this._path.length-1&&this._move(this._path[t],this._path[t+1],this._tween.linear)},_setInfoWin:function(t){var e,i=this;i._overlay&&(i._overlay.setPosition(t,i._marker.getIcon().size),-1!=(e=i._troughPointIndex(t))?(clearInterval(i._intervalFlag),i._overlay.setHtml(i._opts.landmarkPois[e].html),i._overlay.setPosition(t,i._marker.getIcon().size),i._pauseForView(e)):i._overlay.setHtml(i._opts.defaultContent))},_pauseForView:function(t){var e=this,i=setTimeout(function(){e._moveNext(++e.i)},1e3*e._opts.landmarkPois[t].pauseTime);e._setTimeoutQuene.push(i)},_clearTimeout:function(){for(var t in this._setTimeoutQuene)clearTimeout(this._setTimeoutQuene[t]);this._setTimeoutQuene.length=0},_tween:{linear:function(t,e,i,o){return(e-t)*i/o+t}},_troughPointIndex:function(t){for(var e=this._opts.landmarkPois,i=0,o=e.length;i<o;i++)if(!e[i].bShow&&this._map.getDistance(new BMap.Point(e[i].lng,e[i].lat),t)<10)return e[i].bShow=!0,i;return-1}}),(i.prototype=new BMap.Overlay).initialize=function(t){var e=this._div=s.dom.create("div",{style:"border:solid 1px #ccc;width:auto;min-width:50px;text-align:center;position:absolute;background:#fff;color:#000;font-size:12px;border-radius: 10px;padding:5px;white-space: nowrap;"});return e.innerHTML=this._html,t.getPanes().floatPane.appendChild(e),this._map=t,e},i.prototype.draw=function(){this.setPosition(this.lushuMain._marker.getPosition(),this.lushuMain._marker.getIcon().size)},s.object.extend(i.prototype,{setPosition:function(t,e){var i=this._map.pointToOverlayPixel(t),o=s.dom.getStyle(this._div,"width"),n=s.dom.getStyle(this._div,"height");overlayW=parseInt(this._div.clientWidth||o,10),overlayH=parseInt(this._div.clientHeight||n,10),this._div.style.left=i.x-overlayW/2+"px",this._div.style.bottom=-(i.y-e.height)+"px"},setHtml:function(t){this._div.innerHTML=t},setRelatedClass:function(t){this.lushuMain=t}})}();