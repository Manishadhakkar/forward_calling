"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[6531],{39336:(e,a,l)=>{l.d(a,{Z:()=>c});var t=l(11087),r=l(66934),n=l(12065),o=l(93517),s=l(81918),i=l(80184);const c=e=>{const{pathList:a}=e,l=(0,r.ZP)(s.Z)((e=>{let{theme:a}=e;const l="light"===a.palette.mode?a.palette.grey[300]:a.palette.grey[800];return{backgroundColor:l,height:a.spacing(3),color:"light"===a.palette.mode?"#141414":"#f3f6f4",fontWeight:a.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:(0,n._4)(l,.06)},"&:active":{boxShadow:a.shadows[1],backgroundColor:(0,n._4)(l,.12)}}}));return(0,i.jsx)("div",{role:"presentation",children:(0,i.jsx)(o.Z,{"aria-label":"breadcrumb",children:a.length&&a.map(((e,r)=>r===a.length-1?(0,i.jsx)(l,{label:e.name,icon:e.icon},r):(0,i.jsx)(t.rU,{to:{pathname:"/".concat(e.path)},children:(0,i.jsx)(l,{icon:e.icon,label:e.name})},r)))})})}},38639:(e,a,l)=>{l.d(a,{Z:()=>i});l(72791);var t=l(13967),r=l(697),n=l(81918),o=l(10918),s=l(80184);const i=e=>{const a=(0,t.Z)(),l=(0,o.TV)(a.palette.mode);return(0,s.jsx)(r.Z,{sx:{width:100},children:(0,s.jsx)(n.Z,{sx:{height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"nowrap"},backgroundColor:1===e.value?l.greenAccent[600]:l.redAccent[600],color:"black"},label:1===e.value?"Live":"Pause",variant:"filled"})})}},52638:(e,a,l)=>{l.d(a,{Z:()=>x});var t=l(72791),r=l(13967),n=l(697),o=l(81918),s=l(30829),i=l(23786),c=l(47071),d=l(68096),u=l(58406),p=l(77196),m=l(94454),h=l(49900),g=l(80184);const x=e=>{const{Options:a,Value:l,label:x,CustomErrorLine:b,multiSelect:y,Required:v,disable:j,defaultValue:C,onSelect:Z,...f}=e,S=(0,r.Z)(),[w,T]=(0,t.useState)({value:"",error:!1,success:!1}),[P,_]=(0,t.useState)({value:C||[],error:!1,success:!1}),[E,k]=(0,t.useState)("");return(0,g.jsxs)(d.Z,{fullWidth:!0,size:"small",margin:"normal",children:[(0,g.jsx)(s.Z,{id:"demo-select-small-label",sx:{color:"dark"===S.palette.mode?"#FAF0E6 !important":"#352F44 !important"},children:x}),!0===y?(0,g.jsx)(u.Z,{error:!!E,labelId:"demo-multiple-checkbox-label",id:"demo-multiple-checkbox",required:v,fullWidth:!0,multiple:!0,value:P.value,onChange:e=>{if(v)if(P.value.length>0){const a={value:e.target.value,error:!1,success:!0};_(a),Z(a),k("")}else{const a={value:e.target.value,error:!1,success:!0};_(a),Z(a),k(b||"Select Atleast One")}else{const a={value:e.target.value,error:!1,success:!0};_(a),Z(a),k("")}},onBlur:e=>{if(v)if(P.value.length>0){k("");const a={value:e.target.value,error:!1,success:!0};_(a),Z(a)}else{const e={value:[],error:!0,success:!1};k(b||"Select atleast one"),_(e),Z(e)}else{const e={value:[],error:!1,success:!0};k(""),_(e),Z(e)}},input:(0,g.jsx)(p.Z,{label:x}),renderValue:e=>(0,g.jsx)(n.Z,{sx:{display:"flex",flexWrap:"wrap",gap:.5},children:e.map((e=>{var l;return(0,g.jsx)(o.Z,{label:null===a||void 0===a||null===(l=a.find((a=>a.id===e)))||void 0===l?void 0:l.label},e)}))},e),children:null===a||void 0===a?void 0:a.map((e=>(0,g.jsxs)(i.Z,{value:e.id,children:[(0,g.jsx)(m.Z,{checked:P.value.includes(e.id)}),(0,g.jsx)(h.Z,{primary:e.label})]},e.id)))}):(0,g.jsxs)(u.Z,{autoComplete:"on",error:!!E,labelId:"demo-simple-select-helper-label",value:l||w.value,label:x,onChange:e=>{const a={value:e.target.value,error:!1,success:!0};T(a),Z(a),e.target.value&&k("")},onBlur:()=>{if(v)if(w.value){k("");const e={value:w.value,error:!1,success:!0};T(e),Z(e)}else{const e={value:"",error:!0,success:!1};T(e),Z(e),k(b||"Select One Option")}else{k("");const e={value:w.value,error:!1,success:!0};T(e),Z(e)}},disabled:j,required:v,size:"small",sx:{"& .MuiFormLabel-root":{color:"dark"===S.palette.mode?"#FAF0E6 !important":"#352F44 !important"}},children:[(0,g.jsx)(i.Z,{value:"",children:(0,g.jsx)("em",{children:"-Select-"})}),a&&(null===a||void 0===a?void 0:a.map(((e,a)=>(0,g.jsx)(i.Z,{value:e.value,children:e.label},a))))]}),E&&(0,g.jsx)(c.Z,{sx:{marginLeft:"inherit"},error:!0,children:E})]})}},51973:(e,a,l)=>{l.d(a,{Z:()=>c});l(72791);var t=l(20890),r=l(50533),n=l(49418);const o=n.Z["FOOTER.WEBSITE.RIGHTS"],s=n.Z["FOOTER.WEBSITE.LABEL"];var i=l(80184);const c=e=>(0,i.jsxs)(t.Z,{mt:1,variant:"body2",color:"text.secondary",align:"center",...e,children:[o,(0,i.jsx)(r.Z,{className:"Url_link",color:"inherit",href:"http://www.textricks.com/",children:s})," ",(new Date).getFullYear(),"."]})},79748:(e,a,l)=>{l.d(a,{u:()=>s});l(72791);var t=l(697),r=l(19095),n=l(80184);const o={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"none",boxShadow:5,p:1,borderRadius:"10px",width:"50%","@media (max-width: 991px)":{width:"90%"},scrollbars:{width:"2px"}},s=e=>{const{modal_width:a="50%",isOpen:l,handleClose:s=(()=>{})}=e;return(0,n.jsx)(r.Z,{open:l,onClose:s,"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:(0,n.jsx)(t.Z,{sx:{...o,width:a},children:(0,n.jsx)("div",{children:e.children})})})}},87874:(e,a,l)=>{l.d(a,{Z:()=>g});l(72791);var t=l(24339),r=l(13967),n=l(697),o=l(20068),s=l(13400),i=l(38820),c=l(66934),d=l(12065),u=l(9955),p=l(10918),m=l(16856),h=l(80184);const g=e=>{const{data:a,column:l,handleEditAction:g,handleDeleteAction:x,handleStatusAction:b,handlePlayPause:y,handleAssignChangable:v,handleViewChange:j,isEditable:C=!1,isDeletable:Z=!1,isStatusChangable:f=!1,isPlayPause:S=!1,isAssignable:w=!1,isView:T=!1}=e,P=(0,r.Z)(),_=(0,p.TV)(P.palette.mode),E=(0,c.ZP)(u.Z)((e=>{let{theme:a}=e;return{"& .MuiSwitch-switchBase.Mui-checked":{color:_.switchColor[100],"&:hover":{backgroundColor:(0,d.Fq)(_.switchColor[100],a.palette.action.hoverOpacity)}},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:_.switchColor[100]}}}));return(0,h.jsx)(t.P2,{layoutMode:"grid",enableBottomToolbar:!1,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"}}},initialState:{density:"compact",showGlobalFilter:!0},positionGlobalFilter:"left",muiSearchTextFieldProps:{placeholder:"Search...",sx:{minWidth:"50px"},variant:"standard"},enableEditing:!0,enableColumnFilters:!1,enableColumnActions:!1,enableFullScreenToggle:!1,enableStickyHeader:!0,enableGlobalFilterModes:!0,enableDensityToggle:!1,enableToolbarInternalActions:!1,enableFilterMatchHighlighting:!0,enableColumnFilterModes:!1,columns:l,data:a,enableColumnOrdering:!0,positionActionsColumn:"last",renderRowActions:e=>{let{row:a}=e;return(0,h.jsxs)(n.Z,{sx:{width:"100%",display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[f&&(0,h.jsx)(o.Z,{arrow:!0,placement:"left",title:"Status",children:(0,h.jsx)(s.Z,{disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0,size:"small",children:(0,h.jsx)(E,{checked:1===a.original.status,size:"small",onChange:()=>{return e=a.original,void b(e);var e}})})}),S&&(0,h.jsx)(o.Z,{arrow:!0,placement:"right",title:1===a.original.status?"Pause":"Play",children:(0,h.jsx)(s.Z,{onClick:()=>{return e=a.original,void y(e);var e},children:1===a.original.status?(0,h.jsx)(m.Vm3,{color:_.grey[200]}):(0,h.jsx)(m.udk,{color:_.grey[200]})})}),C&&(0,h.jsx)(o.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,h.jsx)(s.Z,{onClick:()=>{return e=a.original,void g(e);var e},children:(0,h.jsx)(i.Z,{})})}),Z&&(0,h.jsx)(o.Z,{arrow:!0,placement:"right",title:null===a.original.deleted_at?"Delete":"Restore",children:(0,h.jsx)(s.Z,{onClick:()=>{return e=a.original,void x(e);var e},children:null===a.original.deleted_at?(0,h.jsx)(m.FH3,{color:_.redAccent[500]}):(0,h.jsx)(m.iY8,{color:_.blue[100]})})}),w&&(0,h.jsx)(o.Z,{arrow:!0,placement:"right",title:"Assign to",children:(0,h.jsx)(s.Z,{onClick:()=>{return e=a.original,void v(e);var e},children:(0,h.jsx)(m.s3e,{})})}),T&&(0,h.jsx)(o.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,h.jsx)(s.Z,{onClick:()=>{return e=a.original,void j(e);var e},children:(0,h.jsx)(m.FpO,{})})})]})}})}},86531:(e,a,l)=>{l.r(a),l.d(a,{default:()=>G});var t=l(72791),r=l(96095),n=l(13967),o=l(697),s=l(20890),i=l(49877),c=l(20068),d=l(64370),u=l(25351),p=l(94070),m=l(41578),h=l(39336),g=l(38639),x=l(10918),b=l(79748),y=l(57621),v=l(9585),j=l(13400),C=l(39504),Z=l(61889),f=l(94721),S=l(1582),w=l(9955),T=l(72363),P=l(24518),_=l(16856),E=l(35527),k=l(66934),F=l(39203),A=(l(38151),l(63911)),R=l(52638),D=l(80184);const M=(0,k.ZP)(E.Z)((e=>{let{theme:a}=e;return{...a.typography.body2,boxShadow:"none",textAlign:"start",color:a.palette.text.secondary,flexGrow:1}})),L=(0,k.ZP)(E.Z)((e=>{let{theme:a}=e;return{...a.typography.body2,boxShadow:"none",textAlign:"end",color:a.palette.text.primary,flexGrow:1}})),H=e=>{const{initialValue:a={},handleFormData:l,onHandleClose:r,clickedBtn:i,errorMessage:c,setErrorMessage:d,company_id:u}=e,p=(0,n.Z)(),m=(0,x.TV)(p.palette.mode),[h,g]=(0,t.useState)({value:a?a.name:"",error:!1,success:!1}),[b,E]=(0,t.useState)([]),[k,H]=(0,t.useState)({value:a?a.company_id:"",error:!1,success:!1}),[V,N]=(0,t.useState)({value:a?a.description:"",error:!1,success:!1}),[O,I]=(0,t.useState)([{label:"Number",value:"Number"},{label:"SIP",value:"SIP"}]),[B,z]=(0,t.useState)({value:a?null===a||void 0===a?void 0:a.type:"Number",error:!1,success:!1}),[G,q]=(0,t.useState)({value:a?a.forwarding_number:"",error:!1,success:!1}),[W,K]=(0,t.useState)({value:a?null===a||void 0===a?void 0:a.connection_timeout:null,error:!1,success:!1}),[U,Y]=(0,t.useState)("edit"===i&&null!==a.monthly_cap),[J,X]=(0,t.useState)({value:a?a.monthly_cap:"",error:!1,success:!1}),[Q,$]=(0,t.useState)("edit"===i&&null!==a.daily_cap),[ee,ae]=(0,t.useState)({value:a?a.daily_cap:"",error:!1,success:!1}),[le,te]=(0,t.useState)("edit"===i&&null!==a.hourly_cap),[re,ne]=(0,t.useState)({value:a?a.hourly_cap:"",error:!1,success:!1}),[oe,se]=(0,t.useState)("edit"===i&&null!==a.max_concurrency),[ie,ce]=(0,t.useState)({value:a?a.max_concurrency:"",error:!1,success:!1});(0,t.useEffect)((()=>{(0,A.rn)().then((e=>{var a,l,t;const r=null===(a=e.data)||void 0===a||null===(l=a.data)||void 0===l||null===(t=l.data)||void 0===t?void 0:t.map((e=>({value:e.id,label:e.company_name})));E(r)})).catch((e=>{console.log(e)}))}),[]);return(0,D.jsxs)(y.Z,{sx:{boxShadow:"none",backgroundColor:m.form[500],color:m.form[100]},children:[(0,D.jsx)(v.Z,{action:(0,D.jsx)(j.Z,{"aria-label":"settings",onClick:r,children:(0,D.jsx)(_.FU5,{color:m.form[100]})}),title:"add"===i?"Add Target":"Update Target"}),(0,D.jsx)(C.Z,{color:m.form[100],children:(0,D.jsxs)(o.Z,{component:"form",sx:{"& .MuiTextField-root":{mb:1},"&::-webkit-scrollbar":{width:"6px",borderRadius:"3px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"gray",borderRadius:"3px"},"&::-webkit-scrollbar-track":{backgroundColor:"lightgray",borderRadius:"3px"}},className:"formResponsiveHeight",noValidate:!0,children:[c&&(0,D.jsx)("span",{className:"error_msg",children:c}),(0,D.jsxs)(Z.ZP,{container:!0,spacing:1,children:["0"===u&&(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsx)(R.Z,{Value:k.value,onSelect:e=>{d(""),H(e)},label:"Company *",CustomErrorLine:"Choose one",Required:!0,Options:b})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsx)(F.Z,{type:"alpha",placeholder:"Enter Target Name",label:"Name",Value:h.value,onChangeText:e=>{d(""),g(e)},Required:!0,CustomErrorLine:"Enter proper name"})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsx)(F.Z,{type:"textarea",placeholder:"Enter Description",label:"Description",Value:V.value,onChangeText:e=>{d(""),N(e)},Required:!1,CustomErrorLine:"Enter proper description"})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsx)(R.Z,{Value:B.value,onSelect:e=>{d(""),z(e)},label:"Did Type *",CustomErrorLine:"Choose one",Required:!0,Options:O})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsx)(F.Z,{type:"Number"===B.value?"phoneno":"textarea",placeholder:"Number"===B.value?"Enter Number":"Enter Sip",label:"Number"===B.value?"Number":"Sip",Value:G.value,onChangeText:e=>{d(""),q(e)},Required:!0,CustomErrorLine:"Number"===B.value?"Enter proper number":"Enter proper sip"})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsx)(F.Z,{type:"num",placeholder:"Enter connection time out",label:"Connection timeout",Value:W.value,onChangeText:e=>{d(""),K(e)},Required:!1,CustomErrorLine:"Enter proper description"})}),(0,D.jsxs)(Z.ZP,{item:!0,xs:12,md:12,mb:1,children:[(0,D.jsx)(s.Z,{children:"Cap Setting"}),(0,D.jsx)(f.Z,{})]}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsxs)(S.Z,{direction:"row",justifyContent:"space-between",alignItems:"baseline",children:[(0,D.jsx)(M,{children:"Monthly Cap"}),(0,D.jsx)(L,{children:(0,D.jsx)(w.Z,{checked:U,onChange:()=>Y(!U),name:"inputToggle",color:"secondary"})}),(0,D.jsx)("span",{style:{width:"40%"},children:(0,D.jsx)(F.Z,{type:"capvalue",placeholder:"Enter cap",label:"Monthly Cap",Value:J.value,onChangeText:e=>{d(""),X(e)},Required:!0,CustomErrorLine:"Enter proper cap value",isHidden:!U})})]})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsxs)(S.Z,{direction:"row",justifyContent:"space-between",alignItems:"baseline",children:[(0,D.jsx)(M,{children:"Daily cap"}),(0,D.jsx)(L,{children:(0,D.jsx)(w.Z,{checked:Q,onChange:()=>$(!Q),name:"inputToggle",color:"secondary"})}),(0,D.jsx)("span",{style:{width:"40%"},children:(0,D.jsx)(F.Z,{type:"capvalue",placeholder:"Enter cap",label:"Daily Cap",Value:ee.value,onChangeText:e=>{d(""),ae(e)},Required:!0,CustomErrorLine:"Enter proper cap value",isHidden:!Q})})]})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsxs)(S.Z,{direction:"row",justifyContent:"space-between",alignItems:"baseline",children:[(0,D.jsx)(M,{children:"Hourly cap"}),(0,D.jsx)(L,{children:(0,D.jsx)(w.Z,{checked:le,onChange:()=>te(!le),name:"inputToggle",color:"secondary"})}),(0,D.jsx)("span",{style:{width:"40%"},children:(0,D.jsx)(F.Z,{type:"capvalue",placeholder:"Enter cap",label:"Hourly Cap",Value:re.value,onChangeText:e=>{d(""),ne(e)},Required:!0,CustomErrorLine:"Enter proper cap value",isHidden:!le})})]})}),(0,D.jsx)(Z.ZP,{item:!0,xs:12,md:6,children:(0,D.jsxs)(S.Z,{direction:"row",justifyContent:"space-between",alignItems:"baseline",children:[(0,D.jsx)(M,{children:"Maximum Concurrency"}),(0,D.jsx)(L,{children:(0,D.jsx)(w.Z,{checked:oe,onChange:()=>se(!oe),name:"inputToggle",color:"secondary"})}),(0,D.jsx)("span",{style:{width:"40%"},children:(0,D.jsx)(F.Z,{type:"capvalue",placeholder:"Enter cap",label:"Maximum Concurrency",Value:ie.value,onChangeText:e=>{d(""),ce(e)},Required:!0,CustomErrorLine:"Enter proper cap value",isHidden:!oe})})]})})]})]})}),(0,D.jsxs)(T.Z,{sx:{justifyContent:"space-between",mr:1,ml:1},children:[(0,D.jsx)(P.Z,{size:"small",variant:"contained",onClick:r,children:"Cancel"}),(0,D.jsx)(P.Z,{type:"submit",size:"small",onClick:e=>(e=>{e.preventDefault();const a={name:h.value,description:V.value,forwarding_number:G.value,connection_timeout:W.value,type:B.value,monthly_cap:!0===U?J.value:null,daily_cap:!0===Q?ee.value:null,hourly_cap:!0===le?re.value:null,max_concurrency:!0===oe?ie.value:null,company_id:"0"===u?parseInt(k.value):parseInt(u)};l(a)})(e),sx:{backgroundColor:m.greenAccent[500]},variant:"contained",children:"add"===i?"Save":"Update"})]})]})};var V=l(12581);var N=l(73598),O=l(87874),I=l(51973);const B=[{name:"Dashboard",path:"",icon:(0,D.jsx)(m.MXJ,{})},{name:"Targets",icon:(0,D.jsx)(m.TKm,{})}],z=t.forwardRef((function(e,a){return(0,D.jsx)(p.Z,{elevation:6,ref:a,variant:"filled",...e})})),G=()=>{const e=(0,n.Z)(),a=(0,x.TV)(e.palette.mode),l=JSON.parse(localStorage.getItem("user")).user_data.company_id,[p,m]=(0,t.useState)([]),[y,v]=(0,t.useState)(!1),[j,C]=(0,t.useState)(!1),[Z,f]=(0,t.useState)(""),[S,w]=(0,t.useState)(),[T,P]=(0,t.useState)(),[_,E]=(0,t.useState)(""),[k,F]=(0,t.useState)(0),[A,R]=(0,t.useState)(1),[M,L]=(0,t.useState)(10),[G,q]=(0,t.useState)({open:!1,vertical:"top",horizontal:"right"}),[W,K]=(0,t.useState)(""),{vertical:U,horizontal:Y,open:J}=G,X=(0,t.useMemo)((()=>[{accessorKey:"name",header:"Name",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:100},{accessorKey:"target_random_id",header:"Random ID",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableBodyCellProps:{align:"left"},muiTableHeadCellProps:{align:"left"},size:50},{accessorKey:"hourly_cap",header:"Hour",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30},{accessorKey:"daily_cap",header:"Day",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30},{accessorKey:"monthly_cap",header:"Month",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30},{accessorKey:"connection_timeout",header:"Timeout",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30},{accessorKey:"status",header:"Status",enableColumnDragging:!1,enableGlobalFilter:!1,enableColumnFilter:!1,enableColumnActions:!1,Cell:e=>{let{cell:a}=e;return(0,D.jsx)(g.Z,{value:a.getValue()})},muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30}]),[]),Q=(e,a)=>{"clickaway"!==a&&q({...G,open:!1})},$=(e,a)=>{var l,t;v(!0),(l=e,t=a,(0,V.o)({method:"GET",url:"/target?page=".concat(l,"&perpage=").concat(t)})).then((e=>{var a;let l=0===e.data.data.length?[]:e.data.data.data;F(0===e.data.data.length?0:null===(a=e.data.data)||void 0===a?void 0:a.total),m(l),v(!1)})).catch((()=>{v(!1)}))};(0,t.useEffect)((()=>{$(A,M)}),[A,M]);const ee=()=>{P(""),C(!1)},ae=e=>{var a;v(!0),(a=e,(0,V.o)({method:"POST",url:"/target",data:a})).then((e=>{$(A,M),v(!1),P(""),E(e.data.message),K("success"),q({...G,open:!0}),C(!1)})).catch((e=>{v(!1),P(e.message)}))},le=e=>{v(!0);const a={data:{user_id:S.user_id,company_id:e.company_id,name:e.name,type:e.type,description:e.description,forwarding_number:e.forwarding_number,connection_timeout:e.connection_timeout,monthly_cap:e.monthly_cap,daily_cap:e.daily_cap,hourly_cap:e.hourly_cap,max_concurrency:e.max_concurrency,status:S.status},id:S.id};var l;(l=a,(0,V.o)({method:"PUT",url:"/target/".concat(l.id),data:l.data})).then((e=>{$(A,M),v(!1),P(""),K("success"),E(e.data.message),q({...G,open:!0}),C(!1)})).catch((e=>{v(!1),P(e.message)}))};return(0,D.jsxs)(D.Fragment,{children:[y&&(0,D.jsx)(N.Z,{}),(0,D.jsx)(u.Z,{open:J,anchorOrigin:{vertical:U,horizontal:Y},autoHideDuration:3e3,onClose:Q,children:(0,D.jsx)(z,{onClose:Q,severity:W,sx:{width:"100%"},children:_})}),(0,D.jsxs)(o.Z,{sx:{"& .rs-pagination-group":{color:a.layoutColor[200]},"& .MuiTypography-root":{color:a.layoutColor[200]},mt:1,ml:2,mr:2,mb:2,height:"80%",backgroundColor:"inherit"},children:[(0,D.jsx)(h.Z,{pathList:B}),(0,D.jsxs)(o.Z,{children:[(0,D.jsx)(b.u,{modal_width:"50%",isOpen:j,children:(0,D.jsx)(H,{company_id:l,handleFormData:"add"===Z?ae:le,onHandleClose:ee,clickedBtn:Z,initialValue:"edit"===Z?S:{},errorMessage:T,setErrorMessage:P})}),(0,D.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:[(0,D.jsx)("div",{children:(0,D.jsx)(s.Z,{variant:"h5",children:"Manage Targets"})}),(0,D.jsx)("div",{style:{zIndex:1},children:(0,D.jsx)(i.Z,{"aria-label":"add",size:"small",sx:{boxShadow:"none",backgroundColor:a.greenAccent[500]},onClick:()=>{var e;P(""),C(!0),e="add",P(""),f(e)},children:(0,D.jsx)(c.Z,{title:"Add",children:(0,D.jsx)(d.Z,{})})})})]}),(0,D.jsxs)(o.Z,{children:[(0,D.jsx)(O.Z,{isLoading:y,data:p,column:X,handleEditAction:e=>{f("edit"),w(e),C(!0)},handleDeleteAction:e=>{v(!0);(e=>(0,V.o)({method:"DELETE",url:"/target/delete/".concat(e.id),data:{is_delete:e.is_delete}}))({id:e.id,is_delete:null===e.deleted_at?1:0}).then((e=>{$(A,M),K("success"),E(e.data.message),q({...G,open:!0}),P(""),C(!1),v(!1)})).catch((e=>{v(!1)}))},handlePlayPause:e=>{v(!0);(e=>(0,V.o)({method:"PATCH",url:"/target/changeStatus/".concat(e.id),data:{status:e.status}}))({id:e.id,status:1===e.status?0:1}).then((e=>{$(A,M),K("success"),E(e.data.message),q({...G,open:!0}),P(""),C(!1),v(!1)})).catch((e=>{K("error"),E(e.message),q({...G,open:!0}),P(""),C(!1),v(!1)}))},isSearchable:!0,isEditable:!0,isDeletable:!0,isStatusChangable:!1,isPlayPause:!0}),(0,D.jsx)(r.Z,{style:{marginTop:5},layout:["total","-","pager","skip"],size:"xs",prev:!0,next:!0,first:!0,last:!0,ellipsis:!0,boundaryLinks:!0,total:k,limit:M,maxButtons:5,activePage:A,onChangePage:R,limitOptions:[5,10,25,50,100],onChangeLimit:L})]})]})]}),(0,D.jsx)(I.Z,{})]})}},63911:(e,a,l)=>{l.d(a,{Ie:()=>u,Nb:()=>n,Nm:()=>i,OY:()=>s,gS:()=>r,m6:()=>c,rn:()=>p,xf:()=>o,zB:()=>d});var t=l(12581);const r=(e,a)=>(0,t.o)({method:"GET",url:"/user?page=".concat(e,"&perpage=").concat(a)}),n=()=>(0,t.o)({method:"GET",url:"/role/active"}),o=e=>(0,t.o)({method:"PUT",url:"/user/".concat(e.id),data:e.data}),s=e=>(0,t.o)({method:"PATCH",url:"/user/changeStatus/".concat(e.id),data:{status:e.status}}),i=()=>(0,t.o)({method:"GET",url:"/countries"}),c=e=>(0,t.o)({method:"GET",url:"/states/".concat(e)}),d=e=>(0,t.o)({method:"POST",url:"/user",data:e}),u=e=>(0,t.o)({method:"POST",url:"/company",data:e}),p=()=>(0,t.o)({method:"GET",url:"/company"})},49900:(e,a,l)=>{l.d(a,{Z:()=>x});var t=l(63366),r=l(87462),n=l(72791),o=l(63733),s=l(94419),i=l(20890),c=l(66199),d=l(31402),u=l(66934),p=l(29849),m=l(80184);const h=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],g=(0,u.ZP)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:l}=e;return[{["& .".concat(p.Z.primary)]:a.primary},{["& .".concat(p.Z.secondary)]:a.secondary},a.root,l.inset&&a.inset,l.primary&&l.secondary&&a.multiline,l.dense&&a.dense]}})((e=>{let{ownerState:a}=e;return(0,r.Z)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},a.primary&&a.secondary&&{marginTop:6,marginBottom:6},a.inset&&{paddingLeft:56})})),x=n.forwardRef((function(e,a){const l=(0,d.Z)({props:e,name:"MuiListItemText"}),{children:u,className:x,disableTypography:b=!1,inset:y=!1,primary:v,primaryTypographyProps:j,secondary:C,secondaryTypographyProps:Z}=l,f=(0,t.Z)(l,h),{dense:S}=n.useContext(c.Z);let w=null!=v?v:u,T=C;const P=(0,r.Z)({},l,{disableTypography:b,inset:y,primary:!!w,secondary:!!T,dense:S}),_=(e=>{const{classes:a,inset:l,primary:t,secondary:r,dense:n}=e,o={root:["root",l&&"inset",n&&"dense",t&&r&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,s.Z)(o,p.L,a)})(P);return null==w||w.type===i.Z||b||(w=(0,m.jsx)(i.Z,(0,r.Z)({variant:S?"body2":"body1",className:_.primary,component:null!=j&&j.variant?void 0:"span",display:"block"},j,{children:w}))),null==T||T.type===i.Z||b||(T=(0,m.jsx)(i.Z,(0,r.Z)({variant:"body2",className:_.secondary,color:"text.secondary",display:"block"},Z,{children:T}))),(0,m.jsxs)(g,(0,r.Z)({className:(0,o.Z)(_.root,x),ownerState:P,ref:a},f,{children:[w,T]}))}))},38151:()=>{}}]);
//# sourceMappingURL=6531.a3429c0c.chunk.js.map