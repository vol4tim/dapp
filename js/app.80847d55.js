(function(){var e={6695:function(e,t,o){"use strict";var r=o(5361),n=o(6281),a=o(9242),s=o(3396);function l(e,t,o,r,n,a){const l=(0,s.up)("router-view"),i=(0,s.up)("main-layout");return n.isReady?((0,s.wg)(),(0,s.j4)(i,{key:0,title:n.title},{default:(0,s.w5)((()=>[(0,s.Wm)(l)])),_:1},8,["title"])):(0,s.kq)("",!0)}o(7658);var i=o(4870);function u(e,t,o,r,n,a){const l=(0,s.up)("robo-layout-header");return(0,s.wg)(),(0,s.j4)(l,{logoIcon:"images/logo-white.png",navigation:n.navigation,title:o.title},null,8,["navigation","title"])}var c=o(7464),d=o.n(c);function p(e){return new(d())(e.toString())}function m(e,t){return p(e).todp(t)}function w(e,t=0,o){return p(e).div(new(d())(10).pow(t.toString())).todp(o).toString()}d().set({toExpNeg:-31,toExpPos:31});var f={props:{title:{type:String,default:"Robonomics Dapp"}},data(){return{navigation:[{title:"Other",links:[{title:"Services",link:"page-services",type:"router"}]},{title:"Tokenomics",links:[{title:"Uniswap",link:"https://app.uniswap.org/#/swap?inputCurrency=0x7de91b204c1c737bcee6f000aaa6569cf7061cb7&outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",type:"external"},{title:"About XRT",link:"https://robonomics.network/xrt/",type:"external"}]},{title:"Tools",links:[{title:"Substrate Portal",link:"https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer",type:"external"},{title:"Subscan",link:"https://robonomics.subscan.io/",type:"external"},{title:"Polkassembly",link:"https://robonomics.polkassembly.io/",type:"external"}]},{title:"Kusama XCM",links:[{title:"Moonriver",link:"https://apps.moonbeam.network/moonriver",type:"external"},{title:"Solarbeam",link:"https://analytics.solarbeam.io/pairs/0x5261e0ce96289e6c3a16da45a2e52d1ab1a0e9c3",type:"external"}]}]}},watch:{"$store.state.robonomicsUIvue.polkadot.extensionObj":function(e){e.signer&&e.signer.signRaw&&this.$store.state.robonomicsUIvue.polkadot.address&&this.handlerAccount(this.$store.state.robonomicsUIvue.polkadot.address)},"$store.state.robonomicsUIvue.polkadot.address":{handler:function(e){e&&this.$store.state.robonomicsUIvue.polkadot.extensionObj.signer&&this.$store.state.robonomicsUIvue.polkadot.extensionObj.signer.signRaw&&this.handlerAccount(e)},immediate:!0}},methods:{async handlerAccount(e){this.unsubscribeBalance&&this.unsubscribeBalance();const t=this.$store.state.robonomicsUIvue.polkadot.accounts.find((t=>t.address===e));t&&(await this.$robonomics.accountManager.setSender(e,{type:t.type,extension:this.$store.state.robonomicsUIvue.polkadot.extensionObj}),this.unsubscribeBalance=await this.$robonomics.account.getBalance(e,(e=>{const t=e.free.sub(e.feeFrozen);this.$store.commit("polkadot/setBalanceXRT",m(w(t,this.$robonomics.api.registry.chainDecimals[0]),4))})))}}},v=o(89);const h=(0,v.Z)(f,[["render",u]]);var g=h,b={__name:"Main",props:{title:{type:String,default:"Robonomics Dapp"}},setup(e){const t=e;return(e,o)=>{const r=(0,s.up)("robo-layout");return(0,s.wg)(),(0,s.j4)(r,null,{default:(0,s.w5)((()=>[(0,s.Wm)((0,i.SU)(g),{title:t.title},null,8,["title"]),(0,s.WI)(e.$slots,"default")])),_:3})}}};const y=b;var k=y,U=o(5743),S=o.n(U),W={name:"App",components:{MainLayout:k},data(){return{isReady:!1,title:""}},watch:{$route:{handler:function(e){this.title=e?.meta?.title},deep:!0,immediate:!0}},async created(){this.$store.commit("rws/setKey","88tHsnwjp*p36AurOu28W6UZz"),this.$store.dispatch("rws/init"),this.$store.commit("rws/setLinkActivate",this.$router.resolve({name:"rwsActivate"}).path),this.$store.commit("rws/setLinkList",this.$router.resolve({name:"rwsSetupsList"}).path),this.$store.commit("rws/setLinkSetup",this.$router.resolve({name:"rwsSetup"}).path),this.$store.commit("rws/setLinkDevices",this.$router.resolve({name:"telemetry"}).path),this.$store.commit("rws/setLinkUsers",this.$router.resolve({name:"rwsUsersList"}).path),this.$store.commit("rws/setLinkUseractivate",this.$router.resolve({name:"rwsUserSetup"}).path),this.$store.commit("rws/setLinkHaSetup",this.$router.resolve({name:"haSetup"}).path),this.$store.commit("ipfs/setGateways",["https://cf-ipfs.com/ipfs/","https://ipfs.io/ipfs/","https://gateway.pinata.cloud/ipfs/","https://gateway.ipfs.io/ipfs/","https://aira.mypinata.cloud/ipfs/"]),this.$robonomicsReady((async()=>{if(this.isReady=!0,this.$store.state.robonomicsUIvue.rws.list&&this.$store.state.robonomicsUIvue.rws.list.length>0){const e=async(e,t)=>{const o=S()().valueOf(),r=Number(t);if(o&&r&&r-o<0){const t=await this.$robonomics.rws.getLedger(e);if(!t.isEmpty){if(null===t.value)return"";const e=t.value.issueTime.toNumber();let o=0;t.value.kind.isDaily&&(o=t.value.kind.value.days.toNumber());const r=864e5;return e+o*r}}return t},t=[];for(const o of this.$store.state.robonomicsUIvue.rws.list)t.push({...o,enddate:await e(o.owner,o.enddate)});this.$store.dispatch("rws/rewrite",t)}}))}};const _=(0,v.Z)(W,[["render",l]]);var x=_,A=o(4161),H=o(4091);class ${constructor(e){this.endpoint=e,this.authHeader=null}auth(e,t){const o=`sub-${e}:${t}`;this.authHeader=Buffer.from(o).toString("base64")}authClear(){this.authHeader=null}async ls(e){const t=(0,H.Ue)({url:this.endpoint,headers:{authorization:`Basic ${this.authHeader}`}}),o=[];for await(const r of t.ls(e))"file"===r.type&&o.push(r);return o}async cat(e){const t=(0,H.Ue)({url:this.endpoint,headers:{authorization:`Basic ${this.authHeader}`}});t.hashers();const o=async e=>{const o=new TextDecoder;let r="";for await(const n of t.cat(e))r+=o.decode(n,{stream:!0});return r};return await o(e)}async add(e){const t=(0,H.Ue)({url:this.endpoint,headers:{authorization:`Basic ${this.authHeader}`}});return await t.add(e)}async catViaGateway(e,t,o=5){for(let n=1;n<=o;n++)try{return(await A.Z.get(`${e}${t}`)).data}catch(r){console.log(r)}throw new Error("File not available")}}let O=null;function R(){return O}var N={install:(e,t)=>{O=new $(t.gateway),e.config.globalProperties.$ipfs=O}},I=o(3153),C=o(2146),j=o(6117),P=o(142);class F extends C.Uk{constructor(e,t={},o=null){super(e,o),this.extension=null,e.loadAll(t),this.setReady(!0)}async beforeSetSender(e,{type:t,extension:o}){this.extension=o;try{this.keyring.getPair(e)}catch(r){this.keyring.loadInjected(e,{},t)}}async afterSetSender(){this.account.meta.isInjected&&this.extension&&(this.api.setSigner(this.extension.signer),this.account.signMsg=async e=>(await this.extension.signer.signRaw({address:this.account.address,data:(0,j.c)((0,P.Rl)(e)),type:"bytes"})).signature)}}async function M(){try{return C.l.getInstance()}catch(e){}return await C.l.createInstance({endpoint:"wss://kusama.rpc.robonomics.network/"})}var D={install:async e=>{let t,o=!1;e.config.globalProperties.$robonomicsReady=e=>{o?e():t=e},e.config.globalProperties.$robonomics=await M(),e.config.globalProperties.$robonomics.setAccountManager(new F(I.ZP)),o=!0,t&&t()}},Y=o(2483);const T=(0,s._)("p",null,"To open your local Home Assistant panel:",-1),L=(0,s._)("p",null," 1. Please enter in browser the following url: http://YOUR_LOCAL_IP:8123 ",-1),B=(0,s._)("p",null,"2. Login: enter your user address",-1),z=(0,s._)("p",null,"3. Password: enter password you created here",-1);function E(e,t,o,r,n,a){const l=(0,s.up)("robo-link"),i=(0,s.up)("robo-text"),u=(0,s.up)("robo-section"),c=(0,s.up)("form-check"),d=(0,s.up)("form-create"),p=(0,s.up)("robo-layout-section");return(0,s.wg)(),(0,s.j4)(p,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,{mark:"info",offset:"x0",width:"narrow"},{default:(0,s.w5)((()=>[(0,s.Wm)(i,{offset:"x0"},{default:(0,s.w5)((()=>[(0,s.Uk)(" You can create a password here to access your local Home Assistant account, if you already have an RWS subscription or have been added as a user to an RWS subscription. "),(0,s.Wm)(l,{href:"https://wiki.robonomics.network/docs/global-administration#granting-access-to-user"},{default:(0,s.w5)((()=>[(0,s.Uk)(" More on Wiki ")])),_:1})])),_:1})])),_:1}),(0,s.Wm)(u,{width:"narrow"},{default:(0,s.w5)((()=>[(0,s.Wm)(c,{onCheck:r.handleCheck},null,8,["onCheck"]),(0,s.Wm)(d,{"isCheсk":r.isCheсk,ownerAddress:r.ownerAddress,controllerAddress:r.controllerAddress,userSeed:r.userSeed},null,8,["isCheсk","ownerAddress","controllerAddress","userSeed"])])),_:1}),(0,s.Wm)(u,{mark:"info",marktitle:"What's next",offset:"x0",width:"narrow"},{default:(0,s.w5)((()=>[(0,s.Wm)(i,{offset:"x0"},{default:(0,s.w5)((()=>[T,L,B,z])),_:1})])),_:1})])),_:1})}function q(e,t,o,r,n,l){const i=(0,s.up)("robo-text"),u=(0,s.up)("robo-grid-item"),c=(0,s.up)("robo-template-rws-activeselect"),d=(0,s.up)("robo-address-polkadot"),p=(0,s.up)("robo-input"),m=(0,s.up)("robo-button"),w=(0,s.up)("robo-grid");return(0,s.wg)(),(0,s.iD)("form",{onSubmit:t[2]||(t[2]=(0,a.iM)(((...e)=>r.validate&&r.validate(...e)),["prevent"]))},[(0,s.Wm)(w,{offset:"x0",gap:"x1",columns:"1"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(i,{title:"3",offset:"x0"},{default:(0,s.w5)((()=>[(0,s.Uk)("User credits")])),_:1})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c,{size:"small",block:"",label:"Choose RWS"})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(d,{address:r.address,"onUpdate:address":t[0]||(t[0]=e=>r.address=e),chain:"32",label:"User address"},null,8,["address"])])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(p,{label:"User seed (12 words)",modelValue:r.seed,"onUpdate:modelValue":t[1]||(t[1]=e=>r.seed=e),type:"password",tip:"The seed phrase provided here is essential for encrypting your data. We understand the sensitivity of this information and therefore, do not share it with any third parties or store it on our servers. As an extra layer of security, we recommend avoiding storing a large number of tokens in this account to reduce the risk of potential unauthorized access."},null,8,["modelValue"])])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(m,{block:""},{default:(0,s.w5)((()=>[(0,s.Uk)("Check")])),_:1})])),_:1}),r.error?((0,s.wg)(),(0,s.j4)(u,{key:0},{default:(0,s.w5)((()=>[(0,s.Wm)(i,{highlight:"error"},{default:(0,s.w5)((()=>["require"===r.error?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s.Uk)(" Oops! Looks like you missed filling in some required fields. Please fill in all required fields and try again. ")],64)):(0,s.kq)("",!0),"not-user-subscription"===r.error?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s.Uk)(" Oops! It seems like your address has not been added to the RWS subscription. ")],64)):(0,s.kq)("",!0),"bad-seed"===r.error?((0,s.wg)(),(0,s.iD)(s.HY,{key:2},[(0,s.Uk)(" Oops! Seed does not match user address. ")],64)):(0,s.kq)("",!0)])),_:1})])),_:1})):(0,s.kq)("",!0)])),_:1})],32)}function Z(){try{return C.l.getInstance()}catch(e){console.log(e)}}var V=o(665),J=o(7281),G=o(9330),K=o(65),X={emits:["check"],setup(e,{emit:t}){const o=(0,i.iH)(""),r=(0,i.iH)(""),n=(0,i.iH)(!1),a=Z();let l,u;const c=(0,K.oR)();(0,s.YP)((()=>c.state.robonomicsUIvue.rws.active),(async()=>{const e=c.state.robonomicsUIvue.rws.list.find((e=>e.owner===c.state.robonomicsUIvue.rws.active));e&&(l=e.owner,u=e.controller,console.log(l),console.log(u))}),{immediate:!0});const d=()=>!(!r.value||!o.value),p=async(t,o)=>{try{(0,J.Y)(t),(0,J.Y)(o)}catch(e){return!1}const r=await a.rws.getDevices(t);return!(r.isEmpty||!r.toHuman().includes(o))},m=()=>{try{const e=new V.Y,t=e.addFromUri(r.value,{},"ed25519");if((0,G.m)(o.value)===(0,G.m)(t.address))return!0}catch(n){console.log(n)}return!1},w=async()=>{d()?await p(l,o.value)?m()?n.value=!1:n.value="bad-seed":n.value="not-user-subscription":n.value="require",n.value?t("check",{"isCheсk":!1,ownerAddress:"",controllerAddress:"",userSeed:""}):t("check",{"isCheсk":!0,ownerAddress:l,controllerAddress:u,userSeed:r.value})};return{address:o,seed:r,error:n,validate:w}}};const Q=(0,v.Z)(X,[["render",q]]);var ee=Q,te=o(7139);function oe(e,t,o,r,n,l){const i=(0,s.up)("robo-text"),u=(0,s.up)("robo-grid-item"),c=(0,s.up)("robo-input"),d=(0,s.up)("robo-button"),p=(0,s.up)("robo-grid");return(0,s.wg)(),(0,s.iD)("form",{onSubmit:t[2]||(t[2]=(0,a.iM)(((...e)=>r.createPassword&&r.createPassword(...e)),["prevent"]))},[(0,s.Wm)(p,{offset:"x1",gap:"x1",columns:"1",disabled:!o.isCheсk},{default:(0,s.w5)((()=>[(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(i,{title:"3",offset:"x0"},{default:(0,s.w5)((()=>[(0,s.Uk)("New password")])),_:1})])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c,{label:"New password",modelValue:r.password,"onUpdate:modelValue":t[0]||(t[0]=e=>r.password=e),type:"password"},null,8,["modelValue"])])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(c,{label:"Repeat password",modelValue:r.passwordRepeat,"onUpdate:modelValue":t[1]||(t[1]=e=>r.passwordRepeat=e),type:"password"},null,8,["modelValue"])])),_:1}),(0,s.Wm)(u,null,{default:(0,s.w5)((()=>[(0,s.Wm)(d,{block:"",disabled:r.isDisabled},{default:(0,s.w5)((()=>[(0,s.Uk)("Submit")])),_:1},8,["disabled"])])),_:1}),r.error?((0,s.wg)(),(0,s.j4)(u,{key:0},{default:(0,s.w5)((()=>[(0,s.Wm)(i,{highlight:"error"},{default:(0,s.w5)((()=>[(0,s.Uk)((0,te.zw)(r.error),1)])),_:1})])),_:1})):(0,s.kq)("",!0)])),_:1},8,["disabled"])],32)}const re=(e=null)=>{const t=(0,i.iH)(e),o=(0,i.iH)([]),r=async()=>{if(t.value)try{(0,J.Y)(t.value);const e=await Z().rws.getDevices(t.value);return void(o.value=e.map((e=>e.toHuman())))}catch(e){console.log(e)}o.value=[]};return(0,s.YP)(t,(async()=>{await r()}),{immediate:!0}),{owner:t,devices:o,loadDevices:r}},ne=()=>Z().api.consts.rws.referenceCallWeight,ae=async e=>{const t=await Z().rws.getLedger(e);if(!t.isEmpty)return t.value},se=864e5,le=async e=>{const t=await ae(e);if(!t)return-1;const o=t.freeWeight.toNumber(),r=t.lastUpdate.toNumber(),n=t.issueTime.toNumber(),a=ne(),s=Date.now();let l=(()=>{let e=30*se;return s<n+e?1e4:0})();const i=s-r;return Math.floor(o+a*l*i/1e9)},ie=(e=null)=>{const t=(0,i.iH)(e),o=(0,i.qj)({value:null}),{devices:r,loadDevices:n}=re(t),a=(0,s.Fl)((()=>{if(null===o.value)return"";const e=(0,i.IU)(o),t=e.value.issueTime.toNumber();let r=0;return e.value.kind.isDaily&&(r=e.value.kind.value.days.toNumber()),t+r*se})),l=(0,s.Fl)((()=>{if(null===o.value)return 0;const e=(0,i.IU)(o);let t=0;return e.value.kind.isDaily&&(t=e.value.kind.value.days.toNumber()),t/30})),u=(0,s.Fl)((()=>!(null===o.value||Date.now()>a.value))),c=(0,s.Fl)((()=>null!==o.value)),d=async()=>{if(t.value)try{(0,J.Y)(t.value);const e=await ae(t.value);if(e)return void(o.value=e)}catch(e){console.log(e)}o.value=null};return(0,s.YP)(t,(async()=>{await d()}),{immediate:!0}),{owner:t,dataRaw:o,hasSubscription:c,isActive:u,countMonth:l,validUntil:a,loadLedger:d,devices:r,loadDevices:n}},ue=async(e,t)=>{if(!t){const e=Z();if(!e.accountManager.account)throw new Error("Signer required");t=e.accountManager.account.address}return(await e.paymentInfo(t)).weight.toNumber()},ce=async(e,t)=>{const o=await le(t);if(o<0)throw new Error(`Not found ledger ${t}`);const r=await ue(e);if(r>o)throw new Error(`The origin account have no enough free weight to process these call. Call weight ${r}, Free weight ${o}`)},de=()=>{const e=Z(),t=(0,i.iH)(null),o=(0,i.iH)(null),r=(0,i.iH)(!1),n=async(n,a=!1)=>{t.value=null,o.value=null,r.value=!0;try{a&&(await ce(n,a),e.accountManager.useSubscription(a)),t.value=await e.accountManager.signAndSend(n),console.log("tx",t.value.block,t.value.tx)}catch(s){o.value=s.message}return r.value=!1,a&&e.accountManager.useSubscription(!1),t};return{error:o,process:r,result:t,send:n}};var pe=o(2629),me={props:{"isCheсk":Boolean,ownerAddress:String,controllerAddress:String,userSeed:String},setup(e){const{"isCheсk":t,ownerAddress:o,controllerAddress:r,userSeed:n}=(0,i.BK)(e),a=(0,i.iH)(""),l=(0,i.iH)(""),u=(0,i.iH)(""),c=Z(),d=de(),p=(0,K.oR)();let m;(0,s.YP)(n,(()=>{if(t.value)try{const e=new V.Y({ss58Format:c.api?.registry.chainSS58});return void(m=e.addFromUri(n.value,{},"ed25519"))}catch(u){console.log(u)}m=null}),{immediate:!0});const w=(e,t)=>{const o=m.encryptMessage(e,(0,j.c)((0,pe.m)(t)));return(0,j.c)(o)};let f,v;(0,s.m0)((()=>{t.value&&h.value&&g.value?(f=w(a.value,m.address),v=w(a.value,r.value)):(f="",v=""),console.log({passwordForRecovery:f,passwordForAdmin:v})}));const h=(0,s.Fl)((()=>!(!a.value||!l.value))),g=(0,s.Fl)((()=>a.value===l.value)),b=(0,s.Fl)((()=>d.process.value?(console.log("process"),!0):t.value?h.value?g.value?(!v||!f)&&(console.log("passwordForAdmin passwordForRecovery"),!0):(console.log("checkPasswordsMatch"),!0):(console.log("validateRequire"),!0):(console.log("isCheсk"),!0))),y=async()=>{if(!t.value)return;c.accountManager.account=m;const e=await c.datalog.write(JSON.stringify({subscription:o.value,ha:r.value,admin:v,user:f}));await d.send(e,o.value),d.error.value&&("Cancelled"!==d.error.value?u.value=d.error.value:console.log("calcel"));const n=p.state.robonomicsUIvue.polkadot.accounts.find((e=>e.address===p.state.robonomicsUIvue.polkadot.address));await c.accountManager.setSender(n.address,{type:n.type,extension:p.state.robonomicsUIvue.polkadot.extensionObj})};return{password:a,passwordRepeat:l,error:u,isDisabled:b,createPassword:y}}};const we=(0,v.Z)(me,[["render",oe]]);var fe=we,ve={components:{FormCheck:ee,FormCreate:fe},setup(){const e=(0,i.iH)(!1),t=(0,i.iH)(""),o=(0,i.iH)(""),r=(0,i.iH)(""),n=n=>{e.value=n.isCheсk,t.value=n.ownerAddress,o.value=n.controllerAddress,r.value=n.userSeed};return{"isCheсk":e,ownerAddress:t,controllerAddress:o,userSeed:r,handleCheck:n}}};const he=(0,v.Z)(ve,[["render",E]]);var ge=he,be={__name:"Home",setup(e){const t=(0,K.oR)(),o=(0,s.Fl)((()=>t.state.robonomicsUIvue.rws.list));return(e,r)=>{const n=(0,s.up)("robo-video"),a=(0,s.up)("robo-icon"),l=(0,s.up)("robo-text"),u=(0,s.up)("robo-grid"),c=(0,s.up)("robo-button"),d=(0,s.up)("robo-card"),p=(0,s.up)("robo-link"),m=(0,s.up)("robo-grid-item"),w=(0,s.up)("robo-layout-section");return(0,s.wg)(),(0,s.j4)(w,null,{default:(0,s.w5)((()=>[(0,s.Wm)(u,{offset:"x0",gap:"x1",valign:"start",galign:"start",minColumnWidth:"550px",maxColumnWidth:"1fr"},{default:(0,s.w5)((()=>[(0,s.Wm)(n,{autoplay:"",loop:"",sources:[{src:"https://crustipfs.art/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa",type:"video/mp4"}],script:"<p>Robonomics is a decentralized cloud service that can be used to enhance\n                your smart home system. It addresses two main problems: the lack of\n                control over data shared with vendors or third parties, and the vulnerability of\n                smart homes to centralized cloud server shutdowns.</p>\n                <p>With Robonomics, you can take advantage of its secure,\n                  serverless, and decentralized cloud service to improve the functionality of\n                  your smart home. Plus, you can use it with a wide range of Zigbee smart devices\n                  to automate and control various aspects of your home.</p>\n                <p>Installing Robonomics on top of Home Assistant is easy, and there are\n                   several options to choose from. Simply select the method that works best for you\n                   and your smart home on wiki.robonomics.network.</p>"},null,8,["sources"]),(0,s.Wm)(m,{align:"stretch"},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{offset:"x0",gap:"x1",minColumnWidth:"270px",maxColumnWidth:"1fr"},{default:(0,s.w5)((()=>[(0,s.Wm)(d,{fixedButton:""},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{offset:"x0",gap:"x05",valign:"start"},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{icon:"current-version",size:"big"}),(0,s._)("div",null,[(0,s.Wm)(l,{title:"4"},{default:(0,s.w5)((()=>[(0,s.Uk)("Your RWS subscriptions")])),_:1})])])),_:1}),(0,s.Wm)(c,{router:(0,i.SU)(t).state.robonomicsUIvue.rws.links.list},{default:(0,s.w5)((()=>[(0,s.Uk)(" View details ")])),_:1},8,["router"])])),_:1}),(0,s.Wm)(d,{pale:(0,i.SU)(o)?.length<1,fixedButton:""},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{offset:"x0",gap:"x05",valign:"start"},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{icon:"plug",size:"big"}),(0,s._)("div",null,[(0,s.Wm)(l,{title:"4"},{default:(0,s.w5)((()=>[(0,s.Uk)("Control smart devices")])),_:1})])])),_:1}),(0,s.Wm)(c,{router:(0,i.SU)(t).state.robonomicsUIvue.rws.links.devices,disabled:(0,i.SU)(o)?.length<1},{default:(0,s.w5)((()=>[(0,s.Uk)(" Manage devices ")])),_:1},8,["router","disabled"])])),_:1},8,["pale"]),(0,s.Wm)(d,{pale:(0,i.SU)(o)?.length<1,fixedButton:""},{default:(0,s.w5)((()=>[(0,s.Wm)(u,{offset:"x0",gap:"x05",valign:"start"},{default:(0,s.w5)((()=>[(0,s.Wm)(a,{icon:"user-group",size:"big"}),(0,s._)("div",null,[(0,s.Wm)(l,{title:"4"},{default:(0,s.w5)((()=>[(0,s.Uk)("Share your telemetry")])),_:1})])])),_:1}),(0,s.Wm)(c,{router:(0,i.SU)(t).state.robonomicsUIvue.rws.links.users,disabled:(0,i.SU)(o)?.length<1},{default:(0,s.w5)((()=>[(0,s.Uk)(" Manage Users ")])),_:1},8,["router","disabled"])])),_:1},8,["pale"]),(0,s.Wm)(d,null,{default:(0,s.w5)((()=>[(0,s.Wm)(l,{title:"4",offset:"x0"},{default:(0,s.w5)((()=>[(0,s.Uk)("Need help?")])),_:1}),(0,s.Wm)(u,{gap:"x05",offset:"x1"},{default:(0,s.w5)((()=>[(0,s.Wm)(l,{size:"small",weight:"bold"},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{href:"https://wiki.robonomics.network"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Wiki ")])),_:1}),(0,s.Uk)(" - Tutorials ")])),_:1}),(0,s.Wm)(l,{size:"small",weight:"bold"},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{href:"https://github.com/airalab/dapp.robonomics.network"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Github")])),_:1}),(0,s.Uk)(" - Bugs & improvements ")])),_:1}),(0,s.Wm)(l,{size:"small",weight:"bold"},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{href:"https://discord.gg/JpaN2XAmqY"},{default:(0,s.w5)((()=>[(0,s.Uk)(" Discord ")])),_:1}),(0,s.Uk)(" - Team support ")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}}};const ye=be;var ke=ye;function Ue(e,t,o,r,n,a){const l=(0,s.up)("robo-template-rws-activate"),i=(0,s.up)("robo-layout-section");return(0,s.wg)(),(0,s.j4)(i,null,{default:(0,s.w5)((()=>[(0,s.Wm)(l,{price:r.price,activationtime:"2",available:r.freeAuctions,onOnRwsActivate:r.onActivate},null,8,["price","available","onOnRwsActivate"])])),_:1})}const Se=()=>{const e=(0,i.iH)(null),t=Z();t.accountManager.account&&(e.value=t.accountManager.account.address);const o=t.accountManager.onChange((t=>{e.value=t.address}));return{account:e,unsubscribe:o}},We=e=>{const t=(0,i.iH)(null),o=Z();let r;return(0,s.YP)(e,(async()=>{r&&r(),r=await o.account.getBalance(e.value,(e=>{t.value=e.free.sub(e.feeFrozen).toNumber()}))})),{balance:t,unsubscribe:r}};var _e=o(1737),xe={setup(){const e=(0,i.iH)(0),t=(0,i.iH)(0);let o=null;const r=Z(),{account:n,unsubscribe:a}=Se(),{balance:l,unsubscribe:u}=We(n),c=ie(n),d=re(n);(async()=>{t.value=(await r.rws.getFreeAuctions()).length,o=await r.events.onBlock((async()=>{t.value=(await r.rws.getFreeAuctions()).length}));const n=await r.rws.getMinimalBid();e.value=n.add((0,_e.G)(1))})(),(0,s.Ah)((()=>{o&&o(),u&&u(),a()}));const p=de(),m=async o=>{if(!l.value||(0,_e.G)(l.value).add((0,_e.G)(1e9)).lt(e.value))return o("error","Subscription can not be activated due to unsuffcicient XRT balance");if(t.value<=0)return o("error","There are no available subscriptions");if(c.hasSubscription.value&&c.isActive.value)return o("error","You have an active subscription");let a=r.rws.bid(Number(await r.rws.getFirtsFreeAuction()),e.value);if(d.devices.value.includes(n.value)||(a=r.api.tx.utility.batch([a,r.rws.setDevices([...d.devices.value,n.value])])),await p.send(a),p.error.value)return void("Cancelled"!==p.error.value?o("error",p.error.value):o("calcel"));const i=await r.events.onBlock((()=>{c.loadLedger()})),u=(0,s.m0)((()=>{c.hasSubscription.value&&c.isActive.value&&(u(),i(),o("ok"))}))},f=(0,s.Fl)((()=>w(e.value,r.api.registry.chainDecimals[0])));return{freeAuctions:t,price:f,onActivate:m}}};const Ae=(0,v.Z)(xe,[["render",Ue]]);var He=Ae;function $e(e,t,o,r,n,a){const l=(0,s.up)("robo-template-rws-setup"),i=(0,s.up)("robo-layout-section");return(0,s.wg)(),(0,s.j4)(i,{rwsrecover:""},{default:(0,s.w5)((()=>[(0,s.Wm)(l,{owner:r.ownerNew,"onUpdate:owner":t[0]||(t[0]=e=>r.ownerNew=e),controller:r.controllerNew,"onUpdate:controller":t[1]||(t[1]=e=>r.controllerNew=e),scontroller:r.scontrollerNew,"onUpdate:scontroller":t[2]||(t[2]=e=>r.scontrollerNew=e),name:r.nameNew,"onUpdate:name":t[3]||(t[3]=e=>r.nameNew=e),enddate:r.enddateNew,"onUpdate:enddate":t[4]||(t[4]=e=>r.enddateNew=e),onOnRwsSetup:r.onSetup},null,8,["owner","controller","scontroller","name","enddate","onOnRwsSetup"])])),_:1})}var Oe={setup(){const e=(0,i.iH)(null),t=(0,i.iH)(null),o=(0,i.iH)(null),r=(0,i.iH)(null),n=ie(e),a=e=>{e("ok")};return{ownerNew:e,controllerNew:t,scontrollerNew:o,nameNew:r,enddateNew:n.validUntil,onSetup:a}}};const Re=(0,v.Z)(Oe,[["render",$e]]);var Ne=Re;function Ie(e,t,o,r,n,a){const l=(0,s.up)("robo-template-rws-setups-empty"),i=(0,s.up)("robo-section"),u=(0,s.up)("robo-layout-section"),c=(0,s.up)("robo-template-rws-setup-listitem"),d=(0,s.up)("robo-grid"),p=(0,s.up)("robo-button");return r.rws?.length<1?((0,s.wg)(),(0,s.j4)(u,{key:0,rwsrecover:""},{default:(0,s.w5)((()=>[(0,s.Wm)(i,{width:"narrow",gcenter:""},{default:(0,s.w5)((()=>[(0,s.Wm)(l)])),_:1})])),_:1})):((0,s.wg)(),(0,s.j4)(u,{key:1,rwsrecover:"",rwssave:""},{default:(0,s.w5)((()=>[(0,s.Wm)(i,{offset:"x0",width:"narrow"},{default:(0,s.w5)((()=>[(0,s.Wm)(d,{offset:"x1",gap:"x1"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.rws,((e,t)=>((0,s.wg)(),(0,s.j4)(c,{key:t,owner:e.owner,"onUpdate:owner":t=>e.owner=t,controller:e.controller,"onUpdate:controller":t=>e.controller=t,scontroller:e.scontroller,"onUpdate:scontroller":t=>e.scontroller=t,name:e.name,"onUpdate:name":t=>e.name=t,enddate:e.enddate,"onUpdate:enddate":t=>e.enddate=t,onEdit:r.onEdit,onOnRwsDelete:r.onDelete},null,8,["owner","onUpdate:owner","controller","onUpdate:controller","scontroller","onUpdate:scontroller","name","onUpdate:name","enddate","onUpdate:enddate","onEdit","onOnRwsDelete"])))),128))])),_:1}),(0,s.Wm)(p,{block:"",router:r.store.state.robonomicsUIvue.rws.links.setup},{default:(0,s.w5)((()=>[(0,s.Uk)(" + Add new rws ")])),_:1},8,["router"])])),_:1})])),_:1}))}var Ce={setup(){const e=(0,K.oR)(),t=(0,s.Fl)((()=>e.state.robonomicsUIvue.rws.list));let o=e=>{e("ok")},r=e=>{e("ok")};return{store:e,rws:t,onEdit:o,onDelete:r}}};const je=(0,v.Z)(Ce,[["render",Ie]]);var Pe=je;function Fe(e,t,o,r,n,a){const l=(0,s.up)("robo-template-rws-user-setup"),i=(0,s.up)("robo-layout-section");return(0,s.wg)(),(0,s.j4)(i,{rwsrecover:""},{default:(0,s.w5)((()=>[(0,s.Wm)(l,{address:r.addressNew,"onUpdate:address":t[0]||(t[0]=e=>r.addressNew=e),name:r.nameNew,"onUpdate:name":t[1]||(t[1]=e=>r.nameNew=e),onOnUserSetup:r.onSetup},null,8,["address","name","onOnUserSetup"])])),_:1})}var Me={setup(){let e=(0,i.iH)(null),t=(0,i.iH)(null);const o=(0,K.oR)();let r=(0,i.iH)(o.state.robonomicsUIvue.rws.active);(0,s.YP)((()=>o.state.robonomicsUIvue.rws.active),(()=>{r.value=o.state.robonomicsUIvue.rws.active}));const n=Z(),a=de(),l=re(r),u=async t=>{if(!l.devices.value.includes(e.value)){const o=await n.rws.setDevices([...l.devices.value,e.value]);if(await a.send(o),a.error.value)return void("Cancelled"!==a.error.value?t("error",a.error.value):t("calcel"))}t("ok")};return{addressNew:e,nameNew:t,onSetup:u}}};const De=(0,v.Z)(Me,[["render",Fe]]);var Ye=De,Te={__name:"RwsUsersList",setup(e){const t=(0,K.oR)(),o=(0,s.Fl)((()=>t.state.robonomicsUIvue.rws.list)),r=(0,s.Fl)((()=>t.state.robonomicsUIvue.rws.active)),n=(0,s.Fl)((()=>t.getters["rws/users"])),a=e=>{e("ok")},l=e=>{e("ok")},u=re(r),c=()=>{for(const e of u.devices.value)n.value.find((t=>t.address===e))||t.dispatch("rws/addUser",{rws:u.owner.value,user:{address:e,name:e===u.owner.value?"owner":""}});for(const e of n.value)u.devices.value.find((t=>e.address===t))||t.dispatch("rws/deleteUser",{rws:u.owner.value,user:e.address})};return(0,s.YP)(u.devices,c),(e,u)=>{const c=(0,s.up)("robo-template-rws-activeselect"),d=(0,s.up)("robo-template-rws-users-empty"),p=(0,s.up)("robo-section"),m=(0,s.up)("robo-layout-section"),w=(0,s.up)("robo-template-rws-user-listitem"),f=(0,s.up)("robo-grid"),v=(0,s.up)("robo-button");return(0,i.SU)(o)?.length<1||!(0,i.SU)(n)||(0,i.SU)(n).length<1?((0,s.wg)(),(0,s.j4)(m,{key:0,rwsrecover:""},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{width:"narrow",gcenter:""},{default:(0,s.w5)((()=>[(0,i.SU)(o)?.length>1?((0,s.wg)(),(0,s.j4)(c,{key:0,block:"",label:"Selected RWS"})):(0,s.kq)("",!0),(0,s.Wm)(d)])),_:1})])),_:1})):((0,s.wg)(),(0,s.j4)(m,{key:1,rwsrecover:"",rwssave:""},{default:(0,s.w5)((()=>[(0,s.Wm)(p,{offset:"x0",width:"narrow"},{default:(0,s.w5)((()=>[(0,s.Wm)(f,{offset:"x1",gap:"x1"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,i.SU)(n),((e,t)=>((0,s.wg)(),(0,s.j4)(w,{key:t,owner:(0,i.SU)(r),address:e.address,"onUpdate:address":t=>e.address=t,name:e.name,"onUpdate:name":t=>e.name=t,onEdit:a,onOnUserDelete:l},null,8,["owner","address","onUpdate:address","name","onUpdate:name"])))),128))])),_:1}),(0,s.Wm)(v,{block:"",router:(0,i.SU)(t).state.robonomicsUIvue.rws.links.useractivate},{default:(0,s.w5)((()=>[(0,s.Uk)(" + Add user ")])),_:1},8,["router"])])),_:1})])),_:1}))}}};const Le=Te;var Be=Le;function ze(e,t,o,r,n,a){const l=(0,s.up)("robo-template-devices-layout");return(0,s.wg)(),(0,s.j4)(l,{onUpdate:r.onUpdate,datalog:r.datalog,config:r.config},null,8,["onUpdate","datalog","config"])}function Ee(){try{return R()}catch(e){console.log(e)}}var qe=o(9361),Ze=o(6251);const Ve=e=>e.replaceAll("'",'"').replaceAll("\\","").replaceAll('""','"').replaceAll("True","true").replaceAll("False","false").replaceAll("None",'"None"'),Je=e=>{try{return JSON.parse(e)}catch(t){console.log("error parse 1")}try{return JSON.parse(Ve(e))}catch(t){console.log("error parse 2")}return!1},Ge=(e,t,o)=>{const r=o.decryptMessage((0,qe.G)(e),t);return(0,Ze.z)(r)},Ke=async(e,t)=>{if(console.log("getLastDatalogCid"),!t)return!1;const o=await e.datalog.read(t);return!!o.length&&(0,Ze.z)(o[o.length-1][1])},Xe=async(e,t)=>{if(console.log("getConfigCid"),!t)return!1;const o=await e.twin.getTwinByOwner(t);if(!o)return!1;const r=Object.keys(o).find((e=>o[e]===t));return C.P6.hexToCid(r)};var Qe=o(2273),et={setup(){const e=(0,i.iH)(null),t=(0,i.iH)(null),o=(0,i.iH)(""),r=(0,i.iH)(""),n=(0,i.qj)({controller:null,admin:null}),a=Z(),l=(0,K.oR)(),u=Ee(),c=de();let d;const p=async()=>{d=await a.datalog.on({method:"NewRecord"},(e=>{const t=e.filter((e=>e.success&&e.data[0].toHuman()===n.controller.address));for(const r of t)console.log(r.data[1].toString(),r.data[2].toHuman()),o.value=r.data[2].toHuman()}))};(0,s.Ah)((()=>{d&&d()}));const m=new V.Y({ss58Format:a.api?.registry.chainSS58}),w=async(e,t)=>{if(!t)return!1;try{const o=await u.catViaGateway(l.state.robonomicsUIvue.ipfs.activegateway,t),r=Ge(o[e.address],e.publicKey,e),n=m.addFromUri(r,{},"ed25519"),a=Ge(o.data,e.publicKey,n);return Je(a)}catch(o){return console.log(o.message),!1}},f=()=>{console.log("loadSetup");const e=l.state.robonomicsUIvue.rws.list.find((e=>e.owner===l.state.robonomicsUIvue.rws.active));if(e)try{return n.controller=m.addFromUri(e.scontroller,{},"ed25519"),void(n.admin=e.owner)}catch(t){console.log(t)}n.controller=null,n.admin=null},v=async()=>{if(console.log("findTelemetryCid start"),n.controller){try{r.value="",o.value="";const e=await Promise.all([Xe(a,n.controller.address),Ke(a,n.controller.address)]);r.value=e[0],o.value=e[1]}catch(e){console.log(e)}console.log("findTelemetryCid end")}else console.log("not found controller")};(0,s.YP)((()=>l.state.robonomicsUIvue.rws.active),(()=>{f()}),{immediate:!0}),(0,s.m0)((()=>{d&&d(),n.controller?(v(),p()):(r.value="",o.value="")})),(0,s.YP)(o,(async()=>{if(console.log("load datalog start"),console.log("datalog cid",n.controller,o.value),o.value){const t=await w(n.controller,o.value);t?(e.value=t,console.log("datalog",JSON.stringify(e.value))):console.log("load datalog not found")}else e.value=null;console.log("load datalog end")})),(0,s.YP)(r,(async()=>{if(console.log("load config start"),console.log("config cid",n.controller,r.value),r.value){const e=await w(n.controller,r.value);e?(t.value=e,console.log("config",JSON.stringify(t.value))):console.log("load config not found")}else t.value=null;console.log("load config end")}));const h=async e=>{console.log("launch command",e);const t=(await a.accountManager.account.signMsg((0,Qe.d)(a.accountManager.account.address))).toString();u.auth(a.accountManager.account.address,t),console.log("ipfs auth");const o=await u.add(JSON.stringify(e));console.log("launch ipfs file",o.path);const r=a.launch.send(n.controller.address,o.path);await c.send(r,n.admin)};(0,s.YP)((()=>l.state.robonomicsUIvue.rws.launch),(e=>{try{h(JSON.parse(e)[0])}catch(t){console.log(t)}}));const g=async e=>{try{console.log("start update"),await v(),e("ok"),console.log("ok update")}catch(t){console.log(t),e("error",t.message)}};return{datalog:e,config:t,configCid:r,onUpdate:g,launch:h,tx:c}}};const tt=(0,v.Z)(et,[["render",ze]]);var ot=tt;const rt=[{path:"/",name:"Home",component:ke,meta:{title:"Dashboard"}},{path:"/rws-activate",name:"rwsActivate",component:He,meta:{title:"RWS activation"}},{path:"/rws-setup",name:"rwsSetup",component:Ne,meta:{title:"RWS setup"}},{path:"/rws-setups-list",name:"rwsSetupsList",component:Pe,meta:{title:"Your RWS setups"}},{path:"/rws-user-setup",name:"rwsUserSetup",component:Ye,meta:{title:"RWS add user"}},{path:"/rws-users-list",name:"rwsUsersList",component:Be,meta:{title:"Users in your RWS"}},{path:"/telemetry",name:"telemetry",component:ot,meta:{title:"Smart devices"}},{path:"/hasetup",name:"haSetup",component:ge,meta:{title:"HA setup"}}],nt=(0,Y.p7)({history:(0,Y.r5)(),routes:rt});var at=nt;const st=(0,K.MT)({state:{name:"Vue"}});var lt=st,it={install:e=>{e.config.globalProperties.$filters={balance(e,t,o){return"string"===typeof e||"number"===typeof e?`${w(e,t,4)} ${o}`:""}}}};window.Buffer=r.lW;const ut=(0,a.ri)(x);ut.use(at).use(lt).use(it).use(D).use(N,{gateway:"https://ipfs-gw.decloud.foundation"}).use(n.robonomicsUI,{store:lt}).mount("#app")},5856:function(){},6601:function(){},3897:function(){},173:function(){},5024:function(){}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(a.exports,a,a.exports,o),a.loaded=!0,a.exports}o.m=e,function(){o.amdO={}}(),function(){var e=[];o.O=function(t,r,n,a){if(!r){var s=1/0;for(c=0;c<e.length;c++){r=e[c][0],n=e[c][1],a=e[c][2];for(var l=!0,i=0;i<r.length;i++)(!1&a||s>=a)&&Object.keys(o.O).every((function(e){return o.O[e](r[i])}))?r.splice(i--,1):(l=!1,a<s&&(s=a));if(l){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,n,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};o.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"===typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"===typeof r.then)return r}var a=Object.create(null);o.r(a);var s={};e=e||[null,t({}),t([]),t(t)];for(var l=2&n&&r;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((function(e){s[e]=function(){return r[e]}}));return s["default"]=function(){return r},o.d(a,s),a}}(),function(){o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,a,s=r[0],l=r[1],i=r[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(i)var c=i(o)}for(t&&t(r);u<s.length;u++)a=s[u],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(c)},r=self["webpackChunkrobonomics_dapp"]=self["webpackChunkrobonomics_dapp"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=o.O(void 0,[998],(function(){return o(6695)}));r=o.O(r)})();
//# sourceMappingURL=app.80847d55.js.map