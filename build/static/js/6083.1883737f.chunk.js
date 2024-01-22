"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[6083],{8138:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(a=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(s){r=!0,o=s}finally{try{!a&&u.return&&u.return()}finally{if(r)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),u=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(72907));var s=/(\{[\d|\w]+\})/,l=/(\$ref\{[\w|.]+\})/,f=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),"function"===typeof n&&(n={customLanguageInterface:n}),this._opts=o({},{customLanguageInterface:u.getInterfaceLanguage,pseudo:!1,pseudoMultipleLanguages:!1,logsEnabled:!0},n),this._interfaceLanguage=this._opts.customLanguageInterface(),this._language=this._interfaceLanguage,this.setContent(t)}return i(e,[{key:"setContent",value:function(e){var t=this,n=Object.keys(e),a=r(n,1)[0];this._defaultLanguage=a,this._defaultLanguageFirstLevelKeys=[],this._props=e,u.validateTranslationKeys(Object.keys(e[this._defaultLanguage])),Object.keys(this._props[this._defaultLanguage]).forEach((function(e){"string"===typeof t._props[t._defaultLanguage][e]&&t._defaultLanguageFirstLevelKeys.push(e)})),this.setLanguage(this._interfaceLanguage),this._opts.pseudo&&this._pseudoAllValues(this._props)}},{key:"_pseudoAllValues",value:function(e){var t=this;Object.keys(e).forEach((function(n){if("object"===a(e[n]))t._pseudoAllValues(e[n]);else if("string"===typeof e[n]){if(0===e[n].indexOf("[")&&e[n].lastIndexOf("]")===e[n].length-1)return;for(var r=e[n].split(" "),o=0;o<r.length;o+=1)if(r[o].match(s));else if(r[o].match(l));else{var i=r[o].length;t._opts.pseudoMultipleLanguages&&(i=parseInt(1.4*i,10)),r[o]=u.randomPseudo(i)}e[n]="["+r.join(" ")+"]"}}))}},{key:"setLanguage",value:function(e){var t=this,n=u.getBestMatchingLanguage(e,this._props),a=Object.keys(this._props)[0];if(this._language=n,this._props[n]){for(var r=0;r<this._defaultLanguageFirstLevelKeys.length;r+=1)delete this[this._defaultLanguageFirstLevelKeys[r]];var i=o({},this._props[this._language]);Object.keys(i).forEach((function(e){t[e]=i[e]})),a!==this._language&&(i=this._props[a],this._fallbackValues(i,this))}}},{key:"_fallbackValues",value:function(e,t){var n=this;Object.keys(e).forEach((function(a){Object.prototype.hasOwnProperty.call(e,a)&&!t[a]&&""!==t[a]?(t[a]=e[a],n._opts.logsEnabled&&console.log("\ud83d\udea7 \ud83d\udc77 key '"+a+"' not found in localizedStrings for language "+n._language+" \ud83d\udea7")):"string"!==typeof t[a]&&n._fallbackValues(e[a],t[a])}))}},{key:"getLanguage",value:function(){return this._language}},{key:"getInterfaceLanguage",value:function(){return this._interfaceLanguage}},{key:"getAvailableLanguages",value:function(){var e=this;return this._availableLanguages||(this._availableLanguages=[],Object.keys(this._props).forEach((function(t){e._availableLanguages.push(t)}))),this._availableLanguages}},{key:"formatString",value:function(e){for(var t=this,n=arguments.length,a=Array(n>1?n-1:0),r=1;r<n;r++)a[r-1]=arguments[r];var o=e||"";return"string"===typeof o&&(o=this.getString(e,null,!0)||o),o.split(l).filter((function(e){return!!e})).map((function(n){if(n.match(l)){var a=n.slice(5,-1),r=t.getString(a);return r||(t._opts.logsEnabled&&console.log("No Localization ref found for '"+n+"' in string '"+e+"'"),"$ref(id:"+a+")")}return n})).join("").split(s).filter((function(e){return!!e})).map((function(e){if(e.match(s)){var t=e.slice(1,-1),n=a[t];if(void 0===n){var r=a[0][t];if(void 0===r)return n;n=r}return n}return e})).join("")}},{key:"getString",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];try{for(var a=this._props[t||this._language],r=e.split("."),o=0;o<r.length;o+=1){if(void 0===a[r[o]])throw Error(r[o]);a=a[r[o]]}return a}catch(i){!n&&this._opts.logsEnabled&&console.log("No localization found for key '"+e+"' and language '"+t+"', failed on "+i.message)}return null}},{key:"getContent",value:function(){return this._props}}]),e}();t.default=f},72907:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getInterfaceLanguage=function(){var e="en-US";if("undefined"===typeof navigator)return e;var t=navigator;if(t){if(t.language)return t.language;if(t.languages&&t.languages[0])return t.languages[0];if(t.userLanguage)return t.userLanguage;if(t.browserLanguage)return t.browserLanguage}return e},t.getBestMatchingLanguage=function(e,t){if(t[e])return e;var n=e.indexOf("-"),a=n>=0?e.substring(0,n):e;return t[a]?a:Object.keys(t)[0]},t.validateTranslationKeys=function(e){var t=["_interfaceLanguage","_language","_defaultLanguage","_defaultLanguageFirstLevelKeys","_props"];e.forEach((function(e){if(-1!==t.indexOf(e))throw new Error(e+" cannot be used as a key. It is a reserved word.")}))},t.randomPseudo=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<e;a+=1)t+=n.charAt(Math.floor(62*Math.random()));return t}},6083:(e,t,n)=>{var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=i(n(72791)),o=i(n(8138));function i(e){return e&&e.__esModule?e:{default:e}}var u=/(\{[\d|\w]+\})/;o.default.prototype.formatString=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=!1,s=(e||"").split(u).filter((function(e){return!!e})).map((function(e,t){if(e.match(u)){var o=e.slice(1,-1),s=n[o];if(void 0==s){var l=n[0][o];if(void 0===l)return s;s=l}return r.default.isValidElement(s)?(i=!0,r.default.Children.toArray(s).map((function(e){return a({},e,{key:t.toString()})}))):s}return e}));return i?s:s.join("")},t.Z=o.default}}]);
//# sourceMappingURL=6083.1883737f.chunk.js.map