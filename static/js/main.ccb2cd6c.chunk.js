(this["webpackJsonpsnake-game"]=this["webpackJsonpsnake-game"]||[]).push([[0],[,,,,,,,,function(e,t,n){},,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(9),l=n.n(a),i=(n(16),n(5)),s=n(2),o=n(3);n(17);var u=n(11),j=n(10),d=function e(t){Object(o.a)(this,e),this.value=t,this.next=null},b=function(e){Object(u.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(o.a)(this,n);for(var c=arguments.length,r=new Array(c),a=0;a<c;a++)r[a]=arguments[a];return(e=t.call.apply(t,[this].concat(r))).getHead=function(){return e.tail},e.getTail=function(){return e.head},e.addHead=function(t){return e.addLast(t)},e.removeTail=function(){return e.removeFirst()},e}return n}((function e(t){var n=this;Object(o.a)(this,e),this.addFirst=function(e){var t=new d(e),c=n.head;n.head=t,t.next=c,null===n.tail&&(n.tail=t)},this.addLast=function(e){if(null===n.head)n.addFirst(e);else{var t=new d(e),c=n.tail;n.tail=t,c.next=t}},this.removeFirst=function(){null!==n.head&&(n.head=n.head.next,null===n.head&&(n.tail=null))},this.removeLast=function(){if(null!==n.head){var e=n.head;if(null==e.next)n.head=null,n.tail=null;else{for(;null!==e.next&&null!==e.next.next;)e=e.next;e.next=null,n.tail=e}}};var c=new d(t);this.head=c,this.tail=c})),O=(n(18),n(0)),f=function(e){return e.isOpen&&Object(O.jsx)("div",{className:"modal",children:Object(O.jsx)("div",{className:"modal-content",children:e.children})})},v="UP",h="RIGHT",w="DOWN",x="LEFT",S=function(e){var t=e.length,n=e[0].length,c=Math.round(t/3),r=Math.round(n/3);return{row:c,col:r,cell:e[c][r]}},m=function(e){for(var t=1,n=[],c=0;c<e;c++){for(var r=[],a=0;a<e;a++)r.push(t++);n.push(r)}return n},p=function(e){return"ArrowUp"===e?v:"ArrowRight"===e?h:"ArrowDown"===e?w:"ArrowLeft"===e?x:null},g=function(e){return e===v?w:e===h?x:e===w?v:e===x?h:null},E=function(e,t,n,c){var r=t===v?{row:e.row-1,col:e.col}:t===h?{row:e.row,col:e.col+1}:t===w?{row:e.row+1,col:e.col}:t===x?{row:e.row,col:e.col-1}:{row:e.row,col:e.col};return c?r:{row:r.row<0?n.length-1:r.row>=n.length?0:r.row,col:r.col<0?n[0].length-1:r.col>=n[0].length?0:r.col}},N=function(e,t){var n=e.row,c=e.col;return n<0||c<0||n>=t.length||c>=t[0].length},k=function(e,t,n){return n.has(e)?"cell snake-cell":e===t?"cell food-cell":"cell"},y=function(e){var t=m(e.boardSize),n=Object(c.useState)(new b(S(t))),r=Object(s.a)(n,2),a=r[0],l=r[1],i=Object(c.useState)(new Set([a.getHead().value.cell])),o=Object(s.a)(i,2),u=o[0],j=o[1],d=Object(c.useState)(h),v=Object(s.a)(d,2),w=v[0],x=v[1],y=Object(c.useState)(a.getHead().value.cell+5),A=Object(s.a)(y,2),H=A[0],L=A[1],I=Object(c.useState)(0),M=Object(s.a)(I,2),T=M[0],R=M[1],F=Object(c.useState)(!1),z=Object(s.a)(F,2),D=z[0],P=z[1],C=Object(c.useState)(Math.max(1e3-50*(e.speed-1),10)),W=Object(s.a)(C,1)[0],U=Object(c.useState)(e.hasWall),G=Object(s.a)(U,1)[0],B=Object(c.useState)(!1),J=Object(s.a)(B,2),K=J[0],Y=J[1],_=Object(c.useState)(!1),q=Object(s.a)(_,2),Q=q[0],V=q[1],X=Object(c.useCallback)((function(){var e=S(t);l(new b(e)),j(new Set([e.cell])),x(h),L(e.cell+5),R(0)}),[t]);Object(c.useEffect)((function(){var t=function(t){if("Enter"===t.key)P(!D),Q&&X(),Y(!K);else if("Escape"===t.key)e.viewHandler();else if(!D){var n=p(t.key);if(null===n||g(n)===w&&u.size>1)return;x(n)}};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[D,w,u.size,K,Q,X,e]),Object(c.useEffect)((function(){T>e.topScore&&e.topScoreHandler(T)}),[T,e]),function(e,t){var n=Object(c.useRef)();Object(c.useEffect)((function(){n.current=e}),[e]),Object(c.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){Z()}),D?null:W);var Z=function(){var e={row:a.getHead().value.row,col:a.getHead().value.col},n=E(e,w,t,G);if(G&&N(n,t)||u.has(t[n.row][n.col]))ee();else{var c=t[n.row][n.col];a.addHead({row:n.row,col:n.col,cell:c});var r=new Set(u);r.add(c),c!==H?(r.delete(a.getTail().value.cell),a.removeTail()):$(r),l(a),j(r)}},$=function(t){for(var n=Math.pow(e.boardSize,2),c=null;null===c||t.has(c);)c=Math.floor(Math.random()*n+1);L(c),R((function(e){return e+1}))},ee=function(){P(!0),V(!0),Y(!0)};return Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{className:"board",children:[t.map((function(e,t){return Object(O.jsx)("div",{className:"row",children:e.map((function(e,t){return Object(O.jsx)("div",{className:k(e,H,u)},t)}))},t)})),Object(O.jsxs)("div",{className:"score-row",children:[Object(O.jsx)("div",{className:"score-cell",children:Object(O.jsxs)("span",{children:["Score: ",T]})}),Object(O.jsx)("div",{className:"score-cell",children:Object(O.jsxs)("span",{children:["Top Score: ",e.topScore]})})]})]}),Object(O.jsx)(f,{isOpen:K,children:Object(O.jsxs)("div",{children:[Object(O.jsx)("br",{}),Q&&Object(O.jsxs)("h3",{children:["Your score: ",T]}),Object(O.jsx)("h3",{children:"Press ENTER to Resume."}),Object(O.jsx)("h3",{children:"Press ESC to End."}),Object(O.jsx)("br",{})]})})]})},A=(n(8),function(e){var t,n=Object(c.useState)(null!==(t=e.current)&&void 0!==t?t:0),r=Object(s.a)(n,1)[0];return Object(c.useEffect)((function(){var t=function(t){if(e.isSelected&&e.values)if("ArrowLeft"===t.key){if(0===r)return;e.action(r-1)}else if("ArrowRight"===t.key){if(r===e.values.length-1)return;e.action(r+1)}};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[r,e]),void 0===e.values?Object(O.jsx)("div",{className:"item ".concat(e.isSelected?"selected-item":""),children:Object(O.jsx)("span",{children:e.text})}):Object(O.jsxs)("div",{className:"item value-item ".concat(e.isSelected?"selected-item":""),children:[Object(O.jsx)("div",{className:"value-item-cell",children:Object(O.jsx)("span",{children:e.text})}),Object(O.jsxs)("div",{className:"value-item-cell",children:[Object(O.jsx)("div",{className:e.isSelected&&r>0?"arrow-left":""}),Object(O.jsx)("span",{className:"value-item-value",children:e.values[r].text}),Object(O.jsx)("div",{className:e.isSelected&&r<e.values.length-1?"arrow-right":""})]})]})}),H="MAIN",L="SETTINGS",I=function(e){var t=Object(c.useCallback)((function(t){return[{text:"Start",action:e.viewHandler},{text:"Settings",action:function(){x(L),o(0)}},{text:"Help",action:function(){return b(!t)}}]}),[e.viewHandler]),n=Object(c.useCallback)((function(){return[].concat(Object(i.a)(e.settingItems),[{text:"Done",action:function(){x(H),o(1)}}])}),[e.settingItems]),r=Object(c.useState)(0),a=Object(s.a)(r,2),l=a[0],o=a[1],u=Object(c.useState)(!1),j=Object(s.a)(u,2),d=j[0],b=j[1],v=Object(c.useState)(H),h=Object(s.a)(v,2),w=h[0],x=h[1],S=Object(c.useState)(t(d)),m=Object(s.a)(S,2),p=m[0],g=m[1],E=Object(c.useState)(n()),N=Object(s.a)(E,1)[0];return Object(c.useEffect)((function(){g(t(d))}),[t,d]),Object(c.useEffect)((function(){var e=function(e){var t=w===H?p:N;if("Enter"===e.key)t[l].action();else if(!d)if("ArrowUp"===e.key){if(0===l)return;o((function(e){return e-1}))}else if("ArrowDown"===e.key){if(l===t.length-1)return;o(l+1)}};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}}),[l,w,p,N,d]),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("div",{className:"menu",children:(w===H?p:N).map((function(t,n){return Object(O.jsx)(A,{text:t.text,values:t.values,current:e.currentSettingIdxs[n],action:t.action,isSelected:n===l},"".concat(n,"_").concat(e.currentSettingIdxs[n]))}))}),Object(O.jsx)(f,{isOpen:d,children:Object(O.jsxs)("div",{children:[Object(O.jsx)("br",{}),Object(O.jsx)("h3",{children:"1. Use Arrow Keys to Move."}),Object(O.jsx)("h3",{children:"2. Press ENTER to Pause."}),Object(O.jsx)("h3",{children:"3. Press ESC to End."}),Object(O.jsx)("br",{})]})})]})},M=(n(20),"INGAME"),T="HOME",R="STANDARD",F="NOWALL",z=function e(t,n,c){Object(o.a)(this,e),this.text=t,this.values=n,this.action=c},D=function(){var e=Object(c.useState)(T),t=Object(s.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(0),l=Object(s.a)(a,2),o=l[0],u=l[1],j=Object(c.useState)(9),d=Object(s.a)(j,2),b=d[0],f=d[1],v=Object(c.useState)(1),h=Object(s.a)(v,2),w=h[0],x=h[1],S=Object(c.useState)([o,b,w]),m=Object(s.a)(S,2),p=m[0],g=m[1],E=Object(c.useState)(0),N=Object(s.a)(E,2),k=N[0],A=N[1],H=Object(c.useState)(new z("Map",[{text:"Standard",value:R},{text:"No Wall",value:F}],(function(e){return u(e)}))),L=Object(s.a)(H,1)[0],D=Object(c.useState)(new z("Speed",Object(i.a)(Array(21).keys()).map((function(e){return{text:e+1,value:e+1}})),(function(e){return f(e)}))),P=Object(s.a)(D,1)[0],C=Object(c.useState)(new z("Board Size",Object(i.a)(Array(4).keys()).map((function(e){return{text:"".concat(5*(e+2)," x ").concat(5*(e+2)),value:5*(e+2)}})),(function(e){return x(e)}))),W=Object(s.a)(C,1)[0];Object(c.useEffect)((function(){g([o,b,w])}),[o,b,w]);var U=function(){r(n===M?T:M)};return Object(O.jsx)("div",{className:"App",children:n===T?Object(O.jsx)(I,{viewHandler:U,settingItems:[L,P,W],currentSettingIdxs:p}):Object(O.jsx)(y,{hasWall:L.values[o].value===R,speed:P.values[b].value,boardSize:W.values[w].value,topScore:k,topScoreHandler:function(e){A(e)},viewHandler:U})})};l.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(D,{})}),document.getElementById("root"))}],[[21,1,2]]]);
//# sourceMappingURL=main.ccb2cd6c.chunk.js.map