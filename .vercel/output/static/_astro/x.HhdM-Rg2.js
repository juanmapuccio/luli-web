import{M as A,j as y,u as P,P as z,h as B,e as K,L as N}from"./proxy.LxMT9-Jl.js";import{r as t}from"./index.CaZlGE7t.js";class S extends t.Component{getSnapshotBeforeUpdate(r){const e=this.props.childRef.current;if(e&&r.isPresent&&!this.props.isPresent){const n=this.props.sizeRef.current;n.height=e.offsetHeight||0,n.width=e.offsetWidth||0,n.top=e.offsetTop,n.left=e.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function _({children:s,isPresent:r}){const e=t.useId(),n=t.useRef(null),a=t.useRef({width:0,height:0,top:0,left:0}),{nonce:u}=t.useContext(A);return t.useInsertionEffect(()=>{const{width:d,height:i,top:h,left:o}=a.current;if(r||!n.current||!d||!i)return;n.current.dataset.motionPopId=e;const c=document.createElement("style");return u&&(c.nonce=u),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${e}"] {
            position: absolute !important;
            width: ${d}px !important;
            height: ${i}px !important;
            top: ${h}px !important;
            left: ${o}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[r]),y.jsx(S,{isPresent:r,childRef:n,sizeRef:a,children:t.cloneElement(s,{ref:n})})}const D=({children:s,initial:r,isPresent:e,onExitComplete:n,custom:a,presenceAffectsLayout:u,mode:d})=>{const i=P(O),h=t.useId(),o=t.useCallback(p=>{i.set(p,!0);for(const x of i.values())if(!x)return;n&&n()},[i,n]),c=t.useMemo(()=>({id:h,initial:r,isPresent:e,custom:a,onExitComplete:o,register:p=>(i.set(p,!1),()=>i.delete(p))}),u?[Math.random(),o]:[e,o]);return t.useMemo(()=>{i.forEach((p,x)=>i.set(x,!1))},[e]),t.useEffect(()=>{!e&&!i.size&&n&&n()},[e]),d==="popLayout"&&(s=y.jsx(_,{isPresent:e,children:s})),y.jsx(z.Provider,{value:c,children:s})};function O(){return new Map}const v=s=>s.key||"";function j(s){const r=[];return t.Children.forEach(s,e=>{t.isValidElement(e)&&r.push(e)}),r}const V=({children:s,custom:r,initial:e=!0,onExitComplete:n,presenceAffectsLayout:a=!0,mode:u="sync",propagate:d=!1})=>{const[i,h]=B(d),o=t.useMemo(()=>j(s),[s]),c=d&&!i?[]:o.map(v),p=t.useRef(!0),x=t.useRef(o),g=P(()=>new Map),[L,$]=t.useState(o),[m,k]=t.useState(o);K(()=>{p.current=!1,x.current=o;for(let f=0;f<m.length;f++){const l=v(m[f]);c.includes(l)?g.delete(l):g.get(l)!==!0&&g.set(l,!1)}},[m,c.length,c.join("-")]);const w=[];if(o!==L){let f=[...o];for(let l=0;l<m.length;l++){const C=m[l],R=v(C);c.includes(R)||(f.splice(l,0,C),w.push(C))}u==="wait"&&w.length&&(f=w),k(j(f)),$(o);return}const{forceRender:E}=t.useContext(N);return y.jsx(y.Fragment,{children:m.map(f=>{const l=v(f),C=d&&!i?!1:o===m||c.includes(l),R=()=>{if(g.has(l))g.set(l,!0);else return;let M=!0;g.forEach(I=>{I||(M=!1)}),M&&(E?.(),k(x.current),d&&h?.(),n&&n())};return y.jsx(D,{isPresent:C,initial:!p.current||e?void 0:!1,custom:C?void 0:r,presenceAffectsLayout:a,mode:u,onExitComplete:C?void 0:R,children:f},l)})})};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=(...s)=>s.filter((r,e,n)=>!!r&&r.trim()!==""&&n.indexOf(r)===e).join(" ").trim();/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var U={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=t.forwardRef(({color:s="currentColor",size:r=24,strokeWidth:e=2,absoluteStrokeWidth:n,className:a="",children:u,iconNode:d,...i},h)=>t.createElement("svg",{ref:h,...U,width:r,height:r,stroke:s,strokeWidth:n?Number(e)*24/Number(r):e,className:b("lucide",a),...i},[...d.map(([o,c])=>t.createElement(o,c)),...Array.isArray(u)?u:[u]]));/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=(s,r)=>{const e=t.forwardRef(({className:n,...a},u)=>t.createElement(W,{ref:u,iconNode:r,className:b(`lucide-${T(s)}`,n),...a}));return e.displayName=`${s}`,e};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Z=X("X",F);export{V as A,Z as X,X as c};
