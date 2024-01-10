"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[822],{39336:(e,a,l)=>{l.d(a,{Z:()=>c});var t=l(11087),r=l(66934),s=l(12065),o=l(93517),n=l(81918),i=l(80184);const c=e=>{const{pathList:a}=e,l=(0,r.ZP)(n.Z)((e=>{let{theme:a}=e;const l="light"===a.palette.mode?a.palette.grey[300]:a.palette.grey[800];return{backgroundColor:l,height:a.spacing(3),color:"light"===a.palette.mode?"#141414":"#f3f6f4",fontWeight:a.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:(0,s._4)(l,.06)},"&:active":{boxShadow:a.shadows[1],backgroundColor:(0,s._4)(l,.12)}}}));return(0,i.jsx)("div",{role:"presentation",children:(0,i.jsx)(o.Z,{"aria-label":"breadcrumb",children:a.length&&a.map(((e,r)=>r===a.length-1?(0,i.jsx)(l,{label:e.name,icon:e.icon},r):(0,i.jsx)(t.rU,{to:{pathname:"/".concat(e.path)},children:(0,i.jsx)(l,{icon:e.icon,label:e.name})},r)))})})}},96140:(e,a,l)=>{l.d(a,{Z:()=>i});l(72791);var t=l(13967),r=l(697),s=l(81918),o=l(10918),n=l(80184);const i=e=>{const a=(0,t.Z)(),l=(0,o.TV)(a.palette.mode);return(0,n.jsx)(r.Z,{sx:{width:"100%"},children:(0,n.jsx)(s.Z,{sx:{height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"nowrap"},backgroundColor:1===e.value?l.greenAccent[600]:l.redAccent[600],color:"black"},label:1===e.value?"Active":"Inactive",variant:"filled"})})}},52638:(e,a,l)=>{l.d(a,{Z:()=>x});var t=l(72791),r=l(13967),s=l(697),o=l(81918),n=l(30829),i=l(23786),c=l(47071),d=l(68096),u=l(58406),m=l(77196),h=l(94454),p=l(49900),g=l(80184);const x=e=>{const{Options:a,Value:l,label:x,CustomErrorLine:b,multiSelect:v,Required:C,disable:j,defaultValue:Z,onSelect:y,...f}=e,S=(0,r.Z)(),[P,w]=(0,t.useState)({value:"",error:!1,success:!1}),[E,T]=(0,t.useState)({value:Z||[],error:!1,success:!1}),[k,F]=(0,t.useState)("");return(0,g.jsxs)(d.Z,{fullWidth:!0,size:"small",margin:"normal",children:[(0,g.jsx)(n.Z,{id:"demo-select-small-label",sx:{color:"dark"===S.palette.mode?"#FAF0E6 !important":"#352F44 !important"},children:x}),!0===v?(0,g.jsx)(u.Z,{error:!!k,labelId:"demo-multiple-checkbox-label",id:"demo-multiple-checkbox",required:C,fullWidth:!0,multiple:!0,value:E.value,onChange:e=>{if(C)if(E.value.length>0){const a={value:e.target.value,error:!1,success:!0};T(a),y(a),F("")}else{const a={value:e.target.value,error:!1,success:!0};T(a),y(a),F(b||"Select Atleast One")}else{const a={value:e.target.value,error:!1,success:!0};T(a),y(a),F("")}},onBlur:e=>{if(C)if(E.value.length>0){F("");const a={value:e.target.value,error:!1,success:!0};T(a),y(a)}else{const e={value:[],error:!0,success:!1};F(b||"Select atleast one"),T(e),y(e)}else{const e={value:[],error:!1,success:!0};F(""),T(e),y(e)}},input:(0,g.jsx)(m.Z,{label:x}),renderValue:e=>(0,g.jsx)(s.Z,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map((e=>{var l;return(0,g.jsx)(o.Z,{label:null===a||void 0===a||null===(l=a.find((a=>a.id===e)))||void 0===l?void 0:l.label},e)}))},e),children:null===a||void 0===a?void 0:a.map((e=>(0,g.jsxs)(i.Z,{value:e.id,children:[(0,g.jsx)(h.Z,{checked:E.value.includes(e.id)}),(0,g.jsx)(p.Z,{primary:e.label})]},e.id)))}):(0,g.jsxs)(u.Z,{autoComplete:"on",error:!!k,labelId:"demo-simple-select-helper-label",value:l||P.value,label:x,onChange:e=>{const a={value:e.target.value,error:!1,success:!0};w(a),y(a),e.target.value&&F("")},onBlur:()=>{if(C)if(P.value){F("");const e={value:P.value,error:!1,success:!0};w(e),y(e)}else{const e={value:"",error:!0,success:!1};w(e),y(e),F(b||"Select One Option")}else{F("");const e={value:P.value,error:!1,success:!0};w(e),y(e)}},disabled:j,required:C,size:"small",sx:{"& .MuiFormLabel-root":{color:"dark"===S.palette.mode?"#FAF0E6 !important":"#352F44 !important"}},children:[(0,g.jsx)(i.Z,{value:"",children:(0,g.jsx)("em",{children:"-Select-"})}),a&&(null===a||void 0===a?void 0:a.map(((e,a)=>(0,g.jsx)(i.Z,{value:e.value,children:e.label},a))))]}),k&&(0,g.jsx)(c.Z,{sx:{marginLeft:"inherit"},error:!0,children:k})]})}},56887:(e,a,l)=>{l.d(a,{Z:()=>j});var t=l(72791),r=l(13967),s=l(697),o=l(57621),n=l(9585),i=l(13400),c=l(39504),d=l(61889),u=l(72363),m=l(94294),h=l(16856),p=l(10918),g=l(39203),x=l(63911),b=l(52638),v=l(73598),C=l(80184);const j=e=>{let{handleFormData:a,onHandleClose:l,errorMessage:j,setErrorMessage:Z,clickedBtn:y,initialValue:f}=e;const S=(0,r.Z)(),P=(0,p.TV)(S.palette.mode),[w,E]=(0,t.useState)(!1),[T,k]=(0,t.useState)({value:"edit"===y?f.company_name:"",error:!1,success:!1}),[F,A]=(0,t.useState)({value:"",error:!1,success:!1}),[_,z]=(0,t.useState)({value:"edit"===y?f.email:"",error:!1,success:!1}),[M,D]=(0,t.useState)({value:"edit"===y?f.mobile:"",error:!1,success:!1}),[R,O]=(0,t.useState)({value:"edit"===y?f.billing_address:"",error:!1,success:!1}),[V,L]=(0,t.useState)([]),[N,H]=(0,t.useState)({value:"edit"===y?f.country_id:"",error:!1,success:!1}),[B,G]=(0,t.useState)([]),[q,I]=(0,t.useState)({value:f?f.state_id:"",error:!1,success:!1}),[U,W]=(0,t.useState)({value:"edit"===y?f.city:"",error:!1,success:!1}),[K,J]=(0,t.useState)({value:"edit"===y?f.zip:"",error:!1,success:!1});(0,t.useEffect)((()=>{E(!0),(0,x.Nm)().then((e=>{const a=e.data.data.map((e=>({value:e.id,label:e.country_name,phone_code:e.phone_code})));L(a),E(!1)})).catch((e=>{E(!1),console.log(e)}))}),[]),(0,t.useEffect)((()=>{""!==N.value&&(0,x.m6)(N.value).then((e=>{const a=e.data.data.map((e=>({value:e.id,label:e.state_name})));G(a)})).catch((e=>{console.log(e)}))}),[N]);return(0,C.jsxs)(C.Fragment,{children:[w&&(0,C.jsx)(v.Z,{}),(0,C.jsx)(s.Z,{component:"form",noValidate:!0,children:(0,C.jsxs)(o.Z,{sx:{boxShadow:"none",backgroundColor:P.form[500],color:P.form[100]},children:[(0,C.jsx)(n.Z,{action:(0,C.jsx)(i.Z,{"aria-label":"settings",onClick:l,children:(0,C.jsx)(h.FU5,{color:P.form[100]})}),title:"add"===y?"Create Company":"Edit Company"}),j&&(0,C.jsx)("span",{className:"error_msg",children:j}),(0,C.jsx)(c.Z,{color:P.form[100],children:(0,C.jsx)(s.Z,{className:"formResponsiveHeight",children:(0,C.jsxs)(d.ZP,{container:!0,spacing:1,children:[(0,C.jsx)(d.ZP,{item:!0,xs:12,md:6,children:(0,C.jsx)(g.Z,{type:"textarea",placeholder:"Enter Company Name",label:"Company Name",Value:T.value,onChangeText:e=>{Z(""),k(e)},Required:!0,CustomErrorLine:"Enter proper name",isDisable:"edit"===y&&!0})}),"add"===y&&(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,C.jsx)(g.Z,{type:"text",label:"User Name",placeholder:"Enter User Name",CustomErrorLine:"Please enter a full name",value:F.value,onChangeText:e=>{Z(""),A(e)},Required:!0,isDisable:"edit"===y&&!0})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,C.jsx)(g.Z,{type:"email",label:"Email",placeholder:"Enter Email",CustomErrorLine:"Please enter a proper email",value:_.value,onChangeText:e=>{Z(""),z(e)},Required:!0,isDisable:"edit"===y&&!0})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,C.jsx)(g.Z,{type:"phoneno",label:"Phone No",placeholder:"Enter Phone No.",CustomErrorLine:"Please enter a phone no.",value:M.value,onChangeText:e=>{Z(""),D(e)},Required:!0,isDisable:"edit"===y&&!0})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,C.jsx)(g.Z,{type:"textarea",label:"Address",placeholder:"Enter Address",CustomErrorLine:"Please enter address",value:R.value,onChangeText:e=>{Z(""),O(e)},Required:!0,isMultiline:!0})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,C.jsx)(b.Z,{Value:N.value,onSelect:e=>{Z(""),H(e)},label:"Country *",placeholder:"Enter Country Name",CustomErrorLine:"Choose one",Required:!0,Options:V})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:6,children:(0,C.jsx)(b.Z,{Value:q.value,onSelect:e=>{Z(""),I(e)},label:"State *",placeholder:"Enter State Name",CustomErrorLine:"Choose one",Required:!0,Options:B})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:4,children:(0,C.jsx)(g.Z,{type:"text",label:"City",placeholder:"Enter City Name",CustomErrorLine:"Please enter a city name",value:U.value,onChangeText:e=>{Z(""),W(e)},Required:!0})}),(0,C.jsx)(d.ZP,{item:!0,xs:12,sm:2,children:(0,C.jsx)(g.Z,{type:"num",label:"Zip",placeholder:"Enter Zip Code",CustomErrorLine:"Please enter a zip code",value:K.value,onChangeText:e=>{Z(""),J(e)},Required:!0})})]})})}),(0,C.jsxs)(u.Z,{sx:{justifyContent:"space-between",mr:1,ml:1},children:[(0,C.jsx)(m.Z,{size:"small",variant:"contained",onClick:l,children:"Cancel"}),(0,C.jsx)(m.Z,{type:"submit",size:"small",onClick:e=>(e=>{e.preventDefault();const l={company_name:T.value,name:F.value,email:_.value,mobile:M.value,address:R.value,country_id:N.value,state_id:q.value,city:U.value,zip:parseInt(K.value)};a(l)})(e),sx:{backgroundColor:P.greenAccent[500]},variant:"contained",children:"add"===y?"Save":"Update"})]})]})})]})}},79748:(e,a,l)=>{l.d(a,{u:()=>n});l(72791);var t=l(697),r=l(19095),s=l(80184);const o={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"none",boxShadow:5,p:1,borderRadius:"10px",width:"50%","@media (max-width: 991px)":{width:"90%"},scrollbars:{width:"2px"}},n=e=>{const{modal_width:a="50%",isOpen:l,handleClose:n=(()=>{})}=e;return(0,s.jsx)(r.Z,{open:l,onClose:n,"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:(0,s.jsx)(t.Z,{sx:{...o,width:a},children:(0,s.jsx)("div",{children:e.children})})})}},87874:(e,a,l)=>{l.d(a,{Z:()=>g});l(72791);var t=l(24339),r=l(13967),s=l(697),o=l(20068),n=l(13400),i=l(38820),c=l(66934),d=l(12065),u=l(9955),m=l(10918),h=l(16856),p=l(80184);const g=e=>{const{data:a,column:l,handleEditAction:g,handleDeleteAction:x,handleStatusAction:b,handlePlayPause:v,isEditable:C,isDeletable:j,isStatusChangable:Z,isPlayPause:y,isAssignable:f,handleAssignChangable:S}=e,P=(0,r.Z)(),w=(0,m.TV)(P.palette.mode),E=(0,c.ZP)(u.Z)((e=>{let{theme:a}=e;return{"& .MuiSwitch-switchBase.Mui-checked":{color:w.switchColor[100],"&:hover":{backgroundColor:(0,d.Fq)(w.switchColor[100],a.palette.action.hoverOpacity)}},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:w.switchColor[100]}}}));return(0,p.jsx)(t.P2,{layoutMode:"grid",enableBottomToolbar:!1,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"}}},initialState:{density:"compact",showGlobalFilter:!0},positionGlobalFilter:"left",muiSearchTextFieldProps:{placeholder:"Search...",sx:{minWidth:"50px"},variant:"standard"},enableEditing:!0,enableColumnFilters:!1,enableColumnActions:!1,enableFullScreenToggle:!1,enableStickyHeader:!0,enableGlobalFilterModes:!0,enableDensityToggle:!1,enableToolbarInternalActions:!1,enableFilterMatchHighlighting:!0,enableColumnFilterModes:!1,columns:l,data:a,enableColumnOrdering:!0,positionActionsColumn:"last",renderRowActions:e=>{let{row:a}=e;return(0,p.jsxs)(s.Z,{sx:{width:"100%",display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[Z&&(0,p.jsx)(o.Z,{arrow:!0,placement:"left",title:"Status",children:(0,p.jsx)(n.Z,{disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0,size:"small",children:(0,p.jsx)(E,{checked:1===a.original.status,size:"small",onChange:()=>{return e=a.original,void b(e);var e}})})}),y&&(0,p.jsx)(o.Z,{arrow:!0,placement:"right",title:1===a.original.status?"Pause":"Play",children:(0,p.jsx)(n.Z,{onClick:()=>{return e=a.original,void v(e);var e},children:1===a.original.status?(0,p.jsx)(h.Vm3,{color:w.grey[200]}):(0,p.jsx)(h.udk,{color:w.grey[200]})})}),C&&(0,p.jsx)(o.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,p.jsx)(n.Z,{onClick:()=>{return e=a.original,void g(e);var e},children:(0,p.jsx)(i.Z,{})})}),j&&(0,p.jsx)(o.Z,{arrow:!0,placement:"right",title:null===a.original.deleted_at?"Delete":"Restore",children:(0,p.jsx)(n.Z,{onClick:()=>{return e=a.original,void x(e);var e},children:null===a.original.deleted_at?(0,p.jsx)(h.FH3,{color:w.redAccent[500]}):(0,p.jsx)(h.iY8,{color:w.blue[100]})})}),f&&(0,p.jsx)(o.Z,{arrow:!0,placement:"right",title:"Assign to",children:(0,p.jsx)(n.Z,{onClick:()=>{return e=a.original,void S(e);var e},children:(0,p.jsx)(h.s3e,{})})})]})}})}},34822:(e,a,l)=>{l.r(a),l.d(a,{default:()=>T});var t=l(72791),r=l(13967),s=l(697),o=l(20890),n=l(49877),i=l(20068),c=l(39336),d=l(41578),u=l(96593),m=l(64370),h=l(94070),p=l(93543),g=l(10918),x=l(79748),b=l(96140),v=l(12581);var C=l(73598),j=l(56887),Z=l(87874),y=l(80383),f=(l(81097),l(47786)),S=l(24231),P=l(80184);const w=[{name:"Dashboard",path:"",icon:(0,P.jsx)(d.MXJ,{})},{name:"Campany",icon:(0,P.jsx)(u.Z,{size:"10"})}],E=t.forwardRef((function(e,a){return(0,P.jsx)(h.Z,{elevation:6,ref:a,variant:"filled",...e})})),T=()=>{const e=JSON.parse(localStorage.getItem("user")).user_data.company_id,a=(0,r.Z)(),l=(0,g.TV)(a.palette.mode),[d,u]=(0,t.useState)([]),[h,T]=(0,t.useState)(!1),[k,F]=(0,t.useState)(!1),[A,_]=(0,t.useState)("add"),[z,M]=(0,t.useState)(),[D,R]=(0,t.useState)(),[O,V]=(0,t.useState)(0),[L,N]=(0,t.useState)(1),[H,B]=(0,t.useState)(10),[G,q]=(0,t.useState)({open:!1,vertical:"top",horizontal:"right"}),[I,U]=(0,t.useState)(""),[W,K]=(0,t.useState)(""),{vertical:J,horizontal:X,open:Y}=G,$=(0,t.useMemo)((()=>[{accessorKey:"company_name",header:"Name",size:70,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"email",header:"Email",size:50,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"mobile",header:"Mobile",size:30,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"billing_address",header:"Address",size:100,enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"}},{accessorKey:"status",header:"Status",size:10,enableColumnDragging:!1,enableGlobalFilter:!1,enableColumnFilter:!1,enableColumnActions:!1,Cell:e=>{let{cell:a}=e;return(0,P.jsx)(b.Z,{value:a.getValue()})},muiTableHeadCellProps:{align:"right"},muiTableBodyCellProps:{align:"right"}}]),[]),Q=(e,a)=>{"clickaway"!==a&&q({...G,open:!1})},ee=(e,a)=>{var l,t;T(!0),(l=e,t=a,(0,v.o)({method:"GET",url:"/company?page=".concat(l,"&perpage=").concat(t)})).then((e=>{var a;let l=0===e.data.data.length?[]:e.data.data.data;u(l),V(0===e.data.data.length?0:null===(a=e.data.data)||void 0===a?void 0:a.total),T(!1)})).catch((()=>{T(!1)}))};(0,t.useEffect)((()=>{ee(L,H)}),[L,H]);const ae=()=>{F(!1)},le=e=>{var a;T(!0),(a=e,(0,v.o)({method:"POST",url:"/company",data:a})).then((e=>{ee(L,H),R(""),F(!1),U("success"),K(e.data.message),q({...G,open:!0}),T(!1)})).catch((e=>{T(!1),R(e.message)}))},te=e=>{const a={data:{country_id:e.country_id,state_id:e.state_id,city:e.city,zip:e.zip,billing_address:e.address},id:z.id};var l;T(!0),(l=a,(0,v.o)({method:"PUT",url:"/company/billing-address/".concat(l.id),data:l.data})).then((e=>{ee(L,H),R(""),F(!1),U("success"),K(e.data.message),q({...G,open:!0}),T(!1)})).catch((e=>{T(!1),R(e.message)}))};return(0,P.jsxs)(P.Fragment,{children:[h&&(0,P.jsx)(C.Z,{}),(0,P.jsx)(p.Z,{open:Y,anchorOrigin:{vertical:J,horizontal:X},autoHideDuration:3e3,onClose:Q,children:(0,P.jsx)(E,{onClose:Q,severity:I,sx:{width:"100%"},children:W})}),(0,P.jsxs)(s.Z,{sx:{"& .rs-pagination-group":{color:l.layoutColor[200]},"& .MuiTypography-root":{color:l.layoutColor[200]},mt:1,ml:2,mr:2,mb:2,height:"80%",backgroundColor:"inherit"},children:[(0,P.jsx)(c.Z,{pathList:w}),(0,P.jsxs)(s.Z,{children:[h&&(0,P.jsx)("h2",{children:"Loader"}),(0,P.jsx)(x.u,{modal_width:"40%",isOpen:k,children:(0,P.jsx)(j.Z,{clickedBtn:A,initialValue:z,handleFormData:"add"===A?le:te,onHandleClose:ae,errorMessage:D,setErrorMessage:R})}),(0,P.jsxs)(s.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2},children:[(0,P.jsx)("div",{children:(0,P.jsx)(o.Z,{variant:"h5",children:"Manage Company"})}),(0,P.jsx)("div",{style:{zIndex:1},children:"0"===e&&(0,P.jsx)(P.Fragment,{children:(0,f.Ve)(S.Z6)&&(0,P.jsx)(n.Z,{"aria-label":"add",size:"small",sx:{boxShadow:"none",backgroundColor:l.greenAccent[500]},onClick:()=>{_("add"),F(!0)},children:(0,P.jsx)(i.Z,{title:"Add",children:(0,P.jsx)(m.Z,{})})})})})]}),(0,P.jsxs)(s.Z,{children:[(0,P.jsx)(Z.Z,{data:d,column:$,handleEditAction:e=>{_("edit"),M(e),F(!0)},handleStatusAction:e=>{T(!0);(e=>(0,v.o)({method:"PATCH",url:"/company/changeStatus/".concat(e.id),data:{status:e.status}}))({id:e.id,status:1===e.status?0:1}).then((e=>{ee(L,H),U("success"),K(e.data.message),q({...G,open:!0}),R(""),F(!1),T(!1)})).catch((e=>{T(!1)}))},isSearchable:!0,isEditable:(0,f.Ve)(S.X$),isDeletable:!1,isStatusChangable:(0,f.Ve)(S.Zf)}),(0,P.jsx)(y.Z,{style:{marginTop:5},layout:["total","-","pager","skip"],size:"xs",prev:!0,next:!0,first:!0,last:!0,ellipsis:!0,boundaryLinks:!0,total:O,limit:H,maxButtons:5,activePage:L,onChangePage:N,limitOptions:[5,10,25,50,100],onChangeLimit:B})]})]})]})]})}},63911:(e,a,l)=>{l.d(a,{Ie:()=>u,Nb:()=>s,Nm:()=>i,OY:()=>n,gS:()=>r,m6:()=>c,rn:()=>m,xf:()=>o,zB:()=>d});var t=l(12581);const r=(e,a)=>(0,t.o)({method:"GET",url:"/user?page=".concat(e,"&perpage=").concat(a)}),s=()=>(0,t.o)({method:"GET",url:"/role/active"}),o=e=>(0,t.o)({method:"PUT",url:"/user/".concat(e.id),data:e.data}),n=e=>(0,t.o)({method:"PATCH",url:"/user/changeStatus/".concat(e.id),data:{status:e.status}}),i=()=>(0,t.o)({method:"GET",url:"/countries"}),c=e=>(0,t.o)({method:"GET",url:"/states/".concat(e)}),d=e=>(0,t.o)({method:"POST",url:"/user",data:e}),u=e=>(0,t.o)({method:"POST",url:"/company",data:e}),m=()=>(0,t.o)({method:"GET",url:"/company"})}}]);
//# sourceMappingURL=822.f32b30a8.chunk.js.map