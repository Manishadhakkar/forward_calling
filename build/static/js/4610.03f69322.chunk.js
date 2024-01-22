"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[4610],{39336:(e,a,l)=>{l.d(a,{Z:()=>c});var t=l(11087),r=l(66934),o=l(12065),n=l(93517),s=l(81918),i=l(80184);const c=e=>{const{pathList:a}=e,l=(0,r.ZP)(s.Z)((e=>{let{theme:a}=e;const l="light"===a.palette.mode?a.palette.grey[300]:a.palette.grey[800];return{backgroundColor:l,height:a.spacing(3),color:"light"===a.palette.mode?"#141414":"#f3f6f4",fontWeight:a.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:(0,o._4)(l,.06)},"&:active":{boxShadow:a.shadows[1],backgroundColor:(0,o._4)(l,.12)}}}));return(0,i.jsx)("div",{role:"presentation",children:(0,i.jsx)(n.Z,{"aria-label":"breadcrumb",children:a.length&&a.map(((e,r)=>r===a.length-1?(0,i.jsx)(l,{label:e.name,icon:e.icon},r):(0,i.jsx)(t.rU,{to:{pathname:"/".concat(e.path)},children:(0,i.jsx)(l,{icon:e.icon,label:e.name})},r)))})})}},96140:(e,a,l)=>{l.d(a,{Z:()=>i});l(72791);var t=l(13967),r=l(697),o=l(81918),n=l(10918),s=l(80184);const i=e=>{const a=(0,t.Z)(),l=(0,n.TV)(a.palette.mode);return(0,s.jsx)(r.Z,{sx:{width:"100%"},children:(0,s.jsx)(o.Z,{sx:{height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"nowrap"},backgroundColor:1===e.value?l.greenAccent[600]:l.redAccent[600],color:"black"},label:1===e.value?"Active":"Inactive",variant:"filled"})})}},52638:(e,a,l)=>{l.d(a,{Z:()=>x});var t=l(72791),r=l(13967),o=l(697),n=l(81918),s=l(30829),i=l(23786),c=l(47071),d=l(68096),u=l(58406),h=l(77196),m=l(94454),p=l(49900),g=l(80184);const x=e=>{const{Options:a,Value:l,label:x,CustomErrorLine:b,multiSelect:v,Required:j,disable:Z,defaultValue:C,onSelect:f,...S}=e,y=(0,r.Z)(),[w,k]=(0,t.useState)({value:"",error:!1,success:!1}),[T,E]=(0,t.useState)({value:C||[],error:!1,success:!1}),[F,A]=(0,t.useState)("");return(0,g.jsxs)(d.Z,{fullWidth:!0,size:"small",margin:"normal",children:[(0,g.jsx)(s.Z,{id:"demo-select-small-label",sx:{color:"dark"===y.palette.mode?"#FAF0E6 !important":"#352F44 !important"},children:x}),!0===v?(0,g.jsx)(u.Z,{error:!!F,labelId:"demo-multiple-checkbox-label",id:"demo-multiple-checkbox",required:j,fullWidth:!0,multiple:!0,value:T.value,onChange:e=>{if(j)if(T.value.length>0){const a={value:e.target.value,error:!1,success:!0};E(a),f(a),A("")}else{const a={value:e.target.value,error:!1,success:!0};E(a),f(a),A(b||"Select Atleast One")}else{const a={value:e.target.value,error:!1,success:!0};E(a),f(a),A("")}},onBlur:e=>{if(j)if(T.value.length>0){A("");const a={value:e.target.value,error:!1,success:!0};E(a),f(a)}else{const e={value:[],error:!0,success:!1};A(b||"Select atleast one"),E(e),f(e)}else{const e={value:[],error:!1,success:!0};A(""),E(e),f(e)}},input:(0,g.jsx)(h.Z,{label:x}),renderValue:e=>(0,g.jsx)(o.Z,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map((e=>{var l;return(0,g.jsx)(n.Z,{label:null===a||void 0===a||null===(l=a.find((a=>a.id===e)))||void 0===l?void 0:l.label},e)}))},e),children:null===a||void 0===a?void 0:a.map((e=>(0,g.jsxs)(i.Z,{value:e.id,children:[(0,g.jsx)(m.Z,{checked:T.value.includes(e.id)}),(0,g.jsx)(p.Z,{primary:e.label})]},e.id)))}):(0,g.jsxs)(u.Z,{autoComplete:"on",error:!!F,labelId:"demo-simple-select-helper-label",value:l||w.value,label:x,onChange:e=>{const a={value:e.target.value,error:!1,success:!0};k(a),f(a),e.target.value&&A("")},onBlur:()=>{if(j)if(w.value){A("");const e={value:w.value,error:!1,success:!0};k(e),f(e)}else{const e={value:"",error:!0,success:!1};k(e),f(e),A(b||"Select One Option")}else{A("");const e={value:w.value,error:!1,success:!0};k(e),f(e)}},disabled:Z,required:j,size:"small",sx:{"& .MuiFormLabel-root":{color:"dark"===y.palette.mode?"#FAF0E6 !important":"#352F44 !important"}},children:[(0,g.jsx)(i.Z,{value:"",children:(0,g.jsx)("em",{children:"-Select-"})}),a&&(null===a||void 0===a?void 0:a.map(((e,a)=>(0,g.jsx)(i.Z,{value:e.value,children:e.label},a))))]}),F&&(0,g.jsx)(c.Z,{sx:{marginLeft:"inherit"},error:!0,children:F})]})}},51973:(e,a,l)=>{l.d(a,{Z:()=>c});l(72791);var t=l(20890),r=l(50533),o=l(49418);const n=o.Z["FOOTER.WEBSITE.RIGHTS"],s=o.Z["FOOTER.WEBSITE.LABEL"];var i=l(80184);const c=e=>(0,i.jsxs)(t.Z,{mt:1,variant:"body2",color:"text.secondary",align:"center",...e,children:[n,(0,i.jsx)(r.Z,{className:"Url_link",color:"inherit",href:"http://www.textricks.com/",children:s})," ",(new Date).getFullYear(),"."]})},79748:(e,a,l)=>{l.d(a,{u:()=>s});l(72791);var t=l(697),r=l(19095),o=l(80184);const n={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"none",boxShadow:5,p:1,borderRadius:"10px",width:"50%","@media (max-width: 991px)":{width:"90%"},scrollbars:{width:"2px"}},s=e=>{const{modal_width:a="50%",isOpen:l,handleClose:s=(()=>{})}=e;return(0,o.jsx)(r.Z,{open:l,onClose:s,"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:(0,o.jsx)(t.Z,{sx:{...n,width:a},children:(0,o.jsx)("div",{children:e.children})})})}},87874:(e,a,l)=>{l.d(a,{Z:()=>g});l(72791);var t=l(24339),r=l(13967),o=l(697),n=l(20068),s=l(13400),i=l(38820),c=l(66934),d=l(12065),u=l(9955),h=l(10918),m=l(16856),p=l(80184);const g=e=>{const{data:a,column:l,handleEditAction:g,handleDeleteAction:x,handleStatusAction:b,handlePlayPause:v,handleAssignChangable:j,handleViewChange:Z,isEditable:C=!1,isDeletable:f=!1,isStatusChangable:S=!1,isPlayPause:y=!1,isAssignable:w=!1,isView:k=!1}=e,T=(0,r.Z)(),E=(0,h.TV)(T.palette.mode),F=(0,c.ZP)(u.Z)((e=>{let{theme:a}=e;return{"& .MuiSwitch-switchBase.Mui-checked":{color:E.switchColor[100],"&:hover":{backgroundColor:(0,d.Fq)(E.switchColor[100],a.palette.action.hoverOpacity)}},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:E.switchColor[100]}}}));return(0,p.jsx)(t.P2,{layoutMode:"grid",enableBottomToolbar:!1,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"}}},initialState:{density:"compact",showGlobalFilter:!0},positionGlobalFilter:"left",muiSearchTextFieldProps:{placeholder:"Search...",sx:{minWidth:"50px"},variant:"standard"},enableEditing:!0,enableColumnFilters:!1,enableColumnActions:!1,enableFullScreenToggle:!1,enableStickyHeader:!0,enableGlobalFilterModes:!0,enableDensityToggle:!1,enableToolbarInternalActions:!1,enableFilterMatchHighlighting:!0,enableColumnFilterModes:!1,columns:l,data:a,enableColumnOrdering:!0,positionActionsColumn:"last",renderRowActions:e=>{let{row:a}=e;return(0,p.jsxs)(o.Z,{sx:{width:"100%",display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[S&&(0,p.jsx)(n.Z,{arrow:!0,placement:"left",title:"Status",children:(0,p.jsx)(s.Z,{disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0,size:"small",children:(0,p.jsx)(F,{checked:1===a.original.status,size:"small",onChange:()=>{return e=a.original,void b(e);var e}})})}),y&&(0,p.jsx)(n.Z,{arrow:!0,placement:"right",title:1===a.original.status?"Pause":"Play",children:(0,p.jsx)(s.Z,{onClick:()=>{return e=a.original,void v(e);var e},children:1===a.original.status?(0,p.jsx)(m.Vm3,{color:E.grey[200]}):(0,p.jsx)(m.udk,{color:E.grey[200]})})}),C&&(0,p.jsx)(n.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,p.jsx)(s.Z,{onClick:()=>{return e=a.original,void g(e);var e},children:(0,p.jsx)(i.Z,{})})}),f&&(0,p.jsx)(n.Z,{arrow:!0,placement:"right",title:null===a.original.deleted_at?"Delete":"Restore",children:(0,p.jsx)(s.Z,{onClick:()=>{return e=a.original,void x(e);var e},children:null===a.original.deleted_at?(0,p.jsx)(m.FH3,{color:E.redAccent[500]}):(0,p.jsx)(m.iY8,{color:E.blue[100]})})}),w&&(0,p.jsx)(n.Z,{arrow:!0,placement:"right",title:"Assign to",children:(0,p.jsx)(s.Z,{onClick:()=>{return e=a.original,void j(e);var e},children:(0,p.jsx)(m.s3e,{})})}),k&&(0,p.jsx)(n.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,p.jsx)(s.Z,{onClick:()=>{return e=a.original,void Z(e);var e},children:(0,p.jsx)(m.FpO,{})})})]})}})}},4610:(e,a,l)=>{l.r(a),l.d(a,{default:()=>z});var t=l(72791),r=l(13967),o=l(697),n=l(20890),s=l(49877),i=l(20068),c=l(96095),d=l(64370),u=l(41578),h=l(60978),m=l(94070),p=l(25351),g=l(39336),x=l(10918),b=l(79748),v=l(96140),j=l(87874),Z=l(51973),C=l(73598),f=l(57621),S=l(9585),y=l(13400),w=l(39504),k=l(61889),T=l(72363),E=l(24518),F=l(16856),A=l(39203),P=l(52638),_=l(63911),O=(l(38151),l(80184));const M=e=>{const{initialValue:a={},handleFormData:l,onHandleClose:n,clickedBtn:s,errorMessage:i,setErrorMessage:c,company_id:d}=e,u=(0,r.Z)(),h=(0,x.TV)(u.palette.mode),[m,p]=(0,t.useState)([]),[g,b]=(0,t.useState)({value:a?a.company_id:"",error:!1,success:!1}),[v,j]=(0,t.useState)({value:a?null===a||void 0===a?void 0:a.group_name:"",error:!1,success:!1});(0,t.useEffect)((()=>{(0,_.rn)().then((e=>{var a,l,t;const r=null===(a=e.data)||void 0===a||null===(l=a.data)||void 0===l||null===(t=l.data)||void 0===t?void 0:t.map((e=>({value:e.id,label:e.company_name})));p(r)})).catch((()=>{}))}),[]);return(0,O.jsxs)(f.Z,{sx:{boxShadow:"none",backgroundColor:h.form[500],color:h.form[100]},children:[(0,O.jsx)(S.Z,{action:(0,O.jsx)(y.Z,{"aria-label":"settings",onClick:n,children:(0,O.jsx)(F.FU5,{color:h.form[100]})}),title:"add"===s?"Add Group":"Update Group"}),i&&(0,O.jsx)("span",{className:"error_msg",children:i}),(0,O.jsx)(w.Z,{color:h.form[100],children:(0,O.jsx)(o.Z,{sx:{"& .MuiTextField-root":{mb:1}},className:"formResponsiveHeight",noValidate:!0,children:(0,O.jsxs)(k.ZP,{container:!0,spacing:1,children:["0"===d&&(0,O.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,O.jsx)(P.Z,{Value:g.value,onSelect:e=>{c(""),b(e)},label:"Company *",CustomErrorLine:"Choose one",Required:!0,Options:m})}),(0,O.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,O.jsx)(A.Z,{type:"alpha",placeholder:"Enter Group Name",label:"Group Name",Value:v.value,onChangeText:e=>{c(""),j(e)},Required:!0,CustomErrorLine:"Enter proper name"})})]})})}),(0,O.jsxs)(T.Z,{sx:{justifyContent:"space-between",m:1},children:[(0,O.jsx)(E.Z,{size:"small",variant:"contained",onClick:n,children:"Cancel"}),(0,O.jsx)(E.Z,{size:"small",onClick:e=>(e=>{if(e.preventDefault(),!v.value||"0"===d&&!g.value)return void c("Please fill in all required fields.");const a={group_name:v.value,company_id:"0"===d?g.value:d};l(a)})(e),sx:{backgroundColor:h.greenAccent[500]},variant:"contained",children:"add"===s?"Save":"Update"})]})]})};var G=l(12581);const R=[{name:"Dashboard",path:"",icon:(0,O.jsx)(u.MXJ,{})},{name:"Group",icon:(0,O.jsx)(h.AMR,{})}],V=t.forwardRef((function(e,a){return(0,O.jsx)(m.Z,{elevation:6,ref:a,variant:"filled",...e})})),z=()=>{const e=(0,r.Z)(),a=(0,x.TV)(e.palette.mode),l=JSON.parse(localStorage.getItem("user")).user_data.company_id,[u,h]=(0,t.useState)([]),[m,f]=(0,t.useState)(!1),[S,y]=(0,t.useState)(!1),[w,k]=(0,t.useState)(""),[T,E]=(0,t.useState)(),[F,A]=(0,t.useState)(),[P,_]=(0,t.useState)(0),[z,B]=(0,t.useState)(1),[D,H]=(0,t.useState)(10),[I,L]=(0,t.useState)({open:!1,vertical:"top",horizontal:"right"}),[N,W]=(0,t.useState)(""),[q,U]=(0,t.useState)(""),{vertical:Y,horizontal:J,open:K}=I,X=(0,t.useMemo)((()=>[{accessorKey:"group_name",header:"Name",size:350,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCell:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"status",header:"Status",size:100,enableColumnDragging:!1,enableGlobalFilter:!1,enableColumnFilter:!1,enableColumnActions:!1,Cell:e=>{let{cell:a}=e;return(0,O.jsx)(v.Z,{value:a.getValue()})},muiTableHeadCellProps:{align:"right"},muiTableBodyCellProps:{align:"right"}}]),[]),Q=(e,a)=>{"clickaway"!==a&&L({...I,open:!1})},$=(e,a)=>{var l,t;(l=e,t=a,(0,G.o)({method:"GET",url:"/block-group?page=".concat(l,"&perpage=").concat(t)})).then((e=>{var a;let l=0===e.data.data.length?[]:e.data.data.data;h(l),_(0===e.data.data.length?0:null===(a=e.data.data)||void 0===a?void 0:a.total),f(!1)})).catch((()=>{f(!1)}))};(0,t.useEffect)((()=>{$(z,D)}),[z,D]);const ee=()=>{A(""),y(!1)},ae=e=>{var a;f(!0),(a=e,(0,G.o)({method:"POST",url:"/block-group",data:a})).then((e=>{$(z,D),A(""),f(!1),W("success"),U(e.data.message),L({...I,open:!0}),y(!1),_(P+1)})).catch((e=>{f(!1),A(e.message)}))},le=e=>{f(!0);(e=>(0,G.o)({method:"PUT",url:"/block-group/".concat(e.id),data:e.data}))({data:{group_name:e.group_name,company_id:e.company_id},id:T.id}).then((e=>{$(z,D),A(""),f(!1),W("success"),U(e.data.message),L({...I,open:!0}),y(!1)})).catch((e=>{f(!1),A(e.message)}))};return(0,O.jsxs)(O.Fragment,{children:[m&&(0,O.jsx)(C.Z,{}),(0,O.jsx)(p.Z,{open:K,anchorOrigin:{vertical:Y,horizontal:J},autoHideDuration:3e3,onClose:Q,children:(0,O.jsx)(V,{onClose:Q,severity:N,sx:{width:"100%"},children:q})}),(0,O.jsxs)(o.Z,{sx:{"& .rs-pagination-group":{color:a.layoutColor[200]},"& .MuiTypography-root":{color:a.layoutColor[200]},mt:1,ml:2,mr:2,mb:2,height:"80%",backgroundColor:"inherit"},children:[(0,O.jsx)(g.Z,{pathList:R}),(0,O.jsxs)(o.Z,{children:[(0,O.jsx)(b.u,{modal_width:"30%",isOpen:S,children:(0,O.jsx)(M,{handleFormData:"add"===w?ae:le,onHandleClose:ee,clickedBtn:w,initialValue:"edit"===w?T:{},errorMessage:F,setErrorMessage:A,company_id:l})}),(0,O.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:[(0,O.jsx)("div",{children:(0,O.jsx)(n.Z,{variant:"h5",children:"Manage Group"})}),(0,O.jsx)("div",{style:{zIndex:1},children:(0,O.jsx)(s.Z,{"aria-label":"add",size:"small",sx:{boxShadow:"none",backgroundColor:a.greenAccent[500]},onClick:()=>{A(""),y(!0),k("add")},children:(0,O.jsx)(i.Z,{title:"Add",children:(0,O.jsx)(d.Z,{})})})})]}),(0,O.jsxs)(o.Z,{children:[(0,O.jsx)(j.Z,{isLoading:m,data:u,column:X,handleEditAction:e=>{k("edit"),E(e),y(!0)},handleStatusAction:e=>{f(!0);(e=>(0,G.o)({method:"PATCH",url:"/block-group/changeStatus/".concat(e.id),data:{status:e.status}}))({id:e.id,status:1===e.status?0:1}).then((e=>{$(z,D),W("success"),U(e.data.message),L({...I,open:!0}),A(""),y(!1),f(!1)})).catch((e=>{f(!1)}))},isSearchable:!0,isEditable:!0,isDeletable:!1,isStatusChangable:!0}),(0,O.jsx)(c.Z,{style:{marginTop:5},layout:["total","-","pager","skip"],size:"xs",prev:!0,next:!0,first:!0,last:!0,ellipsis:!0,boundaryLinks:!0,total:P,limit:D,maxButtons:5,activePage:z,onChangePage:B,limitOptions:[5,10,25,50,100],onChangeLimit:H})]})]})]}),(0,O.jsx)(Z.Z,{})]})}},63911:(e,a,l)=>{l.d(a,{Ie:()=>u,Nb:()=>o,Nm:()=>i,OY:()=>s,gS:()=>r,m6:()=>c,rn:()=>h,xf:()=>n,zB:()=>d});var t=l(12581);const r=(e,a)=>(0,t.o)({method:"GET",url:"/user?page=".concat(e,"&perpage=").concat(a)}),o=()=>(0,t.o)({method:"GET",url:"/role/active"}),n=e=>(0,t.o)({method:"PUT",url:"/user/".concat(e.id),data:e.data}),s=e=>(0,t.o)({method:"PATCH",url:"/user/changeStatus/".concat(e.id),data:{status:e.status}}),i=()=>(0,t.o)({method:"GET",url:"/countries"}),c=e=>(0,t.o)({method:"GET",url:"/states/".concat(e)}),d=e=>(0,t.o)({method:"POST",url:"/user",data:e}),u=e=>(0,t.o)({method:"POST",url:"/company",data:e}),h=()=>(0,t.o)({method:"GET",url:"/company"})},38151:()=>{}}]);
//# sourceMappingURL=4610.03f69322.chunk.js.map