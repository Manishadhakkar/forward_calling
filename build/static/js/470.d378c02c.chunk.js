"use strict";(self.webpackChunkforward_portal=self.webpackChunkforward_portal||[]).push([[470],{39336:(e,a,t)=>{t.d(a,{Z:()=>d});var l=t(11087),n=t(66934),r=t(12065),i=t(93517),o=t(81918),s=t(80184);const d=e=>{const{pathList:a}=e,t=(0,n.ZP)(o.Z)((e=>{let{theme:a}=e;const t="light"===a.palette.mode?a.palette.grey[300]:a.palette.grey[800];return{backgroundColor:t,height:a.spacing(3),color:"light"===a.palette.mode?"#141414":"#f3f6f4",fontWeight:a.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:(0,r._4)(t,.06)},"&:active":{boxShadow:a.shadows[1],backgroundColor:(0,r._4)(t,.12)}}}));return(0,s.jsx)("div",{role:"presentation",children:(0,s.jsx)(i.Z,{"aria-label":"breadcrumb",children:a.length&&a.map(((e,n)=>n===a.length-1?(0,s.jsx)(t,{label:e.name,icon:e.icon},n):(0,s.jsx)(l.rU,{to:{pathname:"/".concat(e.path)},children:(0,s.jsx)(t,{icon:e.icon,label:e.name})},n)))})})}},51973:(e,a,t)=>{t.d(a,{Z:()=>d});t(72791);var l=t(20890),n=t(50533),r=t(49418);const i=r.Z["FOOTER.WEBSITE.RIGHTS"],o=r.Z["FOOTER.WEBSITE.LABEL"];var s=t(80184);const d=e=>(0,s.jsxs)(l.Z,{mt:1,variant:"body2",color:"text.secondary",align:"center",...e,children:[i,(0,s.jsx)(n.Z,{className:"Url_link",color:"inherit",href:"http://www.textricks.com/",children:o})," ",(new Date).getFullYear(),"."]})},79748:(e,a,t)=>{t.d(a,{u:()=>o});t(72791);var l=t(697),n=t(19095),r=t(80184);const i={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"none",boxShadow:5,p:1,borderRadius:"10px",width:"50%","@media (max-width: 991px)":{width:"90%"},scrollbars:{width:"2px"}},o=e=>{const{modal_width:a="50%",isOpen:t,handleClose:o=(()=>{})}=e;return(0,r.jsx)(n.Z,{open:t,onClose:o,"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:(0,r.jsx)(l.Z,{sx:{...i,width:a},children:(0,r.jsx)("div",{children:e.children})})})}},87874:(e,a,t)=>{t.d(a,{Z:()=>g});t(72791);var l=t(24339),n=t(13967),r=t(697),i=t(20068),o=t(13400),s=t(38820),d=t(66934),c=t(12065),h=t(9955),u=t(10918),m=t(16856),p=t(80184);const g=e=>{const{data:a,column:t,handleEditAction:g,handleDeleteAction:x,handleStatusAction:b,handlePlayPause:j,handleAssignChangable:y,handleViewChange:C,isEditable:Z=!1,isDeletable:f=!1,isStatusChangable:w=!1,isPlayPause:v=!1,isAssignable:k=!1,isView:S=!1}=e,P=(0,n.Z)(),F=(0,u.TV)(P.palette.mode),T=(0,d.ZP)(h.Z)((e=>{let{theme:a}=e;return{"& .MuiSwitch-switchBase.Mui-checked":{color:F.switchColor[100],"&:hover":{backgroundColor:(0,c.Fq)(F.switchColor[100],a.palette.action.hoverOpacity)}},"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":{backgroundColor:F.switchColor[100]}}}));return(0,p.jsx)(l.P2,{layoutMode:"grid",enableBottomToolbar:!1,displayColumnDefOptions:{"mrt-row-actions":{muiTableHeadCellProps:{align:"center"}}},initialState:{density:"compact",showGlobalFilter:!0},positionGlobalFilter:"left",muiSearchTextFieldProps:{placeholder:"Search...",sx:{minWidth:"50px"},variant:"standard"},enableEditing:!0,enableColumnFilters:!1,enableColumnActions:!1,enableFullScreenToggle:!1,enableStickyHeader:!0,enableGlobalFilterModes:!0,enableDensityToggle:!1,enableToolbarInternalActions:!1,enableFilterMatchHighlighting:!0,enableColumnFilterModes:!1,columns:t,data:a,enableColumnOrdering:!0,positionActionsColumn:"last",renderRowActions:e=>{let{row:a}=e;return(0,p.jsxs)(r.Z,{sx:{width:"100%",display:"flex",gap:"0.2rem",justifyContent:"center",alignItems:"center"},children:[w&&(0,p.jsx)(i.Z,{arrow:!0,placement:"left",title:"Status",children:(0,p.jsx)(o.Z,{disableRipple:!0,disableFocusRipple:!0,disableTouchRipple:!0,size:"small",children:(0,p.jsx)(T,{checked:1===a.original.status,size:"small",onChange:()=>{return e=a.original,void b(e);var e}})})}),v&&(0,p.jsx)(i.Z,{arrow:!0,placement:"right",title:1===a.original.status?"Pause":"Play",children:(0,p.jsx)(o.Z,{onClick:()=>{return e=a.original,void j(e);var e},children:1===a.original.status?(0,p.jsx)(m.Vm3,{color:F.grey[200]}):(0,p.jsx)(m.udk,{color:F.grey[200]})})}),Z&&(0,p.jsx)(i.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,p.jsx)(o.Z,{onClick:()=>{return e=a.original,void g(e);var e},children:(0,p.jsx)(s.Z,{})})}),f&&(0,p.jsx)(i.Z,{arrow:!0,placement:"right",title:null===a.original.deleted_at?"Delete":"Restore",children:(0,p.jsx)(o.Z,{onClick:()=>{return e=a.original,void x(e);var e},children:null===a.original.deleted_at?(0,p.jsx)(m.FH3,{color:F.redAccent[500]}):(0,p.jsx)(m.iY8,{color:F.blue[100]})})}),k&&(0,p.jsx)(i.Z,{arrow:!0,placement:"right",title:"Assign to",children:(0,p.jsx)(o.Z,{onClick:()=>{return e=a.original,void y(e);var e},children:(0,p.jsx)(m.s3e,{})})}),S&&(0,p.jsx)(i.Z,{arrow:!0,placement:"left",title:"Edit",children:(0,p.jsx)(o.Z,{onClick:()=>{return e=a.original,void C(e);var e},children:(0,p.jsx)(m.FpO,{})})})]})}})}},30470:(e,a,t)=>{t.r(a),t.d(a,{default:()=>H});var l=t(72791),n=t(96095),r=t(79748),i=t(13967),o=t(697),s=t(20890),d=t(49877),c=t(20068),h=t(41578),u=t(39336),m=t(10918),p=t(73598),g=t(87874),x=t(51973),b=t(64370),j=t(25351),y=t(94070),C=t(39126),Z=t(57621),f=t(9585),w=t(13400),v=t(39504),k=t(61889),S=t(72363),P=t(24518),F=t(16856),T=t(35527),M=t(66934),A=t(39203),E=t(56355),D=(t(38151),t(80184));(0,M.ZP)(T.Z)((e=>{let{theme:a}=e;return{...a.typography.body2,boxShadow:"none",textAlign:"start",color:a.palette.text.secondary,flexGrow:1}})),(0,M.ZP)(T.Z)((e=>{let{theme:a}=e;return{...a.typography.body2,boxShadow:"none",textAlign:"end",color:a.palette.text.primary,flexGrow:1}}));var R;const O=e=>{const{initialValue:a={},handleFormData:t,onHandleClose:n,clickedBtn:r,errorMessage:s,setErrorMessage:d}=e,c=(0,i.Z)(),h=(0,m.TV)(c.palette.mode),[u,p]=(0,l.useState)({value:"",error:!1,success:!1}),[g,x]=(0,l.useState)("Play"),[b,j]=(0,l.useState)();(0,l.useEffect)((()=>{R&&(R.pause(),R=null,x("Play")),b&&((R=new Audio(b)).onended=()=>{x("Play")})}),[b]);return(0,D.jsxs)(Z.Z,{sx:{boxShadow:"none",backgroundColor:h.form[500],color:h.form[100]},children:[(0,D.jsx)(f.Z,{action:(0,D.jsx)(w.Z,{"aria-label":"settings",onClick:n,children:(0,D.jsx)(F.FU5,{color:h.form[100]})}),title:"add"===r?"Add Media":"Update Media"}),(0,D.jsx)(v.Z,{color:h.form[100],children:(0,D.jsxs)(o.Z,{component:"form",sx:{"& .MuiTextField-root":{mb:1},"&::-webkit-scrollbar":{width:"6px",borderRadius:"3px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"gray",borderRadius:"3px"},"&::-webkit-scrollbar-track":{backgroundColor:"lightgray",borderRadius:"3px"}},className:"formResponsiveHeight",noValidate:!0,children:[s&&(0,D.jsx)("span",{className:"error_msg",children:s}),(0,D.jsxs)(k.ZP,{container:!0,spacing:1,children:[(0,D.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,D.jsx)(A.Z,{type:"alpha",placeholder:"Enter Media Name",label:"Name",Value:u.value,onChangeText:e=>{d(""),p(e)},Required:!0,CustomErrorLine:"Enter proper name"})}),(0,D.jsx)(k.ZP,{item:!0,xs:12,md:12,children:(0,D.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"},children:[(0,D.jsx)("div",{children:(0,D.jsx)("input",{type:"file",onChange:e=>{e.target.files[0]&&j(e.target.files[0])}})}),(0,D.jsx)("div",{children:(0,D.jsx)(w.Z,{onClick:e=>{e.preventDefault(),"Play"===g?(R.play(),x("Pause")):(R.pause(),x("Play"))},disabled:!b,children:"Play"===g?(0,D.jsx)(E.CdF,{}):(0,D.jsx)(E.Gs$,{})})})]})})]})]})}),(0,D.jsxs)(S.Z,{sx:{justifyContent:"space-between",mr:1,ml:1},children:[(0,D.jsx)(P.Z,{size:"small",variant:"contained",onClick:n,children:"Cancel"}),(0,D.jsx)(P.Z,{type:"submit",size:"small",onClick:e=>{if(e.preventDefault(),!b)return void console.warn("Please select a file before submitting.");const a=new FormData;a.append("file",b);const l={media_file:a,name:u.value};t(l)},sx:{backgroundColor:h.greenAccent[500]},variant:"contained",children:"add"===r?"Save":"Update"})]})]})};var _=t(12581);const z=[{name:"Dashboard",path:"",icon:(0,D.jsx)(h.MXJ,{})},{name:"Media",icon:(0,D.jsx)(C.WjA,{})}],B=l.forwardRef((function(e,a){return(0,D.jsx)(y.Z,{elevation:6,ref:a,variant:"filled",...e})})),H=()=>{const e=(0,i.Z)(),a=(0,m.TV)(e.palette.mode),[t,h]=(0,l.useState)([]),[y,C]=(0,l.useState)(!1),[Z,f]=(0,l.useState)(!1),[w,v]=(0,l.useState)(""),[k,S]=(0,l.useState)(),[P,F]=(0,l.useState)(),[T,M]=(0,l.useState)(""),[A,E]=(0,l.useState)(0),[R,H]=(0,l.useState)(1),[G,V]=(0,l.useState)(10),[I,L]=(0,l.useState)({open:!1,vertical:"top",horizontal:"right"}),[N,W]=(0,l.useState)(""),{vertical:U,horizontal:K,open:q}=I,Y=(0,l.useMemo)((()=>[{accessorKey:"name",header:"Name",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:100},{accessorKey:"media_name",header:"Media Name",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableBodyCellProps:{align:"left"},muiTableHeadCellProps:{align:"left"},size:100},{accessorKey:"play",header:"Play",enableColumnDragging:!1,enableGlobalFilter:!0,enableColumnFilter:!1,enableColumnActions:!1,muiTableHeadCellProps:{align:"left"},muiTableBodyCellProps:{align:"left"},size:30}]),[]),J=(e,a)=>{"clickaway"!==a&&L({...I,open:!1})},X=()=>{F(""),f(!1)},$=async(e,a)=>{try{C(!0);const n=(await(t=e,l=a,(0,_.o)({method:"GET",url:"/ivr-media?page=".concat(t,"&perpage=").concat(l)}))).data.data,r=0===n.length?0:n.total,i=0===n.length?[]:n.data;E(r),h(i)}catch(n){M(n.message),W("error"),L({...I,open:!0}),f(!1)}finally{C(!1)}var t,l};(0,l.useEffect)((()=>{$(R,G)}),[R,G]);const Q=async e=>{try{C(!0);const t=(await(a=e,(0,_.o)({method:"POST",url:"/ivr-media",data:a}))).data.message;$(R,G),C(!1),F(""),M(t),W("success"),L({...I,open:!0}),f(!1)}catch(t){C(!1),F(t.message)}var a},ee=async e=>{try{C(!0);const t={id:k.id,data:{media_file:e.media_file,name:e.name}},l=(await(a=t,(0,_.o)({method:"POST",url:"/ivr-media/".concat(a.id),data:a.data}))).data.message;$(R,G),C(!1),F(""),W("success"),M(l),L({...I,open:!0}),f(!1)}catch(t){C(!1),F(t.message)}var a};return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(r.u,{modal_width:"40%",isOpen:Z,children:(()=>{const e="add"===w?Q:ee;return(0,D.jsx)(O,{handleFormData:e,onHandleClose:X,clickedBtn:w,initialValue:"edit"===w?k:{},errorMessage:P,setErrorMessage:F})})()}),y&&(0,D.jsx)(p.Z,{}),(0,D.jsx)(j.Z,{open:q,anchorOrigin:{vertical:U,horizontal:K},autoHideDuration:3e3,onClose:J,children:(0,D.jsx)(B,{onClose:J,severity:N,sx:{width:"100%"},children:T})}),(0,D.jsxs)(o.Z,{sx:{"& .rs-pagination-group":{color:a.layoutColor[200]},"& .MuiTypography-root":{color:a.layoutColor[200]},mt:1,ml:2,mr:2,mb:2,height:"80%",backgroundColor:"inherit"},children:[(0,D.jsx)(u.Z,{pathList:z}),(0,D.jsxs)(o.Z,{children:[(0,D.jsxs)(o.Z,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:1},children:[(0,D.jsx)("div",{children:(0,D.jsx)(s.Z,{variant:"h5",children:"Manage Media"})}),(0,D.jsx)("div",{style:{zIndex:1},children:(0,D.jsx)(d.Z,{"aria-label":"add",size:"small",sx:{boxShadow:"none",backgroundColor:a.greenAccent[500]},onClick:()=>{var e;F(""),f(!0),e="add",F(""),v(e)},children:(0,D.jsx)(c.Z,{title:"Add",children:(0,D.jsx)(b.Z,{})})})})]}),(0,D.jsxs)(o.Z,{children:[(0,D.jsx)(g.Z,{isLoading:y,data:t,column:Y,isSearchable:!0}),(0,D.jsx)(n.Z,{style:{marginTop:5},layout:["total","-","pager","skip"],size:"xs",prev:!0,next:!0,first:!0,last:!0,ellipsis:!0,boundaryLinks:!0,total:A,limit:G,maxButtons:5,activePage:R,onChangePage:H,limitOptions:[5,10,25,50,100],onChangeLimit:V})]})]})]}),(0,D.jsx)(x.Z,{})]})}},38151:()=>{}}]);
//# sourceMappingURL=470.d378c02c.chunk.js.map