var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("iQIUW");const i=document.querySelector(".form");function u(){const{elements:{delay:e,step:t,amount:n}}=i;return{delay:Number(e.value),step:Number(t.value),amount:Number(n.value)}}async function l(e,t){return function(e,t){return new Promise(((n,o)=>{setTimeout((()=>{Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}(e,t)}i.addEventListener("submit",(async function(e){e.preventDefault();let t=u().delay;const{step:n,amount:o}=u();for(let e=0;e<o;e++){try{await l(e+1,t),r.Notify.success(`✅ Fulfilled promise ${e+1} in ${t}ms`)}catch(n){r.Notify.failure(`❌ Rejected promise ${e+1} in ${t}ms`)}t+=n}}));
//# sourceMappingURL=03-promises.f5885eb7.js.map
