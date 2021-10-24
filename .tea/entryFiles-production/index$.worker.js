/**! __BUGME_START__ */ !function(){"use strict";var e,n,t,o,r,a,i,c,u,s;!function(e){e.PageResume="pageResume",e.PagePause="pagePause",e.DebugPanelClick="tinyRemoteDebugPanelButtonClick",e.DebugConsole="onTinyDebugConsole",e.DebugNetworkRequest="tinyAppRemoteDebug_network_request",e.DebugNetworkResponse="tinyAppRemoteDebug_network_response",e.DebugNetworkError="tinyAppRemoteDebug_network_error",e.DebugStorageChanged="tinyAppRemoteDebug_storage",e.MessageFromVConsole="onMessageFromVConsole"}(e||(e={})),function(e){e.GetPagesData="Tiny.Data.getPageData",e.SetPageData="Tiny.Data.setPageData"}(n||(n={})),function(e){e.DataChanged="Tiny.Data.dataChanged"}(t||(t={})),function(e){e.GetStorageInfo="Tiny.Storage.getStorageInfo",e.ClearStorage="Tiny.Storage.clearStorage",e.RemoveStorage="Tiny.Storage.removeStorage",e.SetStorage="Tiny.Storage.setStorage"}(o||(o={})),function(e){e.StorageChanged="Tiny.Storage.storageChanged"}(r||(r={})),function(e){e.Enable="MiniAppLog.enable"}(a||(a={})),function(e){e.ApiSyncCall="MiniAppLog.onApiSyncCall",e.ApiSyncCallback="MiniAppLog.onApiSyncCallback",e.ApiCall="MiniAppLog.onApiCall",e.ApiCallback="MiniAppLog.onApiCallback",e.SetData="MiniAppLog.onSetData",e.SetDataCallback="MiniAppLog.onSetDataCallback",e.ShareAppMessage="MiniAppLog.onShareAppMessage"}(i||(i={})),function(e){e.consoleAPICalled="Runtime.consoleAPICalled",e.executionContextDestroyed="Runtime.executionContextDestroyed",e.executionContextsCleared="Runtime.executionContextsCleared",e.executionContextCreated="Runtime.executionContextCreated"}(c||(c={})),function(e){e.RequestWillBeSent="Network.requestWillBeSent",e.ResponseReceived="Network.responseReceived",e.LoadingFinished="Network.loadingFinished",e.LoadingFailed="Networkw.loadingFailed",e.GetResponseBody="Network.getResponseBody"}(u||(u={})),function(e){e.Data="data",e.Storage="storage",e.AppLog="applog"}(s||(s={}));var l=self,g="\\x"+("0"+"~".charCodeAt(0).toString(16)).slice(-2),p="\\"+g,f=new RegExp(g,"g"),d=new RegExp(p,"g"),y=new RegExp("(?:^|([^\\\\]))"+p),C=[].indexOf||function(e){for(var n=this.length;n--&&this[n]!==e;);return n},h=String;function S(e,n,t){return n instanceof Array?function(e,n,t){for(var o=0,r=n.length;o<r;o++)n[o]=S(e,n[o],t);return n}(e,n,t):n instanceof h?n.length?t.hasOwnProperty(n)?t[n]:t[n]=function(e,n){for(var t=0,o=n.length;t<o;e=e[n[t++].replace(d,"~")]);return e}(e,n.split("~")):e:n instanceof Object?function(e,n,t){for(var o in n)n.hasOwnProperty(o)&&(n[o]=S(e,n[o],t));return n}(e,n,t):n}var b={stringify:function(e,n,t,o){return b.parser.stringify(e,function(e,n,t){var o,r,a=!1,i=!!n,c=[],u=[e],s=[e],l=[t?"~":"[Circular]"],d=e,y=1;return i&&(r="object"==typeof n?function(e,t){return""!==e&&n.indexOf(e)<0?void 0:t}:n),function(e,n){return i&&(n=r.call(this,e,n)),a?(d!==this&&(o=y-C.call(u,this)-1,y-=o,u.splice(y,u.length),c.splice(y-1,c.length),d=this),"object"==typeof n&&n?(C.call(u,n)<0&&u.push(d=n),y=u.length,(o=C.call(s,n))<0?(o=s.push(n)-1,t?(c.push((""+e).replace(f,g)),l[o]="~"+c.join("~")):l[o]=l[0]):n=l[o]):"string"==typeof n&&t&&(n=n.replace(g,p).replace("~",g))):a=!0,n}}(e,n,!o),t)},parse:function(e,n){return b.parser.parse(e,function(e){return function(n,t){var o="string"==typeof t;return o&&"~"===t.charAt(0)?new h(t.slice(1)):(""===n&&(t=S(t,t,{})),o&&(t=t.replace(y,"$1~").replace(p,g)),e?e.call(this,n,t):t)}}(n))},parser:JSON},m=b.stringify,A=l.AlipayJSBridge&&l.AlipayJSBridge.call;function D(e,n){A&&A("internalAPI",{method:e,param:n})}function v(e,n){return void 0===n?"©undefined":null===n?"©null":n===-1/0?"©-Infinity":n===1/0?"©Infinity":"number"==typeof n&&isNaN(n)?"©NaN":"function"==typeof n?"©Function":n}var w=Function;function R(){l.document&&l.document.addEventListener("push",(function(e){var n=e.data;if(n&&"onMessageFromVConsole"===n.func){var t;try{var o=n.param.content||n.param.data.content;if(!o)return;t=JSON.parse(o)}catch(e){return}if(t.fromVConsoleToWorker&&"exec"===t.method)try{new w("requestId","sendBack","var res = "+t.script+";console.log(res);")(t.requestId,(function(e){return function(e,n){D("tinyDebugConsole",{type:"msgFromWorkerToVConsole",content:m({requestId:e,returnValue:n},v)})}(t.requestId,e)}))}catch(e){console.warn("bugme execute script error",e)}}}))}if(!l.__BUGME_ON__){l.__BUGME_ON__=!0;try{R(),Object.defineProperties(console,["log","info","error","debug","warn"].reduce((function(e,n){var t=console[n];return e[n]={value:function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];t.apply(console,e);try{var r=m(e.map((function(e){return e instanceof Error?e.name+": "+e.message:e})),v);D("tinyDebugConsole",{content:r,type:"console_"+n})}catch(e){t("bugme console error",e)}},configurable:!0,writable:!0,enumerable:!0},e}),{}))}catch(e){console.warn("bugme init error",e)}}}();
 /**! __BUGME_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;


if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../pages/Login/Login?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/Home/Home?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/Store/Store?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/Cart/Cart?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/History/History?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/Register/Register?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}