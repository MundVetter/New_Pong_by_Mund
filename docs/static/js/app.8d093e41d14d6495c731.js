webpackJsonp([1],{118:function(e,t,a){function n(e){a(169)}var i=a(279)(a(122),a(280),n,null,null);e.exports=i.exports},122:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(55),i=a.n(n),s=a(126),r=a.n(s),o=a(131),d=a.n(o),l=a(123);t.default={name:"app",data:function(){return{gameIsRunning:!1,message:"Glitchping by Mund",options:{paddles:[{loading:"waiting..."}]},paddles:[],gameMode:"default",render:"",paused:!1}},watch:{gameIsRunning:function(e){var t=this;if(e)this.render=new l.a(this.getOptions(),function(){t.gameIsRunning=!1},function(){t.paused=!0}),this.render.start();else{var a=this.render.game;a.winner.length>1?this.message=a.winner[0]+" and others won!🎉":this.message=a.winner[0]+" won!🎉"}return e},gameMode:function(e){this.getOptionsFromURL("static/options/"+e+".json")},options:function(e){this.paddles=this.setPaddleOptions(e.paddles)},paused:function(e){e||this.render.unpause()}},methods:{addPlayer:function(){var e=d()({},this.paddles[0]);e.name=r()(" Player "+(this.paddles.length+1)),this.paddles.push(e)},getOptionsFromURL:function(e){var t=this;(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.fetch)(e).then(function(e){return e.json()}).then(function(e){t.options=e}).catch(function(e){console.log(e)})},getOptions:function(){return{paddles:this.getPaddleOptions()}},getPaddleOptions:function(){return this.computePaddleOptions(this.paddles,JSON.parse)},setPaddleOptions:function(e){return this.computePaddleOptions(e,r.a)},computePaddleOptions:function(e,t){var a=[],n=e.map(function(e){return d()({},e)}),s=!0,r=!1,o=void 0;try{for(var l,u=i()(n);!(s=(l=u.next()).done);s=!0){var c=l.value;for(var h in c)c.hasOwnProperty(h)&&(c[h]=t(c[h]));a.push(c)}}catch(e){r=!0,o=e}finally{try{!s&&u.return&&u.return()}finally{if(r)throw o}}return a}},created:function(){this.getOptionsFromURL("static/options/default.json")}}},123:function(e,t,a){"use strict";var n=a(55),i=a.n(n),s=a(132),r=a.n(s),o=a(129),d=a.n(o),l=a(130),u=a.n(l),c=a(245),h=(a.n(c),a(171)),p=a.n(h),v=a(170),g=a.n(v),f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};for(d()(this,e),this.game=new p.a(t),this.stop=n,this.pause=i,this.firstRender=!0,this.multiplier=this.findSaveMultiplier.apply(this,r()(this.game.fieldSize).concat([screen.availWidth,screen.availHeight])),this.renderer=new c.autoDetectRenderer({width:screen.availWidth,height:screen.availHeight,backgroundColor:3355443}),this.touches=[],this.keys=[],this.actions=["up","down"],this.graphics=new c.Graphics,this.textContainer=new c.Container,this.stage=new c.Container,this.touchAreas=new c.Container,this.touchAreas.interactive=!0,this.addTouchAreas(),this.target=document.getElementById("canvas");this.target.firstChild;)this.target.removeChild(this.target.firstChild);this.fs=g()(this.target),window.addEventListener("resize",function(){a.multiplier=a.findSaveMultiplier.apply(a,r()(a.game.fieldSize).concat([screen.availWidth,screen.availHeight])),a.addTouchAreas(),a.renderer.resize(screen.availWidth,screen.availHeight)}),window.onkeyup=function(e){a.keys[e.keyCode]=!1},window.onkeydown=function(e){a.keys[e.keyCode]=!0}}return u()(e,[{key:"addTouchAreas",value:function(){var e=this,t={0:0,1:10,10:1,11:11};this.touchAreas.removeChildren();for(var a=0;a<this.game.paddles.length;a++)for(var n=0;n<this.actions.length;n++)!function(n){var i=parseInt(""+a+n),s=new c.Graphics,r=e.mp(e.game.fieldSize[0]/2,e.game.fieldSize[1]/2);s.hitArea=new c.Rectangle(a*r[0],n*r[1],a*r[0]+r[0],n*r[1]+r[1]),s.interactive=!0,e.touchAreas.addChild(s),s.on("touchstart",function(){screen.availWidth>screen.availHeight?e.touches[i]=!0:e.touches[t[i]]=!0}),s.on("touchend",function(){screen.availWidth>screen.availHeight?e.touches[i]=!1:e.touches[t[i]]=!1}),s.on("touchendoutside",function(){screen.availWidth>screen.availHeight?e.touches[i]=!1:e.touches[t[i]]=!1})}(n)}},{key:"findSaveMultiplier",value:function(e,t,a,n){return screen.availWidth>screen.availHeight?{x:a/e,y:n/t}:{x:n/e,y:a/t}}},{key:"mp",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.multiplier;return screen.availWidth>screen.availHeight?[e*a.x,t*a.y]:[t*a.y,e*a.x]}},{key:"start",value:function(){var e=this;g.a.available()&&this.fs.request(),this.fs.on("release",function(){e.game.paused=!0,e.pause()}),this.target.appendChild(this.renderer.view),this.renderer.render(this.stage);!function t(){if(e.game.ended)fs.release(),fs.dispose(),e.stage.destroy(),e.stop();else{var a,n=[],s=!0,o=!1,d=void 0;try{for(var l,u=i()(e.game.paddles);!(s=(l=u.next()).done);s=!0){var h=l.value,p=!0,v=!1,g=void 0;try{for(var f,m=i()(h.controls);!(p=(f=m.next()).done);p=!0){var y=f.value;e.keys[y.key.toString()]&&n.push({paddle:h,action:y.action})}}catch(e){v=!0,g=e}finally{try{!p&&m.return&&m.return()}finally{if(v)throw g}}}}catch(e){o=!0,d=e}finally{try{!s&&u.return&&u.return()}finally{if(o)throw d}}for(var w=0;w<e.game.paddles.length;w++)for(var _=0;_<e.actions.length;_++){var C=parseInt(""+w+_);e.touches[C]&&n.push({paddle:e.game.paddles[w],action:e.actions[_]})}e.game.update(n),e.graphics.clear();for(var x=0;x<e.game.paddles.length;x++){var b=e.game.paddles[x],k=e.mp(b.pos[0],b.pos[1]+100),R=void 0;e.firstRender?(R=new c.Text(b.points,{fontFamily:"sarpanch",fontSize:10*e.multiplier.x,fill:16777215,stroke:16711680}),e.textContainer.addChild(R)):(R=e.textContainer.getChildAt(x),R.text=b.points),R.x=k[0],R.y=k[1]}e.firstRender=!1;var S=!0,M=!1,A=void 0;try{for(var P,O=i()(e.game.paddles);!(S=(P=O.next()).done);S=!0){var I,W=P.value;e.graphics.lineStyle(e.multiplier.x,16711680),e.graphics.beginFill(16777215),(I=e.graphics).drawRect.apply(I,r()(e.mp.apply(e,r()(W.pos))).concat(r()(e.mp.apply(e,r()(W.size)))))}}catch(e){M=!0,A=e}finally{try{!S&&O.return&&O.return()}finally{if(M)throw A}}e.graphics.lineStyle(e.multiplier.x,16711680),e.graphics.beginFill(16777215),(a=e.graphics).drawCircle.apply(a,r()(e.mp.apply(e,r()(e.game.ball.pos))).concat([e.game.ball.size/2*e.multiplier.x])),e.graphics.endFill(),e.stage.addChild(e.graphics),e.stage.addChild(e.textContainer),e.stage.addChild(e.touchAreas),window.requestAnimationFrame(t),e.renderer.render(e.stage)}}()}},{key:"unpause",value:function(){this.fs.request(),this.game.paused=!1}}]),e}();t.a=f},124:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(120),i=a(118),s=a.n(i),r=a(119),o=a.n(r);n.a.use(o.a),n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:s.a}})},169:function(e,t){},280:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.gameIsRunning,expression:"!gameIsRunning"}],staticClass:"screen",attrs:{id:"startScreen"}},[a("h1",[e._v(e._s(e.message))]),e._v(" "),a("button",{staticClass:"startGame button",on:{click:function(t){e.gameIsRunning=!0}}},[e._v("Play 🕹️")]),e._v(" "),a("button",{directives:[{name:"scroll-to",rawName:"v-scroll-to",value:"#settingScreen",expression:"'#settingScreen'"}],staticClass:"button",attrs:{id:"settingButton"}},[e._v("Settings 🔎")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.gameIsRunning,expression:"!gameIsRunning"}],staticClass:"screen",attrs:{id:"settingScreen"}},[a("h1",[e._v("Settings 🔎")]),e._v(" "),a("h2",[e._v("Game Modes 🃏")]),e._v(" "),a("form",{staticClass:"selecter",attrs:{id:"gameModes"}},[a("a",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.gameMode,expression:"gameMode"}],attrs:{id:"wall",type:"radio",name:"gamemode",value:"wall"},domProps:{checked:e._q(e.gameMode,"wall")},on:{__c:function(t){e.gameMode="wall"}}}),e._v(" "),a("label",{staticClass:"button",attrs:{for:"wall"}},[e._v("\n          The Wall 🗻\n        ")])]),e._v(" "),a("a",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.gameMode,expression:"gameMode"}],attrs:{type:"radio",id:"default",name:"gamemode",value:"default",checked:""},domProps:{checked:e._q(e.gameMode,"default")},on:{__c:function(t){e.gameMode="default"}}}),e._v(" "),a("label",{staticClass:"button",attrs:{for:"default"}},[e._v("\n          Default 😃️\n        ")])])]),e._v(" "),a("h2",[e._v("Advanced Settings 💻")]),e._v(" "),e.paddles[0]?a("div",{staticClass:"wrapper",attrs:{id:"playerSettings"}},[a("table",[a("tr",e._l(e.paddles[0],function(t,n){return a("th",[e._v("\n            "+e._s(n)+"\n          ")])})),e._v(" "),e._l(e.paddles,function(t){return a("tr",e._l(t,function(e,n){return a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t[n],expression:"paddle[key]"}],staticClass:"button",attrs:{type:"text"},domProps:{value:t[n]},on:{input:function(e){if(!e.target.composing){var a=t,i=n;Array.isArray(a)?a.splice(i,1,e.target.value):t[n]=e.target.value}}}})])}))})],2),e._v(" "),a("button",{staticClass:"button",on:{click:e.addPlayer}},[e._v("Add player")])]):e._e()]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.paused,expression:"paused"}],staticClass:"paused"},[a("h1",[e._v("The game is paused!")]),e._v(" "),a("button",{staticClass:"button pauseButton",attrs:{type:"button",name:"button"},on:{click:function(t){e.paused=!1}}},[e._v("Unpause")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.gameIsRunning,expression:"gameIsRunning"}],attrs:{id:"canvas"}})])},staticRenderFns:[]}}},[124]);
//# sourceMappingURL=app.8d093e41d14d6495c731.js.map