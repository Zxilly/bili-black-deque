// ==UserScript==
// @name Bilibili Black Deque
// @version 0.0.2
// @namespace http://tampermonkey.net/
// @description Make blacklist of bilibili a deque
// @author Zxilly
// @source https://github.com/Zxilly/bili-black-deque
// @license https://opensource.org/licenses/MIT
// @match *://www.bilibili.com/*
// @require https://cdn.jsdelivr.net/npm/axios@1.6.0
// ==/UserScript==
/******/(()=>{/******/"use strict";/******/var t={/***/204:/***/function(t,n,e){var i=this&&this.__awaiter||function(t,n,e,i){function o(t){return t instanceof e?t:new e(function(n){n(t)})}return new(e||(e=Promise))(function(e,r){function a(t){try{u(i.next(t))}catch(t){r(t)}}function c(t){try{u(i["throw"](t))}catch(t){r(t)}}function u(t){t.done?e(t.value):o(t.value).then(a,c)}u((i=i.apply(t,n||[])).next())})};var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{"default":t}};Object.defineProperty(n,"__esModule",{value:true});n.getBlackListCnt=void 0;const r=o(e(467));function a(){return i(this,void 0,void 0,function*(){const t=(yield r.default.get("https://api.bilibili.com/x/relation/blacks",{withCredentials:true})).data;return t.data.total})}n.getBlackListCnt=a;/***/},/***/166:/***/function(t,n,e){var i=this&&this.__awaiter||function(t,n,e,i){function o(t){return t instanceof e?t:new e(function(n){n(t)})}return new(e||(e=Promise))(function(e,r){function a(t){try{u(i.next(t))}catch(t){r(t)}}function c(t){try{u(i["throw"](t))}catch(t){r(t)}}function u(t){t.done?e(t.value):o(t.value).then(a,c)}u((i=i.apply(t,n||[])).next())})};Object.defineProperty(n,"__esModule",{value:true});const o=e(224);const r=e(204);function a(){return i(this,void 0,void 0,function*(){let t=yield(0,r.getBlackListCnt)();const n=window.prompt(`现在黑名单有 ${t}人，想移除：`);if(n===null){alert("必须输入一个整数");return}const e=Number.parseInt(n);if(Number.isNaN(e)){alert(`${n} 不能被解释为合法整数`);return}if(e<=0){alert("数字必须大于 0")}if(t<e){alert(`当前黑名单中的人数 ${t} 少于 ${e}`);return}yield(0,o.popBlack)(e,t)})}document.addEventListener("keydown",t=>{if(t.ctrlKey&&t.key==="b"){a()}});/***/},/***/224:/***/function(t,n,e){var i=this&&this.__awaiter||function(t,n,e,i){function o(t){return t instanceof e?t:new e(function(n){n(t)})}return new(e||(e=Promise))(function(e,r){function a(t){try{u(i.next(t))}catch(t){r(t)}}function c(t){try{u(i["throw"](t))}catch(t){r(t)}}function u(t){t.done?e(t.value):o(t.value).then(a,c)}u((i=i.apply(t,n||[])).next())})};var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{"default":t}};Object.defineProperty(n,"__esModule",{value:true});n.popBlack=void 0;const r=o(e(467));const a=e(204);const c=document.cookie.split("; ").find(t=>t.startsWith("bili_jct")).split("=")[1];function u(t,n){return i(this,void 0,void 0,function*(){const e=Math.ceil(n/50);const i=[];for(let n=e;n>0;n--){const e=(yield r.default.get("https://api.bilibili.com/x/relation/blacks",{params:{ps:20,pn:n},withCredentials:true})).data;const o=e.data.list;o.reverse();for(const n of o){const e=n["mid"];i.push(e);if(i.length>=t){break}}if(i.length>=t){break}}console.log(JSON.stringify(i));console.log("收集完成，准备解除");console.groupCollapsed("解除请求细节");for(let t of i){const n=new URLSearchParams;n.append("fid",t);n.append("csrf",c);n.append("act","6");n.append("re_src","116");const e=(yield r.default.post("https://api.bilibili.com/x/relation/modify",n,{withCredentials:true})).data;console.debug(JSON.stringify(e))}console.groupEnd();let o=yield(0,a.getBlackListCnt)();alert(`处理完成，当前黑名单有 ${o} 人`)})}n.popBlack=u;/***/},/***/467:/***/t=>{t.exports=axios;/***/}};/************************************************************************//******/// The module cache
/******/var n={};/******//******/// The require function
/******/function e(i){/******/// Check if module is in cache
/******/var o=n[i];/******/if(o!==undefined){/******/return o.exports;/******/}/******/// Create a new module (and put it into the cache)
/******/var r=n[i]={/******/// no module.id needed
/******/// no module.loaded needed
/******/exports:{}};/******//******/// Execute the module function
/******/t[i].call(r.exports,r,r.exports,e);/******//******/// Return the exports of the module
/******/return r.exports;/******/}/******//************************************************************************//******//******/// startup
/******/// Load entry module and return exports
/******/// This entry module is referenced by other modules so it can't be inlined
/******/var i=e(166);/******//******/})();