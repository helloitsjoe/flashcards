function t(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var e,n=(function(t,e){self,t.exports=(()=>{var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Directions:()=>s,default:()=>i});var n=["delta","timeout","fromTop","element","logger"],o=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.logger,o=void 0===e?console:e,r=0,s=Object.keys(t);r<s.length;r++){var c=s[r];n.includes(c)||o.warn("".concat(c," is not a valid option"))}},r=function(){return Date.now()},s={DOWN:"DOWN",UP:"UP",LEFT:"LEFT",RIGHT:"RIGHT"},c=s.DOWN,u=s.UP,a=s.LEFT;function i(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};o(n);var s,i,l,d,f,h,p=n.delta,m=void 0===p?100:p,g=n.timeout,$=void 0===g?1/0:g,v=n.fromTop,w=void 0!==v&&v,y=n.element,b=void 0===y?document:y,x=function(t){l=t.touches[0].clientX,d=t.touches[0].clientY,f=window.scrollY,h=r()},k=function(n){var o,p;s=n.changedTouches[0].clientX,i=n.changedTouches[0].clientY,(!w||0===f)&&(o=t===a?l-s:s-l,p=t===u?d-i:i-d,([u,c].includes(t)?p:o)>=m)&&r()-h<$&&e(n),h=null};return b.addEventListener("touchstart",x),b.addEventListener("touchend",k),function(){b.removeEventListener("touchstart",x),b.removeEventListener("touchend",k)}}return e})()}(e={exports:{}},e.exports),e.exports),o=t(n),r={Car:"車","Elementary school student":"小学生",Pants:"ズボン","Dinner ":"夕飯",Which:"どの",Who:"誰",Where:"どこ","Receive  from":"にもらいまさ",Give:"あげます",How:"どうやって",Need:"要ります",Wait:"待ち",Carry:"持ち",Already:"もう"};function s(){}function c(t){return t()}function u(){return Object.create(null)}function a(t){t.forEach(c)}function i(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function d(t,e){t.appendChild(e)}function f(t,e,n){t.insertBefore(e,n||null)}function h(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function $(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function v(t){return function(e){return e.preventDefault(),t.call(this,e)}}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function y(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e){t.value=null==e?"":e}let x;function k(t){x=t}const C=[],_=[],O=[],W=[],E=Promise.resolve();let S=!1;function j(t){O.push(t)}let N=!1;const z=new Set;function T(){if(!N){N=!0;do{for(let t=0;t<C.length;t+=1){const e=C[t];k(e),I(e.$$)}for(k(null),C.length=0;_.length;)_.pop()();for(let t=0;t<O.length;t+=1){const e=O[t];z.has(e)||(z.add(e),e())}O.length=0}while(C.length);for(;W.length;)W.pop()();S=!1,N=!1,z.clear()}}function I(t){if(null!==t.fragment){t.update(),a(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(j)}}const A=new Set;let P;function D(t,e){t&&t.i&&(A.delete(t),t.i(e))}function L(t,e,n,o){if(t&&t.o){if(A.has(t))return;A.add(t),P.c.push((()=>{A.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function M(t){t&&t.c()}function F(t,e,n,o){const{fragment:r,on_mount:s,on_destroy:u,after_update:l}=t.$$;r&&r.m(e,n),o||j((()=>{const e=s.map(c).filter(i);u?u.push(...e):a(e),t.$$.on_mount=[]})),l.forEach(j)}function G(t,e){const n=t.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function H(t,e){-1===t.$$.dirty[0]&&(C.push(t),S||(S=!0,E.then(T)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function J(t,e,n,o,r,c,i=[-1]){const l=x;k(t);const d=t.$$={fragment:null,ctx:null,props:c,update:s,not_equal:r,bound:u(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:e.context||[]),callbacks:u(),dirty:i,skip_bound:!1};let f=!1;if(d.ctx=n?n(t,e.props||{},((e,n,...o)=>{const s=o.length?o[0]:n;return d.ctx&&r(d.ctx[e],d.ctx[e]=s)&&(!d.skip_bound&&d.bound[e]&&d.bound[e](s),f&&H(t,e)),n})):[],d.update(),f=!0,a(d.before_update),d.fragment=!!o&&o(d.ctx),e.target){if(e.hydrate){const t=function(t){return Array.from(t.childNodes)}(e.target);d.fragment&&d.fragment.l(t),t.forEach(h)}else d.fragment&&d.fragment.c();e.intro&&D(t.$$.fragment),F(t,e.target,e.anchor,e.customElement),T()}k(l)}class R{$destroy(){G(this,1),this.$destroy=s}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function U(t){let e,n=t[0][t[1]]+"";return{c(){e=m(n)},m(t,n){f(t,e,n)},p(t,o){3&o&&n!==(n=t[0][t[1]]+"")&&y(e,n)},d(t){t&&h(e)}}}function Y(t){let e;return{c(){e=m("Start")},m(t,n){f(t,e,n)},p:s,d(t){t&&h(e)}}}function q(t){let e,n,o,r;function c(t,e){return t[0]?U:Y}let u=c(t),a=u(t);return{c(){e=p("button"),a.c(),w(e,"style",n=`font-size: ${t[2]};`),w(e,"class","content svelte-1q13rft")},m(n,s){f(n,e,s),a.m(e,null),o||(r=$(e,"click",t[3]),o=!0)},p(t,[o]){u===(u=c(t))&&a?a.p(t,o):(a.d(1),a=u(t),a&&(a.c(),a.m(e,null))),4&o&&n!==(n=`font-size: ${t[2]};`)&&w(e,"style",n)},i:s,o:s,d(t){t&&h(e),a.d(),o=!1,r()}}}function X(t,e,n){let o,{content:r}=e,s="english";return t.$$set=t=>{"content"in t&&n(0,r=t.content)},t.$$.update=()=>{1&t.$$.dirty&&n(2,o=window.innerWidth<400?`${Math.max(70/r.length,10)}vw`:"400%")},[r,s,o,()=>n(1,s="english"===s?"japanese":"english")]}class B extends R{constructor(t){super(),J(this,t,X,q,l,{content:0})}}function K(t){let e,n,o,r,s,c,u,l,m,v,y,b,x,k;return e=new B({props:{content:t[4]}}),{c(){M(e.$$.fragment),n=g(),o=p("div"),r=p("button"),r.textContent="<",s=g(),c=p("button"),c.textContent=">",u=g(),l=p("div"),m=p("button"),m.textContent="Shuffle all",v=g(),y=p("button"),y.textContent="I know this one!",w(r,"class","arrow svelte-1sh1m40"),w(c,"class","arrow svelte-1sh1m40"),w(o,"class","arrows svelte-1sh1m40"),w(m,"class","svelte-1sh1m40"),w(y,"class","svelte-1sh1m40"),w(l,"class","buttons svelte-1sh1m40")},m(a,h){F(e,a,h),f(a,n,h),f(a,o,h),d(o,r),d(o,s),d(o,c),f(a,u,h),f(a,l,h),d(l,m),d(l,v),d(l,y),b=!0,x||(k=[$(r,"click",t[6]),$(c,"click",t[5]),$(m,"click",(function(){i(t[1])&&t[1].apply(this,arguments)})),$(y,"click",t[8])],x=!0)},p(n,[o]){t=n;const r={};16&o&&(r.content=t[4]),e.$set(r)},i(t){b||(D(e.$$.fragment,t),b=!0)},o(t){L(e.$$.fragment,t),b=!1},d(t){G(e,t),t&&h(n),t&&h(o),t&&h(u),t&&h(l),x=!1,a(k)}}}function Q(t,e,n){let o,r,{groups:s}=e,{shuffleCards:c}=e,{removeCard:u}=e,{currentCardIdx:a}=e;return t.$$set=t=>{"groups"in t&&n(0,s=t.groups),"shuffleCards"in t&&n(1,c=t.shuffleCards),"removeCard"in t&&n(2,u=t.removeCard),"currentCardIdx"in t&&n(7,a=t.currentCardIdx)},t.$$.update=()=>{128&t.$$.dirty&&n(3,o=a),9&t.$$.dirty&&n(4,r=s[o])},[s,c,u,o,r,()=>n(3,o=o+1>s.length-1?0:o+1),()=>n(3,o=o-1<0?s.length-1:o-1),a,()=>u(s[o])]}class V extends R{constructor(t){super(),J(this,t,Q,K,l,{groups:0,shuffleCards:1,removeCard:2,currentCardIdx:7})}}const Z={a:[["a","あ"],["i","い"],["u","う"],["e","え"],["o","お"]],k:[["ka","か"],["ki","き"],["ku","く"],["ke","け"],["ko","こ"]],g:[["ga","が"],["gi","ぎ"],["gu","ぐ"],["ge","げ"],["go","ご"]],s:[["sa","さ"],["shi","し"],["su","す"],["se","せ"],["so","そ"]],z:[["za","ざ"],["ji","じ"],["zu","ず"],["ze","ぜ"],["zo","ぞ"]],t:[["ta","た"],["chi","ち"],["tsu","つ"],["te","て"],["to","と"]],d:[["da","だ"],["dji","ぢ"],["dzu","づ"],["de","で"],["do","ど"]],n:[["na","な"],["ni","に"],["nu","ぬ"],["ne","ね"],["no","の"]],h:[["ha","は"],["hi","ひ"],["fu","ふ"],["he","へ"],["ho","ほ"]],b:[["ba","ば"],["bi","び"],["bu","ぶ"],["be","べ"],["bo","ぼ"]],p:[["pa","ぱ"],["pi","ぴ"],["pu","ぷ"],["pe","ぺ"],["po","ぽ"]],m:[["ma","ま"],["mi","み"],["mu","む"],["me","め"],["mo","も"]],y:[["ya","や"],["yu","ゆ"],["yo","よ"]],r:[["ra","ら"],["ri","り"],["ru","る"],["re","れ"],["ro","ろ"]],w:[["wa","わ"],["wo","を"],["n","ん"]],ky:[["kya","きゃ"],["kyu","きゅ"],["kyo","きょ"]],ch:[["cha","ちゃ"],["chu","ちゅ"],["cho","ちょ"]]},tt={a:[["a","ア"],["i","イ"],["u","ウ"],["e","エ"],["o","オ"]],k:[["ka","カ"],["ki","キ"],["ku","ク"],["ke","ケ"],["ko","コ"]],s:[["sa","サ"],["shi","シ"],["su","ス"],["se","セ"],["so","ソ"]],t:[["ta","タ"],["chi","チ"],["tsu","ツ"],["te","テ"],["to","ト"]],n:[["na","ナ"],["ni","ニ"],["nu","ヌ"],["ne","ネ"],["no","ノ"]],h:[["ha","ハ"],["hi","ヒ"],["hu","フ"],["he","ヘ"],["ho","ホ"]],m:[["ma","マ"],["mi","ミ"],["mu","ム"],["me","メ"],["mo","モ"]],y:[["ya","ヤ"],["yu","ユ"],["yo","ヨ"]],r:[["ra","ラ"],["ri","リ"],["ru","ル"],["re","レ"],["ro","ロ"]],w:[["wa","ワ"],["wo","ヲ"],["n","ン"]]},et=()=>{const t=localStorage.getItem("flashcards-words")||"{}";return JSON.parse(t)};function nt(t){let e,n;return{c(){e=p("h2"),n=m(t[2])},m(t,o){f(t,e,o),d(e,n)},p(t,e){4&e&&y(n,t[2])},d(t){t&&h(e)}}}function ot(t){let e,n,o,r,c,u,i,l,x,k,C,_=t[3]?"Submitting...":"Submit",O=t[2]&&nt(t);return{c(){O&&O.c(),e=g(),n=p("form"),o=p("input"),r=g(),c=p("input"),u=g(),i=p("button"),l=m(_),w(o,"placeholder","English"),w(c,"placeholder","Japanese"),w(c,"lang","ja"),w(i,"class","submit svelte-16kvxx5"),i.disabled=x=!(t[0].length&&t[1])||t[3],w(n,"class","new-word-form svelte-16kvxx5")},m(s,a){O&&O.m(s,a),f(s,e,a),f(s,n,a),d(n,o),b(o,t[0]),d(n,r),d(n,c),b(c,t[1]),d(n,u),d(n,i),d(i,l),k||(C=[$(o,"input",t[7]),$(c,"input",t[8]),$(n,"submit",v(t[4]))],k=!0)},p(t,[n]){t[2]?O?O.p(t,n):(O=nt(t),O.c(),O.m(e.parentNode,e)):O&&(O.d(1),O=null),1&n&&o.value!==t[0]&&b(o,t[0]),2&n&&c.value!==t[1]&&b(c,t[1]),8&n&&_!==(_=t[3]?"Submitting...":"Submit")&&y(l,_),11&n&&x!==(x=!(t[0].length&&t[1])||t[3])&&(i.disabled=x)},i:s,o:s,d(t){O&&O.d(t),t&&h(e),t&&h(n),k=!1,a(C)}}}function rt(t,e,n){let{words:o}=e,{onNewWordAdded:r}=e,s="",c="",u="",a=!1;return t.$$set=t=>{"words"in t&&n(5,o=t.words),"onNewWordAdded"in t&&n(6,r=t.onNewWordAdded)},[s,c,u,a,async()=>{if(s in o)return void n(2,u=`${s} already exists!`);n(2,u=""),n(3,a=!0);const t=[...o,{english:s,japanese:c}];(t=>{localStorage.setItem("flashcards-words",JSON.stringify(t))})(t),r(t),n(0,s=""),n(1,c=""),n(3,a=!1)},o,r,function(){s=this.value,n(0,s)},function(){c=this.value,n(1,c)}]}class st extends R{constructor(t){super(),J(this,t,rt,ot,l,{words:5,onNewWordAdded:6})}}function ct(t){let e,n,o,r;return{c(){e=p("div"),n=p("div"),n.textContent="+",w(n,"class","addWord svelte-1wwze9f"),w(e,"class","addWord-container svelte-1wwze9f")},m(s,c){f(s,e,c),d(e,n),o||(r=$(n,"click",t[3]),o=!0)},p:s,i:s,o:s,d(t){t&&h(e),o=!1,r()}}}function ut(t){let e,n,o,r,s,c,u;return e=new st({props:{words:t[1],onNewWordAdded:t[6]}}),{c(){M(e.$$.fragment),n=g(),o=p("div"),r=p("div"),r.textContent="-",w(r,"class","addWord svelte-1wwze9f"),w(o,"class","addWord-container svelte-1wwze9f")},m(a,i){F(e,a,i),f(a,n,i),f(a,o,i),d(o,r),s=!0,c||(u=$(r,"click",t[3]),c=!0)},p(t,n){const o={};2&n&&(o.words=t[1]),e.$set(o)},i(t){s||(D(e.$$.fragment,t),s=!0)},o(t){L(e.$$.fragment,t),s=!1},d(t){G(e,t),t&&h(n),t&&h(o),c=!1,u()}}}function at(t){let e,n,o,r,s,c,u;o=new V({props:{groups:t[1],shuffleCards:t[4],removeCard:t[5],currentCardIdx:t[2]}});const i=[ut,ct],l=[];function m(t,e){return t[0]?0:1}return s=m(t),c=l[s]=i[s](t),{c(){e=p("main"),n=p("div"),M(o.$$.fragment),r=g(),c.c(),w(n,"class","card svelte-1wwze9f"),w(e,"class","svelte-1wwze9f")},m(t,c){f(t,e,c),d(e,n),F(o,n,null),d(n,r),l[s].m(n,null),u=!0},p(t,[e]){const r={};2&e&&(r.groups=t[1]),4&e&&(r.currentCardIdx=t[2]),o.$set(r);let u=s;s=m(t),s===u?l[s].p(t,e):(P={r:0,c:[],p:P},L(l[u],1,1,(()=>{l[u]=null})),P.r||a(P.c),P=P.p,c=l[s],c?c.p(t,e):(c=l[s]=i[s](t),c.c()),D(c,1),c.m(n,null))},i(t){u||(D(o.$$.fragment,t),D(c),u=!0)},o(t){L(o.$$.fragment,t),L(c),u=!1},d(t){t&&h(e),G(o),l[s].d()}}}function it(t,e,n){let{words:o={}}=e,r=!1,s=(t=>Object.entries(t).map((([t,e])=>({english:t,japanese:e}))))({hiragana:Z,katakana:tt,words:{...o,...et()}}.words),c=0;return t.$$set=t=>{"words"in t&&n(7,o=t.words)},[r,s,c,()=>n(0,r=!r),()=>n(1,s=(t=>{const e=[...t];for(let n=t.length-1;n>0;n--){const t=Math.floor(Math.random()*(n+1));[e[n],e[t]]=[e[t],e[n]]}return e})(s)),t=>n(1,s=s.filter((e=>e[0]!==t[0]))),t=>{n(1,s=t),n(2,c=s.length-1)},o]}o(n.Directions.DOWN,(()=>window.location.reload()),{fromTop:!0});const lt=new class extends R{constructor(t){super(),J(this,t,it,at,l,{words:7})}}({target:document.body,props:{words:r}});export default lt;
//# sourceMappingURL=main.js.map
