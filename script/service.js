"use strict";!function(t){function n(e,t,o,i){i=i||{};var n=$api.getStorage("TOKEN"),u=domain+t+(n?"&token="+n:"");return new Promise(function(n){if(util.app.isProd()){var t={method:e,url:u,timeout:60,cache:!0,headers:i,data:{body:o||{}}};api.ajax(t,function(t,e){e?(util.app.hideLoading(),util.app.toast(e.msg)):t&&(setTimeout(function(){util.app.closeToWindow("login","/html/user/login_win.html")},1e3),n(t))})}else $.ajax({url:u,type:e,contentType:i["Content-Type"],data:JSON.stringify(o||{}),success:function(t){setTimeout(function(){util.app.closeToWindow("login","/html/user/login_win.html")},1e3),n(t)},error:function(){}})})}t.service={get:function(t){return n("get",t,{},{"Content-Type":"application/json"})},post:function(t,e){return n("post",t,e,{"Content-Type":"application/json"})},request:n}}(window),window.demoservice={demoApi:function(t){return service.post("demoApi",{demoParam:t})}};