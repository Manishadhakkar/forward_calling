"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[5136],{42419:(e,o,r)=>{var t=r(64836);o.Z=void 0;var a=t(r(45649)),n=r(80184);o.Z=(0,a.default)((0,n.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},35585:(e,o,r)=>{var t=r(64836);o.Z=void 0;var a=t(r(45649)),n=r(80184);o.Z=(0,a.default)((0,n.jsx)("path",{d:"M19 13H5v-2h14z"}),"Remove")},3721:(e,o,r)=>{r.d(o,{Z:()=>f});var t=r(87462),a=r(63366),n=r(72791),s=r(63733),i=r(94419),l=r(66934),c=r(31402),d=r(75878),u=r(21217);function p(e){return(0,u.ZP)("MuiAccordionDetails",e)}(0,d.Z)("MuiAccordionDetails",["root"]);var m=r(80184);const h=["className"],g=(0,l.ZP)("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,o)=>o.root})((e=>{let{theme:o}=e;return{padding:o.spacing(1,2,2)}})),f=n.forwardRef((function(e,o){const r=(0,c.Z)({props:e,name:"MuiAccordionDetails"}),{className:n}=r,l=(0,a.Z)(r,h),d=r,u=(e=>{const{classes:o}=e;return(0,i.Z)({root:["root"]},p,o)})(d);return(0,m.jsx)(g,(0,t.Z)({className:(0,s.Z)(u.root,n),ref:o,ownerState:d},l))}))},55818:(e,o,r)=>{r.d(o,{Z:()=>w});var t=r(63366),a=r(87462),n=r(72791),s=r(63733),i=r(94419),l=r(66934),c=r(31402),d=r(23701),u=r(27318),p=r(75878),m=r(21217);function h(e){return(0,m.ZP)("MuiAccordionSummary",e)}const g=(0,p.Z)("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]);var f=r(80184);const b=["children","className","expandIcon","focusVisibleClassName","onClick"],v=(0,l.ZP)(d.Z,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,o)=>o.root})((e=>{let{theme:o,ownerState:r}=e;const t={duration:o.transitions.duration.shortest};return(0,a.Z)({display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],t),["&.".concat(g.focusVisible)]:{backgroundColor:(o.vars||o).palette.action.focus},["&.".concat(g.disabled)]:{opacity:(o.vars||o).palette.action.disabledOpacity},["&:hover:not(.".concat(g.disabled,")")]:{cursor:"pointer"}},!r.disableGutters&&{["&.".concat(g.expanded)]:{minHeight:64}})})),Z=(0,l.ZP)("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,o)=>o.content})((e=>{let{theme:o,ownerState:r}=e;return(0,a.Z)({display:"flex",flexGrow:1,margin:"12px 0"},!r.disableGutters&&{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),["&.".concat(g.expanded)]:{margin:"20px 0"}})})),x=(0,l.ZP)("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,o)=>o.expandIconWrapper})((e=>{let{theme:o}=e;return{display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),["&.".concat(g.expanded)]:{transform:"rotate(180deg)"}}})),w=n.forwardRef((function(e,o){const r=(0,c.Z)({props:e,name:"MuiAccordionSummary"}),{children:l,className:d,expandIcon:p,focusVisibleClassName:m,onClick:g}=r,w=(0,t.Z)(r,b),{disabled:y=!1,disableGutters:C,expanded:S,toggle:R}=n.useContext(u.Z),k=(0,a.Z)({},r,{expanded:S,disabled:y,disableGutters:C}),M=(e=>{const{classes:o,expanded:r,disabled:t,disableGutters:a}=e,n={root:["root",r&&"expanded",t&&"disabled",!a&&"gutters"],focusVisible:["focusVisible"],content:["content",r&&"expanded",!a&&"contentGutters"],expandIconWrapper:["expandIconWrapper",r&&"expanded"]};return(0,i.Z)(n,h,o)})(k);return(0,f.jsxs)(v,(0,a.Z)({focusRipple:!1,disableRipple:!0,disabled:y,component:"div","aria-expanded":S,className:(0,s.Z)(M.root,d),focusVisibleClassName:(0,s.Z)(M.focusVisible,m),onClick:e=>{R&&R(e),g&&g(e)},ref:o,ownerState:k},w,{children:[(0,f.jsx)(Z,{className:M.content,ownerState:k,children:l}),p&&(0,f.jsx)(x,{className:M.expandIconWrapper,ownerState:k,children:p})]}))}))},10159:(e,o,r)=>{r.d(o,{Z:()=>P});var t=r(63366),a=r(87462),n=r(72791),s=(r(57441),r(63733)),i=r(94419),l=r(66934),c=r(31402),d=r(56125),u=r(35527),p=r(27318),m=r(98278),h=r(6117),g=r(71503),f=r(87620),b=r(90183);const v=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],Z=["component","slots","slotProps"],x=["component"];var w=r(75878),y=r(21217);function C(e){return(0,y.ZP)("MuiAccordion",e)}const S=(0,w.Z)("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]);var R=r(80184);const k=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],M=(0,l.ZP)(u.Z,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[{["& .".concat(S.region)]:o.region},o.root,!r.square&&o.rounded,!r.disableGutters&&o.gutters]}})((e=>{let{theme:o}=e;const r={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],r),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],r)},"&:first-of-type":{"&::before":{display:"none"}},["&.".concat(S.expanded)]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},["&.".concat(S.disabled)]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}}),(e=>{let{theme:o,ownerState:r}=e;return(0,a.Z)({},!r.square&&{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}},!r.disableGutters&&{["&.".concat(S.expanded)]:{margin:"16px 0"}})})),P=n.forwardRef((function(e,o){const r=(0,c.Z)({props:e,name:"MuiAccordion"}),{children:l,className:u,defaultExpanded:w=!1,disabled:y=!1,disableGutters:S=!1,expanded:P,onChange:N,square:A=!1,slots:z={},slotProps:E={},TransitionComponent:V,TransitionProps:j}=r,I=(0,t.Z)(r,k),[B,T]=(0,m.Z)({controlled:P,default:w,name:"Accordion",state:"expanded"}),F=n.useCallback((e=>{T(!B),N&&N(e,!B)}),[B,N,T]),[L,...G]=n.Children.toArray(l),W=n.useMemo((()=>({expanded:B,disabled:y,disableGutters:S,toggle:F})),[B,y,S,F]),H=(0,a.Z)({},r,{square:A,disabled:y,disableGutters:S,expanded:B}),O=(e=>{const{classes:o,square:r,expanded:t,disabled:a,disableGutters:n}=e,s={root:["root",!r&&"rounded",t&&"expanded",a&&"disabled",!n&&"gutters"],region:["region"]};return(0,i.Z)(s,C,o)})(H),q=(0,a.Z)({transition:V},z),D=(0,a.Z)({transition:j},E),[_,$]=function(e,o){const{className:r,elementType:n,ownerState:s,externalForwardedProps:i,getSlotOwnerState:l,internalForwardedProps:c}=o,d=(0,t.Z)(o,v),{component:u,slots:p={[e]:void 0},slotProps:m={[e]:void 0}}=i,w=(0,t.Z)(i,Z),y=p[e]||n,C=(0,g.x)(m[e],s),S=(0,f.L)((0,a.Z)({className:r},d,{externalForwardedProps:"root"===e?w:void 0,externalSlotProps:C})),{props:{component:R},internalRef:k}=S,M=(0,t.Z)(S.props,x),P=(0,h.Z)(k,null==C?void 0:C.ref,o.ref),N=l?l(M):{},A=(0,a.Z)({},s,N),z="root"===e?R||u:R,E=(0,b.$)(y,(0,a.Z)({},"root"===e&&!u&&!p[e]&&c,"root"!==e&&!p[e]&&c,M,z&&{as:z},{ref:P}),A);return Object.keys(N).forEach((e=>{delete E[e]})),[y,E]}("transition",{elementType:d.Z,externalForwardedProps:{slots:q,slotProps:D},ownerState:H});return delete $.ownerState,(0,R.jsxs)(M,(0,a.Z)({className:(0,s.Z)(O.root,u),ref:o,ownerState:H,square:A},I,{children:[(0,R.jsx)(p.Z.Provider,{value:W,children:L}),(0,R.jsx)(_,(0,a.Z)({in:B,timeout:"auto"},$,{children:(0,R.jsx)("div",{"aria-labelledby":L.props.id,id:L.props["aria-controls"],role:"region",className:O.region,children:G})}))]}))}))},27318:(e,o,r)=>{r.d(o,{Z:()=>t});const t=r(72791).createContext({})},93517:(e,o,r)=>{r.d(o,{Z:()=>A});var t=r(87462),a=r(63366),n=r(72791),s=(r(57441),r(63733)),i=r(94419),l=r(78832),c=r(66934),d=r(31402),u=r(20890),p=r(12065),m=r(74223),h=r(80184);const g=(0,m.Z)((0,h.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz");var f=r(23701);const b=["slots","slotProps"],v=(0,c.ZP)(f.Z)((e=>{let{theme:o}=e;return(0,t.Z)({display:"flex",marginLeft:"calc(".concat(o.spacing(1)," * 0.5)"),marginRight:"calc(".concat(o.spacing(1)," * 0.5)")},"light"===o.palette.mode?{backgroundColor:o.palette.grey[100],color:o.palette.grey[700]}:{backgroundColor:o.palette.grey[700],color:o.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,t.Z)({},"light"===o.palette.mode?{backgroundColor:o.palette.grey[200]}:{backgroundColor:o.palette.grey[600]}),"&:active":(0,t.Z)({boxShadow:o.shadows[0]},"light"===o.palette.mode?{backgroundColor:(0,p._4)(o.palette.grey[200],.12)}:{backgroundColor:(0,p._4)(o.palette.grey[600],.12)})})})),Z=(0,c.ZP)(g)({width:24,height:16});const x=function(e){const{slots:o={},slotProps:r={}}=e,n=(0,a.Z)(e,b),s=e;return(0,h.jsx)("li",{children:(0,h.jsx)(v,(0,t.Z)({focusRipple:!0},n,{ownerState:s,children:(0,h.jsx)(Z,(0,t.Z)({as:o.CollapsedIcon,ownerState:s},r.collapsedIcon))}))})};var w=r(75878),y=r(21217);function C(e){return(0,y.ZP)("MuiBreadcrumbs",e)}const S=(0,w.Z)("MuiBreadcrumbs",["root","ol","li","separator"]),R=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],k=(0,c.ZP)(u.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,o)=>[{["& .".concat(S.li)]:o.li},o.root]})({}),M=(0,c.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,o)=>o.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),P=(0,c.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,o)=>o.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function N(e,o,r,t){return e.reduce(((a,n,s)=>(s<e.length-1?a=a.concat(n,(0,h.jsx)(P,{"aria-hidden":!0,className:o,ownerState:t,children:r},"separator-".concat(s))):a.push(n),a)),[])}const A=n.forwardRef((function(e,o){const r=(0,d.Z)({props:e,name:"MuiBreadcrumbs"}),{children:c,className:u,component:p="nav",slots:m={},slotProps:g={},expandText:f="Show path",itemsAfterCollapse:b=1,itemsBeforeCollapse:v=1,maxItems:Z=8,separator:w="/"}=r,y=(0,a.Z)(r,R),[S,P]=n.useState(!1),A=(0,t.Z)({},r,{component:p,expanded:S,expandText:f,itemsAfterCollapse:b,itemsBeforeCollapse:v,maxItems:Z,separator:w}),z=(e=>{const{classes:o}=e;return(0,i.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},C,o)})(A),E=(0,l.y)({elementType:m.CollapsedIcon,externalSlotProps:g.collapsedIcon,ownerState:A}),V=n.useRef(null),j=n.Children.toArray(c).filter((e=>n.isValidElement(e))).map(((e,o)=>(0,h.jsx)("li",{className:z.li,children:e},"child-".concat(o))));return(0,h.jsx)(k,(0,t.Z)({ref:o,component:p,color:"text.secondary",className:(0,s.Z)(z.root,u),ownerState:A},y,{children:(0,h.jsx)(M,{className:z.ol,ref:V,ownerState:A,children:N(S||Z&&j.length<=Z?j:(e=>v+b>=e.length?e:[...e.slice(0,v),(0,h.jsx)(x,{"aria-label":f,slots:{CollapsedIcon:m.CollapsedIcon},slotProps:{collapsedIcon:E},onClick:()=>{P(!0);const e=V.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis"),...e.slice(e.length-b,e.length)])(j),z.separator,w,A)})}))}))},72363:(e,o,r)=>{r.d(o,{Z:()=>f});var t=r(63366),a=r(87462),n=r(72791),s=r(63733),i=r(94419),l=r(66934),c=r(31402),d=r(75878),u=r(21217);function p(e){return(0,u.ZP)("MuiCardActions",e)}(0,d.Z)("MuiCardActions",["root","spacing"]);var m=r(80184);const h=["disableSpacing","className"],g=(0,l.ZP)("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[o.root,!r.disableSpacing&&o.spacing]}})((e=>{let{ownerState:o}=e;return(0,a.Z)({display:"flex",alignItems:"center",padding:8},!o.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})})),f=n.forwardRef((function(e,o){const r=(0,c.Z)({props:e,name:"MuiCardActions"}),{disableSpacing:n=!1,className:l}=r,d=(0,t.Z)(r,h),u=(0,a.Z)({},r,{disableSpacing:n}),f=(e=>{const{classes:o,disableSpacing:r}=e,t={root:["root",!r&&"spacing"]};return(0,i.Z)(t,p,o)})(u);return(0,m.jsx)(g,(0,a.Z)({className:(0,s.Z)(f.root,l),ownerState:u,ref:o},d))}))},49877:(e,o,r)=>{r.d(o,{Z:()=>Z});var t=r(63366),a=r(87462),n=r(72791),s=r(63733),i=r(94419),l=r(23701),c=r(14036),d=r(31402),u=r(75878),p=r(21217);function m(e){return(0,p.ZP)("MuiFab",e)}const h=(0,u.Z)("MuiFab",["root","primary","secondary","extended","circular","focusVisible","disabled","colorInherit","sizeSmall","sizeMedium","sizeLarge","info","error","warning","success"]);var g=r(66934),f=r(80184);const b=["children","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"],v=(0,g.ZP)(l.Z,{name:"MuiFab",slot:"Root",shouldForwardProp:e=>(0,g.FO)(e)||"classes"===e,overridesResolver:(e,o)=>{const{ownerState:r}=e;return[o.root,o[r.variant],o["size".concat((0,c.Z)(r.size))],"inherit"===r.color&&o.colorInherit,o[(0,c.Z)(r.size)],o[r.color]]}})((e=>{let{theme:o,ownerState:r}=e;var t,n;return(0,a.Z)({},o.typography.button,{minHeight:36,transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,zIndex:(o.vars||o).zIndex.fab,boxShadow:(o.vars||o).shadows[6],"&:active":{boxShadow:(o.vars||o).shadows[12]},color:o.vars?o.vars.palette.text.primary:null==(t=(n=o.palette).getContrastText)?void 0:t.call(n,o.palette.grey[300]),backgroundColor:(o.vars||o).palette.grey[300],"&:hover":{backgroundColor:(o.vars||o).palette.grey.A100,"@media (hover: none)":{backgroundColor:(o.vars||o).palette.grey[300]},textDecoration:"none"},["&.".concat(h.focusVisible)]:{boxShadow:(o.vars||o).shadows[6]}},"small"===r.size&&{width:40,height:40},"medium"===r.size&&{width:48,height:48},"extended"===r.variant&&{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48},"extended"===r.variant&&"small"===r.size&&{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"extended"===r.variant&&"medium"===r.size&&{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40},"inherit"===r.color&&{color:"inherit"})}),(e=>{let{theme:o,ownerState:r}=e;return(0,a.Z)({},"inherit"!==r.color&&"default"!==r.color&&null!=(o.vars||o).palette[r.color]&&{color:(o.vars||o).palette[r.color].contrastText,backgroundColor:(o.vars||o).palette[r.color].main,"&:hover":{backgroundColor:(o.vars||o).palette[r.color].dark,"@media (hover: none)":{backgroundColor:(o.vars||o).palette[r.color].main}}})}),(e=>{let{theme:o}=e;return{["&.".concat(h.disabled)]:{color:(o.vars||o).palette.action.disabled,boxShadow:(o.vars||o).shadows[0],backgroundColor:(o.vars||o).palette.action.disabledBackground}}})),Z=n.forwardRef((function(e,o){const r=(0,d.Z)({props:e,name:"MuiFab"}),{children:n,className:l,color:u="default",component:p="button",disabled:h=!1,disableFocusRipple:g=!1,focusVisibleClassName:Z,size:x="large",variant:w="circular"}=r,y=(0,t.Z)(r,b),C=(0,a.Z)({},r,{color:u,component:p,disabled:h,disableFocusRipple:g,size:x,variant:w}),S=(e=>{const{color:o,variant:r,classes:t,size:n}=e,s={root:["root",r,"size".concat((0,c.Z)(n)),"inherit"===o?"colorInherit":o]},l=(0,i.Z)(s,m,t);return(0,a.Z)({},t,l)})(C);return(0,f.jsx)(v,(0,a.Z)({className:(0,s.Z)(S.root,l),component:p,disabled:h,focusRipple:!g,focusVisibleClassName:(0,s.Z)(S.focusVisible,Z),ownerState:C,ref:o},y,{classes:S,children:n}))}))},64370:(e,o,r)=>{r.d(o,{Z:()=>h});var t=r(97573),a=r(72791),n=r(52007),s=r.n(n),i=["variant","color","size"],l=function(e){var o=e.color;return a.createElement(a.Fragment,null,a.createElement("path",{d:"M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2ZM18 12.75h-5.25V18c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-5.25H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25V6c0-.41.34-.75.75-.75s.75.34.75.75v5.25H18c.41 0 .75.34.75.75s-.34.75-.75.75Z",fill:o}))},c=function(e){var o=e.color;return a.createElement(a.Fragment,null,a.createElement("path",{d:"M12 18V6M16 12h2M6 12h5.66M12 18V6",stroke:o,strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}))},d=function(e){var o=e.color;return a.createElement(a.Fragment,null,a.createElement("path",{opacity:".4",d:"M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2Z",fill:o}),a.createElement("path",{d:"M18 11.25h-5.25V6c0-.41-.34-.75-.75-.75s-.75.34-.75.75v5.25H6c-.41 0-.75.34-.75.75s.34.75.75.75h5.25V18c0 .41.34.75.75.75s.75-.34.75-.75v-5.25H18c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z",fill:o}))},u=function(e){var o=e.color;return a.createElement(a.Fragment,null,a.createElement("path",{d:"M6 12h12M12 18V6",stroke:o,strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}))},p=function(e){var o=e.color;return a.createElement(a.Fragment,null,a.createElement("path",{d:"M18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z",fill:o}),a.createElement("path",{d:"M12 18.75c-.41 0-.75-.34-.75-.75V6c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75Z",fill:o}))},m=function(e){var o=e.color;return a.createElement(a.Fragment,null,a.createElement("path",{opacity:".4",d:"M6 12h12",stroke:o,strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}),a.createElement("path",{d:"M12 18V6",stroke:o,strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"}))},h=(0,a.forwardRef)((function(e,o){var r=e.variant,n=e.color,s=e.size,h=(0,t._)(e,i);return a.createElement("svg",(0,t.a)({},h,{xmlns:"http://www.w3.org/2000/svg",ref:o,width:s,height:s,viewBox:"0 0 24 24",fill:"none"}),function(e,o){switch(e){case"Bold":return a.createElement(l,{color:o});case"Broken":return a.createElement(c,{color:o});case"Bulk":return a.createElement(d,{color:o});case"Linear":default:return a.createElement(u,{color:o});case"Outline":return a.createElement(p,{color:o});case"TwoTone":return a.createElement(m,{color:o})}}(r,n))}));h.propTypes={variant:s().oneOf(["Linear","Bold","Broken","Bulk","Outline","TwoTone"]),color:s().string,size:s().oneOfType([s().string,s().number])},h.defaultProps={variant:"Linear",color:"currentColor",size:"24"},h.displayName="Add"}}]);
//# sourceMappingURL=5136.b871fa47.chunk.js.map