"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[8532],{93517:(e,a,r)=>{r.d(a,{Z:()=>M});var l=r(87462),t=r(63366),o=r(72791),s=(r(57441),r(63733)),n=r(94419),c=r(78832),i=r(66934),p=r(31402),d=r(20890),m=r(12065),u=r(74223),y=r(80184);const h=(0,u.Z)((0,y.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz");var g=r(23701);const Z=["slots","slotProps"],f=(0,i.ZP)(g.Z)((e=>{let{theme:a}=e;return(0,l.Z)({display:"flex",marginLeft:"calc(".concat(a.spacing(1)," * 0.5)"),marginRight:"calc(".concat(a.spacing(1)," * 0.5)")},"light"===a.palette.mode?{backgroundColor:a.palette.grey[100],color:a.palette.grey[700]}:{backgroundColor:a.palette.grey[700],color:a.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,l.Z)({},"light"===a.palette.mode?{backgroundColor:a.palette.grey[200]}:{backgroundColor:a.palette.grey[600]}),"&:active":(0,l.Z)({boxShadow:a.shadows[0]},"light"===a.palette.mode?{backgroundColor:(0,m._4)(a.palette.grey[200],.12)}:{backgroundColor:(0,m._4)(a.palette.grey[600],.12)})})})),x=(0,i.ZP)(h)({width:24,height:16});const b=function(e){const{slots:a={},slotProps:r={}}=e,o=(0,t.Z)(e,Z),s=e;return(0,y.jsx)("li",{children:(0,y.jsx)(f,(0,l.Z)({focusRipple:!0},o,{ownerState:s,children:(0,y.jsx)(x,(0,l.Z)({as:a.CollapsedIcon,ownerState:s},r.collapsedIcon))}))})};var v=r(75878),w=r(21217);function C(e){return(0,w.ZP)("MuiBreadcrumbs",e)}const P=(0,v.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),S=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],T=(0,i.ZP)(d.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,a)=>[{["& .".concat(P.li)]:a.li},a.root]})({}),k=(0,i.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,a)=>a.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),B=(0,i.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,a)=>a.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function I(e,a,r,l){return e.reduce(((t,o,s)=>(s<e.length-1?t=t.concat(o,(0,y.jsx)(B,{"aria-hidden":!0,className:a,ownerState:l,children:r},"separator-".concat(s))):t.push(o),t)),[])}const M=o.forwardRef((function(e,a){const r=(0,p.Z)({props:e,name:"MuiBreadcrumbs"}),{children:i,className:d,component:m="nav",slots:u={},slotProps:h={},expandText:g="Show path",itemsAfterCollapse:Z=1,itemsBeforeCollapse:f=1,maxItems:x=8,separator:v="/"}=r,w=(0,t.Z)(r,S),[P,B]=o.useState(!1),M=(0,l.Z)({},r,{component:m,expanded:P,expandText:g,itemsAfterCollapse:Z,itemsBeforeCollapse:f,maxItems:x,separator:v}),R=(e=>{const{classes:a}=e;return(0,n.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},C,a)})(M),j=(0,c.y)({elementType:u.CollapsedIcon,externalSlotProps:h.collapsedIcon,ownerState:M}),N=o.useRef(null),L=o.Children.toArray(i).filter((e=>o.isValidElement(e))).map(((e,a)=>(0,y.jsx)("li",{className:R.li,children:e},"child-".concat(a))));return(0,y.jsx)(T,(0,l.Z)({ref:a,component:m,color:"text.secondary",className:(0,s.Z)(R.root,d),ownerState:M},w,{children:(0,y.jsx)(k,{className:R.ol,ref:N,ownerState:M,children:I(P||x&&L.length<=x?L:(e=>f+Z>=e.length?e:[...e.slice(0,f),(0,y.jsx)(b,{"aria-label":g,slots:{CollapsedIcon:u.CollapsedIcon},slotProps:{collapsedIcon:j},onClick:()=>{B(!0);const e=N.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis"),...e.slice(e.length-Z,e.length)])(L),R.separator,v,M)})}))}))},49900:(e,a,r)=>{r.d(a,{Z:()=>g});var l=r(63366),t=r(87462),o=r(72791),s=r(63733),n=r(94419),c=r(20890),i=r(66199),p=r(31402),d=r(66934),m=r(29849),u=r(80184);const y=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],h=(0,d.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:r}=e;return[{["& .".concat(m.Z.primary)]:a.primary},{["& .".concat(m.Z.secondary)]:a.secondary},a.root,r.inset&&a.inset,r.primary&&r.secondary&&a.multiline,r.dense&&a.dense]}})((e=>{let{ownerState:a}=e;return(0,t.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},a.primary&&a.secondary&&{marginTop:6,marginBottom:6},a.inset&&{paddingLeft:56})})),g=o.forwardRef((function(e,a){const r=(0,p.Z)({props:e,name:"MuiListItemText"}),{children:d,className:g,disableTypography:Z=!1,inset:f=!1,primary:x,primaryTypographyProps:b,secondary:v,secondaryTypographyProps:w}=r,C=(0,l.Z)(r,y),{dense:P}=o.useContext(i.Z);let S=null!=x?x:d,T=v;const k=(0,t.Z)({},r,{disableTypography:Z,inset:f,primary:!!S,secondary:!!T,dense:P}),B=(e=>{const{classes:a,inset:r,primary:l,secondary:t,dense:o}=e,s={root:["root",r&&"inset",o&&"dense",l&&t&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,n.Z)(s,m.L,a)})(k);return null==S||S.type===c.Z||Z||(S=(0,u.jsx)(c.Z,(0,t.Z)({variant:P?"body2":"body1",className:B.primary,component:null!=b&&b.variant?void 0:"span",display:"block"},b,{children:S}))),null==T||T.type===c.Z||Z||(T=(0,u.jsx)(c.Z,(0,t.Z)({variant:"body2",className:B.secondary,color:"text.secondary",display:"block"},w,{children:T}))),(0,u.jsxs)(h,(0,t.Z)({className:(0,s.Z)(B.root,g),ownerState:k,ref:a},C,{children:[S,T]}))}))},25763:(e,a,r)=>{r.d(a,{Dzu:()=>o,zYZ:()=>t});var l=r(89983);function t(e){return(0,l.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M13 16.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2.517-7.665c.112-.223.268-.424.488-.57C11.186 8.12 11.506 8 12 8c.384 0 .766.118 1.034.319a.953.953 0 0 1 .403.806c0 .48-.218.81-.62 1.186a9.293 9.293 0 0 1-.409.354 19.8 19.8 0 0 0-.294.249c-.246.213-.524.474-.738.795l-.126.19V13.5a.75.75 0 0 0 1.5 0v-1.12c.09-.1.203-.208.347-.333.063-.055.14-.119.222-.187.166-.14.358-.3.52-.452.536-.5 1.098-1.2 1.098-2.283a2.45 2.45 0 0 0-1.003-2.006C13.37 6.695 12.658 6.5 12 6.5c-.756 0-1.373.191-1.861.517a2.944 2.944 0 0 0-.997 1.148.75.75 0 0 0 1.341.67Z"}},{tag:"path",attr:{d:"M9.864 1.2a3.61 3.61 0 0 1 4.272 0l1.375 1.01c.274.2.593.333.929.384l1.686.259a3.61 3.61 0 0 1 3.021 3.02l.259 1.687c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 0 1 0 4.272l-1.01 1.375a2.106 2.106 0 0 0-.384.929l-.259 1.686a3.61 3.61 0 0 1-3.02 3.021l-1.687.259a2.106 2.106 0 0 0-.929.384l-1.375 1.01a3.61 3.61 0 0 1-4.272 0l-1.375-1.01a2.106 2.106 0 0 0-.929-.384l-1.686-.259a3.61 3.61 0 0 1-3.021-3.02l-.259-1.687a2.106 2.106 0 0 0-.384-.929L1.2 14.136a3.61 3.61 0 0 1 0-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.686a3.61 3.61 0 0 1 3.02-3.021l1.687-.259c.336-.051.655-.183.929-.384Zm3.384 1.209a2.11 2.11 0 0 0-2.496 0l-1.376 1.01a3.61 3.61 0 0 1-1.589.658l-1.686.258a2.111 2.111 0 0 0-1.766 1.766l-.258 1.686a3.614 3.614 0 0 1-.658 1.59l-1.01 1.375a2.11 2.11 0 0 0 0 2.496l1.01 1.376a3.61 3.61 0 0 1 .658 1.589l.258 1.686a2.11 2.11 0 0 0 1.766 1.765l1.686.26a3.613 3.613 0 0 1 1.59.657l1.375 1.01a2.11 2.11 0 0 0 2.496 0l1.376-1.01a3.61 3.61 0 0 1 1.589-.658l1.686-.258a2.11 2.11 0 0 0 1.765-1.766l.26-1.686a3.613 3.613 0 0 1 .657-1.59l1.01-1.375a2.11 2.11 0 0 0 0-2.496l-1.01-1.376a3.61 3.61 0 0 1-.658-1.589l-.258-1.686a2.111 2.111 0 0 0-1.766-1.766l-1.686-.258a3.614 3.614 0 0 1-1.59-.658Z"}}]})(e)}function o(e){return(0,l.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M17.03 9.78a.75.75 0 0 0-1.06-1.06l-5.47 5.47-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6-6Z"}},{tag:"path",attr:{d:"m14.136 1.2 1.375 1.01c.274.201.593.333.929.384l1.687.259a3.61 3.61 0 0 1 3.02 3.021l.259 1.686c.051.336.183.655.384.929l1.01 1.375a3.61 3.61 0 0 1 0 4.272l-1.01 1.375a2.106 2.106 0 0 0-.384.929l-.259 1.687a3.61 3.61 0 0 1-3.021 3.02l-1.686.259a2.106 2.106 0 0 0-.929.384l-1.375 1.01a3.61 3.61 0 0 1-4.272 0l-1.375-1.01a2.106 2.106 0 0 0-.929-.384l-1.687-.259a3.61 3.61 0 0 1-3.02-3.021l-.259-1.686a2.117 2.117 0 0 0-.384-.929L1.2 14.136a3.61 3.61 0 0 1 0-4.272l1.01-1.375c.201-.274.333-.593.384-.929l.259-1.687a3.61 3.61 0 0 1 3.021-3.02l1.686-.259c.336-.051.655-.183.929-.384L9.864 1.2a3.61 3.61 0 0 1 4.272 0Zm-3.384 1.209-1.375 1.01a3.614 3.614 0 0 1-1.59.658l-1.686.258a2.111 2.111 0 0 0-1.766 1.766l-.258 1.686a3.61 3.61 0 0 1-.658 1.589l-1.01 1.376a2.11 2.11 0 0 0 0 2.496l1.01 1.375c.344.469.57 1.015.658 1.59l.258 1.686c.14.911.855 1.626 1.766 1.766l1.686.258a3.61 3.61 0 0 1 1.589.658l1.376 1.01a2.11 2.11 0 0 0 2.496 0l1.375-1.01a3.613 3.613 0 0 1 1.59-.657l1.686-.26a2.11 2.11 0 0 0 1.766-1.765l.258-1.686a3.61 3.61 0 0 1 .658-1.589l1.01-1.376a2.11 2.11 0 0 0 0-2.496l-1.01-1.375a3.613 3.613 0 0 1-.657-1.59l-.26-1.686a2.11 2.11 0 0 0-1.765-1.766l-1.686-.258a3.61 3.61 0 0 1-1.589-.658l-1.376-1.01a2.11 2.11 0 0 0-2.496 0Z"}}]})(e)}}}]);
//# sourceMappingURL=8532.74a8218b.chunk.js.map