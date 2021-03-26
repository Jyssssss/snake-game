(this["webpackJsonpsnake-game"]=this["webpackJsonpsnake-game"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(5),o=n.n(a),l=(n(12),n(2));n(13);var i=n(3),u=n(7),s=n(6),d=function e(t){Object(i.a)(this,e),this.value=t,this.next=null},f=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,c=new Array(r),a=0;a<r;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).getHead=function(){return e.tail},e.getTail=function(){return e.head},e.addHead=function(t){return e.addLast(t)},e.removeTail=function(){return e.removeFirst()},e}return n}((function e(t){var n=this;Object(i.a)(this,e),this.addFirst=function(e){var t=new d(e),r=n.head;n.head=t,t.next=r,null===n.tail&&(n.tail=t)},this.addLast=function(e){if(null===n.head)n.addFirst(e);else{var t=new d(e),r=n.tail;n.tail=t,r.next=t}},this.removeFirst=function(){null!==n.head&&(n.head=n.head.next,null===n.head&&(n.tail=null))},this.removeLast=function(){if(null!==n.head){var e=n.head;if(null==e.next)n.head=null,n.tail=null;else{for(;null!==e.next&&null!==e.next.next;)e=e.next;e.next=null,n.tail=e}}};var r=new d(t);this.head=r,this.tail=r})),j=n(1),h="UP",w="RIGHT",v="DOWN",b="LEFT",O=function(e){var t=e.length,n=e[0].length,r=Math.round(t/3),c=Math.round(n/3);return{row:r,col:c,cell:e[r][c]}},x=function(e){for(var t=1,n=[],r=0;r<e;r++){for(var c=[],a=0;a<e;a++)c.push(t++);n.push(c)}return n},p=function(e){return"ArrowUp"===e?h:"ArrowRight"===e?w:"ArrowDown"===e?v:"ArrowLeft"===e?b:null},S=function(e){return e===h?v:e===w?b:e===v?h:e===b?w:null},m=function(e,t,n,r){var c=t===h?{row:e.row-1,col:e.col}:t===w?{row:e.row,col:e.col+1}:t===v?{row:e.row+1,col:e.col}:t===b?{row:e.row,col:e.col-1}:{row:e.row,col:e.col};return r?c:{row:c.row<0?n.length-1:c.row>=n.length?0:c.row,col:c.col<0?n[0].length-1:c.col>=n[0].length?0:c.col}},g=function(e,t,n){return n.has(e)?"cell snake-cell":e===t?"cell food-cell":"cell"},H=function(e){var t=x(e.boardSize),n=Object(r.useState)(new f(O(t))),c=Object(l.a)(n,2),a=c[0],o=c[1],i=Object(r.useState)(new Set([a.getHead().value.cell])),u=Object(l.a)(i,2),s=u[0],d=u[1],h=Object(r.useState)(w),v=Object(l.a)(h,2),b=v[0],H=v[1],E=Object(r.useState)(a.getHead().value.cell+5),k=Object(l.a)(E,2),y=k[0],N=k[1],A=Object(r.useState)(0),L=Object(l.a)(A,2),M=L[0],T=L[1],z=Object(r.useState)(!1),F=Object(l.a)(z,2),I=F[0],D=F[1],R=Math.max(1e3-50*(e.speed-1),10);Object(r.useEffect)((function(){var t=function(t){if("Enter"===t.key)D(!I);else if("Escape"===t.key)e.viewHandler();else if(!I){var n=p(t.key);if(null===n||S(n)===b&&s.size>1)return;H(n)}};return window.addEventListener("keydown",t),function(){return window.removeEventListener("keydown",t)}}),[I,b,s.size,e]),Object(r.useEffect)((function(){M>e.topScore&&e.topScoreHandler(M)}),[M,e]),function(e,t){var n=Object(r.useRef)();Object(r.useEffect)((function(){n.current=e}),[e]),Object(r.useEffect)((function(){if(null!==t){var e=setInterval((function(){n.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){U()}),I?null:R);var U=function(){var e={row:a.getHead().value.row,col:a.getHead().value.col},n=m(e,b,t,false),r=t[n.row][n.col];if(s.has(r))J();else{a.addHead({row:n.row,col:n.col,cell:r});var c=new Set(s);c.add(r),r!==y?(c.delete(a.getTail().value.cell),a.removeTail()):G(c),o(a),d(c)}},G=function(t){for(var n=Math.pow(e.boardSize,2),r=null;null===r||t.has(r);)r=Math.floor(Math.random()*n+1);N(r),T((function(e){return e+1}))},J=function(){var e=O(t);o(new f(e)),d(new Set([e.cell])),H(w),N(e.cell+5),T(0)};return Object(j.jsxs)("div",{className:"board",children:[t.map((function(e,t){return Object(j.jsx)("div",{className:"row",children:e.map((function(e,t){return Object(j.jsx)("div",{className:g(e,y,s)},t)}))},t)})),Object(j.jsxs)("div",{className:"score-row",children:[Object(j.jsx)("div",{className:"score-cell",children:Object(j.jsxs)("span",{children:["Score: ",M]})}),Object(j.jsx)("div",{className:"score-cell",children:Object(j.jsxs)("span",{children:["Top Score: ",e.topScore]})})]})]})},E=(n(15),function(e){return Object(j.jsx)("div",{className:"item ".concat(e.isSelected?"selected-item":""),children:Object(j.jsx)("span",{children:e.text})})}),k=(n(16),function(e){var t=[{text:"Start",action:e.viewHandler},{text:"Settings",action:function(){alert("No Settings right now.")}},{text:"Help",action:function(){alert("No Help right now.")}}],n=Object(r.useState)(0),c=Object(l.a)(n,2),a=c[0],o=c[1];return Object(r.useEffect)((function(){var e=function(e){if("Enter"===e.key)t[a].action();else if("ArrowUp"===e.key){if(0===a)return;o((function(e){return e-1}))}else if("ArrowDown"===e.key){if(a===t.length-1)return;o(a+1)}};return window.addEventListener("keydown",e),function(){return window.removeEventListener("keydown",e)}})),Object(j.jsx)("div",{className:"menu",children:t.map((function(e,t){return Object(j.jsx)(E,{text:e.text,isSelected:t===a},t)}))})}),y=(n(17),"INGAME"),N="HOME",A=function(){var e=Object(r.useState)(N),t=Object(l.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(19),o=Object(l.a)(a,2),i=o[0],u=(o[1],Object(r.useState)(15)),s=Object(l.a)(u,2),d=s[0],f=(s[1],Object(r.useState)(0)),h=Object(l.a)(f,2),w=h[0],v=h[1],b=function(){c(n===y?N:y)};return Object(j.jsx)("div",{className:"App",children:n===N?Object(j.jsx)(k,{viewHandler:b}):Object(j.jsx)(H,{speed:i,boardSize:d,topScore:w,topScoreHandler:function(e){v(e)},viewHandler:b})})};o.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(A,{})}),document.getElementById("root"))}],[[18,1,2]]]);
//# sourceMappingURL=main.1c230e79.chunk.js.map