/*!
 * Dynamsoft JavaScript Library
 * @product Dynamsoft Barcode Reader JS Edition
 * @website http://www.dynamsoft.com
 * @copyright Copyright 2022, Dynamsoft Corporation
 * @author Dynamsoft
 * @version 9.0.2 (js 20220505)
 * @fileoverview Dynamsoft JavaScript Library for Barcode Reader
 * More info on DBR JS: https://www.dynamsoft.com/barcode-reader/sdk-javascript/
 */
!function(){"use strict";const e=self,t=e=>e&&"object"==typeof e&&"function"==typeof e.then;class r extends Promise{constructor(e){let r,n;super(((e,t)=>{r=e,n=t})),this._s="pending",this.resolve=e=>{this.isPending&&(t(e)?this.task=e:(this._s="fulfilled",r(e)))},this.reject=e=>{this.isPending&&(this._s="rejected",n(e))},this.task=e}get status(){return this._s}get isPending(){return"pending"===this._s}get isFulfilled(){return"fulfilled"===this._s}get isRejected(){return"rejected"===this._s}get task(){return this._task}set task(e){let r;this._task=e,t(e)?r=e:"function"==typeof e&&(r=new Promise(e)),r&&(async()=>{try{const t=await r;e===this._task&&this.resolve(t)}catch(t){e===this._task&&this.reject(t)}})()}get isEmpty(){return null==this._task}}var n=function(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}();function o(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(o){if("TypeError"!==o.name)throw o;for(var r=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),n=0;n<e.length;n+=1)r.append(e[n]);return r.getBlob(t.type)}}function a(e,t){t&&e.then((function(e){t(null,e)}),(function(e){t(e)}))}function s(e,t,r){"function"==typeof t&&e.then(t),"function"==typeof r&&e.catch(r)}function i(e){return"string"!=typeof e&&(console.warn(`${e} used as a key, but it is not a string.`),e=String(e)),e}function c(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}const d="local-forage-detect-blob-support";let u;const l={},f=Object.prototype.toString,m="readonly",h="readwrite";function g(e){return"boolean"==typeof u?Promise.resolve(u):function(e){return new Promise((function(t){var r=e.transaction(d,h),n=o([""]);r.objectStore(d).put(n,"key"),r.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1)},r.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),r=navigator.userAgent.match(/Edge\//);t(r||!e||parseInt(e[1],10)>=43)}})).catch((function(){return!1}))}(e).then((function(e){return u=e,u}))}function y(e){var t=l[e.name],r={};r.promise=new Promise((function(e,t){r.resolve=e,r.reject=t})),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then((function(){return r.promise})):t.dbReady=r.promise}function p(e){var t=l[e.name].deferredOperations.pop();if(t)return t.resolve(),t.promise}function b(e,t){var r=l[e.name].deferredOperations.pop();if(r)return r.reject(t),r.promise}function v(e,t){return new Promise((function(r,o){if(l[e.name]=l[e.name]||{forages:[],db:null,dbReady:null,deferredOperations:[]},e.db){if(!t)return r(e.db);y(e),e.db.close()}var a=[e.name];t&&a.push(e.version);var s=n.open.apply(n,a);t&&(s.onupgradeneeded=function(t){var r=s.result;try{r.createObjectStore(e.storeName),t.oldVersion<=1&&r.createObjectStore(d)}catch(r){if("ConstraintError"!==r.name)throw r;console.warn('The database "'+e.name+'" has been upgraded from version '+t.oldVersion+" to version "+t.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),s.onerror=function(e){e.preventDefault(),o(s.error)},s.onsuccess=function(){var t=s.result;t.onversionchange=function(e){e.target.close()},r(t),p(e)}}))}function w(e){return v(e,!1)}function _(e){return v(e,!0)}function S(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),n=e.version<e.db.version,o=e.version>e.db.version;if(n&&(e.version!==t&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||r){if(r){var a=e.db.version+1;a>e.version&&(e.version=a)}return!0}return!1}function k(e){var t=function(e){for(var t=e.length,r=new ArrayBuffer(t),n=new Uint8Array(r),o=0;o<t;o++)n[o]=e.charCodeAt(o);return r}(atob(e.data));return o([t],{type:e.type})}function I(e){var t=this,r=t._initReady().then((function(){var e=l[t._dbInfo.name];if(e&&e.dbReady)return e.dbReady}));return s(r,e,e),r}function D(e,t,r,n){void 0===n&&(n=1);try{var o=e.db.transaction(e.storeName,t);r(null,o)}catch(o){if(n>0&&(!e.db||"InvalidStateError"===o.name||"NotFoundError"===o.name))return Promise.resolve().then((()=>{if(!e.db||"NotFoundError"===o.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),_(e)})).then((()=>function(e){y(e);for(var t=l[e.name],r=t.forages,n=0;n<r.length;n++){const e=r[n];e._dbInfo.db&&(e._dbInfo.db.close(),e._dbInfo.db=null)}return e.db=null,w(e).then((t=>(e.db=t,S(e)?_(e):t))).then((n=>{e.db=t.db=n;for(var o=0;o<r.length;o++)r[o]._dbInfo.db=n})).catch((t=>{throw b(e,t),t}))}(e).then((function(){D(e,t,r,n-1)})))).catch(r);r(o)}}var M={_driver:"asyncStorage",_initStorage:function(e){var t=this,r={db:null};if(e)for(var n in e)r[n]=e[n];var o=l[r.name];o||(o={forages:[],db:null,dbReady:null,deferredOperations:[]},l[r.name]=o),o.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=I);var a=[];function s(){return Promise.resolve()}for(var i=0;i<o.forages.length;i++){var c=o.forages[i];c!==t&&a.push(c._initReady().catch(s))}var d=o.forages.slice(0);return Promise.all(a).then((function(){return r.db=o.db,w(r)})).then((function(e){return r.db=e,S(r,t._defaultConfig.version)?_(r):e})).then((function(e){r.db=o.db=e,t._dbInfo=r;for(var n=0;n<d.length;n++){var a=d[n];a!==t&&(a._dbInfo.db=r.db,a._dbInfo.version=r.version)}}))},_support:function(){try{if(!n||!n.open)return!1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!e||t)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}(),getItem:function(e,t){var r=this;e=i(e);var n=new Promise((function(t,n){r.ready().then((function(){D(r._dbInfo,m,(function(o,a){if(o)return n(o);try{var s=a.objectStore(r._dbInfo.storeName).get(e);s.onsuccess=function(){var e=s.result;void 0===e&&(e=null),function(e){return e&&e.__local_forage_encoded_blob}(e)&&(e=k(e)),t(e)},s.onerror=function(){n(s.error)}}catch(e){n(e)}}))})).catch(n)}));return a(n,t),n},setItem:function(e,t,r){var n=this;e=i(e);var o=new Promise((function(r,o){var a;n.ready().then((function(){return a=n._dbInfo,"[object Blob]"===f.call(t)?g(a.db).then((function(e){return e?t:(r=t,new Promise((function(e,t){var n=new FileReader;n.onerror=t,n.onloadend=function(t){var n=btoa(t.target.result||"");e({__local_forage_encoded_blob:!0,data:n,type:r.type})},n.readAsBinaryString(r)})));var r})):t})).then((function(t){D(n._dbInfo,h,(function(a,s){if(a)return o(a);try{var i=s.objectStore(n._dbInfo.storeName);null===t&&(t=void 0);var c=i.put(t,e);s.oncomplete=function(){void 0===t&&(t=null),r(t)},s.onabort=s.onerror=function(){var e=c.error?c.error:c.transaction.error;o(e)}}catch(e){o(e)}}))})).catch(o)}));return a(o,r),o},removeItem:function(e,t){var r=this;e=i(e);var n=new Promise((function(t,n){r.ready().then((function(){D(r._dbInfo,h,(function(o,a){if(o)return n(o);try{var s=a.objectStore(r._dbInfo.storeName).delete(e);a.oncomplete=function(){t()},a.onerror=function(){n(s.error)},a.onabort=function(){var e=s.error?s.error:s.transaction.error;n(e)}}catch(e){n(e)}}))})).catch(n)}));return a(n,t),n},clear:function(e){var t=this,r=new Promise((function(e,r){t.ready().then((function(){D(t._dbInfo,h,(function(n,o){if(n)return r(n);try{var a=o.objectStore(t._dbInfo.storeName).clear();o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=a.error?a.error:a.transaction.error;r(e)}}catch(e){r(e)}}))})).catch(r)}));return a(r,e),r},length:function(e){var t=this,r=new Promise((function(e,r){t.ready().then((function(){D(t._dbInfo,m,(function(n,o){if(n)return r(n);try{var a=o.objectStore(t._dbInfo.storeName).count();a.onsuccess=function(){e(a.result)},a.onerror=function(){r(a.error)}}catch(e){r(e)}}))})).catch(r)}));return a(r,e),r},keys:function(e){var t=this,r=new Promise((function(e,r){t.ready().then((function(){D(t._dbInfo,m,(function(n,o){if(n)return r(n);try{var a=o.objectStore(t._dbInfo.storeName).openKeyCursor(),s=[];a.onsuccess=function(){var t=a.result;t?(s.push(t.key),t.continue()):e(s)},a.onerror=function(){r(a.error)}}catch(e){r(e)}}))})).catch(r)}));return a(r,e),r},dropInstance:function(e,t){t=c.apply(this,arguments);var r=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o,s=this;if(e.name){const t=e.name===r.name&&s._dbInfo.db?Promise.resolve(s._dbInfo.db):w(e).then((t=>{const r=l[e.name],n=r.forages;r.db=t;for(var o=0;o<n.length;o++)n[o]._dbInfo.db=t;return t}));o=e.storeName?t.then((t=>{if(!t.objectStoreNames.contains(e.storeName))return;const r=t.version+1;y(e);const o=l[e.name],a=o.forages;t.close();for(let e=0;e<a.length;e++){const t=a[e];t._dbInfo.db=null,t._dbInfo.version=r}const s=new Promise(((t,o)=>{const a=n.open(e.name,r);a.onerror=e=>{a.result.close(),o(e)},a.onupgradeneeded=()=>{a.result.deleteObjectStore(e.storeName)},a.onsuccess=()=>{const e=a.result;e.close(),t(e)}}));return s.then((e=>{o.db=e;for(let t=0;t<a.length;t++){const r=a[t];r._dbInfo.db=e,p(r._dbInfo)}})).catch((t=>{throw(b(e,t)||Promise.resolve()).catch((()=>{})),t}))})):t.then((t=>{y(e);const r=l[e.name],o=r.forages;t.close();for(var a=0;a<o.length;a++){o[a]._dbInfo.db=null}const s=new Promise(((t,r)=>{var o=n.deleteDatabase(e.name);o.onerror=()=>{const e=o.result;e&&e.close(),r(o.error)},o.onblocked=()=>{console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},o.onsuccess=()=>{const e=o.result;e&&e.close(),t(e)}}));return s.then((e=>{r.db=e;for(var t=0;t<o.length;t++){p(o[t]._dbInfo)}})).catch((t=>{throw(b(e,t)||Promise.resolve()).catch((()=>{})),t}))}))}else o=Promise.reject("Invalid arguments");return a(o,t),o}};const x=new Map;function C(e,t){let r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}var P={_driver:"tempStorageWrapper",_initStorage:async function(e){const t={};if(e)for(let r in e)t[r]=e[r];const r=t.keyPrefix=C(e,this._defaultConfig);this._dbInfo=t,x.has(r)||x.set(r,new Map)},getItem:function(e,t){e=i(e);const r=this.ready().then((()=>x.get(this._dbInfo.keyPrefix).get(e)));return a(r,t),r},setItem:function(e,t,r){e=i(e);const n=this.ready().then((()=>(void 0===t&&(t=null),x.get(this._dbInfo.keyPrefix).set(e,t),t)));return a(n,r),n},removeItem:function(e,t){e=i(e);const r=this.ready().then((()=>{x.get(this._dbInfo.keyPrefix).delete(e)}));return a(r,t),r},clear:function(e){const t=this.ready().then((()=>{const e=this._dbInfo.keyPrefix;x.has(e)&&x.delete(e)}));return a(t,e),t},length:function(e){const t=this.ready().then((()=>x.get(this._dbInfo.keyPrefix).size));return a(t,e),t},keys:function(e){const t=this.ready().then((()=>[...x.get(this._dbInfo.keyPrefix).keys()]));return a(t,e),t},dropInstance:function(e,t){if(t=c.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){const t=this.config();e.name=e.name||t.name,e.storeName=e.storeName||t.storeName}let r;return r=e.name?new Promise((t=>{e.storeName?t(C(e,this._defaultConfig)):t(`${e.name}/`)})).then((e=>{x.delete(e)})):Promise.reject("Invalid arguments"),a(r,t),r}};const N=(e,t)=>{const r=e.length;let n=0;for(;n<r;){if((o=e[n])===(a=t)||"number"==typeof o&&"number"==typeof a&&isNaN(o)&&isNaN(a))return!0;n++}var o,a;return!1},R=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},T={},B={},E={INDEXEDDB:M,TEMPSTORAGE:P},O=[E.INDEXEDDB._driver,E.TEMPSTORAGE._driver],j=["dropInstance"],F=["clear","getItem","keys","length","removeItem","setItem"].concat(j),A={description:"",driver:O.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function U(e,t){e[t]=function(){const r=arguments;return e.ready().then((function(){return e[t].apply(e,r)}))}}function J(){for(let e=1;e<arguments.length;e++){const t=arguments[e];if(t)for(let e in t)t.hasOwnProperty(e)&&(R(t[e])?arguments[0][e]=t[e].slice():arguments[0][e]=t[e])}return arguments[0]}class W{constructor(e){for(let e in E)if(E.hasOwnProperty(e)){const t=E[e],r=t._driver;this[e]=r,T[r]||this.defineDriver(t)}this._defaultConfig=J({},A),this._config=J({},this._defaultConfig,e),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch((()=>{}))}config(e){if("object"==typeof e){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(let t in e){if("storeName"===t&&(e[t]=e[t].replace(/\W/g,"_")),"version"===t&&"number"!=typeof e[t])return new Error("Database version must be a number.");this._config[t]=e[t]}return!("driver"in e)||!e.driver||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config}defineDriver(e,t,r){const n=new Promise((function(t,r){try{const n=e._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void r(o);const s=F.concat("_initStorage");for(let t=0,n=s.length;t<n;t++){const n=s[t];if((!N(j,n)||e[n])&&"function"!=typeof e[n])return void r(o)}const i=function(){const t=function(e){return function(){const t=new Error(`Method ${e} is not implemented by the current driver`),r=Promise.reject(t);return a(r,arguments[arguments.length-1]),r}};for(let r=0,n=j.length;r<n;r++){const n=j[r];e[n]||(e[n]=t(n))}};i();const c=function(r){T[n]&&console.info(`Redefining LocalForage driver: ${n}`),T[n]=e,B[n]=r,t()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(c,r):c(!!e._support):c(!0)}catch(e){r(e)}}));return s(n,t,r),n}driver(){return this._driver||null}getDriver(e,t,r){const n=T[e]?Promise.resolve(T[e]):Promise.reject(new Error("Driver not found."));return s(n,t,r),n}ready(e){const t=this,r=t._driverSet.then((()=>(null===t._ready&&(t._ready=t._initDriver()),t._ready)));return s(r,e,e),r}setDriver(e,t,r){const n=this;R(e)||(e=[e]);const o=this._getSupportedDrivers(e);function a(){n._config.driver=n.driver()}function i(e){return n._extend(e),a(),n._ready=n._initStorage(n._config),n._ready}const c=null!==this._driverSet?this._driverSet.catch((()=>Promise.resolve())):Promise.resolve();return this._driverSet=c.then((()=>{const e=o[0];return n._dbInfo=null,n._ready=null,n.getDriver(e).then((e=>{n._driver=e._driver,a(),n._wrapLibraryMethodsWithReady(),n._initDriver=function(e){return function(){let t=0;return function r(){for(;t<e.length;){let o=e[t];return t++,n._dbInfo=null,n._ready=null,n.getDriver(o).then(i).catch(r)}a();const o=new Error("No available storage method found.");return n._driverSet=Promise.reject(o),n._driverSet}()}}(o)}))})).catch((()=>{a();const e=new Error("No available storage method found.");return n._driverSet=Promise.reject(e),n._driverSet})),s(this._driverSet,t,r),this._driverSet}supports(e){return!!B[e]}_extend(e){J(this,e)}_getSupportedDrivers(e){const t=[];for(let r=0,n=e.length;r<n;r++){const n=e[r];this.supports(n)&&t.push(n)}return t}_wrapLibraryMethodsWithReady(){for(let e=0,t=F.length;e<t;e++)U(this,F[e])}createInstance(e){return new W(e)}}var H=new W;Date.prototype.kUtilFormat=function(e){const t={"M+":this.getUTCMonth()+1,"d+":this.getUTCDate(),"H+":this.getUTCHours(),"h+":this.getUTCHours()%12||12,"m+":this.getUTCMinutes(),"s+":this.getUTCSeconds(),"q+":Math.floor((this.getUTCMonth()+3)/3),"S+":this.getUTCMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getUTCFullYear()+"").substr(4-RegExp.$1.length)));for(let r in t)new RegExp("("+r+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[r]:("000"+t[r]).substr(("000"+t[r]).length-RegExp.$1.length)));return e};let z,L,$,V,Z,K,G,X=t=>{let n,o,a,s,i,c,d,u,l,f,m=e.btoa,h=e.atob,g=t.bd;const y=["https://mlts.dynamsoft.com/","https://slts.dynamsoft.com/"];let p,b,v,w,_,S,k,I,D,M,x,C,P,N,R,T,B,E,O=y,j=!1,F=Promise.resolve(),A=t.log&&((...e)=>{try{t.log.apply(null,e)}catch(e){setTimeout((()=>{throw e}),0)}})||(()=>{}),U=g&&A||(()=>{}),J=e=>e.join(""),W={a:[80,88,27,82,145,164,199,211],b:[187,87,89,128,150,44,190,213],c:[89,51,74,53,99,72,82,118],d:[99,181,118,158,215,103,76,117],e:[99,51,86,105,100,71,120,108],f:[97,87,49,119,98,51,74,48,83,50,86,53],g:[81,85,86,84,76,85,100,68,84,81,32,32],h:[90,87,53,106,99,110,108,119,100,65,32,32],i:[90,71,86,106,99,110,108,119,100,65,32,32],j:[97,88,89,32],k:[29,83,122,137,5,180,157,114],l:[100,71,70,110,84,71,86,117,90,51,82,111]},z=()=>e[J(W.c)][J(W.e)][J(W.f)]("raw",new Uint8Array(W.a.concat(W.b,W.d,W.k)),J(W.g),!0,[J(W.h),J(W.i)]),L=async t=>{if(e[J(W.c)]&&e[J(W.c)][J(W.e)]&&e[J(W.c)][J(W.e)][J(W.f)]){let r=h(t),n=new Uint8Array(r.length);for(let e=0;e<r.length;++e)n[e]=r.charCodeAt(e);let o=n.subarray(0,12),a=n.subarray(o.length);N||(N=await z());let s=await e[J(W.c)][J(W.e)][J(W.i)]({name:J(W.g),[J(W.j)]:o,[J(W.l)]:128},N,a);return String.fromCharCode.apply(null,new Uint8Array(s))}},$=async t=>{if(e[J(W.c)]&&e[J(W.c)][J(W.e)]&&e[J(W.c)][J(W.e)][J(W.f)]){let r=new Uint8Array(t.length);for(let e=0;e<t.length;++e)r[e]=t.charCodeAt(e);let n=e.crypto.getRandomValues(new Uint8Array(12));N||(N=await z());let o=await e[J(W.c)][J(W.e)][J(W.h)]({name:J(W.g),[J(W.j)]:n,[J(W.l)]:128},N,r),a=new Uint8Array(o),s=new Uint8Array(n.length+a.length);return s.set(n),s.set(a,n.length),m(String.fromCharCode.apply(null,s))}},V=e=>h(h(e.replace(/\n/g,"+").replace(/\s/g,"=")).substring(1)),Z=e=>m(String.fromCharCode(97+25*Math.random())+m(e)).replace(/\+/g,"\n").replace(/=/g," "),K=()=>{if(R)return R;if(e.crypto){let t=new Uint8Array(36);e.crypto.getRandomValues(t);let r="";for(let e=0;e<36;++e){let n=t[e]%36;r+=n<10?n:String.fromCharCode(n+87)}return r}return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))},G="Failed to connect to the Dynamsoft License Server. The cached license has expired. Please get connected to the network as soon as possible or contact the site administrator for more information.",X="Failed to connect to the Dynamsoft License Server: network timed out. Check your Internet connection or [contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information.",q="Failed to connect to the Dynamsoft License Server: network timed out. Check your Internet connection or contact the site administrator for more information.",Y="Failed to connect to the Dynamsoft License Server: network connection error. Check your Internet connection or [contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information.",Q="Failed to connect to the Dynamsoft License Server: network connection error. Check your Internet connection or contact the site administrator for more information.",ee="Your system date and time appear to have been changed, causing the license to fail. Please correct the system data and time and try again.",te=async()=>{await(async()=>{S||(S=H)})(),J=e=>h(String.fromCharCode.apply(null,e).replace(/\n/g,"+").replace(/\s/g,"="));{let e=await S.createInstance({name:n+"jshello"});await e.setItem(n+"jshello","available")}if(I=await S.createInstance({name:"dynamltsinfo"}),D=R?null:m(m("v2")+String.fromCharCode(d.charCodeAt(d.length/2)+1)+m(d)),M=m(String.fromCharCode(s.charCodeAt(0)+10)+m(n)+m(s)+a+m(""+c)),!R){try{let e=await I.getItem(D);e&&([u,w]=JSON.parse(await V(e)))}catch(e){}try{null==u&&(u=K())}catch(e){}}k=await S.createInstance({name:"dynamdlsuns"+m(m("v2"))+m(String.fromCharCode(s.charCodeAt(0)+10)+m(n)+m(s)+a+m(""+c))});try{i=await I.getItem(M)}catch(e){}},re=async e=>{T||(T=(async()=>{try{let t={pd:n,vm:a,dt:c||"browser",ed:"javascript",cu:u,ad:d,os:l,fn:f};v&&(t.rmk=v),s&&(t=-1!=s.indexOf("-")?{...t,hs:s}:{...t,og:s});let r={};if(w&&!R){let e=await I.getItem(D);e&&([u,w]=JSON.parse(await V(e))),r["lts-time"]=w}b&&(t.sp=b);let o=await Promise.race([(async()=>{let n,o=(new Date).kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ");w&&!R&&(I.setItem(D,await Z(JSON.stringify([u,o]))),w=o);let a,s="auth/?ext="+encodeURIComponent(m(JSON.stringify(t))),c=!1,d=!1,l=async e=>{if(e&&!e.ok)try{let t=await e.text();if(t){let e=JSON.parse(t);e.errorCode&&(a=e,e.errorCode>100&&e.errorCode<200&&(i=null,c=!0,d=!0))}}catch(e){}};try{n=await Promise.race([fetch(O[0]+s,{headers:r,cache:e?"reload":"default",mode:"cors"}),new Promise(((e,t)=>setTimeout(t,1e4)))]),await l(n)}catch(e){}if(!(i||n&&n.ok||c))try{n=await Promise.race([fetch(O[1]+s,{headers:r,mode:"cors"}),new Promise(((e,t)=>setTimeout(t,3e4)))]),await l(n)}catch(e){}if(!(i||n&&n.ok||c))try{n=await Promise.race([fetch(O[0]+s,{headers:r,mode:"cors"}),new Promise(((e,t)=>setTimeout(t,3e4)))]),await l(n)}catch(e){}a&&151==a.errorCode&&(R||I.removeItem(D),I.removeItem(M),u=K(),t.cu=u,w=void 0,s="auth/?ext="+encodeURIComponent(m(JSON.stringify(t))),n=await Promise.race([fetch(O[0]+s,{headers:r,mode:"cors"}),new Promise(((e,t)=>setTimeout(t,3e4)))]),await l(n));(()=>{if(!n||!n.ok){let e;d&&I.setItem(M,""),a?111==a.errorCode?e=a.message:(e=a.message.trim(),e.endsWith(".")||(e+="."),e=p?`An error occurred during authorization: ${e} [Contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information.`:`An error occurred during authorization: ${e} Contact the site administrator for more information.`):e=p?Y:Q;let t=Error(e);throw a&&a.errorCode&&(t.ltsErrorCode=a.errorCode),t}})();let f=await n.text();try{w||R||(I.setItem(D,await Z(JSON.stringify([u,o]))),w=o),I.setItem(M,f)}catch(e){}return f})(),new Promise(((e,t)=>{let r;r=p?X:q,setTimeout((()=>t(new Error(r))),i?3e3:15e3)}))]);i=o}catch(e){g&&console.error(e),_=e}T=null})()),await T,B||(B=Date.now()+6e4)},ne=async()=>{E||(E=(async()=>{if(U(u),!i){if(!j)throw A(_.message),_;return}let e={dm:d};g&&(e.bd=!0),e.brtk=!0,e.ls=O[0],s&&(e.hs=s),e.cu=u,f&&(e.fn=f),n&&(e.pd=n),c&&(e.dt=c),l&&(e.os=l),U(i);try{let t=JSON.parse(await L(i));t.ba&&(e.ba=t.ba),t.usu&&(e.usu=t.usu),t.trial&&(e.trial=t.trial),t.its&&(e.its=t.its),1==e.trial&&t.msg?e.msg=t.msg:_?e.msg=_.message||_:t.msg&&(e.msg=t.msg),e.ar=t.in,e.bafc=!!_}catch(e){}U(e);try{await x(e)}catch(e){}await oe(),j||(j=!0),E=null})()),await E},oe=async()=>{let e=(new Date).kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ"),t=await P();if(U(t),t&&t<e)throw _?new Error(G):new Error(ee)};const ae=new r;let se=null,ie=async(e,t)=>(F=F.then((async()=>{let r=!1;try{let n=await k.keys();if(t||(ae.isFulfilled?e&&(n=n.filter((t=>t<e))):e&&n.includes(e)?n=[e]:(n=[],U("Unexpected null key"))),!n.length)return;ae.isFulfilled||(r=!0);for(let e=0;e<n.length/1e3;++e){let t=n.slice(1e3*e,1e3*(e+1)),o=[];for(let e=0;e<t.length;++e)o.push(await k.getItem(t[e]));if(w=(new Date).kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ"),!R){let e=await I.getItem(D);e&&([u]=JSON.parse(await V(e))),I.setItem(D,await Z(JSON.stringify([u,w])))}try{let e=O[0]+"verify/v2";w&&!R&&(e+="?ltstime="+encodeURIComponent(w));let n=await new Promise(((t,n)=>{const a=new XMLHttpRequest;a.responseType="json",a.timeout=3e4,a.onload=()=>{r&&ae.resolve(),t({ok:!0})},a.onerror=a.ontimeout=a.onabort=()=>{t({ok:!1,status:a.status})},a.open("POST",e,!0),a.send(o.join(";"))}));if(!n.ok)throw new Error("verify failed. Status Code: "+n.status);for(let e=0;e<t.length;++e)await k.removeItem(t[e])}catch(e){throw e}}}catch(e){}})),await F);return{i:async e=>{n=e.pd,o=e.v,a=o.split(".")[0],e.dt&&(c=e.dt),d=e.dm,s=e.l||"",l="string"!=typeof e.os?JSON.stringify(e.os):e.os,f=e.fn,"string"==typeof f&&(f=f.substring(0,50)),e.ls&&e.ls.length&&(O=e.ls,1==O.length&&O.push(O[0])),p=y===O&&(!s||"200001"===s||s.startsWith("200001-")),b=e.sp,v=e.rmk,e.lf&&(S=e.lf),e.lsu&&(u=R=e.lsu),e.fdaa&&(L=e.fdaa),e.feab&&($=e.feab),x=e.updl,C=e.mnet,P=e.mxet,await te(),await re(),await ne(),(!_||_.ltsErrorCode>=102&&_.ltsErrorCode<=120)&&ie(null,!0)},c:async()=>{let e=new Date,t=e.kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ"),r=await C(),n=await P();if(n&&n<t)await re(!0),await ne();else if(r&&r<t){e.setMinutes(e.getMinutes()-6);let t=e;e=null;let r=t.kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ");w<r&&re().then((()=>ne()))}},s:async(e,t,r,n)=>{try{let e;if(t.startsWith("{")&&t.endsWith("}")){if(v){let e=JSON.parse(t);e.rmk=v,t=JSON.stringify(e)}e=await $(t)}else e=t;e?await k.setItem(r,e):U("ept ecpt")}catch(e){}n&&await ie(r),se&&clearTimeout(se),se=setTimeout((async()=>{await ie()}),36e4)},p:ae,r:async()=>{ae.isPending&&B&&B<Date.now()&&(B=Date.now()+6e4,await fetch(O[1]+"lts/test"))}}},q=e,Y=!1,Q="BarcodeReaderWasm",ee=0,te=0;let re=new r,ne=!1,oe=async e=>{await re,Z=e.trial,K=e.msg,Module[Q].init(JSON.stringify(e))},ae=()=>Module[Q].getMinExpireTime(),se=()=>Module[Q].getMaxExpireTime(),ie=new Map,ce=0,de=async function(t){const r=t.data?t.data:t,n=r.id,o=r.instanceID,a=r.body;switch(!V||"decodeBuffer"!=r.type&&"decodeFileInMemory"!=r.type||await G.c(),r.type){case"loadWasm":try{z=r.bd,L=r.engineResourcePath,Y=r.bUseFullFeature,$=r.v;let t=r.dm,n=r.l;V=r.brtk;let o,a=r.bptk;(async()=>{if(ne)throw"can't load wasm twice";ne=!0,ue("wasm loading...");let t=Date.now();await new Promise((async t=>{e.KModule=e.Module={locateFile:function(e){return"libDynamsoftBarcodeReader.wasm"==e?L+"dbr-"+$+(Y?".full":"")+".wasm":L+e},print:e=>{ue(e)},printErr:e=>{console.error(e),ue(e)},onRuntimeInitialized:t},importScripts(L+"dbr-"+$+(Y?".full":"")+".wasm.js")})),ue("wasm initialized, cost "+(Date.now()-t)+" ms"),Module=KModule,re.resolve()})();let s=async()=>{try{G=X({log:ue,bd:z}),e.scsd=G.s,r.pd="dbr",r.updl=oe,r.mnet=ae,r.mxet=se,await G.i(r)}catch(e){if(!a)throw e;V=!1,await i(),o=e.ltsErrorCode,K=e.message||e}},i=async()=>{let e={pk:n,dm:t};z&&(e.bd=!0),await oe(e)};V?await s():await i(),q.postMessage({type:"load",success:!0,version:Module[Q].getVersion(),trial:Z,ltsErrorCode:o,message:K})}catch(e){let t=e&&e.message;q.postMessage({type:"load",success:!1,ltsErrorCode:e&&e.ltsErrorCode,message:t,trial:Z,stack:z&&e?e.stack:null})}break;case"createInstance":{const e=ce++;try{let t=new Module[Q](r.bScanner,e);ie.set(e,t);let n=JSON.parse(t.getRuntimeSettings());r.bScanner?(n.localizationModes=[2,0,0,0,0,0,0,0],n.deblurLevel=0):(n.expectedBarcodesCount=512,n.scaleDownThreshold=1e5,n.timeout=1e5),Y||(n.barcodeFormatIds=238028799),t.updateRuntimeSettings(JSON.stringify(n))}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,instanceID:e}});break}case"destroyContext":try{if(!ie.get(o))break;ie.get(o).delete(),ie.delete(o)}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0}});break;case"decodeBuffer":{let e,t,r,s,i=Date.now();try{e=z?Date.now():0,c=a.buffer,(d=a.stride*a.height)>ee&&(te&&Module._free(te),te=Module._malloc(d),ee=d),Module.HEAPU8.set(c.subarray(0,d),te),t=z?Date.now():0,s=JSON.parse(ie.get(o).decodeBufferPtr(te,a.width,a.height,a.stride,a.format,!(!a.config||!a.config.bScanner))),r=Date.now()}catch(e){fe(e,n);break}G&&G.p.isPending&&await Promise.race([G.p,new Promise((e=>setTimeout(e,500)))]),q.postMessage({type:"task",id:n,body:{success:!0,decodeReturn:s,buffer:a.buffer,duration:Date.now()-i}},[a.buffer.buffer]),le(["timeWorkerGetMsg: "+i,"timeBeforeSendBufferToWasm: "+e+" "+(e-i),"timeBeforeDecode: "+t+" "+(t-e),"timeFinishDecode: "+r+" "+(r-t)].join("\n"));break}case"decodeFileInMemory":{let e,t,r;try{t=z?Date.now():0,e=JSON.parse(ie.get(o).decodeFileInMemory(a.bytes)),r=z?Date.now():0}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,decodeReturn:e,duration:r-t}});break}case"clearMapDecodeRecord":try{ie.get(o).clearMapDecodeRecord()}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0}});break;case"getRuntimeSettings":{let e;try{e=ie.get(o).getRuntimeSettings()}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,results:e}});break}case"updateRuntimeSettings":{let e;try{e=JSON.parse(ie.get(o).updateRuntimeSettings(a.settings))}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,updateReturn:e}});break}case"resetRuntimeSettings":try{let e=ie.get(o);e.resetRuntimeSettings();let t=JSON.parse(e.getRuntimeSettings());e.bScanner?(t.localizationModes=[2,0,0,0,0,0,0,0],t.deblurLevel=0,t.barcodeZoneMinDistanceToImageBorders=9):(t.expectedBarcodesCount=512,t.scaleDownThreshold=1e5,t.timeout=1e5),Y||(t.barcodeFormatIds=238028799),e.updateRuntimeSettings(JSON.stringify(t))}catch(e){fe(t,n);break}q.postMessage({type:"task",id:n,body:{success:!0}});break;case"outputRuntimeSettingsToString":{let e;try{e=ie.get(o).outputSettingsToString()}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,results:e}});break}case"initRuntimeSettingsWithString":{let e;try{e=JSON.parse(ie.get(o).initRuntimeSettingsWithString(a.settings))}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,initReturn:e}});break}case"getIntermediateResults":{let e=[];try{var s=ie.get(o).getIntermediateResults(),i=JSON.parse(s,((t,r)=>{if("bytes"===t&&"ptr"in r&&"length"in r){var n=r,o=n.ptr,a=n.length;let t=Module[Q].getBytes(o,a);return t=t.slice(0),e.push(t.buffer),t}return r}))}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,results:i}},e),ie.get(o).freeIntermediateResults();break}case"setModeArgument":{let e;try{e=JSON.parse(ie.get(o).setModeArgument(a.modeName,a.index,a.argumentName,a.argumentValue))}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,setReturn:e}});break}case"getModeArgument":{let e;try{e=JSON.parse(ie.get(o).getModeArgument(a.modeName,a.index,a.argumentName))}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,getReturn:e}});break}case"updateScanSettings":try{let e=ie.get(o),t=a.settings;e.duplicateForgetTime=t.duplicateForgetTime,e.oneDRememberFrameCount=t.oneDRememberFrameCount,e.oneDTrustFrameCount=t.oneDTrustFrameCount}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0}});break;case"getScanSettings":{let e={};try{let t=ie.get(o);e.duplicateForgetTime=t.duplicateForgetTime,e.oneDRememberFrameCount=t.oneDRememberFrameCount,e.oneDTrustFrameCount=t.oneDTrustFrameCount}catch(e){fe(e,n);break}q.postMessage({type:"task",id:n,body:{success:!0,results:e}});break}case"keepAlive":G&&await G.r();break;default:console.warn("Unmatched task: ",t)}var c,d};q.onmessage=de;let ue=e=>{q.postMessage({type:"log",message:e})},le=e=>{z&&ue(e)},fe=(e,t)=>{q.postMessage({type:"task",id:t,body:{success:!1,message:e.message,stack:e.stack}}),setTimeout((()=>{throw e}),0)}}();
