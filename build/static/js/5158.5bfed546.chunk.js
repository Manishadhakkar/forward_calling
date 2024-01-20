"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[5158],{39336:(e,a,l)=>{l.d(a,{Z:()=>c});var r=l(11087),t=l(66934),n=l(12065),s=l(93517),o=l(81918),i=l(80184);const c=e=>{const{pathList:a}=e,l=(0,t.ZP)(o.Z)((e=>{let{theme:a}=e;const l="light"===a.palette.mode?a.palette.grey[300]:a.palette.grey[800];return{backgroundColor:l,height:a.spacing(3),color:"light"===a.palette.mode?"#141414":"#f3f6f4",fontWeight:a.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:(0,n._4)(l,.06)},"&:active":{boxShadow:a.shadows[1],backgroundColor:(0,n._4)(l,.12)}}}));return(0,i.jsx)("div",{role:"presentation",children:(0,i.jsx)(s.Z,{"aria-label":"breadcrumb",children:a.length&&a.map(((e,t)=>t===a.length-1?(0,i.jsx)(l,{label:e.name,icon:e.icon},t):(0,i.jsx)(r.rU,{to:{pathname:"/".concat(e.path)},children:(0,i.jsx)(l,{icon:e.icon,label:e.name})},t)))})})}},96140:(e,a,l)=>{l.d(a,{Z:()=>i});l(72791);var r=l(13967),t=l(697),n=l(81918),s=l(10918),o=l(80184);const i=e=>{const a=(0,r.Z)(),l=(0,s.TV)(a.palette.mode);return(0,o.jsx)(t.Z,{sx:{width:"100%"},children:(0,o.jsx)(n.Z,{sx:{height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"nowrap"},backgroundColor:1===e.value?l.greenAccent[600]:l.redAccent[600],color:"black"},label:1===e.value?"Active":"Inactive",variant:"filled"})})}},52638:(e,a,l)=>{l.d(a,{Z:()=>x});var r=l(72791),t=l(13967),n=l(697),s=l(81918),o=l(30829),i=l(23786),c=l(47071),d=l(68096),u=l(58406),h=l(77196),p=l(94454),m=l(49900),g=l(80184);const x=e=>{const{Options:a,Value:l,label:x,CustomErrorLine:v,multiSelect:b,Required:y,disable:Z,defaultValue:j,onSelect:C,...f}=e,S=(0,t.Z)(),[w,k]=(0,r.useState)({value:"",error:!1,success:!1}),[T,P]=(0,r.useState)({value:j||[],error:!1,success:!1}),[F,E]=(0,r.useState)("");return(0,g.jsxs)(d.Z,{fullWidth:!0,size:"small",margin:"normal",children:[(0,g.jsx)(o.Z,{id:"demo-select-small-label",sx:{color:"dark"===S.palette.mode?"#FAF0E6 !important":"#352F44 !important"},children:x}),!0===b?(0,g.jsx)(u.Z,{error:!!F,labelId:"demo-multiple-checkbox-label",id:"demo-multiple-checkbox",required:y,fullWidth:!0,multiple:!0,value:T.value,onChange:e=>{if(y)if(T.value.length>0){const a={value:e.target.value,error:!1,success:!0};P(a),C(a),E("")}else{const a={value:e.target.value,error:!1,success:!0};P(a),C(a),E(v||"Select Atleast One")}else{const a={value:e.target.value,error:!1,success:!0};P(a),C(a),E("")}},onBlur:e=>{if(y)if(T.value.length>0){E("");const a={value:e.target.value,error:!1,success:!0};P(a),C(a)}else{const e={value:[],error:!0,success:!1};E(v||"Select atleast one"),P(e),C(e)}else{const e={value:[],error:!1,success:!0};E(""),P(e),C(e)}},input:(0,g.jsx)(h.Z,{label:x}),renderValue:e=>(0,g.jsx)(n.Z,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map((e=>{var l;return(0,g.jsx)(s.Z,{label:null===a||void 0===a||null===(l=a.find((a=>a.id===e)))||void 0===l?void 0:l.label},e)}))},e),children:null===a||void 0===a?void 0:a.map((e=>(0,g.jsxs)(i.Z,{value:e.id,children:[(0,g.jsx)(p.Z,{checked:T.value.includes(e.id)}),(0,g.jsx)(m.Z,{primary:e.label})]},e.id)))}):(0,g.jsxs)(u.Z,{autoComplete:"on",error:!!F,labelId:"demo-simple-select-helper-label",value:l||w.value,label:x,onChange:e=>{const a={value:e.target.value,error:!1,success:!0};k(a),C(a),e.target.value&&E("")},onBlur:()=>{if(y)if(w.value){E("");const e={value:w.value,error:!1,success:!0};k(e),C(e)}else{const e={value:"",error:!0,success:!1};k(e),C(e),E(v||"Select One Option")}else{E("");const e={value:w.value,error:!1,success:!0};k(e),C(e)}},disabled:Z,required:y,size:"small",sx:{"& .MuiFormLabel-root":{color:"dark"===S.palette.mode?"#FAF0E6 !important":"#352F44 !important"}},children:[(0,g.jsx)(i.Z,{value:"",children:(0,g.jsx)("em",{children:"-Select-"})}),a&&(null===a||void 0===a?void 0:a.map(((e,a)=>(0,g.jsx)(i.Z,{value:e.value,children:e.label},a))))]}),F&&(0,g.jsx)(c.Z,{sx:{marginLeft:"inherit"},error:!0,children:F})]})}},51973:(e,a,l)=>{l.d(a,{Z:()=>c});l(72791);var r=l(20890),t=l(50533),n=l(49418);const s=n.Z["FOOTER.WEBSITE.RIGHTS"],o=n.Z["FOOTER.WEBSITE.LABEL"];var i=l(80184);const c=e=>(0,i.jsxs)(r.Z,{mt:1,variant:"body2",color:"text.secondary",align:"center",...e,children:[s,(0,i.jsx)(t.Z,{className:"Url_link",color:"inherit",href:"http://www.textricks.com/",children:o})," ",(new Date).getFullYear(),"."]})},79748:(e,a,l)=>{l.d(a,{u:()=>o});l(72791);var r=l(697),t=l(19095),n=l(80184);const s={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"none",boxShadow:5,p:1,borderRadius:"10px",width:"50%","@media (max-width: 991px)":{width:"90%"},scrollbars:{width:"2px"}},o=e=>{const{modal_width:a="50%",isOpen:l,handleClose:o=(()=>{})}=e;return(0,n.jsx)(t.Z,{open:l,onClose:o,"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:(0,n.jsx)(r.Z,{sx:{...s,width:a},children:(0,n.jsx)("div",{children:e.children})})})}},87874:(e,a,l)=>{l.d(a,{Z:()=>g});l(72791);var r=l(24339),t=l(13967),n=l(697),s=l(20068),o=l(13400),i=l(38820),c=l(66934),d=l(12065),u=l(9955),h=l(10918),p=l(16856),m=l(80184);const g=e=>{const{data:a,column:l,handleEditAction:g,handleDeleteAction:x,handleStatusAction:v,handlePlayPause:b,handleAssignChangable:y,handleViewChange:Z,isEditable:j=!1,isDeletable:C=!1,isStatusChangable:f=!1,isPlayPause:S=!1,isAssignable:w=!1,isView:k=!1}=e,T=(0,t.Z)(),P=(0,h.TV)(T.palette.mode),F=(0,c.ZP)(u.Z)((e=>{let{theme:a}=e;return{"& .MuiSwitch-switchBase.Mui-checked":{color:P.switchColor[100],"&:hover":{backgroundColor:(0,d.Fq)(P.switchColor[100],a.palette.action.hoverOpacity)}},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:P.switchColor[100]}}}));return(0,m.jsx)(r.P2,{layoutMode:"grid",enableBottomToolbar:!1,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"}}},initialState:{density:"compact",showGlobalFilter:!0},positionGlobalFilter:"left",muiSearchTextFieldProps:{placeholder:"Search...",sx:{minWidth:"50px"},variant:"standard"},enableEditing:!0,enableColumnFilters:!1,enableColumnActions:!1,enableFullScreenToggle:!1,enableStickyHeader:!0,enableGlobalFilterModes:!0,enableDensityToggle:!1,enableToolbarInternalActions:!1,enableFilterMatchHighlighting:!0,enableColumnFilterModes:!1,columns:l,data:a,enableColumnOrdering:!0,positionActionsColumn:"last",renderRowActions:e=>{let{row:a}=e;return(0,m.jsxs)(n.Z,{sx:{width:"100%",display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[f&&(0,m.jsx)(s.Z,{arrow:!0,placement:"left",title:"Status",children:(0,m.jsx)(o.Z,{disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0,size:"small",children:(0,m.jsx)(F,{checked:1===a.original.status,size:"small",onChange:()=>{return e=a.original,void v(e);var e}})})}),S&&(0,m.jsx)(s.Z,{arrow:!0,placement:"right",title:1===a.original.status?"Pause":"Play",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=a.original,void b(e);var e},children:1===a.original.status?(0,m.jsx)(p.Vm3,{color:P.grey[200]}):(0,m.jsx)(p.udk,{color:P.grey[200]})})}),j&&(0,m.jsx)(s.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=a.original,void g(e);var e},children:(0,m.jsx)(i.Z,{})})}),C&&(0,m.jsx)(s.Z,{arrow:!0,placement:"right",title:null===a.original.deleted_at?"Delete":"Restore",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=a.original,void x(e);var e},children:null===a.original.deleted_at?(0,m.jsx)(p.FH3,{color:P.redAccent[500]}):(0,m.jsx)(p.iY8,{color:P.blue[100]})})}),w&&(0,m.jsx)(s.Z,{arrow:!0,placement:"right",title:"Assign to",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=a.original,void y(e);var e},children:(0,m.jsx)(p.s3e,{})})}),k&&(0,m.jsx)(s.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=a.original,void Z(e);var e},children:(0,m.jsx)(p.FpO,{})})})]})}})}},45158:(e,a,l)=>{l.r(a),l.d(a,{default:()=>B});var r=l(72791),t=l(13967),n=l(697),s=l(20890),o=l(49877),i=l(20068),c=l(96095),d=l(40071),u=l(64370),h=l(41578),p=l(94070),m=l(25351),g=l(39336),x=l(10918),v=l(79748),b=l(96140),y=l(87874),Z=l(51973),j=l(73598),C=l(57621),f=l(9585),S=l(13400),w=l(39504),k=l(61889),T=l(72363),P=l(24518),F=l(16856),E=l(39203),A=(l(38151),l(52638),l(6726)),I=l(80184);const M=e=>{const{initialValue:a={},handleFormData:l,onHandleClose:s,clickedBtn:o,errorMessage:i,setErrorMessage:c,company_id:d}=e,u=(0,t.Z)(),h=(0,x.TV)(u.palette.mode),[p,m]=(0,r.useState)([]),[g,v]=(0,r.useState)({value:a?a.company_id:"",error:!1,success:!1}),[b,y]=(0,r.useState)({value:a?a.ip_name:"",error:!1,success:!1}),[Z,j]=(0,r.useState)({value:a?a.name:"",error:!1,success:!1}),[M,_]=(0,r.useState)({value:a?a.prefix:"",error:!1,success:!1});b.value===a.ip_name&&Z.value===a.name&&(M.value,a.prefix);let V=b.error||""===b.value||!1===b.success||Z.error||""===Z.value||!1===Z.success||M.error;(0,r.useEffect)((()=>{(0,A.rn)().then((e=>{var a,l,r;const t=null===(a=e.data)||void 0===a||null===(l=a.data)||void 0===l||null===(r=l.data)||void 0===r?void 0:r.map((e=>({value:e.id,label:e.company_name})));m(t)})).catch((e=>{console.log(e)}))}),[]);return(0,I.jsx)(n.Z,{noValidate:!0,children:(0,I.jsxs)(C.Z,{component:"form",sx:{boxShadow:"none",backgroundColor:h.form[500],color:h.form[100]},children:[(0,I.jsx)(f.Z,{action:(0,I.jsx)(S.Z,{"aria-label":"settings",onClick:s,children:(0,I.jsx)(F.FU5,{color:h.form[100]})}),title:"add"===o?"Add Server Ip":"Update Server Ip"}),i&&(0,I.jsx)("span",{className:"error_msg",children:i}),(0,I.jsx)(w.Z,{color:h.form[100],children:(0,I.jsxs)(k.ZP,{container:!0,spacing:1,children:[(0,I.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,I.jsx)(E.Z,{type:"alpha",placeholder:"Enter Server Name",label:"Server Name",Value:Z.value,onChangeText:e=>{c(""),j(e)},Required:!0,CustomErrorLine:"Enter proper name"})}),(0,I.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,I.jsx)(E.Z,{type:"textarea",isMultiline:!1,placeholder:"Enter Server Ip",label:"Server Ip",Value:b.value,onChangeText:e=>{c(""),y(e)},Required:!0,CustomErrorLine:"Enter proper server ip"})}),(0,I.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,I.jsx)(E.Z,{type:"textarea",isMultiline:!1,placeholder:"Enter prefix",label:"Prefix",Value:M.value,onChangeText:e=>{c(""),_(e)},Required:!1,CustomErrorLine:"Enter proper prefix"})})]})}),(0,I.jsxs)(T.Z,{sx:{justifyContent:"space-between",m:1},children:[(0,I.jsx)(P.Z,{size:"small",variant:"contained",onClick:s,children:"Cancel"}),(0,I.jsx)(P.Z,{type:"submit",size:"small",onClick:e=>(e=>{if(e.preventDefault(),!b.value||!Z.value)return void c("Please fill in all required fields.");const a={ip_name:b.value,name:Z.value,prefix:M.value};l(a)})(e),sx:{backgroundColor:h.greenAccent[500]},variant:"contained",disabled:"add"===o&&V,children:"add"===o?"Save":"Update"})]})]})})};var _=l(24231),V=l(47786);const R=[{name:"Dashboard",path:"",icon:(0,I.jsx)(h.MXJ,{})},{name:"Server IP",icon:(0,I.jsx)(d.KxH,{})}],O=r.forwardRef((function(e,a){return(0,I.jsx)(p.Z,{elevation:6,ref:a,variant:"filled",...e})})),B=()=>{const e=(0,t.Z)(),a=(0,x.TV)(e.palette.mode),l=JSON.parse(localStorage.getItem("user")).user_data.company_id,[d,h]=(0,r.useState)([]),[p,C]=(0,r.useState)(!1),[f,S]=(0,r.useState)(!1),[w,k]=(0,r.useState)(""),[T,P]=(0,r.useState)(),[F,E]=(0,r.useState)(),[B,L]=(0,r.useState)(0),[z,D]=(0,r.useState)(1),[H,W]=(0,r.useState)(10),[G,N]=(0,r.useState)({open:!1,vertical:"top",horizontal:"right"}),[q,U]=(0,r.useState)(""),[K,Y]=(0,r.useState)(""),{vertical:J,horizontal:X,open:Q}=G,$=(0,r.useMemo)((()=>[{accessorKey:"name",header:"Name",size:200,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCell:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"ip_name",header:"Server IP",size:180,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"prefix",header:"Prefix",size:50,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"status",header:"Status",size:80,enableColumnDragging:!1,enableGlobalFilter:!1,enableColumnFilter:!1,enableColumnActions:!1,Cell:e=>{let{cell:a}=e;return(0,I.jsx)(b.Z,{value:a.getValue()})},muiTableHeadCellProps:{align:"right"},muiTableBodyCellProps:{align:"right"}}]),[]),ee=(e,a)=>{"clickaway"!==a&&N({...G,open:!1})};(0,r.useEffect)((()=>{C(!0),(0,A.W9)(z,H).then((e=>{var a;let l=0===e.data.data.length?[]:e.data.data.data;h(l),L(0===e.data.data.length?0:null===(a=e.data.data)||void 0===a?void 0:a.total),C(!1)})).catch((()=>{C(!1)}))}),[z,H]);const ae=(e,a)=>{(0,A.W9)(e,a).then((e=>{var a;let l=0===e.data.data.length?[]:e.data.data.data;h(l),L(0===e.data.data.length?0:null===(a=e.data.data)||void 0===a?void 0:a.total),C(!1)})).catch((()=>{C(!1)}))},le=()=>{E(""),S(!1)},re=e=>{C(!0),(0,A.or)(e).then((e=>{ae(z,H),E(""),C(!1),U("success"),Y(e.data.message),N({...G,open:!0}),S(!1),L(B+1)})).catch((e=>{C(!1),E(e.message)}))},te=e=>{C(!0);const a={data:{name:e.name,ip_name:e.ip_name,prefix:e.prefix,status:T.status},id:T.id};(0,A.eY)(a).then((e=>{ae(z,H),E(""),C(!1),U("success"),Y(e.data.message),N({...G,open:!0}),S(!1)})).catch((e=>{C(!1),E(e.message)}))};return(0,I.jsxs)(I.Fragment,{children:[p&&(0,I.jsx)(j.Z,{}),(0,I.jsx)(m.Z,{open:Q,anchorOrigin:{vertical:J,horizontal:X},autoHideDuration:3e3,onClose:ee,children:(0,I.jsx)(O,{onClose:ee,severity:q,sx:{width:"100%"},children:K})}),(0,I.jsxs)(n.Z,{sx:{"& .rs-pagination-group":{color:a.layoutColor[200]},"& .MuiTypography-root":{color:a.layoutColor[200]},mt:1,ml:2,mr:2,mb:2,height:"80%",backgroundColor:"inherit"},children:[(0,I.jsx)(g.Z,{pathList:R}),(0,I.jsxs)(n.Z,{children:[(0,I.jsx)(v.u,{modal_width:"30%",isOpen:f,children:(0,I.jsx)(M,{handleFormData:"add"===w?re:te,onHandleClose:le,clickedBtn:w,initialValue:"edit"===w?T:{},errorMessage:F,setErrorMessage:E,company_id:l})}),(0,I.jsxs)(n.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:[(0,I.jsx)("div",{children:(0,I.jsx)(s.Z,{variant:"h5",children:"Manage IP"})}),(0,I.jsx)("div",{style:{zIndex:1},children:(0,V.Ve)(_.fW)&&(0,I.jsx)(o.Z,{"aria-label":"add",size:"small",sx:{boxShadow:"none",backgroundColor:a.greenAccent[500]},onClick:()=>{E(""),S(!0),k("add")},children:(0,I.jsx)(i.Z,{title:"Add",children:(0,I.jsx)(u.Z,{})})})})]}),(0,I.jsxs)(n.Z,{children:[(0,I.jsx)(y.Z,{isLoading:p,data:d,column:$,handleEditAction:e=>{k("edit"),P(e),S(!0)},handleStatusAction:e=>{C(!0);const a={id:e.id,status:1===e.status?0:1};(0,A.fM)(a).then((e=>{ae(z,H),U("success"),Y(e.data.message),N({...G,open:!0}),E(""),S(!1),C(!1)})).catch((e=>{C(!1)}))},isSearchable:!0,isEditable:(0,V.Ve)(_.dr),isDeletable:!1,isStatusChangable:(0,V.Ve)(_.RC)}),(0,I.jsx)(c.Z,{style:{marginTop:5},layout:["total","-","pager","skip"],size:"xs",prev:!0,next:!0,first:!0,last:!0,ellipsis:!0,boundaryLinks:!0,total:B,limit:H,maxButtons:5,activePage:z,onChangePage:D,limitOptions:[5,10,25,50,100],onChangeLimit:W})]})]})]}),(0,I.jsx)(Z.Z,{})]})}},6726:(e,a,l)=>{l.d(a,{W9:()=>t,eY:()=>o,e_:()=>n,fM:()=>i,or:()=>s,rn:()=>c});var r=l(12581);const t=(e,a)=>(0,r.o)({method:"GET",url:"/serverIP?page=".concat(e,"&perpage=").concat(a)}),n=(e,a)=>(0,r.o)({method:"GET",url:"/serverIP/active"}),s=e=>(0,r.o)({method:"POST",url:"/serverIP",data:e}),o=e=>(0,r.o)({method:"PUT",url:"/serverIP/".concat(e.id),data:e.data}),i=e=>(0,r.o)({method:"PATCH",url:"/serverIP/changeStatus/".concat(e.id),data:{status:e.status}}),c=()=>(0,r.o)({method:"GET",url:"/company"})},49900:(e,a,l)=>{l.d(a,{Z:()=>x});var r=l(63366),t=l(87462),n=l(72791),s=l(63733),o=l(94419),i=l(20890),c=l(66199),d=l(31402),u=l(66934),h=l(29849),p=l(80184);const m=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],g=(0,u.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:l}=e;return[{["& .".concat(h.Z.primary)]:a.primary},{["& .".concat(h.Z.secondary)]:a.secondary},a.root,l.inset&&a.inset,l.primary&&l.secondary&&a.multiline,l.dense&&a.dense]}})((e=>{let{ownerState:a}=e;return(0,t.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},a.primary&&a.secondary&&{marginTop:6,marginBottom:6},a.inset&&{paddingLeft:56})})),x=n.forwardRef((function(e,a){const l=(0,d.Z)({props:e,name:"MuiListItemText"}),{children:u,className:x,disableTypography:v=!1,inset:b=!1,primary:y,primaryTypographyProps:Z,secondary:j,secondaryTypographyProps:C}=l,f=(0,r.Z)(l,m),{dense:S}=n.useContext(c.Z);let w=null!=y?y:u,k=j;const T=(0,t.Z)({},l,{disableTypography:v,inset:b,primary:!!w,secondary:!!k,dense:S}),P=(e=>{const{classes:a,inset:l,primary:r,secondary:t,dense:n}=e,s={root:["root",l&&"inset",n&&"dense",r&&t&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,o.Z)(s,h.L,a)})(T);return null==w||w.type===i.Z||v||(w=(0,p.jsx)(i.Z,(0,t.Z)({variant:S?"body2":"body1",className:P.primary,component:null!=Z&&Z.variant?void 0:"span",display:"block"},Z,{children:w}))),null==k||k.type===i.Z||v||(k=(0,p.jsx)(i.Z,(0,t.Z)({variant:"body2",className:P.secondary,color:"text.secondary",display:"block"},C,{children:k}))),(0,p.jsxs)(g,(0,t.Z)({className:(0,s.Z)(P.root,x),ownerState:T,ref:a},f,{children:[w,k]}))}))},38151:()=>{}}]);
//# sourceMappingURL=5158.5bfed546.chunk.js.map