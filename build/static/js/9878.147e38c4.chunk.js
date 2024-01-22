"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[9878],{39336:(e,l,a)=>{a.d(l,{Z:()=>c});var t=a(11087),n=a(66934),r=a(12065),i=a(93517),o=a(81918),s=a(80184);const c=e=>{const{pathList:l}=e,a=(0,n.ZP)(o.Z)((e=>{let{theme:l}=e;const a="light"===l.palette.mode?l.palette.grey[300]:l.palette.grey[800];return{backgroundColor:a,height:l.spacing(3),color:"light"===l.palette.mode?"#141414":"#f3f6f4",fontWeight:l.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:(0,r._4)(a,.06)},"&:active":{boxShadow:l.shadows[1],backgroundColor:(0,r._4)(a,.12)}}}));return(0,s.jsx)("div",{role:"presentation",children:(0,s.jsx)(i.Z,{"aria-label":"breadcrumb",children:l.length&&l.map(((e,n)=>n===l.length-1?(0,s.jsx)(a,{label:e.name,icon:e.icon},n):(0,s.jsx)(t.rU,{to:{pathname:"/".concat(e.path)},children:(0,s.jsx)(a,{icon:e.icon,label:e.name})},n)))})})}},38639:(e,l,a)=>{a.d(l,{Z:()=>s});a(72791);var t=a(13967),n=a(697),r=a(81918),i=a(10918),o=a(80184);const s=e=>{const l=(0,t.Z)(),a=(0,i.TV)(l.palette.mode);return(0,o.jsx)(n.Z,{sx:{width:100},children:(0,o.jsx)(r.Z,{sx:{height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"nowrap"},backgroundColor:1===e.value?a.greenAccent[600]:a.redAccent[600],color:"black"},label:1===e.value?"Live":"Pause",variant:"filled"})})}},51973:(e,l,a)=>{a.d(l,{Z:()=>c});a(72791);var t=a(20890),n=a(50533),r=a(49418);const i=r.Z["FOOTER.WEBSITE.RIGHTS"],o=r.Z["FOOTER.WEBSITE.LABEL"];var s=a(80184);const c=e=>(0,s.jsxs)(t.Z,{mt:1,variant:"body2",color:"text.secondary",align:"center",...e,children:[i,(0,s.jsx)(n.Z,{className:"Url_link",color:"inherit",href:"http://www.textricks.com/",children:o})," ",(new Date).getFullYear(),"."]})},87874:(e,l,a)=>{a.d(l,{Z:()=>p});a(72791);var t=a(24339),n=a(13967),r=a(697),i=a(20068),o=a(13400),s=a(38820),c=a(66934),d=a(12065),u=a(9955),h=a(10918),g=a(16856),m=a(80184);const p=e=>{const{data:l,column:a,handleEditAction:p,handleDeleteAction:b,handleStatusAction:x,handlePlayPause:C,handleAssignChangable:E,handleViewChange:v,isEditable:j=!1,isDeletable:S=!1,isStatusChangable:w=!1,isPlayPause:Z=!1,isAssignable:T=!1,isView:y=!1}=e,I=(0,n.Z)(),R=(0,h.TV)(I.palette.mode),A=(0,c.ZP)(u.Z)((e=>{let{theme:l}=e;return{"& .MuiSwitch-switchBase.Mui-checked":{color:R.switchColor[100],"&:hover":{backgroundColor:(0,d.Fq)(R.switchColor[100],l.palette.action.hoverOpacity)}},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:R.switchColor[100]}}}));return(0,m.jsx)(t.P2,{layoutMode:"grid",enableBottomToolbar:!1,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"}}},initialState:{density:"compact",showGlobalFilter:!0},positionGlobalFilter:"left",muiSearchTextFieldProps:{placeholder:"Search...",sx:{minWidth:"50px"},variant:"standard"},enableEditing:!0,enableColumnFilters:!1,enableColumnActions:!1,enableFullScreenToggle:!1,enableStickyHeader:!0,enableGlobalFilterModes:!0,enableDensityToggle:!1,enableToolbarInternalActions:!1,enableFilterMatchHighlighting:!0,enableColumnFilterModes:!1,columns:a,data:l,enableColumnOrdering:!0,positionActionsColumn:"last",renderRowActions:e=>{let{row:l}=e;return(0,m.jsxs)(r.Z,{sx:{width:"100%",display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[w&&(0,m.jsx)(i.Z,{arrow:!0,placement:"left",title:"Status",children:(0,m.jsx)(o.Z,{disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0,size:"small",children:(0,m.jsx)(A,{checked:1===l.original.status,size:"small",onChange:()=>{return e=l.original,void x(e);var e}})})}),Z&&(0,m.jsx)(i.Z,{arrow:!0,placement:"right",title:1===l.original.status?"Pause":"Play",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=l.original,void C(e);var e},children:1===l.original.status?(0,m.jsx)(g.Vm3,{color:R.grey[200]}):(0,m.jsx)(g.udk,{color:R.grey[200]})})}),j&&(0,m.jsx)(i.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=l.original,void p(e);var e},children:(0,m.jsx)(s.Z,{})})}),S&&(0,m.jsx)(i.Z,{arrow:!0,placement:"right",title:null===l.original.deleted_at?"Delete":"Restore",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=l.original,void b(e);var e},children:null===l.original.deleted_at?(0,m.jsx)(g.FH3,{color:R.redAccent[500]}):(0,m.jsx)(g.iY8,{color:R.blue[100]})})}),T&&(0,m.jsx)(i.Z,{arrow:!0,placement:"right",title:"Assign to",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=l.original,void E(e);var e},children:(0,m.jsx)(g.s3e,{})})}),y&&(0,m.jsx)(i.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,m.jsx)(o.Z,{onClick:()=>{return e=l.original,void v(e);var e},children:(0,m.jsx)(g.FpO,{})})})]})}})}},39878:(e,l,a)=>{a.r(l),a.d(l,{default:()=>w});var t=a(72791),n=a(96095),r=a(13967),i=a(697),o=a(20890),s=a(41578),c=a(39336),d=(a(38639),a(10918)),u=a(73598),h=a(87874),g=a(51973),m=a(17425),p=a(73560),b=a(72426),x=a.n(b),C=a(80184);const E=e=>{let{value:l}=e;const a=x()(l).format("DD MMM YYYY, h:mm a");return(0,C.jsx)("div",{children:a})};var v=a(1582);const j=e=>{let{value:l}=e;const a=(e=>{var l;return null===(l=e.match(/([a-zA-Z]+)(\d+)/))||void 0===l?void 0:l.slice(1).map(((e,l)=>0===l?e.toUpperCase():parseInt(e,10)))})(l);return console.log(a),(0,C.jsx)("div",{children:(0,C.jsxs)(v.Z,{direction:"row",spacing:1,children:[(0,C.jsx)(o.Z,{variant:"subtitle2",children:a[0]}),(0,C.jsx)(o.Z,{variant:"subtitle2",children:a[1]})]})})},S=[{name:"Dashboard",path:"",icon:(0,C.jsx)(s.MXJ,{})},{name:"Wallet",icon:(0,C.jsx)(m.$GG,{})}],w=()=>{const e=(0,r.Z)(),l=(0,d.TV)(e.palette.mode),[a,s]=(0,t.useState)([]),[m,b]=(0,t.useState)(!1),[x,v]=(0,t.useState)(0),[w,Z]=(0,t.useState)(1),[T,y]=(0,t.useState)(10),I=(0,t.useMemo)((()=>[{accessorKey:"transaction_id",header:"Transaction ID",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableBodyCellProps:{align:"left"},muiTableHeadCellProps:{align:"left"},size:50},{accessorKey:"order_id",header:"Order ID",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableBodyCellProps:{align:"left"},muiTableHeadCellProps:{align:"left"},size:50},{accessorKey:"created_at",header:"Date",Cell:e=>{let{cell:l}=e;return(0,C.jsx)(E,{value:l.getValue()})},enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"center"},muiTableBodyCellProps:{align:"center"},size:30},{accessorKey:"amount",header:"Amount",Cell:e=>{let{cell:l}=e;return(0,C.jsx)(j,{value:l.getValue()})},enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30}]),[]);(0,t.useEffect)((()=>{((e,l)=>{b(!0),(0,p.H)(e,l).then((e=>{var l;let a=0===e.data.data.length?[]:e.data.data.data;const t=null===a||void 0===a?void 0:a.map((e=>({...e,amount:e.payment_currency+e.payment_price})));v(0===e.data.data.length?0:null===(l=e.data.data)||void 0===l?void 0:l.total),s(a.length>0?t:[]),b(!1)})).catch((e=>{b(!1)}))})(w,T)}),[w,T]);return(0,C.jsxs)(C.Fragment,{children:[m&&(0,C.jsx)(u.Z,{}),(0,C.jsxs)(i.Z,{sx:{"& .rs-pagination-group":{color:l.layoutColor[200]},"& .MuiTypography-root":{color:l.layoutColor[200]},mt:1,ml:2,mr:2,mb:2,height:"80%",backgroundColor:"inherit"},children:[(0,C.jsx)(c.Z,{pathList:S}),(0,C.jsxs)(i.Z,{children:[(0,C.jsx)(i.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:(0,C.jsx)(o.Z,{variant:"h5",children:"Wallet History"})}),(0,C.jsxs)(i.Z,{children:[(0,C.jsx)(h.Z,{isLoading:m,data:a,column:I,isSearchable:!0,handleViewChange:e=>{console.log(e)},isView:!0}),(0,C.jsx)(n.Z,{style:{marginTop:5},layout:["total","-","pager","skip"],size:"xs",prev:!0,next:!0,first:!0,last:!0,ellipsis:!0,boundaryLinks:!0,total:x,limit:T,maxButtons:5,activePage:w,onChangePage:Z,limitOptions:[5,10,25,50,100],onChangeLimit:y})]})]})]}),(0,C.jsx)(g.Z,{})]})}},73560:(e,l,a)=>{a.d(l,{H:()=>n,t:()=>r});var t=a(12581);const n=(e,l)=>(0,t.o)({method:"GET",url:"/payment/get-wallet-list?page=".concat(e,"&perpage=").concat(l)}),r=e=>(0,t.o)({method:"POST",url:"/payment/add-to-wallet",data:e})},49418:(e,l,a)=>{a.d(l,{Z:()=>o});const t=JSON.parse('{"SIGNIN.HEADER.LABEL":"Sign In","SIGNIN.EMAIL.LABEL":"Email","SIGNIN.EMAIL.PLACEHOLDER":"Enter Email","SIGNIN.EMAIL.ERROR":"Please enter a valid email","SIGNIN.PASSWORD.LABEL":"Password","SIGNIN.PASSWORD.PLACEHOLDER":"Enter Password","SIGNIN.PASSWORD.ERROR":"Please enter a valid password","SIGNIN.SUBMIT.LABEL":"Login","SIGNUP.FORGOT.HYPERTEXT":"Forgot Password?","FORGET.HYPERTEXT":"Don\'t have an account? Register Now","WEBSITE.LABEL":"Textricks","LOGIN.EMAIL.ERROR":"Email","LOGIN.PASSWORD.EROR":"Password","TEXTFIELD.ERR_BLANK":"Required","HEADER.TITLE":"Hello world","FOOTER.WEBSITE.RIGHTS":"All Rights Reserved By ","FOOTER.WEBSITE.LABEL":"Textricks."}');var n=a(6083);let r,i=JSON.parse(localStorage.getItem("lang"))?JSON.parse(localStorage.getItem("lang")):"en";r||(r=new n.Z({en:t})),r.setLanguage(i);const o=r}}]);
//# sourceMappingURL=9878.147e38c4.chunk.js.map