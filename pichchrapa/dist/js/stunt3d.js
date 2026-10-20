var Cp=Object.defineProperty;var Pp=(n,e)=>{for(var t in e)Cp(n,t,{get:e[t],enumerable:!0})};var Jr="170";var ic=0,Xa=1,nc=2;var ns=1,rc=2,xi=3,jt=0,pt=1,Ot=2,si=0,Hi=1,qa=2,Ya=3,Za=4,oc=5,ki=100,sc=101,ac=102,lc=103,cc=104,hc=200,fc=201,uc=202,dc=203,Kr=204,jr=205,pc=206,mc=207,gc=208,xc=209,_c=210,vc=211,Mc=212,Sc=213,yc=214,rs=0,os=1,ss=2,on=3,as=4,ls=5,cs=6,hs=7,fs=0,Ec=1,bc=2,ai=0,Tc=1,Ac=2,wc=3,Rc=4,Cc=5,Pc=6,Lc=7;var Ja=300,_i=301,Li=302,Qr=303,$r=304,sn=306,eo=1e3,vi=1001,to=1002,St=1003,Dc=1004;var io=1005;var Bt=1006,us=1007;var Mi=1008;var Dt=1009,ds=1010,ps=1011,Wi=1012,jn=1013,Qt=1014,zt=1015,Di=1016,Qn=1017,$n=1018,Si=1020,ms=35902,gs=1021,xs=1022,yt=1023,_s=1024,vs=1025,Ui=1026,Ii=1027,Ms=1028,er=1029,Ss=1030,tr=1031;var ir=1033,nr=33776,rr=33777,or=33778,sr=33779,no=35840,ro=35841,oo=35842,so=35843,ao=36196,lo=37492,co=37496,ho=37808,fo=37809,uo=37810,po=37811,mo=37812,go=37813,xo=37814,_o=37815,vo=37816,Mo=37817,So=37818,yo=37819,Eo=37820,bo=37821,ar=36492,To=36494,Ao=36495,ys=36283,wo=36284,Ro=36285,Co=36286;var Uc=3200,Ic=3201;var Es=0,Nc=1,li="",Gt="srgb",yi="srgb-linear",Tn="linear",$e="srgb";var An=7680;var Ka=519,Fc=512,Oc=513,Bc=514,bs=515,zc=516,Gc=517,Vc=518,Hc=519,Po=35044;var ja="300 es",Xt=2e3,wn=2001;var qt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let o=0,s=r.length;o<s;o++)r[o].call(this,e);e.target=null}}};var Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ts=Math.PI/180,Lo=180/Math.PI;function It(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]).toLowerCase()}function mt(n,e,t){return Math.max(e,Math.min(t,n))}function kc(n,e){return(n%e+e)%e}function As(n,e,t){return(1-t)*n+t*e}function ci(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ot(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var J=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(mt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*i-s*r+e.x,this.y=o*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};var Ue=class n{constructor(e,t,i,r,o,s,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,s,a,l,c)}set(e,t,i,r,o,s,a,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=o,h[5]=l,h[6]=i,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[3],l=i[6],c=i[1],h=i[4],m=i[7],p=i[2],d=i[5],g=i[8],x=r[0],f=r[3],u=r[6],y=r[1],v=r[4],_=r[7],D=r[2],A=r[5],P=r[8];return o[0]=s*x+a*y+l*D,o[3]=s*f+a*v+l*A,o[6]=s*u+a*_+l*P,o[1]=c*x+h*y+m*D,o[4]=c*f+h*v+m*A,o[7]=c*u+h*_+m*P,o[2]=p*x+d*y+g*D,o[5]=p*f+d*v+g*A,o[8]=p*u+d*_+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*s*h-t*a*c-i*o*h+i*a*l+r*o*c-r*s*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],h=e[8],m=h*s-a*c,p=a*l-h*o,d=c*o-s*l,g=t*m+i*p+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=m*x,e[1]=(r*c-h*i)*x,e[2]=(a*i-r*s)*x,e[3]=p*x,e[4]=(h*t-r*l)*x,e[5]=(r*o-a*t)*x,e[6]=d*x,e[7]=(i*l-c*t)*x,e[8]=(s*t-i*o)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,o,s,a){let l=Math.cos(o),c=Math.sin(o);return this.set(i*l,i*c,-i*(l*s+c*a)+s+e,-r*c,r*l,-r*(-c*s+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qa.makeScale(e,t)),this}rotate(e){return this.premultiply(Qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qa=new Ue;function ws(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function lr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xc(){let n=lr("canvas");return n.style.display="block",n}var Wc={};function Rn(n){n in Wc||(Wc[n]=!0,console.warn(n))}function qc(n,e,t){return new Promise(function(i,r){function o(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:i()}}setTimeout(o,t)})}function Yc(n){let e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Zc(n){let e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var qe={enabled:!0,workingColorSpace:yi,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===$e&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===$e&&(n.r=Cn(n.r),n.g=Cn(n.g),n.b=Cn(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===li?Tn:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Cn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Jc=[.64,.33,.3,.6,.15,.06],Kc=[.2126,.7152,.0722],jc=[.3127,.329],Qc=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$c=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[yi]:{primaries:Jc,whitePoint:jc,transfer:Tn,toXYZ:Qc,fromXYZ:$c,luminanceCoefficients:Kc,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:Jc,whitePoint:jc,transfer:$e,toXYZ:Qc,fromXYZ:$c,luminanceCoefficients:Kc,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}});var cr,Rs=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{cr===void 0&&(cr=lr("canvas")),cr.width=e.width,cr.height=e.height;let i=cr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=cr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=lr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),o=r.data;for(let s=0;s<o.length;s++)o[s]=Ei(o[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ei(t[i]/255)*255):t[i]=Ei(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}};var Lp=0,hr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=It(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let s=0,a=r.length;s<a;s++)r[s].isDataTexture?o.push($a(r[s].image)):o.push($a(r[s]))}else o=$a(r);i.url=o}return t||(e.images[this.uuid]=i),i}};function $a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Rs.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Dp=0,gt=class n extends qt{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=vi,r=vi,o=Bt,s=Mi,a=yt,l=Dt,c=n.DEFAULT_ANISOTROPY,h=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dp++}),this.uuid=It(),this.name="",this.source=new hr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ja)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case eo:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case to:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case eo:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case to:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};gt.DEFAULT_IMAGE=null;gt.DEFAULT_MAPPING=Ja;gt.DEFAULT_ANISOTROPY=1;var st=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*o,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*o,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*o,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,o,l=e.elements,c=l[0],h=l[4],m=l[8],p=l[1],d=l[5],g=l[9],x=l[2],f=l[6],u=l[10];if(Math.abs(h-p)<.01&&Math.abs(m-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(m+x)<.1&&Math.abs(g+f)<.1&&Math.abs(c+d+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(c+1)/2,_=(d+1)/2,D=(u+1)/2,A=(h+p)/4,P=(m+x)/4,L=(g+f)/4;return v>_&&v>D?v<.01?(i=0,r=.707106781,o=.707106781):(i=Math.sqrt(v),r=A/i,o=P/i):_>D?_<.01?(i=.707106781,r=0,o=.707106781):(r=Math.sqrt(_),i=A/r,o=L/r):D<.01?(i=.707106781,r=.707106781,o=0):(o=Math.sqrt(D),i=P/o,r=L/o),this.set(i,r,o,t),this}let y=Math.sqrt((f-g)*(f-g)+(m-x)*(m-x)+(p-h)*(p-h));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(m-x)/y,this.z=(p-h)/y,this.w=Math.acos((c+d+u-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Cs=class extends qt{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);let r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let o=new gt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);o.flipY=!1,o.generateMipmaps=i.generateMipmaps,o.internalFormat=i.internalFormat,this.textures=[];let s=i.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new hr(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Yt=class extends Cs{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}};var fr=class extends gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ps=class extends gt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=St,this.minFilter=St,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ni=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,o,s,a){let l=i[r+0],c=i[r+1],h=i[r+2],m=i[r+3],p=o[s+0],d=o[s+1],g=o[s+2],x=o[s+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=m;return}if(a===1){e[t+0]=p,e[t+1]=d,e[t+2]=g,e[t+3]=x;return}if(m!==x||l!==p||c!==d||h!==g){let f=1-a,u=l*p+c*d+h*g+m*x,y=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){let D=Math.sqrt(v),A=Math.atan2(D,u*y);f=Math.sin(f*A)/D,a=Math.sin(a*A)/D}let _=a*y;if(l=l*f+p*_,c=c*f+d*_,h=h*f+g*_,m=m*f+x*_,f===1-a){let D=1/Math.sqrt(l*l+c*c+h*h+m*m);l*=D,c*=D,h*=D,m*=D}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,r,o,s){let a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],m=o[s],p=o[s+1],d=o[s+2],g=o[s+3];return e[t]=a*g+h*m+l*d-c*p,e[t+1]=l*g+h*p+c*m-a*d,e[t+2]=c*g+h*d+a*p-l*m,e[t+3]=h*g-a*m-l*p-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),m=a(o/2),p=l(i/2),d=l(r/2),g=l(o/2);switch(s){case"XYZ":this._x=p*h*m+c*d*g,this._y=c*d*m-p*h*g,this._z=c*h*g+p*d*m,this._w=c*h*m-p*d*g;break;case"YXZ":this._x=p*h*m+c*d*g,this._y=c*d*m-p*h*g,this._z=c*h*g-p*d*m,this._w=c*h*m+p*d*g;break;case"ZXY":this._x=p*h*m-c*d*g,this._y=c*d*m+p*h*g,this._z=c*h*g+p*d*m,this._w=c*h*m-p*d*g;break;case"ZYX":this._x=p*h*m-c*d*g,this._y=c*d*m+p*h*g,this._z=c*h*g-p*d*m,this._w=c*h*m+p*d*g;break;case"YZX":this._x=p*h*m+c*d*g,this._y=c*d*m+p*h*g,this._z=c*h*g-p*d*m,this._w=c*h*m-p*d*g;break;case"XZY":this._x=p*h*m-c*d*g,this._y=c*d*m-p*h*g,this._z=c*h*g+p*d*m,this._w=c*h*m+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],o=t[8],s=t[1],a=t[5],l=t[9],c=t[2],h=t[6],m=t[10],p=i+a+m;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-l)*d,this._y=(o-c)*d,this._z=(s-r)*d}else if(i>a&&i>m){let d=2*Math.sqrt(1+i-a-m);this._w=(h-l)/d,this._x=.25*d,this._y=(r+s)/d,this._z=(o+c)/d}else if(a>m){let d=2*Math.sqrt(1+a-i-m);this._w=(o-c)/d,this._x=(r+s)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+m-i-a);this._w=(s-r)/d,this._x=(o+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,o=e._z,s=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+s*a+r*c-o*l,this._y=r*h+s*l+o*a-i*c,this._z=o*h+s*c+i*l-r*a,this._w=s*h-i*a-r*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,o=this._z,s=this._w,a=s*e._w+i*e._x+r*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=i,this._y=r,this._z=o,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-t;return this._w=d*s+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*o+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),m=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=s*m+this._w*p,this._x=i*m+this._x*p,this._y=r*m+this._y*p,this._z=o*m+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),o=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var R=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(eh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(eh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*r,this.y=o[1]*t+o[4]*i+o[7]*r,this.z=o[2]*t+o[5]*i+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,o=e.elements,s=1/(o[3]*t+o[7]*i+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*r+o[12])*s,this.y=(o[1]*t+o[5]*i+o[9]*r+o[13])*s,this.z=(o[2]*t+o[6]*i+o[10]*r+o[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*r-a*i),h=2*(a*t-o*r),m=2*(o*i-s*t);return this.x=t+l*c+s*m-a*h,this.y=i+l*h+a*c-o*m,this.z=r+l*m+o*h-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r,this.y=o[1]*t+o[5]*i+o[9]*r,this.z=o[2]*t+o[6]*i+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,o=e.z,s=t.x,a=t.y,l=t.z;return this.x=r*l-o*a,this.y=o*s-i*l,this.z=i*a-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return el.copy(this).projectOnVector(e),this.sub(el)}reflect(e){return this.sub(el.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(mt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},el=new R,eh=new Ni;var qi=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let o=i.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,bi):bi.fromBufferAttribute(o,s),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ls.copy(i.boundingBox)),Ls.applyMatrix4(e.matrixWorld),this.union(Ls)}let r=e.children;for(let o=0,s=r.length;o<s;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Do),Ds.subVectors(this.max,Do),ur.subVectors(e.a,Do),dr.subVectors(e.b,Do),pr.subVectors(e.c,Do),an.subVectors(dr,ur),ln.subVectors(pr,dr),Pn.subVectors(ur,pr);let t=[0,-an.z,an.y,0,-ln.z,ln.y,0,-Pn.z,Pn.y,an.z,0,-an.x,ln.z,0,-ln.x,Pn.z,0,-Pn.x,-an.y,an.x,0,-ln.y,ln.x,0,-Pn.y,Pn.x,0];return!tl(t,ur,dr,pr,Ds)||(t=[1,0,0,0,1,0,0,0,1],!tl(t,ur,dr,pr,Ds))?!1:(Us.crossVectors(an,ln),t=[Us.x,Us.y,Us.z],tl(t,ur,dr,pr,Ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Xi=[new R,new R,new R,new R,new R,new R,new R,new R],bi=new R,Ls=new qi,ur=new R,dr=new R,pr=new R,an=new R,ln=new R,Pn=new R,Do=new R,Ds=new R,Us=new R,Ln=new R;function tl(n,e,t,i,r){for(let o=0,s=n.length-3;o<=s;o+=3){Ln.fromArray(n,o);let a=r.x*Math.abs(Ln.x)+r.y*Math.abs(Ln.y)+r.z*Math.abs(Ln.z),l=e.dot(Ln),c=t.dot(Ln),h=i.dot(Ln);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Up=new qi,Uo=new R,il=new R,cn=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Up.setFromPoints(e).getCenter(i);let r=0;for(let o=0,s=e.length;o<s;o++)r=Math.max(r,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Uo.subVectors(e,this.center);let t=Uo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Uo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(il.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Uo.copy(e.center).add(il)),this.expandByPoint(Uo.copy(e.center).sub(il))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};var Yi=new R,nl=new R,Is=new R,hn=new R,rl=new R,Ns=new R,ol=new R,Fs=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yi.copy(this.origin).addScaledVector(this.direction,t),Yi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){nl.copy(e).add(t).multiplyScalar(.5),Is.copy(t).sub(e).normalize(),hn.copy(this.origin).sub(nl);let o=e.distanceTo(t)*.5,s=-this.direction.dot(Is),a=hn.dot(this.direction),l=-hn.dot(Is),c=hn.lengthSq(),h=Math.abs(1-s*s),m,p,d,g;if(h>0)if(m=s*l-a,p=s*a-l,g=o*h,m>=0)if(p>=-g)if(p<=g){let x=1/h;m*=x,p*=x,d=m*(m+s*p+2*a)+p*(s*m+p+2*l)+c}else p=o,m=Math.max(0,-(s*p+a)),d=-m*m+p*(p+2*l)+c;else p=-o,m=Math.max(0,-(s*p+a)),d=-m*m+p*(p+2*l)+c;else p<=-g?(m=Math.max(0,-(-s*o+a)),p=m>0?-o:Math.min(Math.max(-o,-l),o),d=-m*m+p*(p+2*l)+c):p<=g?(m=0,p=Math.min(Math.max(-o,-l),o),d=p*(p+2*l)+c):(m=Math.max(0,-(s*o+a)),p=m>0?o:Math.min(Math.max(-o,-l),o),d=-m*m+p*(p+2*l)+c);else p=s>0?-o:o,m=Math.max(0,-(s*p+a)),d=-m*m+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,m),r&&r.copy(nl).addScaledVector(Is,p),d}intersectSphere(e,t){Yi.subVectors(e.center,this.origin);let i=Yi.dot(this.direction),r=Yi.dot(Yi)-i*i,o=e.radius*e.radius;if(r>o)return null;let s=Math.sqrt(o-r),a=i-s,l=i+s;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,o,s,a,l,c=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),h>=0?(o=(e.min.y-p.y)*h,s=(e.max.y-p.y)*h):(o=(e.max.y-p.y)*h,s=(e.min.y-p.y)*h),i>s||o>r||((o>i||isNaN(i))&&(i=o),(s<r||isNaN(r))&&(r=s),m>=0?(a=(e.min.z-p.z)*m,l=(e.max.z-p.z)*m):(a=(e.max.z-p.z)*m,l=(e.min.z-p.z)*m),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Yi)!==null}intersectTriangle(e,t,i,r,o){rl.subVectors(t,e),Ns.subVectors(i,e),ol.crossVectors(rl,Ns);let s=this.direction.dot(ol),a;if(s>0){if(r)return null;a=1}else if(s<0)a=-1,s=-s;else return null;hn.subVectors(this.origin,e);let l=a*this.direction.dot(Ns.crossVectors(hn,Ns));if(l<0)return null;let c=a*this.direction.dot(rl.cross(hn));if(c<0||l+c>s)return null;let h=-a*hn.dot(ol);return h<0?null:this.at(h/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Ze=class n{constructor(e,t,i,r,o,s,a,l,c,h,m,p,d,g,x,f){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,o,s,a,l,c,h,m,p,d,g,x,f)}set(e,t,i,r,o,s,a,l,c,h,m,p,d,g,x,f){let u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=r,u[1]=o,u[5]=s,u[9]=a,u[13]=l,u[2]=c,u[6]=h,u[10]=m,u[14]=p,u[3]=d,u[7]=g,u[11]=x,u[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/mr.setFromMatrixColumn(e,0).length(),o=1/mr.setFromMatrixColumn(e,1).length(),s=1/mr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,o=e.z,s=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(o),m=Math.sin(o);if(e.order==="XYZ"){let p=s*h,d=s*m,g=a*h,x=a*m;t[0]=l*h,t[4]=-l*m,t[8]=c,t[1]=d+g*c,t[5]=p-x*c,t[9]=-a*l,t[2]=x-p*c,t[6]=g+d*c,t[10]=s*l}else if(e.order==="YXZ"){let p=l*h,d=l*m,g=c*h,x=c*m;t[0]=p+x*a,t[4]=g*a-d,t[8]=s*c,t[1]=s*m,t[5]=s*h,t[9]=-a,t[2]=d*a-g,t[6]=x+p*a,t[10]=s*l}else if(e.order==="ZXY"){let p=l*h,d=l*m,g=c*h,x=c*m;t[0]=p-x*a,t[4]=-s*m,t[8]=g+d*a,t[1]=d+g*a,t[5]=s*h,t[9]=x-p*a,t[2]=-s*c,t[6]=a,t[10]=s*l}else if(e.order==="ZYX"){let p=s*h,d=s*m,g=a*h,x=a*m;t[0]=l*h,t[4]=g*c-d,t[8]=p*c+x,t[1]=l*m,t[5]=x*c+p,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=s*l}else if(e.order==="YZX"){let p=s*l,d=s*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-p*m,t[8]=g*m+d,t[1]=m,t[5]=s*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*m+g,t[10]=p-x*m}else if(e.order==="XZY"){let p=s*l,d=s*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-m,t[8]=c*h,t[1]=p*m+x,t[5]=s*h,t[9]=d*m-g,t[2]=g*m-d,t[6]=a*h,t[10]=x*m+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ip,e,Np)}lookAt(e,t,i){let r=this.elements;return ei.subVectors(e,t),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),fn.crossVectors(i,ei),fn.lengthSq()===0&&(Math.abs(i.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),fn.crossVectors(i,ei)),fn.normalize(),Os.crossVectors(ei,fn),r[0]=fn.x,r[4]=Os.x,r[8]=ei.x,r[1]=fn.y,r[5]=Os.y,r[9]=ei.y,r[2]=fn.z,r[6]=Os.z,r[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,o=this.elements,s=i[0],a=i[4],l=i[8],c=i[12],h=i[1],m=i[5],p=i[9],d=i[13],g=i[2],x=i[6],f=i[10],u=i[14],y=i[3],v=i[7],_=i[11],D=i[15],A=r[0],P=r[4],L=r[8],b=r[12],M=r[1],C=r[5],z=r[9],O=r[13],F=r[2],V=r[6],G=r[10],K=r[14],W=r[3],he=r[7],ge=r[11],Ee=r[15];return o[0]=s*A+a*M+l*F+c*W,o[4]=s*P+a*C+l*V+c*he,o[8]=s*L+a*z+l*G+c*ge,o[12]=s*b+a*O+l*K+c*Ee,o[1]=h*A+m*M+p*F+d*W,o[5]=h*P+m*C+p*V+d*he,o[9]=h*L+m*z+p*G+d*ge,o[13]=h*b+m*O+p*K+d*Ee,o[2]=g*A+x*M+f*F+u*W,o[6]=g*P+x*C+f*V+u*he,o[10]=g*L+x*z+f*G+u*ge,o[14]=g*b+x*O+f*K+u*Ee,o[3]=y*A+v*M+_*F+D*W,o[7]=y*P+v*C+_*V+D*he,o[11]=y*L+v*z+_*G+D*ge,o[15]=y*b+v*O+_*K+D*Ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],o=e[12],s=e[1],a=e[5],l=e[9],c=e[13],h=e[2],m=e[6],p=e[10],d=e[14],g=e[3],x=e[7],f=e[11],u=e[15];return g*(+o*l*m-r*c*m-o*a*p+i*c*p+r*a*d-i*l*d)+x*(+t*l*d-t*c*p+o*s*p-r*s*d+r*c*h-o*l*h)+f*(+t*c*m-t*a*d-o*s*m+i*s*d+o*a*h-i*c*h)+u*(-r*a*h-t*l*m+t*a*p+r*s*m-i*s*p+i*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],h=e[8],m=e[9],p=e[10],d=e[11],g=e[12],x=e[13],f=e[14],u=e[15],y=m*f*c-x*p*c+x*l*d-a*f*d-m*l*u+a*p*u,v=g*p*c-h*f*c-g*l*d+s*f*d+h*l*u-s*p*u,_=h*x*c-g*m*c+g*a*d-s*x*d-h*a*u+s*m*u,D=g*m*l-h*x*l-g*a*p+s*x*p+h*a*f-s*m*f,A=t*y+i*v+r*_+o*D;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/A;return e[0]=y*P,e[1]=(x*p*o-m*f*o-x*r*d+i*f*d+m*r*u-i*p*u)*P,e[2]=(a*f*o-x*l*o+x*r*c-i*f*c-a*r*u+i*l*u)*P,e[3]=(m*l*o-a*p*o-m*r*c+i*p*c+a*r*d-i*l*d)*P,e[4]=v*P,e[5]=(h*f*o-g*p*o+g*r*d-t*f*d-h*r*u+t*p*u)*P,e[6]=(g*l*o-s*f*o-g*r*c+t*f*c+s*r*u-t*l*u)*P,e[7]=(s*p*o-h*l*o+h*r*c-t*p*c-s*r*d+t*l*d)*P,e[8]=_*P,e[9]=(g*m*o-h*x*o-g*i*d+t*x*d+h*i*u-t*m*u)*P,e[10]=(s*x*o-g*a*o+g*i*c-t*x*c-s*i*u+t*a*u)*P,e[11]=(h*a*o-s*m*o-h*i*c+t*m*c+s*i*d-t*a*d)*P,e[12]=D*P,e[13]=(h*x*r-g*m*r+g*i*p-t*x*p-h*i*f+t*m*f)*P,e[14]=(g*a*r-s*x*r-g*i*l+t*x*l+s*i*f-t*a*f)*P,e[15]=(s*m*r-h*a*r+h*i*l-t*m*l-s*i*p+t*a*p)*P,this}scale(e){let t=this.elements,i=e.x,r=e.y,o=e.z;return t[0]*=i,t[4]*=r,t[8]*=o,t[1]*=i,t[5]*=r,t[9]*=o,t[2]*=i,t[6]*=r,t[10]*=o,t[3]*=i,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),o=1-i,s=e.x,a=e.y,l=e.z,c=o*s,h=o*a;return this.set(c*s+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*s,0,c*l-r*a,h*l+r*s,o*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,o,s){return this.set(1,i,o,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,o=t._x,s=t._y,a=t._z,l=t._w,c=o+o,h=s+s,m=a+a,p=o*c,d=o*h,g=o*m,x=s*h,f=s*m,u=a*m,y=l*c,v=l*h,_=l*m,D=i.x,A=i.y,P=i.z;return r[0]=(1-(x+u))*D,r[1]=(d+_)*D,r[2]=(g-v)*D,r[3]=0,r[4]=(d-_)*A,r[5]=(1-(p+u))*A,r[6]=(f+y)*A,r[7]=0,r[8]=(g+v)*P,r[9]=(f-y)*P,r[10]=(1-(p+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,o=mr.set(r[0],r[1],r[2]).length(),s=mr.set(r[4],r[5],r[6]).length(),a=mr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],Ti.copy(this);let c=1/o,h=1/s,m=1/a;return Ti.elements[0]*=c,Ti.elements[1]*=c,Ti.elements[2]*=c,Ti.elements[4]*=h,Ti.elements[5]*=h,Ti.elements[6]*=h,Ti.elements[8]*=m,Ti.elements[9]*=m,Ti.elements[10]*=m,t.setFromRotationMatrix(Ti),i.x=o,i.y=s,i.z=a,this}makePerspective(e,t,i,r,o,s,a=Xt){let l=this.elements,c=2*o/(t-e),h=2*o/(i-r),m=(t+e)/(t-e),p=(i+r)/(i-r),d,g;if(a===Xt)d=-(s+o)/(s-o),g=-2*s*o/(s-o);else if(a===wn)d=-s/(s-o),g=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=m,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,o,s,a=Xt){let l=this.elements,c=1/(t-e),h=1/(i-r),m=1/(s-o),p=(t+e)*c,d=(i+r)*h,g,x;if(a===Xt)g=(s+o)*m,x=-2*m;else if(a===wn)g=o*m,x=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},mr=new R,Ti=new Ze,Ip=new R(0,0,0),Np=new R(1,1,1),fn=new R,Os=new R,ei=new R;var th=new Ze,ih=new Ni,Zt=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,o=r[0],s=r[4],a=r[8],l=r[1],c=r[5],h=r[9],m=r[2],p=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-m,o),this._z=0);break;case"ZXY":this._x=Math.asin(mt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-m,d),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-mt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-m,o)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-mt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return th.makeRotationFromQuaternion(e),this.setFromRotationMatrix(th,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ih.setFromEuler(this),this.setFromQuaternion(ih,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Zt.DEFAULT_ORDER="XYZ";var gr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var Fp=0,nh=new R,xr=new Ni,Zi=new Ze,Bs=new R,Io=new R,Op=new R,Bp=new Ni,rh=new R(1,0,0),oh=new R(0,1,0),sh=new R(0,0,1),ah={type:"added"},zp={type:"removed"},_r={type:"childadded",child:null},sl={type:"childremoved",child:null},ht=class n extends qt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=It(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new R,t=new Zt,i=new Ni,r=new R(1,1,1);function o(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Ue}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xr.setFromAxisAngle(e,t),this.quaternion.multiply(xr),this}rotateOnWorldAxis(e,t){return xr.setFromAxisAngle(e,t),this.quaternion.premultiply(xr),this}rotateX(e){return this.rotateOnAxis(rh,e)}rotateY(e){return this.rotateOnAxis(oh,e)}rotateZ(e){return this.rotateOnAxis(sh,e)}translateOnAxis(e,t){return nh.copy(e).applyQuaternion(this.quaternion),this.position.add(nh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rh,e)}translateY(e){return this.translateOnAxis(oh,e)}translateZ(e){return this.translateOnAxis(sh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Bs.copy(e):Bs.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),Io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zi.lookAt(Io,Bs,this.up):Zi.lookAt(Bs,Io,this.up),this.quaternion.setFromRotationMatrix(Zi),r&&(Zi.extractRotation(r.matrixWorld),xr.setFromRotationMatrix(Zi),this.quaternion.premultiply(xr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ah),_r.child=e,this.dispatchEvent(_r),_r.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zp),sl.child=e,this.dispatchEvent(sl),sl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ah),_r.child=e,this.dispatchEvent(_r),_r.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Io,e,Op),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Io,Bp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let o=0,s=r.length;o<s;o++)r[o].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let m=l[c];o(e.shapes,m)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));r.material=a}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(o(e.animations,l))}}if(t){let a=s(e.geometries),l=s(e.materials),c=s(e.textures),h=s(e.images),m=s(e.shapes),p=s(e.skeletons),d=s(e.animations),g=s(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),p.length>0&&(i.skeletons=p),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function s(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};ht.DEFAULT_UP=new R(0,1,0);ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ai=new R,Ji=new R,al=new R,Ki=new R,vr=new R,Mr=new R,lh=new R,ll=new R,cl=new R,hl=new R,fl=new st,ul=new st,dl=new st,Fi=class n{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ai.subVectors(e,t),r.cross(Ai);let o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,i,r,o){Ai.subVectors(r,t),Ji.subVectors(i,t),al.subVectors(e,t);let s=Ai.dot(Ai),a=Ai.dot(Ji),l=Ai.dot(al),c=Ji.dot(Ji),h=Ji.dot(al),m=s*c-a*a;if(m===0)return o.set(0,0,0),null;let p=1/m,d=(c*l-a*h)*p,g=(s*h-a*l)*p;return o.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ki)===null?!1:Ki.x>=0&&Ki.y>=0&&Ki.x+Ki.y<=1}static getInterpolation(e,t,i,r,o,s,a,l){return this.getBarycoord(e,t,i,r,Ki)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Ki.x),l.addScaledVector(s,Ki.y),l.addScaledVector(a,Ki.z),l)}static getInterpolatedAttribute(e,t,i,r,o,s){return fl.setScalar(0),ul.setScalar(0),dl.setScalar(0),fl.fromBufferAttribute(e,t),ul.fromBufferAttribute(e,i),dl.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(fl,o.x),s.addScaledVector(ul,o.y),s.addScaledVector(dl,o.z),s}static isFrontFacing(e,t,i,r){return Ai.subVectors(i,t),Ji.subVectors(e,t),Ai.cross(Ji).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),Ji.subVectors(this.a,this.b),Ai.cross(Ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,o){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,o)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,o=this.c,s,a;vr.subVectors(r,i),Mr.subVectors(o,i),ll.subVectors(e,i);let l=vr.dot(ll),c=Mr.dot(ll);if(l<=0&&c<=0)return t.copy(i);cl.subVectors(e,r);let h=vr.dot(cl),m=Mr.dot(cl);if(h>=0&&m<=h)return t.copy(r);let p=l*m-h*c;if(p<=0&&l>=0&&h<=0)return s=l/(l-h),t.copy(i).addScaledVector(vr,s);hl.subVectors(e,o);let d=vr.dot(hl),g=Mr.dot(hl);if(g>=0&&d<=g)return t.copy(o);let x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Mr,a);let f=h*g-d*m;if(f<=0&&m-h>=0&&d-g>=0)return lh.subVectors(o,r),a=(m-h)/(m-h+(d-g)),t.copy(r).addScaledVector(lh,a);let u=1/(f+x+p);return s=x*u,a=p*u,t.copy(i).addScaledVector(vr,s).addScaledVector(Mr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var ch={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},un={h:0,s:0,l:0},zs={h:0,s:0,l:0};function pl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Fe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=qe.workingColorSpace){if(e=kc(e,1),t=mt(t,0,1),i=mt(i,0,1),t===0)this.r=this.g=this.b=i;else{let o=i<=.5?i*(1+t):i+t-i*t,s=2*i-o;this.r=pl(s,o,e+1/3),this.g=pl(s,o,e),this.b=pl(s,o,e-1/3)}return qe.toWorkingColorSpace(this,r),this}setStyle(e,t=Gt){function i(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o,s=r[1],a=r[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let o=r[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){let i=ch[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return qe.fromWorkingColorSpace(Nt.copy(this),e),Math.round(mt(Nt.r*255,0,255))*65536+Math.round(mt(Nt.g*255,0,255))*256+Math.round(mt(Nt.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(Nt.copy(this),t);let i=Nt.r,r=Nt.g,o=Nt.b,s=Math.max(i,r,o),a=Math.min(i,r,o),l,c,h=(a+s)/2;if(a===s)l=0,c=0;else{let m=s-a;switch(c=h<=.5?m/(s+a):m/(2-s-a),s){case i:l=(r-o)/m+(r<o?6:0);break;case r:l=(o-i)/m+2;break;case o:l=(i-r)/m+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Gt){qe.fromWorkingColorSpace(Nt.copy(this),e);let t=Nt.r,i=Nt.g,r=Nt.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(un),this.setHSL(un.h+e,un.s+t,un.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(un),e.getHSL(zs);let i=As(un.h,zs.h,t),r=As(un.s,zs.s,t),o=As(un.l,zs.l,t);return this.setHSL(i,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*i+o[6]*r,this.g=o[1]*t+o[4]*i+o[7]*r,this.b=o[2]*t+o[5]*i+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Nt=new Fe;Fe.NAMES=ch;var Gp=0,Jt=class extends qt{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=It(),this.name="",this.blending=Hi,this.side=jt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kr,this.blendDst=jr,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=on,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ka,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=An,this.stencilZFail=An,this.stencilZPass=An,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(i.blending=this.blending),this.side!==jt&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Kr&&(i.blendSrc=this.blendSrc),this.blendDst!==jr&&(i.blendDst=this.blendDst),this.blendEquation!==ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==on&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ka&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==An&&(i.stencilFail=this.stencilFail),this.stencilZFail!==An&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==An&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(o){let s=[];for(let a in o){let l=o[a];delete l.metadata,s.push(l)}return s}if(t){let o=r(e.textures),s=r(e.images);o.length>0&&(i.textures=o),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let o=0;o!==r;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}};var ji=class extends Jt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.combine=fs,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Et=new R,Gs=new J,Ct=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Po,this.updateRanges=[],this.gpuType=zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Gs.fromBufferAttribute(this,t),Gs.applyMatrix3(e),this.setXY(t,Gs.x,Gs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ci(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ot(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),r=ot(r,this.array),o=ot(o,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Po&&(e.usage=this.usage),e}};var Sr=class extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var yr=class extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var je=class extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}};var Vp=0,hi=new Ze,ml=new ht,Er=new R,ti=new qi,No=new qi,wt=new R,ft=class n extends qt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=It(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ws(e)?yr:Sr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new Ue().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,t,i){return hi.makeTranslation(e,t,i),this.applyMatrix4(hi),this}scale(e,t,i){return hi.makeScale(e,t,i),this.applyMatrix4(hi),this}lookAt(e){return ml.lookAt(e),ml.updateMatrix(),this.applyMatrix4(ml.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,o=e.length;r<o;r++){let s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new je(i,3))}else{for(let i=0,r=t.count;i<r;i++){let o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let o=t[i];ti.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,ti.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,ti.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(ti.min),this.boundingBox.expandByPoint(ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let i=this.boundingSphere.center;if(ti.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){let a=t[o];No.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(ti.min,No.min),ti.expandByPoint(wt),wt.addVectors(ti.max,No.max),ti.expandByPoint(wt)):(ti.expandByPoint(No.min),ti.expandByPoint(No.max))}ti.getCenter(i);let r=0;for(let o=0,s=e.count;o<s;o++)wt.fromBufferAttribute(e,o),r=Math.max(r,i.distanceToSquared(wt));if(t)for(let o=0,s=t.length;o<s;o++){let a=t[o],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)wt.fromBufferAttribute(a,c),l&&(Er.fromBufferAttribute(e,c),wt.add(Er)),r=Math.max(r,i.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*i.count),4));let s=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new R,l[L]=new R;let c=new R,h=new R,m=new R,p=new J,d=new J,g=new J,x=new R,f=new R;function u(L,b,M){c.fromBufferAttribute(i,L),h.fromBufferAttribute(i,b),m.fromBufferAttribute(i,M),p.fromBufferAttribute(o,L),d.fromBufferAttribute(o,b),g.fromBufferAttribute(o,M),h.sub(c),m.sub(c),d.sub(p),g.sub(p);let C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(m,-d.y).multiplyScalar(C),f.copy(m).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(C),a[L].add(x),a[b].add(x),a[M].add(x),l[L].add(f),l[b].add(f),l[M].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let L=0,b=y.length;L<b;++L){let M=y[L],C=M.start,z=M.count;for(let O=C,F=C+z;O<F;O+=3)u(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let v=new R,_=new R,D=new R,A=new R;function P(L){D.fromBufferAttribute(r,L),A.copy(D);let b=a[L];v.copy(b),v.sub(D.multiplyScalar(D.dot(b))).normalize(),_.crossVectors(A,b);let C=_.dot(l[L])<0?-1:1;s.setXYZW(L,v.x,v.y,v.z,C)}for(let L=0,b=y.length;L<b;++L){let M=y[L],C=M.start,z=M.count;for(let O=C,F=C+z;O<F;O+=3)P(e.getX(O+0)),P(e.getX(O+1)),P(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,d=i.count;p<d;p++)i.setXYZ(p,0,0,0);let r=new R,o=new R,s=new R,a=new R,l=new R,c=new R,h=new R,m=new R;if(e)for(let p=0,d=e.count;p<d;p+=3){let g=e.getX(p+0),x=e.getX(p+1),f=e.getX(p+2);r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,x),s.fromBufferAttribute(t,f),h.subVectors(s,o),m.subVectors(r,o),h.cross(m),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,f),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,d=t.count;p<d;p+=3)r.fromBufferAttribute(t,p+0),o.fromBufferAttribute(t,p+1),s.fromBufferAttribute(t,p+2),h.subVectors(s,o),m.subVectors(r,o),h.cross(m),i.setXYZ(p+0,h.x,h.y,h.z),i.setXYZ(p+1,h.x,h.y,h.z),i.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,m=a.normalized,p=new c.constructor(l.length*h),d=0,g=0;for(let x=0,f=l.length;x<f;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let u=0;u<h;u++)p[g++]=c[d++]}return new Ct(p,h,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let o=this.morphAttributes;for(let a in o){let l=[],c=o[a];for(let h=0,m=c.length;h<m;h++){let p=c[h],d=e(p,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,l=s.length;a<l;a++){let c=s[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},o=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let m=0,p=c.length;m<p;m++){let d=c[m];h.push(d.toJSON(e.data))}h.length>0&&(r[l]=h,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let o=e.morphAttributes;for(let c in o){let h=[],m=o[c];for(let p=0,d=m.length;p<d;p++)h.push(m[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let c=0,h=s.length;c<h;c++){let m=s[c];this.addGroup(m.start,m.count,m.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var hh=new Ze,Dn=new Fs,Vs=new cn,fh=new R,Hs=new R,ks=new R,Ws=new R,gl=new R,Xs=new R,uh=new R,qs=new R,bt=class extends ht{constructor(e=new ft,t=new ji){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=r.length;o<s;o++){let a=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,o=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(o&&a){Xs.set(0,0,0);for(let l=0,c=o.length;l<c;l++){let h=a[l],m=o[l];h!==0&&(gl.fromBufferAttribute(m,e),s?Xs.addScaledVector(gl,h):Xs.addScaledVector(gl.sub(t),h))}t.add(Xs)}return t}raycast(e,t){let i=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vs.copy(i.boundingSphere),Vs.applyMatrix4(o),Dn.copy(e.ray).recast(e.near),!(Vs.containsPoint(Dn.origin)===!1&&(Dn.intersectSphere(Vs,fh)===null||Dn.origin.distanceToSquared(fh)>(e.far-e.near)**2))&&(hh.copy(o).invert(),Dn.copy(e.ray).applyMatrix4(hh),!(i.boundingBox!==null&&Dn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Dn)))}_computeIntersections(e,t,i){let r,o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,m=o.attributes.normal,p=o.groups,d=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,x=p.length;g<x;g++){let f=p[g],u=s[f.materialIndex],y=Math.max(f.start,d.start),v=Math.min(a.count,Math.min(f.start+f.count,d.start+d.count));for(let _=y,D=v;_<D;_+=3){let A=a.getX(_),P=a.getX(_+1),L=a.getX(_+2);r=Ys(this,u,e,i,c,h,m,A,P,L),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let f=g,u=x;f<u;f+=3){let y=a.getX(f),v=a.getX(f+1),_=a.getX(f+2);r=Ys(this,s,e,i,c,h,m,y,v,_),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,x=p.length;g<x;g++){let f=p[g],u=s[f.materialIndex],y=Math.max(f.start,d.start),v=Math.min(l.count,Math.min(f.start+f.count,d.start+d.count));for(let _=y,D=v;_<D;_+=3){let A=_,P=_+1,L=_+2;r=Ys(this,u,e,i,c,h,m,A,P,L),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{let g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let f=g,u=x;f<u;f+=3){let y=f,v=f+1,_=f+2;r=Ys(this,s,e,i,c,h,m,y,v,_),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}};function Hp(n,e,t,i,r,o,s,a){let l;if(e.side===pt?l=i.intersectTriangle(s,o,r,!0,a):l=i.intersectTriangle(r,o,s,e.side===jt,a),l===null)return null;qs.copy(a),qs.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(qs);return c<t.near||c>t.far?null:{distance:c,point:qs.clone(),object:n}}function Ys(n,e,t,i,r,o,s,a,l,c){n.getVertexPosition(a,Hs),n.getVertexPosition(l,ks),n.getVertexPosition(c,Ws);let h=Hp(n,e,t,i,Hs,ks,Ws,uh);if(h){let m=new R;Fi.getBarycoord(uh,Hs,ks,Ws,m),r&&(h.uv=Fi.getInterpolatedAttribute(r,a,l,c,m,new J)),o&&(h.uv1=Fi.getInterpolatedAttribute(o,a,l,c,m,new J)),s&&(h.normal=Fi.getInterpolatedAttribute(s,a,l,c,m,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let p={a,b:l,c,normal:new R,materialIndex:0};Fi.getNormal(Hs,ks,Ws,p.normal),h.face=p,h.barycoord=m}return h}var fi=class n extends ft{constructor(e=1,t=1,i=1,r=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:o,depthSegments:s};let a=this;r=Math.floor(r),o=Math.floor(o),s=Math.floor(s);let l=[],c=[],h=[],m=[],p=0,d=0;g("z","y","x",-1,-1,i,t,e,s,o,0),g("z","y","x",1,-1,i,t,-e,s,o,1),g("x","z","y",1,1,e,i,t,r,s,2),g("x","z","y",1,-1,e,i,-t,r,s,3),g("x","y","z",1,-1,e,t,i,r,o,4),g("x","y","z",-1,-1,e,t,-i,r,o,5),this.setIndex(l),this.setAttribute("position",new je(c,3)),this.setAttribute("normal",new je(h,3)),this.setAttribute("uv",new je(m,2));function g(x,f,u,y,v,_,D,A,P,L,b){let M=_/P,C=D/L,z=_/2,O=D/2,F=A/2,V=P+1,G=L+1,K=0,W=0,he=new R;for(let ge=0;ge<G;ge++){let Ee=ge*C-O;for(let He=0;He<V;He++){let it=He*M-z;he[x]=it*y,he[f]=Ee*v,he[u]=F,c.push(he.x,he.y,he.z),he[x]=0,he[f]=0,he[u]=A>0?1:-1,h.push(he.x,he.y,he.z),m.push(He/P),m.push(1-ge/L),K+=1}}for(let ge=0;ge<L;ge++)for(let Ee=0;Ee<P;Ee++){let He=p+Ee+V*ge,it=p+Ee+V*(ge+1),Z=p+(Ee+1)+V*(ge+1),re=p+(Ee+1)+V*ge;l.push(He,it,re),l.push(it,Z,re),W+=6}a.addGroup(d,W,b),d+=W,p+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Qi(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Ft(n){let e={};for(let t=0;t<n.length;t++){let i=Qi(n[t]);for(let r in i)e[r]=i[r]}return e}function dh(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Zs(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}var ph={clone:Qi,merge:Ft};var mh=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var gh=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var Rt=class extends Jt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mh,this.fragmentShader=gh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=dh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}};var br=class extends ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Xt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};var dn=new R,xh=new J,_h=new J,Pt=class extends br{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Lo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Lo*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dn.x,dn.y).multiplyScalar(-e/dn.z),dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(dn.x,dn.y).multiplyScalar(-e/dn.z)}getViewSize(e,t){return this.getViewBounds(e,xh,_h),t.subVectors(_h,xh)}setViewOffset(e,t,i,r,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ts*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,o=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*r/l,t-=s.offsetY*i/c,r*=s.width/l,i*=s.height/c}let a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Tr=-90,Ar=1,Js=class extends ht{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Pt(Tr,Ar,e,t);r.layers=this.layers,this.add(r);let o=new Pt(Tr,Ar,e,t);o.layers=this.layers,this.add(o);let s=new Pt(Tr,Ar,e,t);s.layers=this.layers,this.add(s);let a=new Pt(Tr,Ar,e,t);a.layers=this.layers,this.add(a);let l=new Pt(Tr,Ar,e,t);l.layers=this.layers,this.add(l);let c=new Pt(Tr,Ar,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,o,s,a,l]=t;for(let c of t)this.remove(c);if(e===Xt)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wn)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[o,s,a,l,c,h]=this.children,m=e.getRenderTarget(),p=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,o),e.setRenderTarget(i,1,r),e.render(t,s),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(m,p,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}};var wr=class extends gt{constructor(e,t,i,r,o,s,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:_i,super(e,t,i,r,o,s,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ks=class extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new wr(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new fi(5,5,5),o=new Rt({name:"CubemapFromEquirect",uniforms:Qi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pt,blending:si});o.uniforms.tEquirect.value=t;let s=new bt(r,o),a=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Bt),new Js(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,r){let o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(o)}};var xl=new R,kp=new R,Wp=new Ue,wi=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=xl.subVectors(i,t).cross(kp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(xl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Wp.getNormalMatrix(e),r=this.coplanarPoint(xl).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};var Un=new cn,js=new R,pn=class{constructor(e=new wi,t=new wi,i=new wi,r=new wi,o=new wi,s=new wi){this.planes=[e,t,i,r,o,s]}set(e,t,i,r,o,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(o),a[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Xt){let i=this.planes,r=e.elements,o=r[0],s=r[1],a=r[2],l=r[3],c=r[4],h=r[5],m=r[6],p=r[7],d=r[8],g=r[9],x=r[10],f=r[11],u=r[12],y=r[13],v=r[14],_=r[15];if(i[0].setComponents(l-o,p-c,f-d,_-u).normalize(),i[1].setComponents(l+o,p+c,f+d,_+u).normalize(),i[2].setComponents(l+s,p+h,f+g,_+y).normalize(),i[3].setComponents(l-s,p-h,f-g,_-y).normalize(),i[4].setComponents(l-a,p-m,f-x,_-v).normalize(),t===Xt)i[5].setComponents(l+a,p+m,f+x,_+v).normalize();else if(t===wn)i[5].setComponents(a,m,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Un.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Un.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Un)}intersectsSprite(e){return Un.center.set(0,0,0),Un.radius=.7071067811865476,Un.applyMatrix4(e.matrixWorld),this.intersectsSphere(Un)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(js.x=r.normal.x>0?e.max.x:e.min.x,js.y=r.normal.y>0?e.max.y:e.min.y,js.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(js)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Qs(){let n=null,e=!1,t=null,i=null;function r(o,s){t(o,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){n=o}}}function vh(n){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,m=c.byteLength,p=n.createBuffer();n.bindBuffer(l,p),n.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:m}}function i(a,l,c){let h=l.array,m=l.updateRanges;if(n.bindBuffer(c,a),m.length===0)n.bufferSubData(c,0,h);else{m.sort((d,g)=>d.start-g.start);let p=0;for(let d=1;d<m.length;d++){let g=m[p],x=m[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++p,m[p]=x)}m.length=p+1;for(let d=0,g=m.length;d<g;d++){let x=m[d];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:o,update:s}}var mn=class n extends ft{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let o=e/2,s=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,m=e/a,p=t/l,d=[],g=[],x=[],f=[];for(let u=0;u<h;u++){let y=u*p-s;for(let v=0;v<c;v++){let _=v*m-o;g.push(_,-y,0),x.push(0,0,1),f.push(v/a),f.push(1-u/l)}}for(let u=0;u<l;u++)for(let y=0;y<a;y++){let v=y+c*u,_=y+c*(u+1),D=y+1+c*(u+1),A=y+1+c*u;d.push(v,_,A),d.push(_,D,A)}this.setIndex(d),this.setAttribute("position",new je(g,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Mh=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`;var Sh=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (\u03B1\u03C4)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids \u03B1\u03C4 == 0. Could also do \u03B1\u03C4 =1-\u03B1\u03C4
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`;var yh=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`;var Eh=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var bh=`
#ifdef USE_ALPHATEST

	#ifdef ALPHA_TO_COVERAGE

	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;

	#else

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

#endif
`;var Th=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`;var Ah=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`;var wh=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var Rh=`
#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif

	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}

	float getIndirectIndex( const in int i ) {

		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );

	}

#endif

#ifdef USE_BATCHING_COLOR

	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {

		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;

	}

#endif
`;var Ch=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif
`;var Ph=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`;var Lh=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var Dh=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`;var Uh=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`;var Ih=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`;var Nh=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#ifdef ALPHA_TO_COVERAGE

		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			if ( clipOpacity == 0.0 ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			float unionClipOpacity = 1.0;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			}
			#pragma unroll_loop_end

			clipOpacity *= 1.0 - unionClipOpacity;

		#endif

		diffuseColor.a *= clipOpacity;

		if ( diffuseColor.a == 0.0 ) discard;

	#else

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			bool clipped = true;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

			}
			#pragma unroll_loop_end

			if ( clipped ) discard;

		#endif

	#endif

#endif
`;var Fh=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var Oh=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var Bh=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var zh=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`;var Gh=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`;var Vh=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	varying vec3 vColor;

#endif
`;var Hh=`
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif

#ifdef USE_BATCHING_COLOR

	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );

	vColor.xyz *= batchingColor.xyz;

#endif
`;var kh=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`;var Wh=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`;var Xh=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`;var qh=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var Yh=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`;var Zh=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		emissiveColor = sRGBTransferEOTF( emissiveColor );

	#endif

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var Jh=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var Kh=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var jh=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`;var Qh=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`;var $h=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`;var ef=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`;var tf=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`;var nf=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`;var rf=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var of=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var sf=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var af=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`;var lf=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`;var cf=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var hf=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`;var ff=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`;var uf=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if ( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`;var df=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
`;var pf=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var mf=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`;var gf=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var xf=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`;var _f=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_DISPERSION

	material.dispersion = dispersion;

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`;var vf=`

struct PhysicalMaterial {

	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney\u2019s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );

		return saturate(v);

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approxmation to the "Charlie sheen" BRDF integrated over the hemisphere from 
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;

	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

	return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

	return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Ag\xFCera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

	#endif

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

	#else

		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

	#endif

	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`;var Mf=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`;var Sf=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getIBLIrradiance( geometryNormal );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`;var yf=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`;var Ef=`
#if defined( USE_LOGDEPTHBUF )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var bf=`
#if defined( USE_LOGDEPTHBUF )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var Tf=`
#ifdef USE_LOGDEPTHBUF

	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var Af=`
#ifdef USE_LOGDEPTHBUF

	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

#endif
`;var wf=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;var Rf=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var Cf=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`;var Pf=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var Lf=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var Df=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var Uf=`
#ifdef USE_INSTANCING_MORPH

	float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;

	}
#endif
`;var If=`
#if defined( USE_MORPHCOLORS )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`;var Nf=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`;var Ff=`
#ifdef USE_MORPHTARGETS

	#ifndef USE_INSTANCING_MORPH

		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	#endif

	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;

	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;

		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );

	}

#endif
`;var Of=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`;var Bf=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`;var zf=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;var Gf=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Vf=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Hf=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`;var kf=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`;var Wf=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`;var Xf=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`;var qf=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`;var Yf=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`;var Zf=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;var Jf=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)
const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;

const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );

const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );

vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}

vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	// the 0.9999 tweak is unimportant, very tiny empirical improvement
	// return vec3( vuf * Inv255, gf * PackUpscale, bf * 0.9999 );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}

vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}

float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}

float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}

vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps orthographic depth in [ 0, 1 ] to viewZ
	return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps perspective depth in [ 0, 1 ] to viewZ
	return ( near * far ) / ( ( far - near ) * depth - far );
}
`;var Kf=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var jf=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var Qf=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var $f=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`;var eu=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var tu=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var iu=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		float hard_shadow = step( compare , distribution.x ); // Hard Shadow

		if (hard_shadow != 1.0 ) {

			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );

		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {

			// dp = normalized distance from light to fragment position
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
			dp += shadowBias;

			// bd3D = base direction 3D
			vec3 bd3D = normalize( lightToPosition );

			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );

			#else // no percentage-closer filtering

				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

			#endif

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

#endif
`;var nu=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`;var ru=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`;var ou=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`;var su=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var au=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`;var lu=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var cu=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`;var hu=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var fu=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var uu=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var du=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 CineonToneMapping( vec3 color ) {

	// filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// AgX Tone Mapping implementation based on Filament, which in turn is based
// on Blender's implementation using rec 2020 primaries
// https://github.com/google/filament/pull/7236
// Inputs and outputs are encoded as Linear-sRGB.

vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	// LOG2_MIN      = -10.0
	// LOG2_MAX      =  +6.5
	// MIDDLE_GRAY   =  0.18
	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

	color *= toneMappingExposure;

	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	// Gamut mapping. Simple clamp for now.
	color = clamp( color, 0.0, 1.0 );

	return color;

}

// https://modelviewer.dev/examples/tone-mapping

vec3 NeutralToneMapping( vec3 color ) {

	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;

	color *= toneMappingExposure;

	float x = min( color.r, min( color.g, color.b ) );

	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

	color -= offset;

	float peak = max( color.r, max( color.g, color.b ) );

	if ( peak < StartCompression ) return color;

	float d = 1. - StartCompression;

	float newPeak = 1. - d * d / ( peak + d - StartCompression );

	color *= newPeak / peak;

	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );

	return mix( color, vec3( newPeak ), g );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`;var pu=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`;var mu=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independant scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec4 transmittedLight;
		vec3 transmittance;

		#ifdef USE_DISPERSION

			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );

			for ( int i = 0; i < 3; i ++ ) {

				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				// Sample framebuffer to get pixel the refracted ray hits.
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;

				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];

			}

			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;

			// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;

			// Sample framebuffer to get pixel the refracted ray hits.
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif

		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job 
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`;var gu=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var xu=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var _u=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`;var vu=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`;var Mu=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,Su=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var yu=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,Eu=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var bu=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,Tu=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var Au=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,wu=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#elif DEPTH_PACKING == 3202

		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );

	#elif DEPTH_PACKING == 3203

		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );

	#endif

}
`;var Ru=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,Cu=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`;var Pu=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,Lu=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var Du=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,Uu=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var Iu=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,Nu=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Fu=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Ou=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Bu=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,zu=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Gu=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,Vu=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`;var Hu=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,ku=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Wu=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,Xu=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_DISPERSION
	uniform float dispersion;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var qu=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Yu=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Zu=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,Ju=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var Ku=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,ju=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var Qu=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix[ 3 ];

	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,$u=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var ke={alphahash_fragment:Mh,alphahash_pars_fragment:Sh,alphamap_fragment:yh,alphamap_pars_fragment:Eh,alphatest_fragment:bh,alphatest_pars_fragment:Th,aomap_fragment:Ah,aomap_pars_fragment:wh,batching_pars_vertex:Rh,batching_vertex:Ch,begin_vertex:Ph,beginnormal_vertex:Lh,bsdfs:Dh,iridescence_fragment:Uh,bumpmap_pars_fragment:Ih,clipping_planes_fragment:Nh,clipping_planes_pars_fragment:Fh,clipping_planes_pars_vertex:Oh,clipping_planes_vertex:Bh,color_fragment:zh,color_pars_fragment:Gh,color_pars_vertex:Vh,color_vertex:Hh,common:kh,cube_uv_reflection_fragment:Wh,defaultnormal_vertex:Xh,displacementmap_pars_vertex:qh,displacementmap_vertex:Yh,emissivemap_fragment:Zh,emissivemap_pars_fragment:Jh,colorspace_fragment:Kh,colorspace_pars_fragment:jh,envmap_fragment:Qh,envmap_common_pars_fragment:$h,envmap_pars_fragment:ef,envmap_pars_vertex:tf,envmap_physical_pars_fragment:df,envmap_vertex:nf,fog_vertex:rf,fog_pars_vertex:of,fog_fragment:sf,fog_pars_fragment:af,gradientmap_pars_fragment:lf,lightmap_pars_fragment:cf,lights_lambert_fragment:hf,lights_lambert_pars_fragment:ff,lights_pars_begin:uf,lights_toon_fragment:pf,lights_toon_pars_fragment:mf,lights_phong_fragment:gf,lights_phong_pars_fragment:xf,lights_physical_fragment:_f,lights_physical_pars_fragment:vf,lights_fragment_begin:Mf,lights_fragment_maps:Sf,lights_fragment_end:yf,logdepthbuf_fragment:Ef,logdepthbuf_pars_fragment:bf,logdepthbuf_pars_vertex:Tf,logdepthbuf_vertex:Af,map_fragment:wf,map_pars_fragment:Rf,map_particle_fragment:Cf,map_particle_pars_fragment:Pf,metalnessmap_fragment:Lf,metalnessmap_pars_fragment:Df,morphinstance_vertex:Uf,morphcolor_vertex:If,morphnormal_vertex:Nf,morphtarget_pars_vertex:Ff,morphtarget_vertex:Of,normal_fragment_begin:Bf,normal_fragment_maps:zf,normal_pars_fragment:Gf,normal_pars_vertex:Vf,normal_vertex:Hf,normalmap_pars_fragment:kf,clearcoat_normal_fragment_begin:Wf,clearcoat_normal_fragment_maps:Xf,clearcoat_pars_fragment:qf,iridescence_pars_fragment:Yf,opaque_fragment:Zf,packing:Jf,premultiplied_alpha_fragment:Kf,project_vertex:jf,dithering_fragment:Qf,dithering_pars_fragment:$f,roughnessmap_fragment:eu,roughnessmap_pars_fragment:tu,shadowmap_pars_fragment:iu,shadowmap_pars_vertex:nu,shadowmap_vertex:ru,shadowmask_pars_fragment:ou,skinbase_vertex:su,skinning_pars_vertex:au,skinning_vertex:lu,skinnormal_vertex:cu,specularmap_fragment:hu,specularmap_pars_fragment:fu,tonemapping_fragment:uu,tonemapping_pars_fragment:du,transmission_fragment:pu,transmission_pars_fragment:mu,uv_pars_fragment:gu,uv_pars_vertex:xu,uv_vertex:_u,worldpos_vertex:vu,background_vert:Mu,background_frag:Su,backgroundCube_vert:yu,backgroundCube_frag:Eu,cube_vert:bu,cube_frag:Tu,depth_vert:Au,depth_frag:wu,distanceRGBA_vert:Ru,distanceRGBA_frag:Cu,equirect_vert:Pu,equirect_frag:Lu,linedashed_vert:Du,linedashed_frag:Uu,meshbasic_vert:Iu,meshbasic_frag:Nu,meshlambert_vert:Fu,meshlambert_frag:Ou,meshmatcap_vert:Bu,meshmatcap_frag:zu,meshnormal_vert:Gu,meshnormal_frag:Vu,meshphong_vert:Hu,meshphong_frag:ku,meshphysical_vert:Wu,meshphysical_frag:Xu,meshtoon_vert:qu,meshtoon_frag:Yu,points_vert:Zu,points_frag:Ju,shadow_vert:Ku,shadow_frag:ju,sprite_vert:Qu,sprite_frag:$u};var ce={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}};var ui={basic:{uniforms:Ft([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Ft([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Fe(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Ft([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Ft([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Ft([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Fe(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Ft([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Ft([ce.points,ce.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Ft([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Ft([ce.common,ce.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Ft([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Ft([ce.sprite,ce.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Ft([ce.common,ce.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Ft([ce.lights,ce.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};ui.physical={uniforms:Ft([ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var $s={r:0,b:0,g:0},In=new Zt,lm=new Ze;function ed(n,e,t,i,r,o,s){let a=new Fe(0),l=o===!0?0:1,c,h,m=null,p=0,d=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function x(y){let v=!1,_=g(y);_===null?u(a,l):_&&_.isColor&&(u(_,1),v=!0);let D=n.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(y,v){let _=g(v);_&&(_.isCubeTexture||_.mapping===sn)?(h===void 0&&(h=new bt(new fi(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Qi(ui.backgroundCube.uniforms),vertexShader:ui.backgroundCube.vertexShader,fragmentShader:ui.backgroundCube.fragmentShader,side:pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),In.copy(v.backgroundRotation),In.x*=-1,In.y*=-1,In.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(In.y*=-1,In.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(lm.makeRotationFromEuler(In)),h.material.toneMapped=qe.getTransfer(_.colorSpace)!==$e,(m!==_||p!==_.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,m=_,p=_.version,d=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new bt(new mn(2,2),new Rt({name:"BackgroundMaterial",uniforms:Qi(ui.background.uniforms),vertexShader:ui.background.vertexShader,fragmentShader:ui.background.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=qe.getTransfer(_.colorSpace)!==$e,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(m!==_||p!==_.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,m=_,p=_.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function u(y,v){y.getRGB($s,Zs(n)),i.buffers.color.setClear($s.r,$s.g,$s.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,u(a,l)},render:x,addToRenderList:f}}function td(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=p(null),o=r,s=!1;function a(M,C,z,O,F){let V=!1,G=m(O,z,C);o!==G&&(o=G,c(o.object)),V=d(M,O,z,F),V&&g(M,O,z,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(V||s)&&(s=!1,_(M,C,z,O),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function m(M,C,z){let O=z.wireframe===!0,F=i[M.id];F===void 0&&(F={},i[M.id]=F);let V=F[C.id];V===void 0&&(V={},F[C.id]=V);let G=V[O];return G===void 0&&(G=p(l()),V[O]=G),G}function p(M){let C=[],z=[],O=[];for(let F=0;F<t;F++)C[F]=0,z[F]=0,O[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:z,attributeDivisors:O,object:M,attributes:{},index:null}}function d(M,C,z,O){let F=o.attributes,V=C.attributes,G=0,K=z.getAttributes();for(let W in K)if(K[W].location>=0){let ge=F[W],Ee=V[W];if(Ee===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(Ee=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(Ee=M.instanceColor)),ge===void 0||ge.attribute!==Ee||Ee&&ge.data!==Ee.data)return!0;G++}return o.attributesNum!==G||o.index!==O}function g(M,C,z,O){let F={},V=C.attributes,G=0,K=z.getAttributes();for(let W in K)if(K[W].location>=0){let ge=V[W];ge===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor));let Ee={};Ee.attribute=ge,ge&&ge.data&&(Ee.data=ge.data),F[W]=Ee,G++}o.attributes=F,o.attributesNum=G,o.index=O}function x(){let M=o.newAttributes;for(let C=0,z=M.length;C<z;C++)M[C]=0}function f(M){u(M,0)}function u(M,C){let z=o.newAttributes,O=o.enabledAttributes,F=o.attributeDivisors;z[M]=1,O[M]===0&&(n.enableVertexAttribArray(M),O[M]=1),F[M]!==C&&(n.vertexAttribDivisor(M,C),F[M]=C)}function y(){let M=o.newAttributes,C=o.enabledAttributes;for(let z=0,O=C.length;z<O;z++)C[z]!==M[z]&&(n.disableVertexAttribArray(z),C[z]=0)}function v(M,C,z,O,F,V,G){G===!0?n.vertexAttribIPointer(M,C,z,F,V):n.vertexAttribPointer(M,C,z,O,F,V)}function _(M,C,z,O){x();let F=O.attributes,V=z.getAttributes(),G=C.defaultAttributeValues;for(let K in V){let W=V[K];if(W.location>=0){let he=F[K];if(he===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(he=M.instanceColor)),he!==void 0){let ge=he.normalized,Ee=he.itemSize,He=e.get(he);if(He===void 0)continue;let it=He.buffer,Z=He.type,re=He.bytesPerElement,be=Z===n.INT||Z===n.UNSIGNED_INT||he.gpuType===jn;if(he.isInterleavedBufferAttribute){let se=he.data,De=se.stride,ze=he.offset;if(se.isInstancedInterleavedBuffer){for(let Oe=0;Oe<W.locationSize;Oe++)u(W.location+Oe,se.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Oe=0;Oe<W.locationSize;Oe++)f(W.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,it);for(let Oe=0;Oe<W.locationSize;Oe++)v(W.location+Oe,Ee/W.locationSize,Z,ge,De*re,(ze+Ee/W.locationSize*Oe)*re,be)}else{if(he.isInstancedBufferAttribute){for(let se=0;se<W.locationSize;se++)u(W.location+se,he.meshPerAttribute);M.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let se=0;se<W.locationSize;se++)f(W.location+se);n.bindBuffer(n.ARRAY_BUFFER,it);for(let se=0;se<W.locationSize;se++)v(W.location+se,Ee/W.locationSize,Z,ge,Ee*re,Ee/W.locationSize*se*re,be)}}else if(G!==void 0){let ge=G[K];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(W.location,ge);break;case 3:n.vertexAttrib3fv(W.location,ge);break;case 4:n.vertexAttrib4fv(W.location,ge);break;default:n.vertexAttrib1fv(W.location,ge)}}}}y()}function D(){L();for(let M in i){let C=i[M];for(let z in C){let O=C[z];for(let F in O)h(O[F].object),delete O[F];delete C[z]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;let C=i[M.id];for(let z in C){let O=C[z];for(let F in O)h(O[F].object),delete O[F];delete C[z]}delete i[M.id]}function P(M){for(let C in i){let z=i[C];if(z[M.id]===void 0)continue;let O=z[M.id];for(let F in O)h(O[F].object),delete O[F];delete z[M.id]}}function L(){b(),s=!0,o!==r&&(o=r,c(o.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:f,disableUnusedAttributes:y}}function id(n,e,t){let i;function r(c){i=c}function o(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function s(c,h,m){m!==0&&(n.drawArraysInstanced(i,c,h,m),t.update(h,i,m))}function a(c,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,m);let d=0;for(let g=0;g<m;g++)d+=h[g];t.update(d,i,1)}function l(c,h,m,p){if(m===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)s(c[g],h[g],p[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,p,0,m);let g=0;for(let x=0;x<m;x++)g+=h[x]*p[x];t.update(g,i,1)}}this.setMode=r,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function nd(n,e,t,i){let r;function o(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(P){return!(P!==yt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){let L=P===Di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Dt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==zt&&!L)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let m=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),v=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:m,reverseDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:u,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:D,maxSamples:A}}function rd(n){let e=this,t=null,i=0,r=!1,o=!1,s=new wi,a=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,p){let d=m.length!==0||p||i!==0||r;return r=p,i=m.length,d},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(m,p){t=h(m,p,0)},this.setState=function(m,p,d){let g=m.clippingPlanes,x=m.clipIntersection,f=m.clipShadows,u=n.get(m);if(!r||g===null||g.length===0||o&&!f)o?h(null):c();else{let y=o?0:i,v=y*4,_=u.clippingState||null;l.value=_,_=h(g,p,v,d);for(let D=0;D!==v;++D)_[D]=t[D];u.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(m,p,d,g){let x=m!==null?m.length:0,f=null;if(x!==0){if(f=l.value,g!==!0||f===null){let u=d+x*4,y=p.matrixWorldInverse;a.getNormalMatrix(y),(f===null||f.length<u)&&(f=new Float32Array(u));for(let v=0,_=d;v!==x;++v,_+=4)s.copy(m[v]).applyMatrix4(y,a),s.normal.toArray(f,_),f[_+3]=s.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,f}}function od(n){let e=new WeakMap;function t(s,a){return a===Qr?s.mapping=_i:a===$r&&(s.mapping=Li),s}function i(s){if(s&&s.isTexture){let a=s.mapping;if(a===Qr||a===$r)if(e.has(s)){let l=e.get(s).texture;return t(l,s.mapping)}else{let l=s.image;if(l&&l.height>0){let c=new Ks(l.height);return c.fromEquirectangularTexture(n,s),e.set(s,c),s.addEventListener("dispose",r),t(c.texture,s.mapping)}else return null}}return s}function r(s){let a=s.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}var $i=class extends br{constructor(e=-1,t=1,i=1,r=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,o=i-e,s=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Cr=4,sd=[.125,.215,.35,.446,.526,.582],Fn=20,_l=new $i,ad=new Fe,vl=null,Ml=0,Sl=0,yl=!1,Nn=(1+Math.sqrt(5))/2,Rr=1/Nn,ld=[new R(-Nn,Rr,0),new R(Nn,Rr,0),new R(-Rr,0,Nn),new R(Rr,0,Nn),new R(0,Nn,-Rr),new R(0,Nn,Rr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],Fo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){vl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vl,Ml,Sl),this._renderer.xr.enabled=yl,e.scissorTest=!1,ea(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Di,format:yt,colorSpace:yi,depthBuffer:!1},r=cd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cd(e,t,i);let{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cm(o)),this._blurMaterial=hm(o,e,t)}return r}_compileMaterial(e){let t=new bt(this._lodPlanes[0],e);this._renderer.compile(t,_l)}_sceneToCubeUV(e,t,i,r){let a=new Pt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,m=h.autoClear,p=h.toneMapping;h.getClearColor(ad),h.toneMapping=ai,h.autoClear=!1;let d=new ji({name:"PMREM.Background",side:pt,depthWrite:!1,depthTest:!1}),g=new bt(new fi,d),x=!1,f=e.background;f?f.isColor&&(d.color.copy(f),e.background=null,x=!0):(d.color.copy(ad),x=!0);for(let u=0;u<6;u++){let y=u%3;y===0?(a.up.set(0,l[u],0),a.lookAt(c[u],0,0)):y===1?(a.up.set(0,0,l[u]),a.lookAt(0,c[u],0)):(a.up.set(0,l[u],0),a.lookAt(0,0,c[u]));let v=this._cubeSize;ea(r,y*v,u>2?v:0,v,v),h.setRenderTarget(r),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=m,e.background=f}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===_i||e.mapping===Li;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hd());let o=r?this._cubemapMaterial:this._equirectMaterial,s=new bt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;let l=this._cubeSize;ea(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(s,_l)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let o=1;o<r;o++){let s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=ld[(r-o-1)%ld.length];this._blur(e,o-1,o,s,a)}t.autoClear=i}_blur(e,t,i,r,o){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",o),this._halfBlur(s,e,i,i,r,"longitudinal",o)}_halfBlur(e,t,i,r,o,s,a){let l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,m=new bt(this._lodPlanes[r],c),p=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(o)?Math.PI/(2*d):2*Math.PI/(2*Fn-1),x=o/g,f=isFinite(o)?1+Math.floor(h*x):Fn;f>Fn&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Fn}`);let u=[],y=0;for(let P=0;P<Fn;++P){let L=P/x,b=Math.exp(-L*L/2);u.push(b),P===0?y+=b:P<f&&(y+=2*b)}for(let P=0;P<u.length;P++)u[P]=u[P]/y;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=u,p.latitudinal.value=s==="latitudinal",a&&(p.poleAxis.value=a);let{_lodMax:v}=this;p.dTheta.value=g,p.mipInt.value=v-i;let _=this._sizeLods[r],D=3*_*(r>v-Cr?r-v+Cr:0),A=4*(this._cubeSize-_);ea(t,D,A,3*_,2*_),l.setRenderTarget(t),l.render(m,_l)}};function cm(n){let e=[],t=[],i=[],r=n,o=n-Cr+1+sd.length;for(let s=0;s<o;s++){let a=Math.pow(2,r);t.push(a);let l=1/a;s>n-Cr?l=sd[s-n+Cr-1]:s===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,m=1+c,p=[h,h,m,h,m,m,h,h,m,m,h,m],d=6,g=6,x=3,f=2,u=1,y=new Float32Array(x*g*d),v=new Float32Array(f*g*d),_=new Float32Array(u*g*d);for(let A=0;A<d;A++){let P=A%3*2/3-1,L=A>2?0:-1,b=[P,L,0,P+2/3,L,0,P+2/3,L+1,0,P,L,0,P+2/3,L+1,0,P,L+1,0];y.set(b,x*g*A),v.set(p,f*g*A);let M=[A,A,A,A,A,A];_.set(M,u*g*A)}let D=new ft;D.setAttribute("position",new Ct(y,x)),D.setAttribute("uv",new Ct(v,f)),D.setAttribute("faceIndex",new Ct(_,u)),e.push(D),r>Cr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function cd(n,e,t){let i=new Yt(n,e,t);return i.texture.mapping=sn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ea(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function hm(n,e,t){let i=new Float32Array(Fn),r=new R(0,1,0);return new Rt({name:"SphericalGaussianBlur",defines:{n:Fn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function hd(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function fd(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:El(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function El(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ud(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Qr||l===$r,h=l===_i||l===Li;if(c||h){let m=e.get(a),p=m!==void 0?m.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new Fo(n)),m=c?t.fromEquirectangular(a,m):t.fromCubemap(a,m),m.texture.pmremVersion=a.pmremVersion,e.set(a,m),m.texture;if(m!==void 0)return m.texture;{let d=a.image;return c&&d&&d.height>0||h&&d&&r(d)?(t===null&&(t=new Fo(n)),m=c?t.fromEquirectangular(a):t.fromCubemap(a),m.texture.pmremVersion=a.pmremVersion,e.set(a,m),a.addEventListener("dispose",o),m.texture):null}}}return a}function r(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function o(a){let l=a.target;l.removeEventListener("dispose",o);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function dd(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Rn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function pd(n,e,t,i){let r={},o=new WeakMap;function s(m){let p=m.target;p.index!==null&&e.remove(p.index);for(let g in p.attributes)e.remove(p.attributes[g]);for(let g in p.morphAttributes){let x=p.morphAttributes[g];for(let f=0,u=x.length;f<u;f++)e.remove(x[f])}p.removeEventListener("dispose",s),delete r[p.id];let d=o.get(p);d&&(e.remove(d),o.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(m,p){return r[p.id]===!0||(p.addEventListener("dispose",s),r[p.id]=!0,t.memory.geometries++),p}function l(m){let p=m.attributes;for(let g in p)e.update(p[g],n.ARRAY_BUFFER);let d=m.morphAttributes;for(let g in d){let x=d[g];for(let f=0,u=x.length;f<u;f++)e.update(x[f],n.ARRAY_BUFFER)}}function c(m){let p=[],d=m.index,g=m.attributes.position,x=0;if(d!==null){let y=d.array;x=d.version;for(let v=0,_=y.length;v<_;v+=3){let D=y[v+0],A=y[v+1],P=y[v+2];p.push(D,A,A,P,P,D)}}else if(g!==void 0){let y=g.array;x=g.version;for(let v=0,_=y.length/3-1;v<_;v+=3){let D=v+0,A=v+1,P=v+2;p.push(D,A,A,P,P,D)}}else return;let f=new(ws(p)?yr:Sr)(p,1);f.version=x;let u=o.get(m);u&&e.remove(u),o.set(m,f)}function h(m){let p=o.get(m);if(p){let d=m.index;d!==null&&p.version<d.version&&c(m)}else c(m);return o.get(m)}return{get:a,update:l,getWireframeAttribute:h}}function md(n,e,t){let i;function r(p){i=p}let o,s;function a(p){o=p.type,s=p.bytesPerElement}function l(p,d){n.drawElements(i,d,o,p*s),t.update(d,i,1)}function c(p,d,g){g!==0&&(n.drawElementsInstanced(i,d,o,p*s,g),t.update(d,i,g))}function h(p,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,o,p,0,g);let f=0;for(let u=0;u<g;u++)f+=d[u];t.update(f,i,1)}function m(p,d,g,x){if(g===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let u=0;u<p.length;u++)c(p[u]/s,d[u],x[u]);else{f.multiDrawElementsInstancedWEBGL(i,d,0,o,p,0,x,0,g);let u=0;for(let y=0;y<g;y++)u+=d[y]*x[y];t.update(u,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=m}function gd(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,s,a){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=a*(o/3);break;case n.LINES:t.lines+=a*(o/2);break;case n.LINE_STRIP:t.lines+=a*(o-1);break;case n.LINE_LOOP:t.lines+=a*o;break;case n.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function xd(n,e,t){let i=new WeakMap,r=new st;function o(s,a,l){let c=s.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,m=h!==void 0?h.length:0,p=i.get(a);if(p===void 0||p.count!==m){let b=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",b)};p!==void 0&&p.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],u=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],v=0;d===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let _=a.attributes.position.count*v,D=1;_>e.maxTextureSize&&(D=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let A=new Float32Array(_*D*4*m),P=new fr(A,_,D,m);P.type=zt,P.needsUpdate=!0;let L=v*4;for(let M=0;M<m;M++){let C=f[M],z=u[M],O=y[M],F=_*D*4*M;for(let V=0;V<C.count;V++){let G=V*L;d===!0&&(r.fromBufferAttribute(C,V),A[F+G+0]=r.x,A[F+G+1]=r.y,A[F+G+2]=r.z,A[F+G+3]=0),g===!0&&(r.fromBufferAttribute(z,V),A[F+G+4]=r.x,A[F+G+5]=r.y,A[F+G+6]=r.z,A[F+G+7]=0),x===!0&&(r.fromBufferAttribute(O,V),A[F+G+8]=r.x,A[F+G+9]=r.y,A[F+G+10]=r.z,A[F+G+11]=O.itemSize===4?r.w:1)}}p={count:m,texture:P,size:new J(_,D)},i.set(a,p),a.addEventListener("dispose",b)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}return{update:o}}function _d(n,e,t,i){let r=new WeakMap;function o(l){let c=i.render.frame,h=l.geometry,m=e.get(l,h);if(r.get(m)!==c&&(e.update(m),r.set(m,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return m}function s(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:s}}var Pr=class extends gt{constructor(e,t,i,r,o,s,a,l,c,h=Ui){if(h!==Ui&&h!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ui&&(i=Qt),i===void 0&&h===Ii&&(i=Si),super(null,r,o,s,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var Ad=new gt,vd=new Pr(1,1),wd=new fr,Rd=new Ps,Cd=new wr,Md=[],Sd=[],yd=new Float32Array(16),Ed=new Float32Array(9),bd=new Float32Array(4);function Lr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,o=Md[r];if(o===void 0&&(o=new Float32Array(r),Md[r]=o),e!==0){i.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,n[s].toArray(o,a)}return o}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function At(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ta(n,e){let t=Sd[e];t===void 0&&(t=new Int32Array(e),Sd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function fm(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function um(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),At(t,e)}}function dm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),At(t,e)}}function pm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),At(t,e)}}function mm(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,i))return;bd.set(i),n.uniformMatrix2fv(this.addr,!1,bd),At(t,i)}}function gm(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,i))return;Ed.set(i),n.uniformMatrix3fv(this.addr,!1,Ed),At(t,i)}}function xm(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,i))return;yd.set(i),n.uniformMatrix4fv(this.addr,!1,yd),At(t,i)}}function _m(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function vm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),At(t,e)}}function Mm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),At(t,e)}}function Sm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),At(t,e)}}function ym(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Em(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),At(t,e)}}function bm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),At(t,e)}}function Tm(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),At(t,e)}}function Am(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let o;this.type===n.SAMPLER_2D_SHADOW?(vd.compareFunction=bs,o=vd):o=Ad,t.setTexture2D(e||o,r)}function wm(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Rd,r)}function Rm(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Cd,r)}function Cm(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||wd,r)}function Pm(n){switch(n){case 5126:return fm;case 35664:return um;case 35665:return dm;case 35666:return pm;case 35674:return mm;case 35675:return gm;case 35676:return xm;case 5124:case 35670:return _m;case 35667:case 35671:return vm;case 35668:case 35672:return Mm;case 35669:case 35673:return Sm;case 5125:return ym;case 36294:return Em;case 36295:return bm;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return Am;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Rm;case 36289:case 36303:case 36311:case 36292:return Cm}}function Lm(n,e){n.uniform1fv(this.addr,e)}function Dm(n,e){let t=Lr(e,this.size,2);n.uniform2fv(this.addr,t)}function Um(n,e){let t=Lr(e,this.size,3);n.uniform3fv(this.addr,t)}function Im(n,e){let t=Lr(e,this.size,4);n.uniform4fv(this.addr,t)}function Nm(n,e){let t=Lr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Fm(n,e){let t=Lr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Om(n,e){let t=Lr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Bm(n,e){n.uniform1iv(this.addr,e)}function zm(n,e){n.uniform2iv(this.addr,e)}function Gm(n,e){n.uniform3iv(this.addr,e)}function Vm(n,e){n.uniform4iv(this.addr,e)}function Hm(n,e){n.uniform1uiv(this.addr,e)}function km(n,e){n.uniform2uiv(this.addr,e)}function Wm(n,e){n.uniform3uiv(this.addr,e)}function Xm(n,e){n.uniform4uiv(this.addr,e)}function qm(n,e,t){let i=this.cache,r=e.length,o=ta(t,r);Tt(i,o)||(n.uniform1iv(this.addr,o),At(i,o));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||Ad,o[s])}function Ym(n,e,t){let i=this.cache,r=e.length,o=ta(t,r);Tt(i,o)||(n.uniform1iv(this.addr,o),At(i,o));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Rd,o[s])}function Zm(n,e,t){let i=this.cache,r=e.length,o=ta(t,r);Tt(i,o)||(n.uniform1iv(this.addr,o),At(i,o));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Cd,o[s])}function Jm(n,e,t){let i=this.cache,r=e.length,o=ta(t,r);Tt(i,o)||(n.uniform1iv(this.addr,o),At(i,o));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||wd,o[s])}function Km(n){switch(n){case 5126:return Lm;case 35664:return Dm;case 35665:return Um;case 35666:return Im;case 35674:return Nm;case 35675:return Fm;case 35676:return Om;case 5124:case 35670:return Bm;case 35667:case 35671:return zm;case 35668:case 35672:return Gm;case 35669:case 35673:return Vm;case 5125:return Hm;case 36294:return km;case 36295:return Wm;case 36296:return Xm;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return Jm}}var Tl=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Pm(t.type)}},Al=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Km(t.type)}},wl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let o=0,s=r.length;o!==s;++o){let a=r[o];a.setValue(e,t[a.id],i)}}},bl=/(\w+)(\])?(\[|\.)?/g;function Td(n,e){n.seq.push(e),n.map[e.id]=e}function jm(n,e,t){let i=n.name,r=i.length;for(bl.lastIndex=0;;){let o=bl.exec(i),s=bl.lastIndex,a=o[1],l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===r){Td(t,c===void 0?new Tl(a,n,e):new Al(a,n,e));break}else{let m=t.map[a];m===void 0&&(m=new wl(a),Td(t,m)),t=m}}}var gn=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=e.getActiveUniform(t,r),s=e.getUniformLocation(t,o.name);jm(o,s,this)}}setValue(e,t,i,r){let o=this.map[t];o!==void 0&&o.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let o=0,s=t.length;o!==s;++o){let a=t[o],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,o=e.length;r!==o;++r){let s=e[r];s.id in t&&i.push(s)}return i}};function Rl(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Qm=37297,$m=0;function e0(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=r;s<o;s++){let a=s+1;i.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return i.join(`
`)}var Pd=new Ue;function t0(n){qe._getMatrix(Pd,qe.workingColorSpace,n);let e=`mat3( ${Pd.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(n)){case Tn:return[e,"LinearTransferOETF"];case $e:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ld(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+e0(n.getShaderSource(e),s)}else return r}function i0(n,e){let t=t0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function n0(n,e){let t;switch(e){case Tc:t="Linear";break;case Ac:t="Reinhard";break;case wc:t="Cineon";break;case Rc:t="ACESFilmic";break;case Pc:t="AgX";break;case Lc:t="Neutral";break;case Cc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ia=new R;function r0(){qe.getLuminanceCoefficients(ia);let n=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oo).join(`
`)}function s0(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function a0(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let o=n.getActiveAttrib(e,r),s=o.name,a=1;o.type===n.FLOAT_MAT2&&(a=2),o.type===n.FLOAT_MAT3&&(a=3),o.type===n.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:n.getAttribLocation(e,s),locationSize:a}}return t}function Oo(n){return n!==""}function Dd(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ud(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var l0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(n){return n.replace(l0,h0)}var c0=new Map;function h0(n,e){let t=ke[e];if(t===void 0){let i=c0.get(e);if(i!==void 0)t=ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Cl(t)}var f0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Id(n){return n.replace(f0,u0)}function u0(n,e,t,i){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Nd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function d0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ns?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===rc?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===xi&&(e="SHADOWMAP_TYPE_VSM"),e}function p0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case _i:case Li:e="ENVMAP_TYPE_CUBE";break;case sn:e="ENVMAP_TYPE_CUBE_UV";break}return e}function m0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Li:e="ENVMAP_MODE_REFRACTION";break}return e}function g0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case fs:e="ENVMAP_BLENDING_MULTIPLY";break;case Ec:e="ENVMAP_BLENDING_MIX";break;case bc:e="ENVMAP_BLENDING_ADD";break}return e}function x0(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Fd(n,e,t,i){let r=n.getContext(),o=t.defines,s=t.vertexShader,a=t.fragmentShader,l=d0(t),c=p0(t),h=m0(t),m=g0(t),p=x0(t),d=o0(t),g=s0(o),x=r.createProgram(),f,u,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),f.length>0&&(f+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),u.length>0&&(u+=`
`)):(f=[Nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oo).join(`
`),u=[Nd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?ke.tonemapping_pars_fragment:"",t.toneMapping!==ai?n0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,i0("linearToOutputTexel",t.outputColorSpace),r0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oo).join(`
`)),s=Cl(s),s=Dd(s,t),s=Ud(s,t),a=Cl(a),a=Dd(a,t),a=Ud(a,t),s=Id(s),a=Id(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,u=["#define varying in",t.glslVersion===ja?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ja?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let v=y+f+s,_=y+u+a,D=Rl(r,r.VERTEX_SHADER,v),A=Rl(r,r.FRAGMENT_SHADER,_);r.attachShader(x,D),r.attachShader(x,A),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(C){if(n.debug.checkShaderErrors){let z=r.getProgramInfoLog(x).trim(),O=r.getShaderInfoLog(D).trim(),F=r.getShaderInfoLog(A).trim(),V=!0,G=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,D,A);else{let K=Ld(r,D,"vertex"),W=Ld(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+z+`
`+K+`
`+W)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(O===""||F==="")&&(G=!1);G&&(C.diagnostics={runnable:V,programLog:z,vertexShader:{log:O,prefix:f},fragmentShader:{log:F,prefix:u}})}r.deleteShader(D),r.deleteShader(A),L=new gn(r,x),b=a0(r,x)}let L;this.getUniforms=function(){return L===void 0&&P(this),L};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,Qm)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$m++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=D,this.fragmentShader=A,this}var _0=0,na=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Pl(e),t.set(e,i)),i}},Pl=class{constructor(e){this.id=_0++,this.code=e,this.usedTimes=0}};function Od(n,e,t,i,r,o,s){let a=new gr,l=new na,c=new Set,h=[],m=r.logarithmicDepthBuffer,p=r.vertexTextures,d=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function f(b,M,C,z,O){let F=z.fog,V=O.geometry,G=b.isMeshStandardMaterial?z.environment:null,K=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),W=K&&K.mapping===sn?K.image.height:null,he=g[b.type];b.precision!==null&&(d=r.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let ge=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ee=ge!==void 0?ge.length:0,He=0;V.morphAttributes.position!==void 0&&(He=1),V.morphAttributes.normal!==void 0&&(He=2),V.morphAttributes.color!==void 0&&(He=3);let it,Z,re,be;if(he){let at=ui[he];it=at.vertexShader,Z=at.fragmentShader}else it=b.vertexShader,Z=b.fragmentShader,l.update(b),re=l.getVertexShaderID(b),be=l.getFragmentShaderID(b);let se=n.getRenderTarget(),De=n.state.buffers.depth.getReversed(),ze=O.isInstancedMesh===!0,Oe=O.isBatchedMesh===!0,et=!!b.map,Q=!!b.matcap,ne=!!K,w=!!b.aoMap,Ce=!!b.lightMap,te=!!b.bumpMap,ve=!!b.normalMap,ae=!!b.displacementMap,Ie=!!b.emissiveMap,xe=!!b.metalnessMap,T=!!b.roughnessMap,S=b.anisotropy>0,B=b.clearcoat>0,q=b.dispersion>0,$=b.iridescence>0,Y=b.sheen>0,Te=b.transmission>0,fe=S&&!!b.anisotropyMap,_e=B&&!!b.clearcoatMap,Ke=B&&!!b.clearcoatNormalMap,ie=B&&!!b.clearcoatRoughnessMap,Me=$&&!!b.iridescenceMap,Ne=$&&!!b.iridescenceThicknessMap,Be=Y&&!!b.sheenColorMap,Se=Y&&!!b.sheenRoughnessMap,Qe=!!b.specularMap,Ye=!!b.specularColorMap,lt=!!b.specularIntensityMap,U=Te&&!!b.transmissionMap,ue=Te&&!!b.thicknessMap,X=!!b.gradientMap,j=!!b.alphaMap,me=b.alphaTest>0,de=!!b.alphaHash,We=!!b.extensions,vt=ai;b.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(vt=n.toneMapping);let Lt={shaderID:he,shaderType:b.type,shaderName:b.name,vertexShader:it,fragmentShader:Z,defines:b.defines,customVertexShaderID:re,customFragmentShaderID:be,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Oe,batchingColor:Oe&&O._colorsTexture!==null,instancing:ze,instancingColor:ze&&O.instanceColor!==null,instancingMorph:ze&&O.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:yi,alphaToCoverage:!!b.alphaToCoverage,map:et,matcap:Q,envMap:ne,envMapMode:ne&&K.mapping,envMapCubeUVHeight:W,aoMap:w,lightMap:Ce,bumpMap:te,normalMap:ve,displacementMap:p&&ae,emissiveMap:Ie,normalMapObjectSpace:ve&&b.normalMapType===Nc,normalMapTangentSpace:ve&&b.normalMapType===Es,metalnessMap:xe,roughnessMap:T,anisotropy:S,anisotropyMap:fe,clearcoat:B,clearcoatMap:_e,clearcoatNormalMap:Ke,clearcoatRoughnessMap:ie,dispersion:q,iridescence:$,iridescenceMap:Me,iridescenceThicknessMap:Ne,sheen:Y,sheenColorMap:Be,sheenRoughnessMap:Se,specularMap:Qe,specularColorMap:Ye,specularIntensityMap:lt,transmission:Te,transmissionMap:U,thicknessMap:ue,gradientMap:X,opaque:b.transparent===!1&&b.blending===Hi&&b.alphaToCoverage===!1,alphaMap:j,alphaTest:me,alphaHash:de,combine:b.combine,mapUv:et&&x(b.map.channel),aoMapUv:w&&x(b.aoMap.channel),lightMapUv:Ce&&x(b.lightMap.channel),bumpMapUv:te&&x(b.bumpMap.channel),normalMapUv:ve&&x(b.normalMap.channel),displacementMapUv:ae&&x(b.displacementMap.channel),emissiveMapUv:Ie&&x(b.emissiveMap.channel),metalnessMapUv:xe&&x(b.metalnessMap.channel),roughnessMapUv:T&&x(b.roughnessMap.channel),anisotropyMapUv:fe&&x(b.anisotropyMap.channel),clearcoatMapUv:_e&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ne&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Se&&x(b.sheenRoughnessMap.channel),specularMapUv:Qe&&x(b.specularMap.channel),specularColorMapUv:Ye&&x(b.specularColorMap.channel),specularIntensityMapUv:lt&&x(b.specularIntensityMap.channel),transmissionMapUv:U&&x(b.transmissionMap.channel),thicknessMapUv:ue&&x(b.thicknessMap.channel),alphaMapUv:j&&x(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(ve||S),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(et||j),fog:!!F,useFog:b.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:De,skinning:O.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:He,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:vt,decodeVideoTexture:et&&b.map.isVideoTexture===!0&&qe.getTransfer(b.map.colorSpace)===$e,decodeVideoTextureEmissive:Ie&&b.emissiveMap.isVideoTexture===!0&&qe.getTransfer(b.emissiveMap.colorSpace)===$e,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ot,flipSided:b.side===pt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:We&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&b.extensions.multiDraw===!0||Oe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function u(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let C in b.defines)M.push(C),M.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(y(M,b),v(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function y(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function v(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let M=g[b.type],C;if(M){let z=ui[M];C=ph.clone(z.uniforms)}else C=b.uniforms;return C}function D(b,M){let C;for(let z=0,O=h.length;z<O;z++){let F=h[z];if(F.cacheKey===M){C=F,++C.usedTimes;break}}return C===void 0&&(C=new Fd(n,M,b,o),h.push(C)),C}function A(b){if(--b.usedTimes===0){let M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function P(b){l.remove(b)}function L(){l.dispose()}return{getParameters:f,getProgramCacheKey:u,getUniforms:_,acquireProgram:D,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:L}}function Bd(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function i(s){n.delete(s)}function r(s,a,l){n.get(s)[a]=l}function o(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:o}}function v0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function zd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Gd(){let n=[],e=0,t=[],i=[],r=[];function o(){e=0,t.length=0,i.length=0,r.length=0}function s(m,p,d,g,x,f){let u=n[e];return u===void 0?(u={id:m.id,object:m,geometry:p,material:d,groupOrder:g,renderOrder:m.renderOrder,z:x,group:f},n[e]=u):(u.id=m.id,u.object=m,u.geometry=p,u.material=d,u.groupOrder=g,u.renderOrder=m.renderOrder,u.z=x,u.group=f),e++,u}function a(m,p,d,g,x,f){let u=s(m,p,d,g,x,f);d.transmission>0?i.push(u):d.transparent===!0?r.push(u):t.push(u)}function l(m,p,d,g,x,f){let u=s(m,p,d,g,x,f);d.transmission>0?i.unshift(u):d.transparent===!0?r.unshift(u):t.unshift(u)}function c(m,p){t.length>1&&t.sort(m||v0),i.length>1&&i.sort(p||zd),r.length>1&&r.sort(p||zd)}function h(){for(let m=e,p=n.length;m<p;m++){let d=n[m];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:o,push:a,unshift:l,finish:h,sort:c}}function Vd(){let n=new WeakMap;function e(i,r){let o=n.get(i),s;return o===void 0?(s=new Gd,n.set(i,[s])):r>=o.length?(s=new Gd,o.push(s)):s=o[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function M0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Fe};break;case"SpotLight":t={position:new R,direction:new R,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function S0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var y0=0;function E0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Hd(n){let e=new M0,t=S0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let r=new R,o=new Ze,s=new Ze;function a(c){let h=0,m=0,p=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,g=0,x=0,f=0,u=0,y=0,v=0,_=0,D=0,A=0,P=0;c.sort(E0);for(let b=0,M=c.length;b<M;b++){let C=c[b],z=C.color,O=C.intensity,F=C.distance,V=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=z.r*O,m+=z.g*O,p+=z.b*O;else if(C.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(C.sh.coefficients[G],O);P++}else if(C.isDirectionalLight){let G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let K=C.shadow,W=t.get(C);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,i.directionalShadow[d]=W,i.directionalShadowMap[d]=V,i.directionalShadowMatrix[d]=C.shadow.matrix,y++}i.directional[d]=G,d++}else if(C.isSpotLight){let G=e.get(C);G.position.setFromMatrixPosition(C.matrixWorld),G.color.copy(z).multiplyScalar(O),G.distance=F,G.coneCos=Math.cos(C.angle),G.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),G.decay=C.decay,i.spot[x]=G;let K=C.shadow;if(C.map&&(i.spotLightMap[D]=C.map,D++,K.updateMatrices(C),C.castShadow&&A++),i.spotLightMatrix[x]=K.matrix,C.castShadow){let W=t.get(C);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,i.spotShadow[x]=W,i.spotShadowMap[x]=V,_++}x++}else if(C.isRectAreaLight){let G=e.get(C);G.color.copy(z).multiplyScalar(O),G.halfWidth.set(C.width*.5,0,0),G.halfHeight.set(0,C.height*.5,0),i.rectArea[f]=G,f++}else if(C.isPointLight){let G=e.get(C);if(G.color.copy(C.color).multiplyScalar(C.intensity),G.distance=C.distance,G.decay=C.decay,C.castShadow){let K=C.shadow,W=t.get(C);W.shadowIntensity=K.intensity,W.shadowBias=K.bias,W.shadowNormalBias=K.normalBias,W.shadowRadius=K.radius,W.shadowMapSize=K.mapSize,W.shadowCameraNear=K.camera.near,W.shadowCameraFar=K.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=C.shadow.matrix,v++}i.point[g]=G,g++}else if(C.isHemisphereLight){let G=e.get(C);G.skyColor.copy(C.color).multiplyScalar(O),G.groundColor.copy(C.groundColor).multiplyScalar(O),i.hemi[u]=G,u++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=p;let L=i.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==f||L.hemiLength!==u||L.numDirectionalShadows!==y||L.numPointShadows!==v||L.numSpotShadows!==_||L.numSpotMaps!==D||L.numLightProbes!==P)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=f,i.point.length=g,i.hemi.length=u,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=_+D-A,i.spotLightMap.length=D,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,L.directionalLength=d,L.pointLength=g,L.spotLength=x,L.rectAreaLength=f,L.hemiLength=u,L.numDirectionalShadows=y,L.numPointShadows=v,L.numSpotShadows=_,L.numSpotMaps=D,L.numLightProbes=P,i.version=y0++)}function l(c,h){let m=0,p=0,d=0,g=0,x=0,f=h.matrixWorldInverse;for(let u=0,y=c.length;u<y;u++){let v=c[u];if(v.isDirectionalLight){let _=i.directional[m];_.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(f),m++}else if(v.isSpotLight){let _=i.spot[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(f),d++}else if(v.isRectAreaLight){let _=i.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(f),s.identity(),o.copy(v.matrixWorld),o.premultiply(f),s.extractRotation(o),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(s),_.halfHeight.applyMatrix4(s),g++}else if(v.isPointLight){let _=i.point[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){let _=i.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(f),x++}}}return{setup:a,setupView:l,state:i}}function kd(n){let e=new Hd(n),t=[],i=[];function r(h){c.camera=h,t.length=0,i.length=0}function o(h){t.push(h)}function s(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function Wd(n){let e=new WeakMap;function t(r,o=0){let s=e.get(r),a;return s===void 0?(a=new kd(n),e.set(r,[a])):o>=s.length?(a=new kd(n),s.push(a)):a=s[o],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var ra=class extends Jt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Uc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var oa=class extends Jt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var Xd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,qd=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`;function Yd(n,e,t){let i=new pn,r=new J,o=new J,s=new st,a=new ra({depthPacking:Ic}),l=new oa,c={},h=t.maxTextureSize,m={[jt]:pt,[pt]:jt,[Ot]:Ot},p=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:Xd,fragmentShader:qd}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let g=new ft;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new bt(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ns;let u=this.type;this.render=function(A,P,L){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;let b=n.getRenderTarget(),M=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),z=n.state;z.setBlending(si),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let O=u!==xi&&this.type===xi,F=u===xi&&this.type!==xi;for(let V=0,G=A.length;V<G;V++){let K=A[V],W=K.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let he=W.getFrameExtents();if(r.multiply(he),o.copy(W.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(o.x=Math.floor(h/he.x),r.x=o.x*he.x,W.mapSize.x=o.x),r.y>h&&(o.y=Math.floor(h/he.y),r.y=o.y*he.y,W.mapSize.y=o.y)),W.map===null||O===!0||F===!0){let Ee=this.type!==xi?{minFilter:St,magFilter:St}:{};W.map!==null&&W.map.dispose(),W.map=new Yt(r.x,r.y,Ee),W.map.texture.name=K.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let ge=W.getViewportCount();for(let Ee=0;Ee<ge;Ee++){let He=W.getViewport(Ee);s.set(o.x*He.x,o.y*He.y,o.x*He.z,o.y*He.w),z.viewport(s),W.updateMatrices(K,Ee),i=W.getFrustum(),_(P,L,W.camera,K,this.type)}W.isPointLightShadow!==!0&&this.type===xi&&y(W,L),W.needsUpdate=!1}u=this.type,f.needsUpdate=!1,n.setRenderTarget(b,M,C)};function y(A,P){let L=e.update(x);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Yt(r.x,r.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(P,null,L,p,x,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(P,null,L,d,x,null)}function v(A,P,L,b){let M=null,C=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)M=C;else if(M=L.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){let z=M.uuid,O=P.uuid,F=c[z];F===void 0&&(F={},c[z]=F);let V=F[O];V===void 0&&(V=M.clone(),F[O]=V,P.addEventListener("dispose",D)),M=V}if(M.visible=P.visible,M.wireframe=P.wireframe,b===xi?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:m[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let z=n.properties.get(M);z.light=L}return M}function _(A,P,L,b,M){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===xi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);let O=e.update(A),F=A.material;if(Array.isArray(F)){let V=O.groups;for(let G=0,K=V.length;G<K;G++){let W=V[G],he=F[W.materialIndex];if(he&&he.visible){let ge=v(A,he,b,M);A.onBeforeShadow(n,A,P,L,O,ge,W),n.renderBufferDirect(L,null,O,ge,A,W),A.onAfterShadow(n,A,P,L,O,ge,W)}}}else if(F.visible){let V=v(A,F,b,M);A.onBeforeShadow(n,A,P,L,O,V,null),n.renderBufferDirect(L,null,O,V,A,null),A.onAfterShadow(n,A,P,L,O,V,null)}}let z=A.children;for(let O=0,F=z.length;O<F;O++)_(z[O],P,L,b,M)}function D(A){A.target.removeEventListener("dispose",D);for(let L in c){let b=c[L],M=A.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var T0={[rs]:os,[ss]:cs,[as]:hs,[on]:ls,[os]:rs,[cs]:ss,[hs]:as,[ls]:on};function Zd(n,e){function t(){let U=!1,ue=new st,X=null,j=new st(0,0,0,0);return{setMask:function(me){X!==me&&!U&&(n.colorMask(me,me,me,me),X=me)},setLocked:function(me){U=me},setClear:function(me,de,We,vt,Lt){Lt===!0&&(me*=vt,de*=vt,We*=vt),ue.set(me,de,We,vt),j.equals(ue)===!1&&(n.clearColor(me,de,We,vt),j.copy(ue))},reset:function(){U=!1,X=null,j.set(-1,0,0,0)}}}function i(){let U=!1,ue=!1,X=null,j=null,me=null;return{setReversed:function(de){if(ue!==de){let We=e.get("EXT_clip_control");ue?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);let vt=me;me=null,this.setClear(vt)}ue=de},getReversed:function(){return ue},setTest:function(de){de?se(n.DEPTH_TEST):De(n.DEPTH_TEST)},setMask:function(de){X!==de&&!U&&(n.depthMask(de),X=de)},setFunc:function(de){if(ue&&(de=T0[de]),j!==de){switch(de){case rs:n.depthFunc(n.NEVER);break;case os:n.depthFunc(n.ALWAYS);break;case ss:n.depthFunc(n.LESS);break;case on:n.depthFunc(n.LEQUAL);break;case as:n.depthFunc(n.EQUAL);break;case ls:n.depthFunc(n.GEQUAL);break;case cs:n.depthFunc(n.GREATER);break;case hs:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}j=de}},setLocked:function(de){U=de},setClear:function(de){me!==de&&(ue&&(de=1-de),n.clearDepth(de),me=de)},reset:function(){U=!1,X=null,j=null,me=null,ue=!1}}}function r(){let U=!1,ue=null,X=null,j=null,me=null,de=null,We=null,vt=null,Lt=null;return{setTest:function(at){U||(at?se(n.STENCIL_TEST):De(n.STENCIL_TEST))},setMask:function(at){ue!==at&&!U&&(n.stencilMask(at),ue=at)},setFunc:function(at,mi,Gi){(X!==at||j!==mi||me!==Gi)&&(n.stencilFunc(at,mi,Gi),X=at,j=mi,me=Gi)},setOp:function(at,mi,Gi){(de!==at||We!==mi||vt!==Gi)&&(n.stencilOp(at,mi,Gi),de=at,We=mi,vt=Gi)},setLocked:function(at){U=at},setClear:function(at){Lt!==at&&(n.clearStencil(at),Lt=at)},reset:function(){U=!1,ue=null,X=null,j=null,me=null,de=null,We=null,vt=null,Lt=null}}}let o=new t,s=new i,a=new r,l=new WeakMap,c=new WeakMap,h={},m={},p=new WeakMap,d=[],g=null,x=!1,f=null,u=null,y=null,v=null,_=null,D=null,A=null,P=new Fe(0,0,0),L=0,b=!1,M=null,C=null,z=null,O=null,F=null,V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,K=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=K>=1):W.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=K>=2);let he=null,ge={},Ee=n.getParameter(n.SCISSOR_BOX),He=n.getParameter(n.VIEWPORT),it=new st().fromArray(Ee),Z=new st().fromArray(He);function re(U,ue,X,j){let me=new Uint8Array(4),de=n.createTexture();n.bindTexture(U,de),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let We=0;We<X;We++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ue,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,me):n.texImage2D(ue+We,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,me);return de}let be={};be[n.TEXTURE_2D]=re(n.TEXTURE_2D,n.TEXTURE_2D,1),be[n.TEXTURE_CUBE_MAP]=re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[n.TEXTURE_2D_ARRAY]=re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),be[n.TEXTURE_3D]=re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),se(n.DEPTH_TEST),s.setFunc(on),te(!1),ve(Xa),se(n.CULL_FACE),w(si);function se(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function De(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function ze(U,ue){return m[U]!==ue?(n.bindFramebuffer(U,ue),m[U]=ue,U===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=ue),U===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=ue),!0):!1}function Oe(U,ue){let X=d,j=!1;if(U){X=p.get(ue),X===void 0&&(X=[],p.set(ue,X));let me=U.textures;if(X.length!==me.length||X[0]!==n.COLOR_ATTACHMENT0){for(let de=0,We=me.length;de<We;de++)X[de]=n.COLOR_ATTACHMENT0+de;X.length=me.length,j=!0}}else X[0]!==n.BACK&&(X[0]=n.BACK,j=!0);j&&n.drawBuffers(X)}function et(U){return g!==U?(n.useProgram(U),g=U,!0):!1}let Q={[ki]:n.FUNC_ADD,[sc]:n.FUNC_SUBTRACT,[ac]:n.FUNC_REVERSE_SUBTRACT};Q[lc]=n.MIN,Q[cc]=n.MAX;let ne={[hc]:n.ZERO,[fc]:n.ONE,[uc]:n.SRC_COLOR,[Kr]:n.SRC_ALPHA,[_c]:n.SRC_ALPHA_SATURATE,[gc]:n.DST_COLOR,[pc]:n.DST_ALPHA,[dc]:n.ONE_MINUS_SRC_COLOR,[jr]:n.ONE_MINUS_SRC_ALPHA,[xc]:n.ONE_MINUS_DST_COLOR,[mc]:n.ONE_MINUS_DST_ALPHA,[vc]:n.CONSTANT_COLOR,[Mc]:n.ONE_MINUS_CONSTANT_COLOR,[Sc]:n.CONSTANT_ALPHA,[yc]:n.ONE_MINUS_CONSTANT_ALPHA};function w(U,ue,X,j,me,de,We,vt,Lt,at){if(U===si){x===!0&&(De(n.BLEND),x=!1);return}if(x===!1&&(se(n.BLEND),x=!0),U!==oc){if(U!==f||at!==b){if((u!==ki||_!==ki)&&(n.blendEquation(n.FUNC_ADD),u=ki,_=ki),at)switch(U){case Hi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qa:n.blendFunc(n.ONE,n.ONE);break;case Ya:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Za:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qa:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ya:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Za:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,v=null,D=null,A=null,P.set(0,0,0),L=0,f=U,b=at}return}me=me||ue,de=de||X,We=We||j,(ue!==u||me!==_)&&(n.blendEquationSeparate(Q[ue],Q[me]),u=ue,_=me),(X!==y||j!==v||de!==D||We!==A)&&(n.blendFuncSeparate(ne[X],ne[j],ne[de],ne[We]),y=X,v=j,D=de,A=We),(vt.equals(P)===!1||Lt!==L)&&(n.blendColor(vt.r,vt.g,vt.b,Lt),P.copy(vt),L=Lt),f=U,b=!1}function Ce(U,ue){U.side===Ot?De(n.CULL_FACE):se(n.CULL_FACE);let X=U.side===pt;ue&&(X=!X),te(X),U.blending===Hi&&U.transparent===!1?w(si):w(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),s.setFunc(U.depthFunc),s.setTest(U.depthTest),s.setMask(U.depthWrite),o.setMask(U.colorWrite);let j=U.stencilWrite;a.setTest(j),j&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ie(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):De(n.SAMPLE_ALPHA_TO_COVERAGE)}function te(U){M!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),M=U)}function ve(U){U!==ic?(se(n.CULL_FACE),U!==C&&(U===Xa?n.cullFace(n.BACK):U===nc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):De(n.CULL_FACE),C=U}function ae(U){U!==z&&(G&&n.lineWidth(U),z=U)}function Ie(U,ue,X){U?(se(n.POLYGON_OFFSET_FILL),(O!==ue||F!==X)&&(n.polygonOffset(ue,X),O=ue,F=X)):De(n.POLYGON_OFFSET_FILL)}function xe(U){U?se(n.SCISSOR_TEST):De(n.SCISSOR_TEST)}function T(U){U===void 0&&(U=n.TEXTURE0+V-1),he!==U&&(n.activeTexture(U),he=U)}function S(U,ue,X){X===void 0&&(he===null?X=n.TEXTURE0+V-1:X=he);let j=ge[X];j===void 0&&(j={type:void 0,texture:void 0},ge[X]=j),(j.type!==U||j.texture!==ue)&&(he!==X&&(n.activeTexture(X),he=X),n.bindTexture(U,ue||be[U]),j.type=U,j.texture=ue)}function B(){let U=ge[he];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Te(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ke(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Be(U){it.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),it.copy(U))}function Se(U){Z.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function Qe(U,ue){let X=c.get(ue);X===void 0&&(X=new WeakMap,c.set(ue,X));let j=X.get(U);j===void 0&&(j=n.getUniformBlockIndex(ue,U.name),X.set(U,j))}function Ye(U,ue){let j=c.get(ue).get(U);l.get(ue)!==j&&(n.uniformBlockBinding(ue,j,U.__bindingPointIndex),l.set(ue,j))}function lt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},he=null,ge={},m={},p=new WeakMap,d=[],g=null,x=!1,f=null,u=null,y=null,v=null,_=null,D=null,A=null,P=new Fe(0,0,0),L=0,b=!1,M=null,C=null,z=null,O=null,F=null,it.set(0,0,n.canvas.width,n.canvas.height),Z.set(0,0,n.canvas.width,n.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:se,disable:De,bindFramebuffer:ze,drawBuffers:Oe,useProgram:et,setBlending:w,setMaterial:Ce,setFlipSided:te,setCullFace:ve,setLineWidth:ae,setPolygonOffset:Ie,setScissorTest:xe,activeTexture:T,bindTexture:S,unbindTexture:B,compressedTexImage2D:q,compressedTexImage3D:$,texImage2D:Me,texImage3D:Ne,updateUBOMapping:Qe,uniformBlockBinding:Ye,texStorage2D:Ke,texStorage3D:ie,texSubImage2D:Y,texSubImage3D:Te,compressedTexSubImage2D:fe,compressedTexSubImage3D:_e,scissor:Be,viewport:Se,reset:lt}}function Ll(n,e,t,i){let r=A0(i);switch(t){case gs:return n*e;case _s:return n*e;case vs:return n*e*2;case Ms:return n*e/r.components*r.byteLength;case er:return n*e/r.components*r.byteLength;case Ss:return n*e*2/r.components*r.byteLength;case tr:return n*e*2/r.components*r.byteLength;case xs:return n*e*3/r.components*r.byteLength;case yt:return n*e*4/r.components*r.byteLength;case ir:return n*e*4/r.components*r.byteLength;case nr:case rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case or:case sr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ro:case so:return Math.max(n,16)*Math.max(e,8)/4;case no:case oo:return Math.max(n,8)*Math.max(e,8)/2;case ao:case lo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case co:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case uo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case po:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case mo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case go:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case xo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case _o:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case vo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Mo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case So:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case yo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Eo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case bo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ar:case To:case Ao:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ys:case wo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ro:case Co:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function A0(n){switch(n){case Dt:case ds:return{byteLength:1,components:1};case Wi:case ps:case Di:return{byteLength:2,components:1};case Qn:case $n:return{byteLength:2,components:4};case Qt:case jn:case zt:return{byteLength:4,components:1};case ms:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Jd(n,e,t,i,r,o,s){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new J,h=new WeakMap,m,p=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return d?new OffscreenCanvas(T,S):lr("canvas")}function x(T,S,B){let q=1,$=xe(T);if(($.width>B||$.height>B)&&(q=B/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let Y=Math.floor(q*$.width),Te=Math.floor(q*$.height);m===void 0&&(m=g(Y,Te));let fe=S?g(Y,Te):m;return fe.width=Y,fe.height=Te,fe.getContext("2d").drawImage(T,0,0,Y,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+Te+")."),fe}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function f(T){return T.generateMipmaps}function u(T){n.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(T,S,B,q,$=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Y=S;if(S===n.RED&&(B===n.FLOAT&&(Y=n.R32F),B===n.HALF_FLOAT&&(Y=n.R16F),B===n.UNSIGNED_BYTE&&(Y=n.R8)),S===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.R8UI),B===n.UNSIGNED_SHORT&&(Y=n.R16UI),B===n.UNSIGNED_INT&&(Y=n.R32UI),B===n.BYTE&&(Y=n.R8I),B===n.SHORT&&(Y=n.R16I),B===n.INT&&(Y=n.R32I)),S===n.RG&&(B===n.FLOAT&&(Y=n.RG32F),B===n.HALF_FLOAT&&(Y=n.RG16F),B===n.UNSIGNED_BYTE&&(Y=n.RG8)),S===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RG8UI),B===n.UNSIGNED_SHORT&&(Y=n.RG16UI),B===n.UNSIGNED_INT&&(Y=n.RG32UI),B===n.BYTE&&(Y=n.RG8I),B===n.SHORT&&(Y=n.RG16I),B===n.INT&&(Y=n.RG32I)),S===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),B===n.UNSIGNED_INT&&(Y=n.RGB32UI),B===n.BYTE&&(Y=n.RGB8I),B===n.SHORT&&(Y=n.RGB16I),B===n.INT&&(Y=n.RGB32I)),S===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),B===n.UNSIGNED_INT&&(Y=n.RGBA32UI),B===n.BYTE&&(Y=n.RGBA8I),B===n.SHORT&&(Y=n.RGBA16I),B===n.INT&&(Y=n.RGBA32I)),S===n.RGB&&B===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),S===n.RGBA){let Te=$?Tn:qe.getTransfer(q);B===n.FLOAT&&(Y=n.RGBA32F),B===n.HALF_FLOAT&&(Y=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Y=Te===$e?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function _(T,S){let B;return T?S===null||S===Qt||S===Si?B=n.DEPTH24_STENCIL8:S===zt?B=n.DEPTH32F_STENCIL8:S===Wi&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Qt||S===Si?B=n.DEPTH_COMPONENT24:S===zt?B=n.DEPTH_COMPONENT32F:S===Wi&&(B=n.DEPTH_COMPONENT16),B}function D(T,S){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==St&&T.minFilter!==Bt?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function A(T){let S=T.target;S.removeEventListener("dispose",A),L(S),S.isVideoTexture&&h.delete(S)}function P(T){let S=T.target;S.removeEventListener("dispose",P),M(S)}function L(T){let S=i.get(T);if(S.__webglInit===void 0)return;let B=T.source,q=p.get(B);if(q){let $=q[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&b(T),Object.keys(q).length===0&&p.delete(B)}i.remove(T)}function b(T){let S=i.get(T);n.deleteTexture(S.__webglTexture);let B=T.source,q=p.get(B);delete q[S.__cacheKey],s.memory.textures--}function M(T){let S=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let $=0;$<S.__webglFramebuffer[q].length;$++)n.deleteFramebuffer(S.__webglFramebuffer[q][$]);else n.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)n.deleteFramebuffer(S.__webglFramebuffer[q]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let B=T.textures;for(let q=0,$=B.length;q<$;q++){let Y=i.get(B[q]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),s.memory.textures--),i.remove(B[q])}i.remove(T)}let C=0;function z(){C=0}function O(){let T=C;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),C+=1,T}function F(T){let S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function V(T,S){let B=i.get(T);if(T.isVideoTexture&&ae(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){let q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,T,S);return}}t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+S)}function G(T,S){let B=i.get(T);if(T.version>0&&B.__version!==T.version){Z(B,T,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+S)}function K(T,S){let B=i.get(T);if(T.version>0&&B.__version!==T.version){Z(B,T,S);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+S)}function W(T,S){let B=i.get(T);if(T.version>0&&B.__version!==T.version){re(B,T,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+S)}let he={[eo]:n.REPEAT,[vi]:n.CLAMP_TO_EDGE,[to]:n.MIRRORED_REPEAT},ge={[St]:n.NEAREST,[Dc]:n.NEAREST_MIPMAP_NEAREST,[io]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[us]:n.LINEAR_MIPMAP_NEAREST,[Mi]:n.LINEAR_MIPMAP_LINEAR},Ee={[Fc]:n.NEVER,[Hc]:n.ALWAYS,[Oc]:n.LESS,[bs]:n.LEQUAL,[Bc]:n.EQUAL,[Vc]:n.GEQUAL,[zc]:n.GREATER,[Gc]:n.NOTEQUAL};function He(T,S){if(S.type===zt&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Bt||S.magFilter===us||S.magFilter===io||S.magFilter===Mi||S.minFilter===Bt||S.minFilter===us||S.minFilter===io||S.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,he[S.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,he[S.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,he[S.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ge[S.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ge[S.minFilter]),S.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Ee[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===St||S.minFilter!==io&&S.minFilter!==Mi||S.type===zt&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function it(T,S){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",A));let q=S.source,$=p.get(q);$===void 0&&($={},p.set(q,$));let Y=F(S);if(Y!==T.__cacheKey){$[Y]===void 0&&($[Y]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,B=!0),$[Y].usedTimes++;let Te=$[T.__cacheKey];Te!==void 0&&($[T.__cacheKey].usedTimes--,Te.usedTimes===0&&b(S)),T.__cacheKey=Y,T.__webglTexture=$[Y].texture}return B}function Z(T,S,B){let q=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=n.TEXTURE_3D);let $=it(T,S),Y=S.source;t.bindTexture(q,T.__webglTexture,n.TEXTURE0+B);let Te=i.get(Y);if(Y.version!==Te.__version||$===!0){t.activeTexture(n.TEXTURE0+B);let fe=qe.getPrimaries(qe.workingColorSpace),_e=S.colorSpace===li?null:qe.getPrimaries(S.colorSpace),Ke=S.colorSpace===li||fe===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let ie=x(S.image,!1,r.maxTextureSize);ie=Ie(S,ie);let Me=o.convert(S.format,S.colorSpace),Ne=o.convert(S.type),Be=v(S.internalFormat,Me,Ne,S.colorSpace,S.isVideoTexture);He(q,S);let Se,Qe=S.mipmaps,Ye=S.isVideoTexture!==!0,lt=Te.__version===void 0||$===!0,U=Y.dataReady,ue=D(S,ie);if(S.isDepthTexture)Be=_(S.format===Ii,S.type),lt&&(Ye?t.texStorage2D(n.TEXTURE_2D,1,Be,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,Be,ie.width,ie.height,0,Me,Ne,null));else if(S.isDataTexture)if(Qe.length>0){Ye&&lt&&t.texStorage2D(n.TEXTURE_2D,ue,Be,Qe[0].width,Qe[0].height);for(let X=0,j=Qe.length;X<j;X++)Se=Qe[X],Ye?U&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,Se.width,Se.height,Me,Ne,Se.data):t.texImage2D(n.TEXTURE_2D,X,Be,Se.width,Se.height,0,Me,Ne,Se.data);S.generateMipmaps=!1}else Ye?(lt&&t.texStorage2D(n.TEXTURE_2D,ue,Be,ie.width,ie.height),U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ie.width,ie.height,Me,Ne,ie.data)):t.texImage2D(n.TEXTURE_2D,0,Be,ie.width,ie.height,0,Me,Ne,ie.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ye&&lt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Be,Qe[0].width,Qe[0].height,ie.depth);for(let X=0,j=Qe.length;X<j;X++)if(Se=Qe[X],S.format!==yt)if(Me!==null)if(Ye){if(U)if(S.layerUpdates.size>0){let me=Ll(Se.width,Se.height,S.format,S.type);for(let de of S.layerUpdates){let We=Se.data.subarray(de*me/Se.data.BYTES_PER_ELEMENT,(de+1)*me/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,de,Se.width,Se.height,1,Me,We)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,Se.width,Se.height,ie.depth,Me,Se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,X,Be,Se.width,Se.height,ie.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?U&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,X,0,0,0,Se.width,Se.height,ie.depth,Me,Ne,Se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,X,Be,Se.width,Se.height,ie.depth,0,Me,Ne,Se.data)}else{Ye&&lt&&t.texStorage2D(n.TEXTURE_2D,ue,Be,Qe[0].width,Qe[0].height);for(let X=0,j=Qe.length;X<j;X++)Se=Qe[X],S.format!==yt?Me!==null?Ye?U&&t.compressedTexSubImage2D(n.TEXTURE_2D,X,0,0,Se.width,Se.height,Me,Se.data):t.compressedTexImage2D(n.TEXTURE_2D,X,Be,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?U&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,Se.width,Se.height,Me,Ne,Se.data):t.texImage2D(n.TEXTURE_2D,X,Be,Se.width,Se.height,0,Me,Ne,Se.data)}else if(S.isDataArrayTexture)if(Ye){if(lt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ue,Be,ie.width,ie.height,ie.depth),U)if(S.layerUpdates.size>0){let X=Ll(ie.width,ie.height,S.format,S.type);for(let j of S.layerUpdates){let me=ie.data.subarray(j*X/ie.data.BYTES_PER_ELEMENT,(j+1)*X/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,ie.width,ie.height,1,Me,Ne,me)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Me,Ne,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Be,ie.width,ie.height,ie.depth,0,Me,Ne,ie.data);else if(S.isData3DTexture)Ye?(lt&&t.texStorage3D(n.TEXTURE_3D,ue,Be,ie.width,ie.height,ie.depth),U&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Me,Ne,ie.data)):t.texImage3D(n.TEXTURE_3D,0,Be,ie.width,ie.height,ie.depth,0,Me,Ne,ie.data);else if(S.isFramebufferTexture){if(lt)if(Ye)t.texStorage2D(n.TEXTURE_2D,ue,Be,ie.width,ie.height);else{let X=ie.width,j=ie.height;for(let me=0;me<ue;me++)t.texImage2D(n.TEXTURE_2D,me,Be,X,j,0,Me,Ne,null),X>>=1,j>>=1}}else if(Qe.length>0){if(Ye&&lt){let X=xe(Qe[0]);t.texStorage2D(n.TEXTURE_2D,ue,Be,X.width,X.height)}for(let X=0,j=Qe.length;X<j;X++)Se=Qe[X],Ye?U&&t.texSubImage2D(n.TEXTURE_2D,X,0,0,Me,Ne,Se):t.texImage2D(n.TEXTURE_2D,X,Be,Me,Ne,Se);S.generateMipmaps=!1}else if(Ye){if(lt){let X=xe(ie);t.texStorage2D(n.TEXTURE_2D,ue,Be,X.width,X.height)}U&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,Ne,ie)}else t.texImage2D(n.TEXTURE_2D,0,Be,Me,Ne,ie);f(S)&&u(q),Te.__version=Y.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function re(T,S,B){if(S.image.length!==6)return;let q=it(T,S),$=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+B);let Y=i.get($);if($.version!==Y.__version||q===!0){t.activeTexture(n.TEXTURE0+B);let Te=qe.getPrimaries(qe.workingColorSpace),fe=S.colorSpace===li?null:qe.getPrimaries(S.colorSpace),_e=S.colorSpace===li||Te===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let Ke=S.isCompressedTexture||S.image[0].isCompressedTexture,ie=S.image[0]&&S.image[0].isDataTexture,Me=[];for(let j=0;j<6;j++)!Ke&&!ie?Me[j]=x(S.image[j],!0,r.maxCubemapSize):Me[j]=ie?S.image[j].image:S.image[j],Me[j]=Ie(S,Me[j]);let Ne=Me[0],Be=o.convert(S.format,S.colorSpace),Se=o.convert(S.type),Qe=v(S.internalFormat,Be,Se,S.colorSpace),Ye=S.isVideoTexture!==!0,lt=Y.__version===void 0||q===!0,U=$.dataReady,ue=D(S,Ne);He(n.TEXTURE_CUBE_MAP,S);let X;if(Ke){Ye&&lt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Qe,Ne.width,Ne.height);for(let j=0;j<6;j++){X=Me[j].mipmaps;for(let me=0;me<X.length;me++){let de=X[me];S.format!==yt?Be!==null?Ye?U&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,de.width,de.height,Be,de.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,Qe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,0,0,de.width,de.height,Be,Se,de.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me,Qe,de.width,de.height,0,Be,Se,de.data)}}}else{if(X=S.mipmaps,Ye&&lt){X.length>0&&ue++;let j=xe(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Qe,j.width,j.height)}for(let j=0;j<6;j++)if(ie){Ye?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Me[j].width,Me[j].height,Be,Se,Me[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Qe,Me[j].width,Me[j].height,0,Be,Se,Me[j].data);for(let me=0;me<X.length;me++){let We=X[me].image[j].image;Ye?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,We.width,We.height,Be,Se,We.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,Qe,We.width,We.height,0,Be,Se,We.data)}}else{Ye?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Be,Se,Me[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Qe,Be,Se,Me[j]);for(let me=0;me<X.length;me++){let de=X[me];Ye?U&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,0,0,Be,Se,de.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,me+1,Qe,Be,Se,de.image[j])}}}f(S)&&u(n.TEXTURE_CUBE_MAP),Y.__version=$.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function be(T,S,B,q,$,Y){let Te=o.convert(B.format,B.colorSpace),fe=o.convert(B.type),_e=v(B.internalFormat,Te,fe,B.colorSpace),Ke=i.get(S),ie=i.get(B);if(ie.__renderTarget=S,!Ke.__hasExternalTextures){let Me=Math.max(1,S.width>>Y),Ne=Math.max(1,S.height>>Y);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,Y,_e,Me,Ne,S.depth,0,Te,fe,null):t.texImage2D($,Y,_e,Me,Ne,0,Te,fe,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),ve(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,$,ie.__webglTexture,0,te(S)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,$,ie.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(T,S,B){if(n.bindRenderbuffer(n.RENDERBUFFER,T),S.depthBuffer){let q=S.depthTexture,$=q&&q.isDepthTexture?q.type:null,Y=_(S.stencilBuffer,$),Te=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=te(S);ve(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,fe,Y,S.width,S.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,Y,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Y,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,T)}else{let q=S.textures;for(let $=0;$<q.length;$++){let Y=q[$],Te=o.convert(Y.format,Y.colorSpace),fe=o.convert(Y.type),_e=v(Y.internalFormat,Te,fe,Y.colorSpace),Ke=te(S);B&&ve(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke,_e,S.width,S.height):ve(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ke,_e,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,_e,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function De(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);let $=q.__webglTexture,Y=te(S);if(S.depthTexture.format===Ui)ve(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,$,0);else if(S.depthTexture.format===Ii)ve(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function ze(T){let S=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){let q=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){let $=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),S.__depthDisposeCallback=$}S.__boundDepthTexture=q}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");De(S.__webglFramebuffer,T)}else if(B){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=n.createRenderbuffer(),se(S.__webglDepthbuffer[q],T,!1);else{let $=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),se(S.__webglDepthbuffer,T,!1);else{let q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,$),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,$)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(T,S,B){let q=i.get(T);S!==void 0&&be(q.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&ze(T)}function et(T){let S=T.texture,B=i.get(T),q=i.get(S);T.addEventListener("dispose",P);let $=T.textures,Y=T.isWebGLCubeRenderTarget===!0,Te=$.length>1;if(Te||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=S.version,s.memory.textures++),Y){B.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[fe]=[];for(let _e=0;_e<S.mipmaps.length;_e++)B.__webglFramebuffer[fe][_e]=n.createFramebuffer()}else B.__webglFramebuffer[fe]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let fe=0;fe<S.mipmaps.length;fe++)B.__webglFramebuffer[fe]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Te)for(let fe=0,_e=$.length;fe<_e;fe++){let Ke=i.get($[fe]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=n.createTexture(),s.memory.textures++)}if(T.samples>0&&ve(T)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let fe=0;fe<$.length;fe++){let _e=$[fe];B.__webglColorRenderbuffer[fe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[fe]);let Ke=o.convert(_e.format,_e.colorSpace),ie=o.convert(_e.type),Me=v(_e.internalFormat,Ke,ie,_e.colorSpace,T.isXRRenderTarget===!0),Ne=te(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,Me,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,B.__webglColorRenderbuffer[fe])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),se(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),He(n.TEXTURE_CUBE_MAP,S);for(let fe=0;fe<6;fe++)if(S.mipmaps&&S.mipmaps.length>0)for(let _e=0;_e<S.mipmaps.length;_e++)be(B.__webglFramebuffer[fe][_e],T,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,_e);else be(B.__webglFramebuffer[fe],T,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);f(S)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let fe=0,_e=$.length;fe<_e;fe++){let Ke=$[fe],ie=i.get(Ke);t.bindTexture(n.TEXTURE_2D,ie.__webglTexture),He(n.TEXTURE_2D,Ke),be(B.__webglFramebuffer,T,Ke,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,0),f(Ke)&&u(n.TEXTURE_2D)}t.unbindTexture()}else{let fe=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(fe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,q.__webglTexture),He(fe,S),S.mipmaps&&S.mipmaps.length>0)for(let _e=0;_e<S.mipmaps.length;_e++)be(B.__webglFramebuffer[_e],T,S,n.COLOR_ATTACHMENT0,fe,_e);else be(B.__webglFramebuffer,T,S,n.COLOR_ATTACHMENT0,fe,0);f(S)&&u(fe),t.unbindTexture()}T.depthBuffer&&ze(T)}function Q(T){let S=T.textures;for(let B=0,q=S.length;B<q;B++){let $=S[B];if(f($)){let Y=y(T),Te=i.get($).__webglTexture;t.bindTexture(Y,Te),u(Y),t.unbindTexture()}}}let ne=[],w=[];function Ce(T){if(T.samples>0){if(ve(T)===!1){let S=T.textures,B=T.width,q=T.height,$=n.COLOR_BUFFER_BIT,Y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(T),fe=S.length>1;if(fe)for(let _e=0;_e<S.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let _e=0;_e<S.length;_e++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),fe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[_e]);let Ke=i.get(S[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ke,0)}n.blitFramebuffer(0,0,B,q,0,0,B,q,$,n.NEAREST),l===!0&&(ne.length=0,w.length=0,ne.push(n.COLOR_ATTACHMENT0+_e),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ne.push(Y),w.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,w)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),fe)for(let _e=0;_e<S.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,Te.__webglColorRenderbuffer[_e]);let Ke=i.get(S[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,Ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){let S=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function te(T){return Math.min(r.maxSamples,T.samples)}function ve(T){let S=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ae(T){let S=s.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function Ie(T,S){let B=T.colorSpace,q=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==yi&&B!==li&&(qe.getTransfer(B)===$e?(q!==yt||$!==Dt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function xe(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=z,this.setTexture2D=V,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=W,this.rebindTextures=Oe,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=be,this.useMultisampledRTT=ve}function Kd(n,e){function t(i,r=li){let o,s=qe.getTransfer(r);if(i===Dt)return n.UNSIGNED_BYTE;if(i===Qn)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$n)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ms)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ds)return n.BYTE;if(i===ps)return n.SHORT;if(i===Wi)return n.UNSIGNED_SHORT;if(i===jn)return n.INT;if(i===Qt)return n.UNSIGNED_INT;if(i===zt)return n.FLOAT;if(i===Di)return n.HALF_FLOAT;if(i===gs)return n.ALPHA;if(i===xs)return n.RGB;if(i===yt)return n.RGBA;if(i===_s)return n.LUMINANCE;if(i===vs)return n.LUMINANCE_ALPHA;if(i===Ui)return n.DEPTH_COMPONENT;if(i===Ii)return n.DEPTH_STENCIL;if(i===Ms)return n.RED;if(i===er)return n.RED_INTEGER;if(i===Ss)return n.RG;if(i===tr)return n.RG_INTEGER;if(i===ir)return n.RGBA_INTEGER;if(i===nr||i===rr||i===or||i===sr)if(s===$e)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(i===nr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===rr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===or)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(i===nr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===rr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===or)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===no||i===ro||i===oo||i===so)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(i===no)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ro)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===oo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===so)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ao||i===lo||i===co)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(i===ao||i===lo)return s===$e?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(i===co)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ho||i===fo||i===uo||i===po||i===mo||i===go||i===xo||i===_o||i===vo||i===Mo||i===So||i===yo||i===Eo||i===bo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(i===ho)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===uo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===po)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===go)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===xo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_o)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===So)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bo)return s===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ar||i===To||i===Ao)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(i===ar)return s===$e?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===To)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ao)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ys||i===wo||i===Ro||i===Co)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(i===ar)return o.COMPRESSED_RED_RGTC1_EXT;if(i===wo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ro)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Co)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Si?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var sa=class extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}};var Oi=class extends ht{constructor(){super(),this.isGroup=!0,this.type="Group"}};var w0={type:"move"},Dr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,o=null,s=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(let x of e.hand.values()){let f=t.getJointPose(x,i),u=this._getHandJoint(c,x);f!==null&&(u.matrix.fromArray(f.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=f.radius),u.visible=f!==null}let h=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],p=h.position.distanceTo(m.position),d=.02,g=.005;c.inputState.pinching&&p>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&o!==null&&(r=o),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(w0)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Oi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var R0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,C0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,aa=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){let r=new gt,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Rt({vertexShader:R0,fragmentShader:C0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bt(new mn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}};var la=class extends qt{constructor(e,t){super();let i=this,r=null,o=1,s=null,a="local-floor",l=1,c=null,h=null,m=null,p=null,d=null,g=null,x=new aa,f=t.getContextAttributes(),u=null,y=null,v=[],_=[],D=new J,A=null,P=new Pt;P.viewport=new st;let L=new Pt;L.viewport=new st;let b=[P,L],M=new sa,C=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let re=v[Z];return re===void 0&&(re=new Dr,v[Z]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Z){let re=v[Z];return re===void 0&&(re=new Dr,v[Z]=re),re.getGripSpace()},this.getHand=function(Z){let re=v[Z];return re===void 0&&(re=new Dr,v[Z]=re),re.getHandSpace()};function O(Z){let re=_.indexOf(Z.inputSource);if(re===-1)return;let be=v[re];be!==void 0&&(be.update(Z.inputSource,Z.frame,c||s),be.dispatchEvent({type:Z.type,data:Z.inputSource}))}function F(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",V);for(let Z=0;Z<v.length;Z++){let re=_[Z];re!==null&&(_[Z]=null,v[Z].disconnect(re))}C=null,z=null,x.reset(),e.setRenderTarget(u),d=null,p=null,m=null,r=null,y=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return m},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",F),r.addEventListener("inputsourceschange",V),f.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(D),r.renderState.layers===void 0){let re={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:o};d=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new Yt(d.framebufferWidth,d.framebufferHeight,{format:yt,type:Dt,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let re=null,be=null,se=null;f.depth&&(se=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=f.stencil?Ii:Ui,be=f.stencil?Si:Qt);let De={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:o};m=new XRWebGLBinding(r,t),p=m.createProjectionLayer(De),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),y=new Yt(p.textureWidth,p.textureHeight,{format:yt,type:Dt,depthTexture:new Pr(p.textureWidth,p.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await r.requestReferenceSpace(a),it.setContext(r),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function V(Z){for(let re=0;re<Z.removed.length;re++){let be=Z.removed[re],se=_.indexOf(be);se>=0&&(_[se]=null,v[se].disconnect(be))}for(let re=0;re<Z.added.length;re++){let be=Z.added[re],se=_.indexOf(be);if(se===-1){for(let ze=0;ze<v.length;ze++)if(ze>=_.length){_.push(be),se=ze;break}else if(_[ze]===null){_[ze]=be,se=ze;break}if(se===-1)break}let De=v[se];De&&De.connect(be)}}let G=new R,K=new R;function W(Z,re,be){G.setFromMatrixPosition(re.matrixWorld),K.setFromMatrixPosition(be.matrixWorld);let se=G.distanceTo(K),De=re.projectionMatrix.elements,ze=be.projectionMatrix.elements,Oe=De[14]/(De[10]-1),et=De[14]/(De[10]+1),Q=(De[9]+1)/De[5],ne=(De[9]-1)/De[5],w=(De[8]-1)/De[0],Ce=(ze[8]+1)/ze[0],te=Oe*w,ve=Oe*Ce,ae=se/(-w+Ce),Ie=ae*-w;if(re.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ie),Z.translateZ(ae),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),De[10]===-1)Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let xe=Oe+ae,T=et+ae,S=te-Ie,B=ve+(se-Ie),q=Q*et/T*xe,$=ne*et/T*xe;Z.projectionMatrix.makePerspective(S,B,q,$,xe,T),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function he(Z,re){re===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(re.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;let re=Z.near,be=Z.far;x.texture!==null&&(x.depthNear>0&&(re=x.depthNear),x.depthFar>0&&(be=x.depthFar)),M.near=L.near=P.near=re,M.far=L.far=P.far=be,(C!==M.near||z!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,z=M.far),P.layers.mask=Z.layers.mask|2,L.layers.mask=Z.layers.mask|4,M.layers.mask=P.layers.mask|L.layers.mask;let se=Z.parent,De=M.cameras;he(M,se);for(let ze=0;ze<De.length;ze++)he(De[ze],se);De.length===2?W(M,P,L):M.projectionMatrix.copy(P.projectionMatrix),ge(Z,M,se)};function ge(Z,re,be){be===null?Z.matrix.copy(re.matrixWorld):(Z.matrix.copy(be.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(re.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(re.projectionMatrix),Z.projectionMatrixInverse.copy(re.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Lo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(Z){l=Z,p!==null&&(p.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let Ee=null;function He(Z,re){if(h=re.getViewerPose(c||s),g=re,h!==null){let be=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let se=!1;be.length!==M.cameras.length&&(M.cameras.length=0,se=!0);for(let ze=0;ze<be.length;ze++){let Oe=be[ze],et=null;if(d!==null)et=d.getViewport(Oe);else{let ne=m.getViewSubImage(p,Oe);et=ne.viewport,ze===0&&(e.setRenderTargetTextures(y,ne.colorTexture,p.ignoreDepthValues?void 0:ne.depthStencilTexture),e.setRenderTarget(y))}let Q=b[ze];Q===void 0&&(Q=new Pt,Q.layers.enable(ze),Q.viewport=new st,b[ze]=Q),Q.matrix.fromArray(Oe.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Oe.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(et.x,et.y,et.width,et.height),ze===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),se===!0&&M.cameras.push(Q)}let De=r.enabledFeatures;if(De&&De.includes("depth-sensing")){let ze=m.getDepthInformation(be[0]);ze&&ze.isValid&&ze.texture&&x.init(e,ze,r.renderState)}}for(let be=0;be<v.length;be++){let se=_[be],De=v[be];se!==null&&De!==void 0&&De.update(se,re,c||s)}Ee&&Ee(Z,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),g=null}let it=new Qs;it.setAnimationLoop(He),this.setAnimationLoop=function(Z){Ee=Z},this.dispose=function(){}}};var On=new Zt,P0=new Ze;function jd(n,e){function t(f,u){f.matrixAutoUpdate===!0&&f.updateMatrix(),u.value.copy(f.matrix)}function i(f,u){u.color.getRGB(f.fogColor.value,Zs(n)),u.isFog?(f.fogNear.value=u.near,f.fogFar.value=u.far):u.isFogExp2&&(f.fogDensity.value=u.density)}function r(f,u,y,v,_){u.isMeshBasicMaterial||u.isMeshLambertMaterial?o(f,u):u.isMeshToonMaterial?(o(f,u),m(f,u)):u.isMeshPhongMaterial?(o(f,u),h(f,u)):u.isMeshStandardMaterial?(o(f,u),p(f,u),u.isMeshPhysicalMaterial&&d(f,u,_)):u.isMeshMatcapMaterial?(o(f,u),g(f,u)):u.isMeshDepthMaterial?o(f,u):u.isMeshDistanceMaterial?(o(f,u),x(f,u)):u.isMeshNormalMaterial?o(f,u):u.isLineBasicMaterial?(s(f,u),u.isLineDashedMaterial&&a(f,u)):u.isPointsMaterial?l(f,u,y,v):u.isSpriteMaterial?c(f,u):u.isShadowMaterial?(f.color.value.copy(u.color),f.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function o(f,u){f.opacity.value=u.opacity,u.color&&f.diffuse.value.copy(u.color),u.emissive&&f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(f.map.value=u.map,t(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.bumpMap&&(f.bumpMap.value=u.bumpMap,t(u.bumpMap,f.bumpMapTransform),f.bumpScale.value=u.bumpScale,u.side===pt&&(f.bumpScale.value*=-1)),u.normalMap&&(f.normalMap.value=u.normalMap,t(u.normalMap,f.normalMapTransform),f.normalScale.value.copy(u.normalScale),u.side===pt&&f.normalScale.value.negate()),u.displacementMap&&(f.displacementMap.value=u.displacementMap,t(u.displacementMap,f.displacementMapTransform),f.displacementScale.value=u.displacementScale,f.displacementBias.value=u.displacementBias),u.emissiveMap&&(f.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,f.emissiveMapTransform)),u.specularMap&&(f.specularMap.value=u.specularMap,t(u.specularMap,f.specularMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest);let y=e.get(u),v=y.envMap,_=y.envMapRotation;v&&(f.envMap.value=v,On.copy(_),On.x*=-1,On.y*=-1,On.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(On.y*=-1,On.z*=-1),f.envMapRotation.value.setFromMatrix4(P0.makeRotationFromEuler(On)),f.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=u.reflectivity,f.ior.value=u.ior,f.refractionRatio.value=u.refractionRatio),u.lightMap&&(f.lightMap.value=u.lightMap,f.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,f.lightMapTransform)),u.aoMap&&(f.aoMap.value=u.aoMap,f.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,f.aoMapTransform))}function s(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,u.map&&(f.map.value=u.map,t(u.map,f.mapTransform))}function a(f,u){f.dashSize.value=u.dashSize,f.totalSize.value=u.dashSize+u.gapSize,f.scale.value=u.scale}function l(f,u,y,v){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.size.value=u.size*y,f.scale.value=v*.5,u.map&&(f.map.value=u.map,t(u.map,f.uvTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function c(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.rotation.value=u.rotation,u.map&&(f.map.value=u.map,t(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function h(f,u){f.specular.value.copy(u.specular),f.shininess.value=Math.max(u.shininess,1e-4)}function m(f,u){u.gradientMap&&(f.gradientMap.value=u.gradientMap)}function p(f,u){f.metalness.value=u.metalness,u.metalnessMap&&(f.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,f.metalnessMapTransform)),f.roughness.value=u.roughness,u.roughnessMap&&(f.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,f.roughnessMapTransform)),u.envMap&&(f.envMapIntensity.value=u.envMapIntensity)}function d(f,u,y){f.ior.value=u.ior,u.sheen>0&&(f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),f.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(f.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,f.sheenColorMapTransform)),u.sheenRoughnessMap&&(f.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,f.sheenRoughnessMapTransform))),u.clearcoat>0&&(f.clearcoat.value=u.clearcoat,f.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(f.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,f.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(f.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===pt&&f.clearcoatNormalScale.value.negate())),u.dispersion>0&&(f.dispersion.value=u.dispersion),u.iridescence>0&&(f.iridescence.value=u.iridescence,f.iridescenceIOR.value=u.iridescenceIOR,f.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(f.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,f.iridescenceMapTransform)),u.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),u.transmission>0&&(f.transmission.value=u.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),u.transmissionMap&&(f.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,f.transmissionMapTransform)),f.thickness.value=u.thickness,u.thicknessMap&&(f.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=u.attenuationDistance,f.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(f.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(f.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=u.specularIntensity,f.specularColor.value.copy(u.specularColor),u.specularColorMap&&(f.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,f.specularColorMapTransform)),u.specularIntensityMap&&(f.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,u){u.matcap&&(f.matcap.value=u.matcap)}function x(f,u){let y=e.get(u).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Qd(n,e,t,i){let r={},o={},s=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){let _=v.program;i.uniformBlockBinding(y,_)}function c(y,v){let _=r[y.id];_===void 0&&(g(y),_=h(y),r[y.id]=_,y.addEventListener("dispose",f));let D=v.program;i.updateUBOMapping(y,D);let A=e.render.frame;o[y.id]!==A&&(p(y),o[y.id]=A)}function h(y){let v=m();y.__bindingPointIndex=v;let _=n.createBuffer(),D=y.__size,A=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,D,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,_),_}function m(){for(let y=0;y<a;y++)if(s.indexOf(y)===-1)return s.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(y){let v=r[y.id],_=y.uniforms,D=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let A=0,P=_.length;A<P;A++){let L=Array.isArray(_[A])?_[A]:[_[A]];for(let b=0,M=L.length;b<M;b++){let C=L[b];if(d(C,A,b,D)===!0){let z=C.__offset,O=Array.isArray(C.value)?C.value:[C.value],F=0;for(let V=0;V<O.length;V++){let G=O[V],K=x(G);typeof G=="number"||typeof G=="boolean"?(C.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,z+F,C.__data)):G.isMatrix3?(C.__data[0]=G.elements[0],C.__data[1]=G.elements[1],C.__data[2]=G.elements[2],C.__data[3]=0,C.__data[4]=G.elements[3],C.__data[5]=G.elements[4],C.__data[6]=G.elements[5],C.__data[7]=0,C.__data[8]=G.elements[6],C.__data[9]=G.elements[7],C.__data[10]=G.elements[8],C.__data[11]=0):(G.toArray(C.__data,F),F+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,z,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,v,_,D){let A=y.value,P=v+"_"+_;if(D[P]===void 0)return typeof A=="number"||typeof A=="boolean"?D[P]=A:D[P]=A.clone(),!0;{let L=D[P];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return D[P]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(y){let v=y.uniforms,_=0,D=16;for(let P=0,L=v.length;P<L;P++){let b=Array.isArray(v[P])?v[P]:[v[P]];for(let M=0,C=b.length;M<C;M++){let z=b[M],O=Array.isArray(z.value)?z.value:[z.value];for(let F=0,V=O.length;F<V;F++){let G=O[F],K=x(G),W=_%D,he=W%K.boundary,ge=W+he;_+=he,ge!==0&&D-ge<K.storage&&(_+=D-ge),z.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=_,_+=K.storage}}}let A=_%D;return A>0&&(_+=D-A),y.__size=_,y.__cache={},this}function x(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function f(y){let v=y.target;v.removeEventListener("dispose",f);let _=s.indexOf(v.__bindingPointIndex);s.splice(_,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete o[v.id]}function u(){for(let y in r)n.deleteBuffer(r[y]);s=[],r={},o={}}return{bind:l,update:c,dispose:u}}var Bo=class{constructor(e={}){let{canvas:t=Xc(),context:i=null,depth:r=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=s;let g=new Uint32Array(4),x=new Int32Array(4),f=null,u=null,y=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Gt,this.toneMapping=ai,this.toneMappingExposure=1;let _=this,D=!1,A=0,P=0,L=null,b=-1,M=null,C=new st,z=new st,O=null,F=new Fe(0),V=0,G=t.width,K=t.height,W=1,he=null,ge=null,Ee=new st(0,0,G,K),He=new st(0,0,G,K),it=!1,Z=new pn,re=!1,be=!1,se=new Ze,De=new Ze,ze=new R,Oe=new st,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Q=!1;function ne(){return L===null?W:1}let w=i;function Ce(E,I){return t.getContext(E,I)}try{let E={alpha:!0,depth:r,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jr}`),t.addEventListener("webglcontextlost",j,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",de,!1),w===null){let I="webgl2";if(w=Ce(I,E),w===null)throw Ce(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let te,ve,ae,Ie,xe,T,S,B,q,$,Y,Te,fe,_e,Ke,ie,Me,Ne,Be,Se,Qe,Ye,lt,U;function ue(){te=new dd(w),te.init(),Ye=new Kd(w,te),ve=new nd(w,te,e,Ye),ae=new Zd(w,te),ve.reverseDepthBuffer&&p&&ae.buffers.depth.setReversed(!0),Ie=new gd(w),xe=new Bd,T=new Jd(w,te,ae,xe,ve,Ye,Ie),S=new od(_),B=new ud(_),q=new vh(w),lt=new td(w,q),$=new pd(w,q,Ie,lt),Y=new _d(w,$,q,Ie),Be=new xd(w,ve,T),ie=new rd(xe),Te=new Od(_,S,B,te,ve,lt,ie),fe=new jd(_,xe),_e=new Vd,Ke=new Wd(te),Ne=new ed(_,S,B,ae,Y,d,l),Me=new Yd(_,Y,ve),U=new Qd(w,Ie,ve,ae),Se=new id(w,te,Ie),Qe=new md(w,te,Ie),Ie.programs=Te.programs,_.capabilities=ve,_.extensions=te,_.properties=xe,_.renderLists=_e,_.shadowMap=Me,_.state=ae,_.info=Ie}ue();let X=new la(_,w);this.xr=X,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let E=te.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=te.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(E){E!==void 0&&(W=E,this.setSize(G,K,!1))},this.getSize=function(E){return E.set(G,K)},this.setSize=function(E,I,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,K=I,t.width=Math.floor(E*W),t.height=Math.floor(I*W),H===!0&&(t.style.width=E+"px",t.style.height=I+"px"),this.setViewport(0,0,E,I)},this.getDrawingBufferSize=function(E){return E.set(G*W,K*W).floor()},this.setDrawingBufferSize=function(E,I,H){G=E,K=I,W=H,t.width=Math.floor(E*H),t.height=Math.floor(I*H),this.setViewport(0,0,E,I)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(Ee)},this.setViewport=function(E,I,H,k){E.isVector4?Ee.set(E.x,E.y,E.z,E.w):Ee.set(E,I,H,k),ae.viewport(C.copy(Ee).multiplyScalar(W).round())},this.getScissor=function(E){return E.copy(He)},this.setScissor=function(E,I,H,k){E.isVector4?He.set(E.x,E.y,E.z,E.w):He.set(E,I,H,k),ae.scissor(z.copy(He).multiplyScalar(W).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(E){ae.setScissorTest(it=E)},this.setOpaqueSort=function(E){he=E},this.setTransparentSort=function(E){ge=E},this.getClearColor=function(E){return E.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor.apply(Ne,arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha.apply(Ne,arguments)},this.clear=function(E=!0,I=!0,H=!0){let k=0;if(E){let N=!1;if(L!==null){let oe=L.texture.format;N=oe===ir||oe===tr||oe===er}if(N){let oe=L.texture.type,pe=oe===Dt||oe===Qt||oe===Wi||oe===Si||oe===Qn||oe===$n,Ae=Ne.getClearColor(),we=Ne.getClearAlpha(),Ge=Ae.r,Xe=Ae.g,Re=Ae.b;pe?(g[0]=Ge,g[1]=Xe,g[2]=Re,g[3]=we,w.clearBufferuiv(w.COLOR,0,g)):(x[0]=Ge,x[1]=Xe,x[2]=Re,x[3]=we,w.clearBufferiv(w.COLOR,0,x))}else k|=w.COLOR_BUFFER_BIT}I&&(k|=w.DEPTH_BUFFER_BIT),H&&(k|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",j,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",de,!1),_e.dispose(),Ke.dispose(),xe.dispose(),S.dispose(),B.dispose(),Y.dispose(),lt.dispose(),U.dispose(),Te.dispose(),X.dispose(),X.removeEventListener("sessionstart",Zl),X.removeEventListener("sessionend",Jl),bn.stop()};function j(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;let E=Ie.autoReset,I=Me.enabled,H=Me.autoUpdate,k=Me.needsUpdate,N=Me.type;ue(),Ie.autoReset=E,Me.enabled=I,Me.autoUpdate=H,Me.needsUpdate=k,Me.type=N}function de(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function We(E){let I=E.target;I.removeEventListener("dispose",We),vt(I)}function vt(E){Lt(E),xe.remove(E)}function Lt(E){let I=xe.get(E).programs;I!==void 0&&(I.forEach(function(H){Te.releaseProgram(H)}),E.isShaderMaterial&&Te.releaseShaderCache(E))}this.renderBufferDirect=function(E,I,H,k,N,oe){I===null&&(I=et);let pe=N.isMesh&&N.matrixWorld.determinant()<0,Ae=Ap(E,I,H,k,N);ae.setMaterial(k,pe);let we=H.index,Ge=1;if(k.wireframe===!0){if(we=$.getWireframeAttribute(H),we===void 0)return;Ge=2}let Xe=H.drawRange,Re=H.attributes.position,tt=Xe.start*Ge,ct=(Xe.start+Xe.count)*Ge;oe!==null&&(tt=Math.max(tt,oe.start*Ge),ct=Math.min(ct,(oe.start+oe.count)*Ge)),we!==null?(tt=Math.max(tt,0),ct=Math.min(ct,we.count)):Re!=null&&(tt=Math.max(tt,0),ct=Math.min(ct,Re.count));let ut=ct-tt;if(ut<0||ut===1/0)return;lt.setup(N,k,Ae,H,we);let Wt,nt=Se;if(we!==null&&(Wt=q.get(we),nt=Qe,nt.setIndex(Wt)),N.isMesh)k.wireframe===!0?(ae.setLineWidth(k.wireframeLinewidth*ne()),nt.setMode(w.LINES)):nt.setMode(w.TRIANGLES);else if(N.isLine){let Le=k.linewidth;Le===void 0&&(Le=1),ae.setLineWidth(Le*ne()),N.isLineSegments?nt.setMode(w.LINES):N.isLineLoop?nt.setMode(w.LINE_LOOP):nt.setMode(w.LINE_STRIP)}else N.isPoints?nt.setMode(w.POINTS):N.isSprite&&nt.setMode(w.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)nt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))nt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let Le=N._multiDrawStarts,Vi=N._multiDrawCounts,rt=N._multiDrawCount,gi=we?q.get(we).bytesPerElement:1,Kn=xe.get(k).currentProgram.getUniforms();for(let Kt=0;Kt<rt;Kt++)Kn.setValue(w,"_gl_DrawID",Kt),nt.render(Le[Kt]/gi,Vi[Kt])}else if(N.isInstancedMesh)nt.renderInstances(tt,ut,N.count);else if(H.isInstancedBufferGeometry){let Le=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Vi=Math.min(H.instanceCount,Le);nt.renderInstances(tt,ut,Vi)}else nt.render(tt,ut)};function at(E,I,H){E.transparent===!0&&E.side===Ot&&E.forceSinglePass===!1?(E.side=pt,E.needsUpdate=!0,is(E,I,H),E.side=jt,E.needsUpdate=!0,is(E,I,H),E.side=Ot):is(E,I,H)}this.compile=function(E,I,H=null){H===null&&(H=E),u=Ke.get(H),u.init(I),v.push(u),H.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(u.pushLight(N),N.castShadow&&u.pushShadow(N))}),E!==H&&E.traverseVisible(function(N){N.isLight&&N.layers.test(I.layers)&&(u.pushLight(N),N.castShadow&&u.pushShadow(N))}),u.setupLights();let k=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let oe=N.material;if(oe)if(Array.isArray(oe))for(let pe=0;pe<oe.length;pe++){let Ae=oe[pe];at(Ae,H,N),k.add(Ae)}else at(oe,H,N),k.add(oe)}),v.pop(),u=null,k},this.compileAsync=function(E,I,H=null){let k=this.compile(E,I,H);return new Promise(N=>{function oe(){if(k.forEach(function(pe){xe.get(pe).currentProgram.isReady()&&k.delete(pe)}),k.size===0){N(E);return}setTimeout(oe,10)}te.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let mi=null;function Gi(E){mi&&mi(E)}function Zl(){bn.stop()}function Jl(){bn.start()}let bn=new Qs;bn.setAnimationLoop(Gi),typeof self<"u"&&bn.setContext(self),this.setAnimationLoop=function(E){mi=E,X.setAnimationLoop(E),E===null?bn.stop():bn.start()},X.addEventListener("sessionstart",Zl),X.addEventListener("sessionend",Jl),this.render=function(E,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(I),I=X.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,I,L),u=Ke.get(E,v.length),u.init(I),v.push(u),De.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Z.setFromProjectionMatrix(De),be=this.localClippingEnabled,re=ie.init(this.clippingPlanes,be),f=_e.get(E,y.length),f.init(),y.push(f),X.enabled===!0&&X.isPresenting===!0){let oe=_.xr.getDepthSensingMesh();oe!==null&&Wa(oe,I,-1/0,_.sortObjects)}Wa(E,I,0,_.sortObjects),f.finish(),_.sortObjects===!0&&f.sort(he,ge),Q=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Q&&Ne.addToRenderList(f,E),this.info.render.frame++,re===!0&&ie.beginShadows();let H=u.state.shadowsArray;Me.render(H,E,I),re===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=f.opaque,N=f.transmissive;if(u.setupLights(),I.isArrayCamera){let oe=I.cameras;if(N.length>0)for(let pe=0,Ae=oe.length;pe<Ae;pe++){let we=oe[pe];jl(k,N,E,we)}Q&&Ne.render(E);for(let pe=0,Ae=oe.length;pe<Ae;pe++){let we=oe[pe];Kl(f,E,we,we.viewport)}}else N.length>0&&jl(k,N,E,I),Q&&Ne.render(E),Kl(f,E,I);L!==null&&(T.updateMultisampleRenderTarget(L),T.updateRenderTargetMipmap(L)),E.isScene===!0&&E.onAfterRender(_,E,I),lt.resetDefaultState(),b=-1,M=null,v.pop(),v.length>0?(u=v[v.length-1],re===!0&&ie.setGlobalState(_.clippingPlanes,u.state.camera)):u=null,y.pop(),y.length>0?f=y[y.length-1]:f=null};function Wa(E,I,H,k){if(E.visible===!1)return;if(E.layers.test(I.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(I);else if(E.isLight)u.pushLight(E),E.castShadow&&u.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Z.intersectsSprite(E)){k&&Oe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(De);let pe=Y.update(E),Ae=E.material;Ae.visible&&f.push(E,pe,Ae,H,Oe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Z.intersectsObject(E))){let pe=Y.update(E),Ae=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Oe.copy(E.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Oe.copy(pe.boundingSphere.center)),Oe.applyMatrix4(E.matrixWorld).applyMatrix4(De)),Array.isArray(Ae)){let we=pe.groups;for(let Ge=0,Xe=we.length;Ge<Xe;Ge++){let Re=we[Ge],tt=Ae[Re.materialIndex];tt&&tt.visible&&f.push(E,pe,tt,H,Oe.z,Re)}}else Ae.visible&&f.push(E,pe,Ae,H,Oe.z,null)}}let oe=E.children;for(let pe=0,Ae=oe.length;pe<Ae;pe++)Wa(oe[pe],I,H,k)}function Kl(E,I,H,k){let N=E.opaque,oe=E.transmissive,pe=E.transparent;u.setupLightsView(H),re===!0&&ie.setGlobalState(_.clippingPlanes,H),k&&ae.viewport(C.copy(k)),N.length>0&&ts(N,I,H),oe.length>0&&ts(oe,I,H),pe.length>0&&ts(pe,I,H),ae.buffers.depth.setTest(!0),ae.buffers.depth.setMask(!0),ae.buffers.color.setMask(!0),ae.setPolygonOffset(!1)}function jl(E,I,H,k){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[k.id]===void 0&&(u.state.transmissionRenderTarget[k.id]=new Yt(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Di:Dt,minFilter:Mi,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));let oe=u.state.transmissionRenderTarget[k.id],pe=k.viewport||C;oe.setSize(pe.z,pe.w);let Ae=_.getRenderTarget();_.setRenderTarget(oe),_.getClearColor(F),V=_.getClearAlpha(),V<1&&_.setClearColor(16777215,.5),_.clear(),Q&&Ne.render(H);let we=_.toneMapping;_.toneMapping=ai;let Ge=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),u.setupLightsView(k),re===!0&&ie.setGlobalState(_.clippingPlanes,k),ts(E,H,k),T.updateMultisampleRenderTarget(oe),T.updateRenderTargetMipmap(oe),te.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Re=0,tt=I.length;Re<tt;Re++){let ct=I[Re],ut=ct.object,Wt=ct.geometry,nt=ct.material,Le=ct.group;if(nt.side===Ot&&ut.layers.test(k.layers)){let Vi=nt.side;nt.side=pt,nt.needsUpdate=!0,Ql(ut,H,k,Wt,nt,Le),nt.side=Vi,nt.needsUpdate=!0,Xe=!0}}Xe===!0&&(T.updateMultisampleRenderTarget(oe),T.updateRenderTargetMipmap(oe))}_.setRenderTarget(Ae),_.setClearColor(F,V),Ge!==void 0&&(k.viewport=Ge),_.toneMapping=we}function ts(E,I,H){let k=I.isScene===!0?I.overrideMaterial:null;for(let N=0,oe=E.length;N<oe;N++){let pe=E[N],Ae=pe.object,we=pe.geometry,Ge=k===null?pe.material:k,Xe=pe.group;Ae.layers.test(H.layers)&&Ql(Ae,I,H,we,Ge,Xe)}}function Ql(E,I,H,k,N,oe){E.onBeforeRender(_,I,H,k,N,oe),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(_,I,H,k,E,oe),N.transparent===!0&&N.side===Ot&&N.forceSinglePass===!1?(N.side=pt,N.needsUpdate=!0,_.renderBufferDirect(H,I,k,N,E,oe),N.side=jt,N.needsUpdate=!0,_.renderBufferDirect(H,I,k,N,E,oe),N.side=Ot):_.renderBufferDirect(H,I,k,N,E,oe),E.onAfterRender(_,I,H,k,N,oe)}function is(E,I,H){I.isScene!==!0&&(I=et);let k=xe.get(E),N=u.state.lights,oe=u.state.shadowsArray,pe=N.state.version,Ae=Te.getParameters(E,N.state,oe,I,H),we=Te.getProgramCacheKey(Ae),Ge=k.programs;k.environment=E.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(E.isMeshStandardMaterial?B:S).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?I.environmentRotation:E.envMapRotation,Ge===void 0&&(E.addEventListener("dispose",We),Ge=new Map,k.programs=Ge);let Xe=Ge.get(we);if(Xe!==void 0){if(k.currentProgram===Xe&&k.lightsStateVersion===pe)return ec(E,Ae),Xe}else Ae.uniforms=Te.getUniforms(E),E.onBeforeCompile(Ae,_),Xe=Te.acquireProgram(Ae,we),Ge.set(we,Xe),k.uniforms=Ae.uniforms;let Re=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Re.clippingPlanes=ie.uniform),ec(E,Ae),k.needsLights=Rp(E),k.lightsStateVersion=pe,k.needsLights&&(Re.ambientLightColor.value=N.state.ambient,Re.lightProbe.value=N.state.probe,Re.directionalLights.value=N.state.directional,Re.directionalLightShadows.value=N.state.directionalShadow,Re.spotLights.value=N.state.spot,Re.spotLightShadows.value=N.state.spotShadow,Re.rectAreaLights.value=N.state.rectArea,Re.ltc_1.value=N.state.rectAreaLTC1,Re.ltc_2.value=N.state.rectAreaLTC2,Re.pointLights.value=N.state.point,Re.pointLightShadows.value=N.state.pointShadow,Re.hemisphereLights.value=N.state.hemi,Re.directionalShadowMap.value=N.state.directionalShadowMap,Re.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Re.spotShadowMap.value=N.state.spotShadowMap,Re.spotLightMatrix.value=N.state.spotLightMatrix,Re.spotLightMap.value=N.state.spotLightMap,Re.pointShadowMap.value=N.state.pointShadowMap,Re.pointShadowMatrix.value=N.state.pointShadowMatrix),k.currentProgram=Xe,k.uniformsList=null,Xe}function $l(E){if(E.uniformsList===null){let I=E.currentProgram.getUniforms();E.uniformsList=gn.seqWithValue(I.seq,E.uniforms)}return E.uniformsList}function ec(E,I){let H=xe.get(E);H.outputColorSpace=I.outputColorSpace,H.batching=I.batching,H.batchingColor=I.batchingColor,H.instancing=I.instancing,H.instancingColor=I.instancingColor,H.instancingMorph=I.instancingMorph,H.skinning=I.skinning,H.morphTargets=I.morphTargets,H.morphNormals=I.morphNormals,H.morphColors=I.morphColors,H.morphTargetsCount=I.morphTargetsCount,H.numClippingPlanes=I.numClippingPlanes,H.numIntersection=I.numClipIntersection,H.vertexAlphas=I.vertexAlphas,H.vertexTangents=I.vertexTangents,H.toneMapping=I.toneMapping}function Ap(E,I,H,k,N){I.isScene!==!0&&(I=et),T.resetTextureUnits();let oe=I.fog,pe=k.isMeshStandardMaterial?I.environment:null,Ae=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:yi,we=(k.isMeshStandardMaterial?B:S).get(k.envMap||pe),Ge=k.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Xe=!!H.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Re=!!H.morphAttributes.position,tt=!!H.morphAttributes.normal,ct=!!H.morphAttributes.color,ut=ai;k.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ut=_.toneMapping);let Wt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,nt=Wt!==void 0?Wt.length:0,Le=xe.get(k),Vi=u.state.lights;if(re===!0&&(be===!0||E!==M)){let oi=E===M&&k.id===b;ie.setState(k,E,oi)}let rt=!1;k.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==Vi.state.version||Le.outputColorSpace!==Ae||N.isBatchedMesh&&Le.batching===!1||!N.isBatchedMesh&&Le.batching===!0||N.isBatchedMesh&&Le.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Le.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Le.instancing===!1||!N.isInstancedMesh&&Le.instancing===!0||N.isSkinnedMesh&&Le.skinning===!1||!N.isSkinnedMesh&&Le.skinning===!0||N.isInstancedMesh&&Le.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Le.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Le.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Le.instancingMorph===!1&&N.morphTexture!==null||Le.envMap!==we||k.fog===!0&&Le.fog!==oe||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ie.numPlanes||Le.numIntersection!==ie.numIntersection)||Le.vertexAlphas!==Ge||Le.vertexTangents!==Xe||Le.morphTargets!==Re||Le.morphNormals!==tt||Le.morphColors!==ct||Le.toneMapping!==ut||Le.morphTargetsCount!==nt)&&(rt=!0):(rt=!0,Le.__version=k.version);let gi=Le.currentProgram;rt===!0&&(gi=is(k,I,N));let Kn=!1,Kt=!1,Yr=!1,dt=gi.getUniforms(),Pi=Le.uniforms;if(ae.useProgram(gi.program)&&(Kn=!0,Kt=!0,Yr=!0),k.id!==b&&(b=k.id,Kt=!0),Kn||M!==E){ae.buffers.depth.getReversed()?(se.copy(E.projectionMatrix),Yc(se),Zc(se),dt.setValue(w,"projectionMatrix",se)):dt.setValue(w,"projectionMatrix",E.projectionMatrix),dt.setValue(w,"viewMatrix",E.matrixWorldInverse);let nn=dt.map.cameraPosition;nn!==void 0&&nn.setValue(w,ze.setFromMatrixPosition(E.matrixWorld)),ve.logarithmicDepthBuffer&&dt.setValue(w,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&dt.setValue(w,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,Kt=!0,Yr=!0)}if(N.isSkinnedMesh){dt.setOptional(w,N,"bindMatrix"),dt.setOptional(w,N,"bindMatrixInverse");let oi=N.skeleton;oi&&(oi.boneTexture===null&&oi.computeBoneTexture(),dt.setValue(w,"boneTexture",oi.boneTexture,T))}N.isBatchedMesh&&(dt.setOptional(w,N,"batchingTexture"),dt.setValue(w,"batchingTexture",N._matricesTexture,T),dt.setOptional(w,N,"batchingIdTexture"),dt.setValue(w,"batchingIdTexture",N._indirectTexture,T),dt.setOptional(w,N,"batchingColorTexture"),N._colorsTexture!==null&&dt.setValue(w,"batchingColorTexture",N._colorsTexture,T));let Zr=H.morphAttributes;if((Zr.position!==void 0||Zr.normal!==void 0||Zr.color!==void 0)&&Be.update(N,H,gi),(Kt||Le.receiveShadow!==N.receiveShadow)&&(Le.receiveShadow=N.receiveShadow,dt.setValue(w,"receiveShadow",N.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Pi.envMap.value=we,Pi.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&I.environment!==null&&(Pi.envMapIntensity.value=I.environmentIntensity),Kt&&(dt.setValue(w,"toneMappingExposure",_.toneMappingExposure),Le.needsLights&&wp(Pi,Yr),oe&&k.fog===!0&&fe.refreshFogUniforms(Pi,oe),fe.refreshMaterialUniforms(Pi,k,W,K,u.state.transmissionRenderTarget[E.id]),gn.upload(w,$l(Le),Pi,T)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(gn.upload(w,$l(Le),Pi,T),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&dt.setValue(w,"center",N.center),dt.setValue(w,"modelViewMatrix",N.modelViewMatrix),dt.setValue(w,"normalMatrix",N.normalMatrix),dt.setValue(w,"modelMatrix",N.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let oi=k.uniformsGroups;for(let nn=0,rn=oi.length;nn<rn;nn++){let tc=oi[nn];U.update(tc,gi),U.bind(tc,gi)}}return gi}function wp(E,I){E.ambientLightColor.needsUpdate=I,E.lightProbe.needsUpdate=I,E.directionalLights.needsUpdate=I,E.directionalLightShadows.needsUpdate=I,E.pointLights.needsUpdate=I,E.pointLightShadows.needsUpdate=I,E.spotLights.needsUpdate=I,E.spotLightShadows.needsUpdate=I,E.rectAreaLights.needsUpdate=I,E.hemisphereLights.needsUpdate=I}function Rp(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,I,H){xe.get(E.texture).__webglTexture=I,xe.get(E.depthTexture).__webglTexture=H;let k=xe.get(E);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=H===void 0,k.__autoAllocateDepthBuffer||te.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,I){let H=xe.get(E);H.__webglFramebuffer=I,H.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(E,I=0,H=0){L=E,A=I,P=H;let k=!0,N=null,oe=!1,pe=!1;if(E){let we=xe.get(E);if(we.__useDefaultFramebuffer!==void 0)ae.bindFramebuffer(w.FRAMEBUFFER,null),k=!1;else if(we.__webglFramebuffer===void 0)T.setupRenderTarget(E);else if(we.__hasExternalTextures)T.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Re=E.depthTexture;if(we.__boundDepthTexture!==Re){if(Re!==null&&xe.has(Re)&&(E.width!==Re.image.width||E.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(E)}}let Ge=E.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(pe=!0);let Xe=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Xe[I])?N=Xe[I][H]:N=Xe[I],oe=!0):E.samples>0&&T.useMultisampledRTT(E)===!1?N=xe.get(E).__webglMultisampledFramebuffer:Array.isArray(Xe)?N=Xe[H]:N=Xe,C.copy(E.viewport),z.copy(E.scissor),O=E.scissorTest}else C.copy(Ee).multiplyScalar(W).floor(),z.copy(He).multiplyScalar(W).floor(),O=it;if(ae.bindFramebuffer(w.FRAMEBUFFER,N)&&k&&ae.drawBuffers(E,N),ae.viewport(C),ae.scissor(z),ae.setScissorTest(O),oe){let we=xe.get(E.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+I,we.__webglTexture,H)}else if(pe){let we=xe.get(E.texture),Ge=I||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,we.__webglTexture,H||0,Ge)}b=-1},this.readRenderTargetPixels=function(E,I,H,k,N,oe,pe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(Ae=Ae[pe]),Ae){ae.bindFramebuffer(w.FRAMEBUFFER,Ae);try{let we=E.texture,Ge=we.format,Xe=we.type;if(!ve.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ve.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=E.width-k&&H>=0&&H<=E.height-N&&w.readPixels(I,H,k,N,Ye.convert(Ge),Ye.convert(Xe),oe)}finally{let we=L!==null?xe.get(L).__webglFramebuffer:null;ae.bindFramebuffer(w.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(E,I,H,k,N,oe,pe){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(Ae=Ae[pe]),Ae){let we=E.texture,Ge=we.format,Xe=we.type;if(!ve.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ve.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=E.width-k&&H>=0&&H<=E.height-N){ae.bindFramebuffer(w.FRAMEBUFFER,Ae);let Re=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Re),w.bufferData(w.PIXEL_PACK_BUFFER,oe.byteLength,w.STREAM_READ),w.readPixels(I,H,k,N,Ye.convert(Ge),Ye.convert(Xe),0);let tt=L!==null?xe.get(L).__webglFramebuffer:null;ae.bindFramebuffer(w.FRAMEBUFFER,tt);let ct=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await qc(w,ct,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Re),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,oe),w.deleteBuffer(Re),w.deleteSync(ct),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,I=null,H=0){E.isTexture!==!0&&(Rn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,E=arguments[1]);let k=Math.pow(2,-H),N=Math.floor(E.image.width*k),oe=Math.floor(E.image.height*k),pe=I!==null?I.x:0,Ae=I!==null?I.y:0;T.setTexture2D(E,0),w.copyTexSubImage2D(w.TEXTURE_2D,H,0,0,pe,Ae,N,oe),ae.unbindTexture()},this.copyTextureToTexture=function(E,I,H=null,k=null,N=0){E.isTexture!==!0&&(Rn("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,E=arguments[1],I=arguments[2],N=arguments[3]||0,H=null);let oe,pe,Ae,we,Ge,Xe,Re,tt,ct,ut=E.isCompressedTexture?E.mipmaps[N]:E.image;H!==null?(oe=H.max.x-H.min.x,pe=H.max.y-H.min.y,Ae=H.isBox3?H.max.z-H.min.z:1,we=H.min.x,Ge=H.min.y,Xe=H.isBox3?H.min.z:0):(oe=ut.width,pe=ut.height,Ae=ut.depth||1,we=0,Ge=0,Xe=0),k!==null?(Re=k.x,tt=k.y,ct=k.z):(Re=0,tt=0,ct=0);let Wt=Ye.convert(I.format),nt=Ye.convert(I.type),Le;I.isData3DTexture?(T.setTexture3D(I,0),Le=w.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(T.setTexture2DArray(I,0),Le=w.TEXTURE_2D_ARRAY):(T.setTexture2D(I,0),Le=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);let Vi=w.getParameter(w.UNPACK_ROW_LENGTH),rt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),gi=w.getParameter(w.UNPACK_SKIP_PIXELS),Kn=w.getParameter(w.UNPACK_SKIP_ROWS),Kt=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,ut.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ut.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,we),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ge),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Xe);let Yr=E.isDataArrayTexture||E.isData3DTexture,dt=I.isDataArrayTexture||I.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){let Pi=xe.get(E),Zr=xe.get(I),oi=xe.get(Pi.__renderTarget),nn=xe.get(Zr.__renderTarget);ae.bindFramebuffer(w.READ_FRAMEBUFFER,oi.__webglFramebuffer),ae.bindFramebuffer(w.DRAW_FRAMEBUFFER,nn.__webglFramebuffer);for(let rn=0;rn<Ae;rn++)Yr&&w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xe.get(E).__webglTexture,N,Xe+rn),E.isDepthTexture?(dt&&w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xe.get(I).__webglTexture,N,ct+rn),w.blitFramebuffer(we,Ge,oe,pe,Re,tt,oe,pe,w.DEPTH_BUFFER_BIT,w.NEAREST)):dt?w.copyTexSubImage3D(Le,N,Re,tt,ct+rn,we,Ge,oe,pe):w.copyTexSubImage2D(Le,N,Re,tt,ct+rn,we,Ge,oe,pe);ae.bindFramebuffer(w.READ_FRAMEBUFFER,null),ae.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else dt?E.isDataTexture||E.isData3DTexture?w.texSubImage3D(Le,N,Re,tt,ct,oe,pe,Ae,Wt,nt,ut.data):I.isCompressedArrayTexture?w.compressedTexSubImage3D(Le,N,Re,tt,ct,oe,pe,Ae,Wt,ut.data):w.texSubImage3D(Le,N,Re,tt,ct,oe,pe,Ae,Wt,nt,ut):E.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,N,Re,tt,oe,pe,Wt,nt,ut.data):E.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,N,Re,tt,ut.width,ut.height,Wt,ut.data):w.texSubImage2D(w.TEXTURE_2D,N,Re,tt,oe,pe,Wt,nt,ut);w.pixelStorei(w.UNPACK_ROW_LENGTH,Vi),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,rt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,gi),w.pixelStorei(w.UNPACK_SKIP_ROWS,Kn),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Kt),N===0&&I.generateMipmaps&&w.generateMipmap(Le),ae.unbindTexture()},this.copyTextureToTexture3D=function(E,I,H=null,k=null,N=0){return E.isTexture!==!0&&(Rn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,k=arguments[1]||null,E=arguments[2],I=arguments[3],N=arguments[4]||0),Rn('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,I,H,k,N)},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&T.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),ae.unbindTexture()},this.resetState=function(){A=0,P=0,L=null,ae.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}};var zo=class extends ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zt,this.environmentIntensity=1,this.environmentRotation=new Zt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var ca=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Po,this.updateRanges=[],this.version=0,this.uuid=It()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,o=this.stride;r<o;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=It()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=It()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}};var Vt=new R,Go=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ci(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ot(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ci(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ci(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ci(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ci(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,o){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),i=ot(i,this.array),r=ot(r,this.array),o=ot(o,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=o,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return new Ct(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)t.push(this.data.array[r+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Bn=class extends Jt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Fe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}};var Ur,Vo=new R,Ir=new R,Nr=new R,Fr=new J,Ho=new J,tp=new Ze,ha=new R,ko=new R,fa=new R,$d=new J,Dl=new J,ep=new J,Wo=class extends ht{constructor(e=new Bn){if(super(),this.isSprite=!0,this.type="Sprite",Ur===void 0){Ur=new ft;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ca(t,5);Ur.setIndex([0,1,2,0,2,3]),Ur.setAttribute("position",new Go(i,3,0,!1)),Ur.setAttribute("uv",new Go(i,2,3,!1))}this.geometry=Ur,this.material=e,this.center=new J(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ir.setFromMatrixScale(this.matrixWorld),tp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Nr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ir.multiplyScalar(-Nr.z);let i=this.material.rotation,r,o;i!==0&&(o=Math.cos(i),r=Math.sin(i));let s=this.center;ua(ha.set(-.5,-.5,0),Nr,s,Ir,r,o),ua(ko.set(.5,-.5,0),Nr,s,Ir,r,o),ua(fa.set(.5,.5,0),Nr,s,Ir,r,o),$d.set(0,0),Dl.set(1,0),ep.set(1,1);let a=e.ray.intersectTriangle(ha,ko,fa,!1,Vo);if(a===null&&(ua(ko.set(-.5,.5,0),Nr,s,Ir,r,o),Dl.set(0,1),a=e.ray.intersectTriangle(ha,fa,ko,!1,Vo),a===null))return;let l=e.ray.origin.distanceTo(Vo);l<e.near||l>e.far||t.push({distance:l,point:Vo.clone(),uv:Fi.getInterpolation(Vo,ha,ko,fa,$d,Dl,ep,new J),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ua(n,e,t,i,r,o){Fr.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Ho.x=o*Fr.x-r*Fr.y,Ho.y=r*Fr.x+o*Fr.y):Ho.copy(Fr),n.copy(e),n.x+=Ho.x,n.y+=Ho.y,n.applyMatrix4(tp)}var Xo=class extends gt{constructor(e=null,t=1,i=1,r,o,s,a,l,c=St,h=St,m,p){super(null,s,a,l,c,h,r,o,m,p),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qo=class extends gt{constructor(e,t,i,r,o,s,a,l,c){super(e,t,i,r,o,s,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Mt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),o=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),o+=i.distanceTo(r),t.push(o),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let i=this.getLengths(),r=0,o=i.length,s;t?s=t:s=e*i[o-1];let a=0,l=o-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-s,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===s)return r/(o-1);let h=i[r],p=i[r+1]-h,d=(s-h)/p;return(r+d)/(o-1)}getTangent(e,t){let r=e-1e-4,o=e+1e-4;r<0&&(r=0),o>1&&(o=1);let s=this.getPoint(r),a=this.getPoint(o),l=t||(s.isVector2?new J:new R);return l.copy(a).sub(s).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){let i=new R,r=[],o=[],s=[],a=new R,l=new Ze;for(let d=0;d<=e;d++){let g=d/e;r[d]=this.getTangentAt(g,new R)}o[0]=new R,s[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),m=Math.abs(r[0].y),p=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),m<=c&&(c=m,i.set(0,1,0)),p<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),o[0].crossVectors(r[0],a),s[0].crossVectors(r[0],o[0]);for(let d=1;d<=e;d++){if(o[d]=o[d-1].clone(),s[d]=s[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(mt(r[d-1].dot(r[d]),-1,1));o[d].applyMatrix4(l.makeRotationAxis(a,g))}s[d].crossVectors(r[d],o[d])}if(t===!0){let d=Math.acos(mt(o[0].dot(o[e]),-1,1));d/=e,r[0].dot(a.crossVectors(o[0],o[e]))>0&&(d=-d);for(let g=1;g<=e;g++)o[g].applyMatrix4(l.makeRotationAxis(r[g],d*g)),s[g].crossVectors(r[g],o[g])}return{tangents:r,normals:o,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};var Vr={};Pp(Vr,{ArcCurve:()=>da,CatmullRomCurve3:()=>ma,CubicBezierCurve:()=>Or,CubicBezierCurve3:()=>ga,EllipseCurve:()=>xn,LineCurve:()=>Br,LineCurve3:()=>xa,QuadraticBezierCurve:()=>zr,QuadraticBezierCurve3:()=>_a,SplineCurve:()=>Gr});var xn=class extends Mt{constructor(e=0,t=0,i=1,r=1,o=0,s=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=o,this.aEndAngle=s,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new J){let i=t,r=Math.PI*2,o=this.aEndAngle-this.aStartAngle,s=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=r;for(;o>r;)o-=r;o<Number.EPSILON&&(s?o=0:o=r),this.aClockwise===!0&&!s&&(o===r?o=-r:o=o-r);let a=this.aStartAngle+e*o,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),m=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*h-d*m+this.aX,c=p*m+d*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}};var da=class extends xn{constructor(e,t,i,r,o,s){super(e,t,i,i,r,o,s),this.isArcCurve=!0,this.type="ArcCurve"}};function Fl(){let n=0,e=0,t=0,i=0;function r(o,s,a,l){n=o,e=a,t=-3*o+3*s-2*a-l,i=2*o-2*s+a+l}return{initCatmullRom:function(o,s,a,l,c){r(s,a,c*(a-o),c*(l-s))},initNonuniformCatmullRom:function(o,s,a,l,c,h,m){let p=(s-o)/c-(a-o)/(c+h)+(a-s)/h,d=(a-s)/h-(l-s)/(h+m)+(l-a)/m;p*=h,d*=h,r(s,a,p,d)},calc:function(o){let s=o*o,a=s*o;return n+e*o+t*s+i*a}}}var pa=new R,Ul=new Fl,Il=new Fl,Nl=new Fl,ma=class extends Mt{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new R){let i=t,r=this.points,o=r.length,s=(o-(this.closed?0:1))*e,a=Math.floor(s),l=s-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%o]:(pa.subVectors(r[0],r[1]).add(r[0]),c=pa);let m=r[a%o],p=r[(a+1)%o];if(this.closed||a+2<o?h=r[(a+2)%o]:(pa.subVectors(r[o-1],r[o-2]).add(r[o-1]),h=pa),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(m),d),x=Math.pow(m.distanceToSquared(p),d),f=Math.pow(p.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),f<1e-4&&(f=x),Ul.initNonuniformCatmullRom(c.x,m.x,p.x,h.x,g,x,f),Il.initNonuniformCatmullRom(c.y,m.y,p.y,h.y,g,x,f),Nl.initNonuniformCatmullRom(c.z,m.z,p.z,h.z,g,x,f)}else this.curveType==="catmullrom"&&(Ul.initCatmullRom(c.x,m.x,p.x,h.x,this.tension),Il.initCatmullRom(c.y,m.y,p.y,h.y,this.tension),Nl.initCatmullRom(c.z,m.z,p.z,h.z,this.tension));return i.set(Ul.calc(l),Il.calc(l),Nl.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Ol(n,e,t,i,r){let o=(i-e)*.5,s=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+o+s)*l+(-3*t+3*i-2*o-s)*a+o*n+t}function L0(n,e){let t=1-n;return t*t*e}function D0(n,e){return 2*(1-n)*n*e}function U0(n,e){return n*n*e}function zn(n,e,t,i){return L0(n,e)+D0(n,t)+U0(n,i)}function I0(n,e){let t=1-n;return t*t*t*e}function N0(n,e){let t=1-n;return 3*t*t*n*e}function F0(n,e){return 3*(1-n)*n*n*e}function O0(n,e){return n*n*n*e}function Gn(n,e,t,i,r){return I0(n,e)+N0(n,t)+F0(n,i)+O0(n,r)}var Or=class extends Mt{constructor(e=new J,t=new J,i=new J,r=new J){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new J){let i=t,r=this.v0,o=this.v1,s=this.v2,a=this.v3;return i.set(Gn(e,r.x,o.x,s.x,a.x),Gn(e,r.y,o.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};var ga=class extends Mt{constructor(e=new R,t=new R,i=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new R){let i=t,r=this.v0,o=this.v1,s=this.v2,a=this.v3;return i.set(Gn(e,r.x,o.x,s.x,a.x),Gn(e,r.y,o.y,s.y,a.y),Gn(e,r.z,o.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};var Br=class extends Mt{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new J){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var xa=class extends Mt{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var zr=class extends Mt{constructor(e=new J,t=new J,i=new J){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new J){let i=t,r=this.v0,o=this.v1,s=this.v2;return i.set(zn(e,r.x,o.x,s.x),zn(e,r.y,o.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var _a=class extends Mt{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){let i=t,r=this.v0,o=this.v1,s=this.v2;return i.set(zn(e,r.x,o.x,s.x),zn(e,r.y,o.y,s.y),zn(e,r.z,o.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var Gr=class extends Mt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new J){let i=t,r=this.points,o=(r.length-1)*e,s=Math.floor(o),a=o-s,l=r[s===0?s:s-1],c=r[s],h=r[s>r.length-2?r.length-1:s+1],m=r[s>r.length-3?r.length-1:s+2];return i.set(Ol(a,l.x,c.x,h.x,m.x),Ol(a,l.y,c.y,h.y,m.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new J().fromArray(r))}return this}};var va=class extends Mt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Vr[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),o=0;for(;o<r.length;){if(r[o]>=i){let s=r[o]-i,a=this.curves[o],l=a.getLength(),c=l===0?0:1-s/l;return a.getPointAt(c,t)}o++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,o=this.curves;r<o.length;r++){let s=o[r],a=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,l=s.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new Vr[r.type]().fromJSON(r))}return this}};var Vn=class extends va{constructor(e){super(),this.type="Path",this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Br(this.currentPoint.clone(),new J(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let o=new zr(this.currentPoint.clone(),new J(e,t),new J(i,r));return this.curves.push(o),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,o,s){let a=new Or(this.currentPoint.clone(),new J(e,t),new J(i,r),new J(o,s));return this.curves.push(a),this.currentPoint.set(o,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Gr(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,o,s){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,o,s),this}absarc(e,t,i,r,o,s){return this.absellipse(e,t,i,i,r,o,s),this}ellipse(e,t,i,r,o,s,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,r,o,s,a,l),this}absellipse(e,t,i,r,o,s,a,l){let c=new xn(e,t,i,r,o,s,a,l);if(this.curves.length>0){let m=c.getPoint(0);m.equals(this.currentPoint)||this.lineTo(m.x,m.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var Ma=class n extends ft{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:r},t=Math.floor(t),r=mt(r,0,Math.PI*2);let o=[],s=[],a=[],l=[],c=[],h=1/t,m=new R,p=new J,d=new R,g=new R,x=new R,f=0,u=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:f=e[y+1].x-e[y].x,u=e[y+1].y-e[y].y,d.x=u*1,d.y=-f,d.z=u*0,x.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:f=e[y+1].x-e[y].x,u=e[y+1].y-e[y].y,d.x=u*1,d.y=-f,d.z=u*0,g.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),l.push(d.x,d.y,d.z),x.copy(g)}for(let y=0;y<=t;y++){let v=i+y*h*r,_=Math.sin(v),D=Math.cos(v);for(let A=0;A<=e.length-1;A++){m.x=e[A].x*_,m.y=e[A].y,m.z=e[A].x*D,s.push(m.x,m.y,m.z),p.x=y/t,p.y=A/(e.length-1),a.push(p.x,p.y);let P=l[3*A+0]*_,L=l[3*A+1],b=l[3*A+0]*D;c.push(P,L,b)}}for(let y=0;y<t;y++)for(let v=0;v<e.length-1;v++){let _=v+y*e.length,D=_,A=_+e.length,P=_+e.length+1,L=_+1;o.push(D,A,L),o.push(P,L,A)}this.setIndex(o),this.setAttribute("position",new je(s,3)),this.setAttribute("uv",new je(a,2)),this.setAttribute("normal",new je(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.points,e.segments,e.phiStart,e.phiLength)}};var Sa=class n extends Ma{constructor(e=1,t=1,i=4,r=8){let o=new Vn;o.absarc(0,-t/2,e,Math.PI*1.5,0),o.absarc(0,t/2,e,0,Math.PI*.5),super(o.getPoints(i),r),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:r}}static fromJSON(e){return new n(e.radius,e.length,e.capSegments,e.radialSegments)}};var Hr=class n extends ft{constructor(e=1,t=1,i=1,r=32,o=1,s=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:o,openEnded:s,thetaStart:a,thetaLength:l};let c=this;r=Math.floor(r),o=Math.floor(o);let h=[],m=[],p=[],d=[],g=0,x=[],f=i/2,u=0;y(),s===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new je(m,3)),this.setAttribute("normal",new je(p,3)),this.setAttribute("uv",new je(d,2));function y(){let _=new R,D=new R,A=0,P=(t-e)/i;for(let L=0;L<=o;L++){let b=[],M=L/o,C=M*(t-e)+e;for(let z=0;z<=r;z++){let O=z/r,F=O*l+a,V=Math.sin(F),G=Math.cos(F);D.x=C*V,D.y=-M*i+f,D.z=C*G,m.push(D.x,D.y,D.z),_.set(V,P,G).normalize(),p.push(_.x,_.y,_.z),d.push(O,1-M),b.push(g++)}x.push(b)}for(let L=0;L<r;L++)for(let b=0;b<o;b++){let M=x[b][L],C=x[b+1][L],z=x[b+1][L+1],O=x[b][L+1];(e>0||b!==0)&&(h.push(M,C,O),A+=3),(t>0||b!==o-1)&&(h.push(C,z,O),A+=3)}c.addGroup(u,A,0),u+=A}function v(_){let D=g,A=new J,P=new R,L=0,b=_===!0?e:t,M=_===!0?1:-1;for(let z=1;z<=r;z++)m.push(0,f*M,0),p.push(0,M,0),d.push(.5,.5),g++;let C=g;for(let z=0;z<=r;z++){let F=z/r*l+a,V=Math.cos(F),G=Math.sin(F);P.x=b*G,P.y=f*M,P.z=b*V,m.push(P.x,P.y,P.z),p.push(0,M,0),A.x=V*.5+.5,A.y=G*.5*M+.5,d.push(A.x,A.y),g++}for(let z=0;z<r;z++){let O=D+z,F=C+z;_===!0?h.push(F,F+1,O):h.push(F+1,F,O),L+=3}c.addGroup(u,L,_===!0?1:2),u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ya=class n extends Hr{constructor(e=1,t=1,i=32,r=1,o=!1,s=0,a=Math.PI*2){super(0,e,t,i,r,o,s,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:s,thetaLength:a}}static fromJSON(e){return new n(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Ea=class n extends ft{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};let o=[],s=[];a(r),c(i),h(),this.setAttribute("position",new je(o,3)),this.setAttribute("normal",new je(o.slice(),3)),this.setAttribute("uv",new je(s,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let v=new R,_=new R,D=new R;for(let A=0;A<t.length;A+=3)d(t[A+0],v),d(t[A+1],_),d(t[A+2],D),l(v,_,D,y)}function l(y,v,_,D){let A=D+1,P=[];for(let L=0;L<=A;L++){P[L]=[];let b=y.clone().lerp(_,L/A),M=v.clone().lerp(_,L/A),C=A-L;for(let z=0;z<=C;z++)z===0&&L===A?P[L][z]=b:P[L][z]=b.clone().lerp(M,z/C)}for(let L=0;L<A;L++)for(let b=0;b<2*(A-L)-1;b++){let M=Math.floor(b/2);b%2===0?(p(P[L][M+1]),p(P[L+1][M]),p(P[L][M])):(p(P[L][M+1]),p(P[L+1][M+1]),p(P[L+1][M]))}}function c(y){let v=new R;for(let _=0;_<o.length;_+=3)v.x=o[_+0],v.y=o[_+1],v.z=o[_+2],v.normalize().multiplyScalar(y),o[_+0]=v.x,o[_+1]=v.y,o[_+2]=v.z}function h(){let y=new R;for(let v=0;v<o.length;v+=3){y.x=o[v+0],y.y=o[v+1],y.z=o[v+2];let _=f(y)/2/Math.PI+.5,D=u(y)/Math.PI+.5;s.push(_,1-D)}g(),m()}function m(){for(let y=0;y<s.length;y+=6){let v=s[y+0],_=s[y+2],D=s[y+4],A=Math.max(v,_,D),P=Math.min(v,_,D);A>.9&&P<.1&&(v<.2&&(s[y+0]+=1),_<.2&&(s[y+2]+=1),D<.2&&(s[y+4]+=1))}}function p(y){o.push(y.x,y.y,y.z)}function d(y,v){let _=y*3;v.x=e[_+0],v.y=e[_+1],v.z=e[_+2]}function g(){let y=new R,v=new R,_=new R,D=new R,A=new J,P=new J,L=new J;for(let b=0,M=0;b<o.length;b+=9,M+=6){y.set(o[b+0],o[b+1],o[b+2]),v.set(o[b+3],o[b+4],o[b+5]),_.set(o[b+6],o[b+7],o[b+8]),A.set(s[M+0],s[M+1]),P.set(s[M+2],s[M+3]),L.set(s[M+4],s[M+5]),D.copy(y).add(v).add(_).divideScalar(3);let C=f(D);x(A,M+0,y,C),x(P,M+2,v,C),x(L,M+4,_,C)}}function x(y,v,_,D){D<0&&y.x===1&&(s[v]=y.x-1),_.x===0&&_.z===0&&(s[v]=D/2/Math.PI+.5)}function f(y){return Math.atan2(y.z,-y.x)}function u(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.vertices,e.indices,e.radius,e.details)}};var Hn=class extends Vn{constructor(e){super(e),this.uuid=It(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Vn().fromJSON(r))}return this}};var np={triangulate:function(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,o=rp(n,0,r,t,!0),s=[];if(!o||o.next===o.prev)return s;let a,l,c,h,m,p,d;if(i&&(o=H0(n,e,o,t)),n.length>80*t){a=c=n[0],l=h=n[1];for(let g=t;g<r;g+=t)m=n[g],p=n[g+1],m<a&&(a=m),p<l&&(l=p),m>c&&(c=m),p>h&&(h=p);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return Yo(o,s,t,a,l,d,0),s}};function rp(n,e,t,i,r){let o,s;if(r===$0(n,e,t,i)>0)for(o=e;o<t;o+=i)s=ip(o,n[o],n[o+1],s);else for(o=t-i;o>=e;o-=i)s=ip(o,n[o],n[o+1],s);return s&&Aa(s,s.next)&&(Jo(s),s=s.next),s}function kn(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Aa(t,t.next)||xt(t.prev,t,t.next)===0)){if(Jo(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Yo(n,e,t,i,r,o,s){if(!n)return;!s&&o&&Y0(n,i,r,o);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,o?z0(n,i,r,o):B0(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(c.i/t|0),Jo(n),n=c.next,a=c.next;continue}if(n=c,n===a){s?s===1?(n=G0(kn(n),e,t),Yo(n,e,t,i,r,o,2)):s===2&&V0(n,e,t,i,r,o):Yo(kn(n),e,t,i,r,o,1);break}}}function B0(n){let e=n.prev,t=n,i=n.next;if(xt(e,t,i)>=0)return!1;let r=e.x,o=t.x,s=i.x,a=e.y,l=t.y,c=i.y,h=r<o?r<s?r:s:o<s?o:s,m=a<l?a<c?a:c:l<c?l:c,p=r>o?r>s?r:s:o>s?o:s,d=a>l?a>c?a:c:l>c?l:c,g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=p&&g.y>=m&&g.y<=d&&kr(r,a,o,l,s,c,g.x,g.y)&&xt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function z0(n,e,t,i){let r=n.prev,o=n,s=n.next;if(xt(r,o,s)>=0)return!1;let a=r.x,l=o.x,c=s.x,h=r.y,m=o.y,p=s.y,d=a<l?a<c?a:c:l<c?l:c,g=h<m?h<p?h:p:m<p?m:p,x=a>l?a>c?a:c:l>c?l:c,f=h>m?h>p?h:p:m>p?m:p,u=Bl(d,g,e,t,i),y=Bl(x,f,e,t,i),v=n.prevZ,_=n.nextZ;for(;v&&v.z>=u&&_&&_.z<=y;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=f&&v!==r&&v!==s&&kr(a,h,l,m,c,p,v.x,v.y)&&xt(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=d&&_.x<=x&&_.y>=g&&_.y<=f&&_!==r&&_!==s&&kr(a,h,l,m,c,p,_.x,_.y)&&xt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=u;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=f&&v!==r&&v!==s&&kr(a,h,l,m,c,p,v.x,v.y)&&xt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=y;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=f&&_!==r&&_!==s&&kr(a,h,l,m,c,p,_.x,_.y)&&xt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function G0(n,e,t){let i=n;do{let r=i.prev,o=i.next.next;!Aa(r,o)&&op(r,i,i.next,o)&&Zo(r,o)&&Zo(o,r)&&(e.push(r.i/t|0),e.push(i.i/t|0),e.push(o.i/t|0),Jo(i),Jo(i.next),i=n=o),i=i.next}while(i!==n);return kn(i)}function V0(n,e,t,i,r,o){let s=n;do{let a=s.next.next;for(;a!==s.prev;){if(s.i!==a.i&&K0(s,a)){let l=sp(s,a);s=kn(s,s.next),l=kn(l,l.next),Yo(s,e,t,i,r,o,0),Yo(l,e,t,i,r,o,0);return}a=a.next}s=s.next}while(s!==n)}function H0(n,e,t,i){let r=[],o,s,a,l,c;for(o=0,s=e.length;o<s;o++)a=e[o]*i,l=o<s-1?e[o+1]*i:n.length,c=rp(n,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(J0(c));for(r.sort(k0),o=0;o<r.length;o++)t=W0(r[o],t);return t}function k0(n,e){return n.x-e.x}function W0(n,e){let t=X0(n,e);if(!t)return e;let i=sp(t,n);return kn(i,i.next),kn(t,t.next)}function X0(n,e){let t=e,i=-1/0,r,o=n.x,s=n.y;do{if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let p=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=o&&p>i&&(i=p,r=t.x<t.next.x?t:t.next,p===o))return r}t=t.next}while(t!==e);if(!r)return null;let a=r,l=r.x,c=r.y,h=1/0,m;t=r;do o>=t.x&&t.x>=l&&o!==t.x&&kr(s<c?o:i,s,l,c,s<c?i:o,s,t.x,t.y)&&(m=Math.abs(s-t.y)/(o-t.x),Zo(t,n)&&(m<h||m===h&&(t.x>r.x||t.x===r.x&&q0(r,t)))&&(r=t,h=m)),t=t.next;while(t!==a);return r}function q0(n,e){return xt(n.prev,n,e.prev)<0&&xt(e.next,n,n.next)<0}function Y0(n,e,t,i){let r=n;do r.z===0&&(r.z=Bl(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Z0(r)}function Z0(n){let e,t,i,r,o,s,a,l,c=1;do{for(t=n,n=null,o=null,s=0;t;){for(s++,i=t,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(r=t,t=t.nextZ,a--):(r=i,i=i.nextZ,l--),o?o.nextZ=r:n=r,r.prevZ=o,o=r;t=i}o.nextZ=null,c*=2}while(s>1);return n}function Bl(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function J0(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function kr(n,e,t,i,r,o,s,a){return(r-s)*(e-a)>=(n-s)*(o-a)&&(n-s)*(i-a)>=(t-s)*(e-a)&&(t-s)*(o-a)>=(r-s)*(i-a)}function K0(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!j0(n,e)&&(Zo(n,e)&&Zo(e,n)&&Q0(n,e)&&(xt(n.prev,n,e.prev)||xt(n,e.prev,e))||Aa(n,e)&&xt(n.prev,n,n.next)>0&&xt(e.prev,e,e.next)>0)}function xt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Aa(n,e){return n.x===e.x&&n.y===e.y}function op(n,e,t,i){let r=Ta(xt(n,e,t)),o=Ta(xt(n,e,i)),s=Ta(xt(t,i,n)),a=Ta(xt(t,i,e));return!!(r!==o&&s!==a||r===0&&ba(n,t,e)||o===0&&ba(n,i,e)||s===0&&ba(t,n,i)||a===0&&ba(t,e,i))}function ba(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Ta(n){return n>0?1:n<0?-1:0}function j0(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&op(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Zo(n,e){return xt(n.prev,n,n.next)<0?xt(n,e,n.next)>=0&&xt(n,n.prev,e)>=0:xt(n,e,n.prev)<0||xt(n,n.next,e)<0}function Q0(n,e){let t=n,i=!1,r=(n.x+e.x)/2,o=(n.y+e.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&r<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function sp(n,e){let t=new zl(n.i,n.x,n.y),i=new zl(e.i,e.x,e.y),r=n.next,o=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,o.next=i,i.prev=o,i}function ip(n,e,t,i){let r=new zl(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Jo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function zl(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $0(n,e,t,i){let r=0;for(let o=e,s=t-i;o<t;o+=i)r+=(n[s]-n[o])*(n[o+1]+n[s+1]),s=o;return r}var Wr=class n{static area(e){let t=e.length,i=0;for(let r=t-1,o=0;o<t;r=o++)i+=e[r].x*e[o].y-e[o].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],o=[];ap(e),lp(i,e);let s=e.length;t.forEach(ap);for(let l=0;l<t.length;l++)r.push(s),s+=t[l].length,lp(i,t[l]);let a=np.triangulate(i,r);for(let l=0;l<a.length;l+=3)o.push(a.slice(l,l+3));return o}};function ap(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function lp(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var wa=class n extends ft{constructor(e=new Hn([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,r=[],o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];s(c)}this.setAttribute("position",new je(r,3)),this.setAttribute("uv",new je(o,2)),this.computeVertexNormals();function s(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,m=t.depth!==void 0?t.depth:1,p=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,f=t.bevelSegments!==void 0?t.bevelSegments:3,u=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:eg,v,_=!1,D,A,P,L;u&&(v=u.getSpacedPoints(h),_=!0,p=!1,D=u.computeFrenetFrames(h,!1),A=new R,P=new R,L=new R),p||(f=0,d=0,g=0,x=0);let b=a.extractPoints(c),M=b.shape,C=b.holes;if(!Wr.isClockWise(M)){M=M.reverse();for(let Q=0,ne=C.length;Q<ne;Q++){let w=C[Q];Wr.isClockWise(w)&&(C[Q]=w.reverse())}}let O=Wr.triangulateShape(M,C),F=M;for(let Q=0,ne=C.length;Q<ne;Q++){let w=C[Q];M=M.concat(w)}function V(Q,ne,w){return ne||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(ne,w)}let G=M.length,K=O.length;function W(Q,ne,w){let Ce,te,ve,ae=Q.x-ne.x,Ie=Q.y-ne.y,xe=w.x-Q.x,T=w.y-Q.y,S=ae*ae+Ie*Ie,B=ae*T-Ie*xe;if(Math.abs(B)>Number.EPSILON){let q=Math.sqrt(S),$=Math.sqrt(xe*xe+T*T),Y=ne.x-Ie/q,Te=ne.y+ae/q,fe=w.x-T/$,_e=w.y+xe/$,Ke=((fe-Y)*T-(_e-Te)*xe)/(ae*T-Ie*xe);Ce=Y+ae*Ke-Q.x,te=Te+Ie*Ke-Q.y;let ie=Ce*Ce+te*te;if(ie<=2)return new J(Ce,te);ve=Math.sqrt(ie/2)}else{let q=!1;ae>Number.EPSILON?xe>Number.EPSILON&&(q=!0):ae<-Number.EPSILON?xe<-Number.EPSILON&&(q=!0):Math.sign(Ie)===Math.sign(T)&&(q=!0),q?(Ce=-Ie,te=ae,ve=Math.sqrt(S)):(Ce=ae,te=Ie,ve=Math.sqrt(S/2))}return new J(Ce/ve,te/ve)}let he=[];for(let Q=0,ne=F.length,w=ne-1,Ce=Q+1;Q<ne;Q++,w++,Ce++)w===ne&&(w=0),Ce===ne&&(Ce=0),he[Q]=W(F[Q],F[w],F[Ce]);let ge=[],Ee,He=he.concat();for(let Q=0,ne=C.length;Q<ne;Q++){let w=C[Q];Ee=[];for(let Ce=0,te=w.length,ve=te-1,ae=Ce+1;Ce<te;Ce++,ve++,ae++)ve===te&&(ve=0),ae===te&&(ae=0),Ee[Ce]=W(w[Ce],w[ve],w[ae]);ge.push(Ee),He=He.concat(Ee)}for(let Q=0;Q<f;Q++){let ne=Q/f,w=d*Math.cos(ne*Math.PI/2),Ce=g*Math.sin(ne*Math.PI/2)+x;for(let te=0,ve=F.length;te<ve;te++){let ae=V(F[te],he[te],Ce);se(ae.x,ae.y,-w)}for(let te=0,ve=C.length;te<ve;te++){let ae=C[te];Ee=ge[te];for(let Ie=0,xe=ae.length;Ie<xe;Ie++){let T=V(ae[Ie],Ee[Ie],Ce);se(T.x,T.y,-w)}}}let it=g+x;for(let Q=0;Q<G;Q++){let ne=p?V(M[Q],He[Q],it):M[Q];_?(P.copy(D.normals[0]).multiplyScalar(ne.x),A.copy(D.binormals[0]).multiplyScalar(ne.y),L.copy(v[0]).add(P).add(A),se(L.x,L.y,L.z)):se(ne.x,ne.y,0)}for(let Q=1;Q<=h;Q++)for(let ne=0;ne<G;ne++){let w=p?V(M[ne],He[ne],it):M[ne];_?(P.copy(D.normals[Q]).multiplyScalar(w.x),A.copy(D.binormals[Q]).multiplyScalar(w.y),L.copy(v[Q]).add(P).add(A),se(L.x,L.y,L.z)):se(w.x,w.y,m/h*Q)}for(let Q=f-1;Q>=0;Q--){let ne=Q/f,w=d*Math.cos(ne*Math.PI/2),Ce=g*Math.sin(ne*Math.PI/2)+x;for(let te=0,ve=F.length;te<ve;te++){let ae=V(F[te],he[te],Ce);se(ae.x,ae.y,m+w)}for(let te=0,ve=C.length;te<ve;te++){let ae=C[te];Ee=ge[te];for(let Ie=0,xe=ae.length;Ie<xe;Ie++){let T=V(ae[Ie],Ee[Ie],Ce);_?se(T.x,T.y+v[h-1].y,v[h-1].x+w):se(T.x,T.y,m+w)}}}Z(),re();function Z(){let Q=r.length/3;if(p){let ne=0,w=G*ne;for(let Ce=0;Ce<K;Ce++){let te=O[Ce];De(te[2]+w,te[1]+w,te[0]+w)}ne=h+f*2,w=G*ne;for(let Ce=0;Ce<K;Ce++){let te=O[Ce];De(te[0]+w,te[1]+w,te[2]+w)}}else{for(let ne=0;ne<K;ne++){let w=O[ne];De(w[2],w[1],w[0])}for(let ne=0;ne<K;ne++){let w=O[ne];De(w[0]+G*h,w[1]+G*h,w[2]+G*h)}}i.addGroup(Q,r.length/3-Q,0)}function re(){let Q=r.length/3,ne=0;be(F,ne),ne+=F.length;for(let w=0,Ce=C.length;w<Ce;w++){let te=C[w];be(te,ne),ne+=te.length}i.addGroup(Q,r.length/3-Q,1)}function be(Q,ne){let w=Q.length;for(;--w>=0;){let Ce=w,te=w-1;te<0&&(te=Q.length-1);for(let ve=0,ae=h+f*2;ve<ae;ve++){let Ie=G*ve,xe=G*(ve+1),T=ne+Ce+Ie,S=ne+te+Ie,B=ne+te+xe,q=ne+Ce+xe;ze(T,S,B,q)}}}function se(Q,ne,w){l.push(Q),l.push(ne),l.push(w)}function De(Q,ne,w){Oe(Q),Oe(ne),Oe(w);let Ce=r.length/3,te=y.generateTopUV(i,r,Ce-3,Ce-2,Ce-1);et(te[0]),et(te[1]),et(te[2])}function ze(Q,ne,w,Ce){Oe(Q),Oe(ne),Oe(Ce),Oe(ne),Oe(w),Oe(Ce);let te=r.length/3,ve=y.generateSideWallUV(i,r,te-6,te-3,te-2,te-1);et(ve[0]),et(ve[1]),et(ve[3]),et(ve[1]),et(ve[2]),et(ve[3])}function Oe(Q){r.push(l[Q*3+0]),r.push(l[Q*3+1]),r.push(l[Q*3+2])}function et(Q){o.push(Q.x),o.push(Q.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return tg(t,i,e)}static fromJSON(e,t){let i=[];for(let o=0,s=e.shapes.length;o<s;o++){let a=t[e.shapes[o]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Vr[r.type]().fromJSON(r)),new n(i,e.options)}},eg={generateTopUV:function(n,e,t,i,r){let o=e[t*3],s=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new J(o,s),new J(a,l),new J(c,h)]},generateSideWallUV:function(n,e,t,i,r,o){let s=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],m=e[i*3+2],p=e[r*3],d=e[r*3+1],g=e[r*3+2],x=e[o*3],f=e[o*3+1],u=e[o*3+2];return Math.abs(a-h)<Math.abs(s-c)?[new J(s,1-l),new J(c,1-m),new J(p,1-g),new J(x,1-u)]:[new J(a,1-l),new J(h,1-m),new J(d,1-g),new J(f,1-u)]}};function tg(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let o=n[i];t.shapes.push(o.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ra=class n extends Ea{constructor(e=1,t=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new n(e.radius,e.detail)}};var Ca=class n extends ft{constructor(e=1,t=32,i=16,r=0,o=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:o,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(s+a,Math.PI),c=0,h=[],m=new R,p=new R,d=[],g=[],x=[],f=[];for(let u=0;u<=i;u++){let y=[],v=u/i,_=0;u===0&&s===0?_=.5/t:u===i&&l===Math.PI&&(_=-.5/t);for(let D=0;D<=t;D++){let A=D/t;m.x=-e*Math.cos(r+A*o)*Math.sin(s+v*a),m.y=e*Math.cos(s+v*a),m.z=e*Math.sin(r+A*o)*Math.sin(s+v*a),g.push(m.x,m.y,m.z),p.copy(m).normalize(),x.push(p.x,p.y,p.z),f.push(A+_,1-v),y.push(c++)}h.push(y)}for(let u=0;u<i;u++)for(let y=0;y<t;y++){let v=h[u][y+1],_=h[u][y],D=h[u+1][y],A=h[u+1][y+1];(u!==0||s>0)&&d.push(v,_,A),(u!==i-1||l<Math.PI)&&d.push(_,D,A)}this.setIndex(d),this.setAttribute("position",new je(g,3)),this.setAttribute("normal",new je(x,3)),this.setAttribute("uv",new je(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Pa=class n extends ft{constructor(e=1,t=.4,i=12,r=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:o},i=Math.floor(i),r=Math.floor(r);let s=[],a=[],l=[],c=[],h=new R,m=new R,p=new R;for(let d=0;d<=i;d++)for(let g=0;g<=r;g++){let x=g/r*o,f=d/i*Math.PI*2;m.x=(e+t*Math.cos(f))*Math.cos(x),m.y=(e+t*Math.cos(f))*Math.sin(x),m.z=t*Math.sin(f),a.push(m.x,m.y,m.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),p.subVectors(m,h).normalize(),l.push(p.x,p.y,p.z),c.push(g/r),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=r;g++){let x=(r+1)*d+g-1,f=(r+1)*(d-1)+g-1,u=(r+1)*(d-1)+g,y=(r+1)*d+g;s.push(x,f,y),s.push(f,u,y)}this.setIndex(s),this.setAttribute("position",new je(a,3)),this.setAttribute("normal",new je(l,3)),this.setAttribute("uv",new je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ko=class extends Jt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new Fe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Es,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Xr=class extends ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var jo=class extends Xr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}};var Gl=new Ze,cp=new R,hp=new R,La=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pn,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;cp.setFromMatrixPosition(e.matrixWorld),t.position.copy(cp),hp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hp),t.updateMatrixWorld(),Gl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Da=class extends La{constructor(){super(new $i(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};var Qo=class extends Xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ht.DEFAULT_UP),this.updateMatrix(),this.target=new ht,this.shadow=new Da}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jr);var $o=new R;function di(n,e,t,i,r,o){let s=2*Math.PI*r/4,a=Math.max(o-2*r,0),l=Math.PI/4;$o.copy(e),$o[i]=0,$o.normalize();let c=.5*s/(s+a),h=1-$o.angleTo(n)/l;return Math.sign($o[t])===1?h*c:a/(s+a)+c+c*(1-h)}var Ua=class extends fi{constructor(e=1,t=1,i=1,r=2,o=.1){if(r=r*2+1,o=Math.min(e/2,t/2,i/2,o),super(1,1,1,r,r,r),r===1)return;let s=this.toNonIndexed();this.index=null,this.attributes.position=s.attributes.position,this.attributes.normal=s.attributes.normal,this.attributes.uv=s.attributes.uv;let a=new R,l=new R,c=new R(e,t,i).divideScalar(2).subScalar(o),h=this.attributes.position.array,m=this.attributes.normal.array,p=this.attributes.uv.array,d=h.length/6,g=new R,x=.5/r;for(let f=0,u=0;f<h.length;f+=3,u+=2)switch(a.fromArray(h,f),l.copy(a),l.x-=Math.sign(l.x)*x,l.y-=Math.sign(l.y)*x,l.z-=Math.sign(l.z)*x,l.normalize(),h[f+0]=c.x*Math.sign(a.x)+l.x*o,h[f+1]=c.y*Math.sign(a.y)+l.y*o,h[f+2]=c.z*Math.sign(a.z)+l.z*o,m[f+0]=l.x,m[f+1]=l.y,m[f+2]=l.z,Math.floor(f/d)){case 0:g.set(1,0,0),p[u+0]=di(g,l,"z","y",o,i),p[u+1]=1-di(g,l,"y","z",o,t);break;case 1:g.set(-1,0,0),p[u+0]=1-di(g,l,"z","y",o,i),p[u+1]=1-di(g,l,"y","z",o,t);break;case 2:g.set(0,1,0),p[u+0]=1-di(g,l,"x","z",o,e),p[u+1]=di(g,l,"z","x",o,i);break;case 3:g.set(0,-1,0),p[u+0]=1-di(g,l,"x","z",o,e),p[u+1]=1-di(g,l,"z","x",o,i);break;case 4:g.set(0,0,1),p[u+0]=1-di(g,l,"x","y",o,e),p[u+1]=1-di(g,l,"y","x",o,t);break;case 5:g.set(0,0,-1),p[u+0]=di(g,l,"x","y",o,e),p[u+1]=1-di(g,l,"y","x",o,t);break}}};var le={BackSide:pt,BoxGeometry:fi,CanvasTexture:qo,CapsuleGeometry:Sa,ConeGeometry:ya,CylinderGeometry:Hr,DataTexture:Xo,DirectionalLight:Qo,DoubleSide:Ot,ExtrudeGeometry:wa,Group:Oi,HemisphereLight:jo,Matrix4:Ze,Mesh:bt,MeshBasicMaterial:ji,MeshToonMaterial:Ko,NearestFilter:St,OctahedronGeometry:Ra,OrthographicCamera:$i,PlaneGeometry:mn,RGBAFormat:yt,Scene:zo,ShaderMaterial:Rt,Shape:Hn,SphereGeometry:Ca,Sprite:Wo,SpriteMaterial:Bn,TorusGeometry:Pa,Vector3:R,WebGLRenderer:Bo};var Ia=new le.DataTexture(new Uint8Array([128,128,128,255,176,176,176,255,222,222,222,255,255,255,255,255]),4,1,le.RGBAFormat);Ia.minFilter=Ia.magFilter=le.NearestFilter;Ia.needsUpdate=!0;var fp=new Map;function Hl(n,e){let t=n+(e?JSON.stringify(e):""),i=fp.get(t);return i||fp.set(t,i=new le.MeshToonMaterial({color:n,gradientMap:Ia,...e||{}})),i}var ig=new le.ShaderMaterial({uniforms:{t:{value:.016}},vertexShader:"uniform float t;void main(){vec3 n=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.);mv.xyz+=n*t;gl_Position=projectionMatrix*mv;}",fragmentShader:"void main(){gl_FragColor=vec4(.012,.09,.09,1.);}",side:le.BackSide}),Ve={sph:new le.SphereGeometry(1,22,16),cyl:new le.CylinderGeometry(1,1,1,20,1),cone:new le.ConeGeometry(1,1,18,1),box:new Ua(1,1,1,3,.12),sharp:new le.BoxGeometry(1,1,1),tor:new le.TorusGeometry(1,.28,10,28),ring:new le.TorusGeometry(1,.045,8,32)},Vl=new Map;function en(n,e){let t=n+"_"+e;return Vl.has(t)||Vl.set(t,new le.CapsuleGeometry(n,Math.max(.001,e),6,12)),Vl.get(t)}function Pe(n,e,t){let i=t||{},r=new le.Mesh(n,i.mat||Hl(e));if(i.out!==!1){let o=new le.Mesh(n,ig);o.userData.outline=!0,r.add(o)}return r}function ye(n,e,t,i,r=0,o=0,s=0,a){let l=Pe(Ve.sph,n,a);return l.scale.set(e,t,i),l.position.set(r,o,s),l}function ee(n,e,t,i,r){return(t!==void 0||i!==void 0||r!==void 0)&&e.position.set(t??0,i??0,r??0),n.add(e),e}function Je(n,e=0,t=0,i=0){let r=new le.Group;return r.position.set(e,t,i),n&&n.add(r),r}function up(n){let e=document.createElement("canvas");e.width=e.height=64;let t=e.getContext("2d"),i=t.createRadialGradient(32,32,2,32,32,31);i.addColorStop(0,"rgba(255,255,255,.95)"),i.addColorStop(.55,"rgba(255,255,255,.55)"),i.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=i,t.fillRect(0,0,64,64);let r=new le.CanvasTexture(e),o=new le.SphereGeometry(1,8,6),s=new le.CylinderGeometry(1,1,.3,14),a=[],l=[],c=[];for(let x=0;x<30;x++){let f=new le.Sprite(new le.SpriteMaterial({map:r,color:16777215,transparent:!0,opacity:0,depthWrite:!1}));f.visible=!1,n.add(f),a.push({m:f,life:0,max:1,vx:0,vy:0,s0:.1,s1:.3,a:.6})}let h=new le.MeshBasicMaterial({color:10477823});for(let x=0;x<16;x++){let f=new le.Mesh(o,h);f.scale.set(.035,.055,.035),f.visible=!1,n.add(f),l.push({m:f,life:0,vx:0,vy:0})}let m=Hl(15973685);for(let x=0;x<14;x++){let f=new le.Mesh(s,m);f.scale.set(.07,.07,.07),f.visible=!1,n.add(f),c.push({m:f,life:0,vx:0,vy:0,vr:0,bounces:0})}let p=0,d=0,g=0;return{puff(x,f,u,y={}){let v=a[p++%a.length];v.m.position.set(x,f,u),v.life=0,v.max=y.life??.5,v.vx=y.vx??-.3,v.vy=y.vy??.25,v.s0=y.s0??.05,v.s1=y.s1??.22,v.a=y.a??.6,v.m.material.color.setHex(y.color??16777215),v.m.visible=!0},drop(x,f,u,y,v){let _=l[d++%l.length];_.m.position.set(x,f,u),_.life=.7,_.vx=y,_.vy=v,_.m.visible=!0},coin(x,f,u,y,v){let _=c[g++%c.length];_.m.position.set(x,f,u),_.life=2.2,_.vx=y,_.vy=v,_.vr=8+Math.random()*10,_.bounces=0,_.m.visible=!0},update(x){for(let f of a){if(!f.m.visible)continue;f.life+=x;let u=f.life/f.max;if(u>=1){f.m.visible=!1;continue}f.m.position.x+=f.vx*x,f.m.position.y+=f.vy*x,f.m.scale.setScalar((f.s0+(f.s1-f.s0)*u)*2.2),f.m.material.opacity=f.a*(1-u)}for(let f of l)if(f.m.visible){if(f.life-=x,f.life<=0){f.m.visible=!1;continue}f.vy-=5*x,f.m.position.x+=f.vx*x,f.m.position.y+=f.vy*x}for(let f of c)if(f.m.visible){if(f.life-=x,f.life<=0){f.m.visible=!1;continue}f.vy-=7*x,f.m.position.x+=f.vx*x,f.m.position.y+=f.vy*x,f.m.rotation.x+=f.vr*x,f.m.rotation.z+=f.vr*.5*x,f.m.position.y<.07&&f.vy<0&&(f.m.position.y=.07,f.bounces++<3?(f.vy*=-.55,f.vx*=.7):(f.vy=0,f.vx*=.5))}},clear(){for(let x of[a,l,c])for(let f of x)f.m.visible=!1}}}var Ht=15316028,es=16767082,Bi=1511693,kl=16183782;function Fa(n,e,t){let i=Je(n,e*t.hipX,0,0);ee(i,Pe(en(t.thighR,t.thigh-2*t.thighR),t.pant),0,-t.thigh/2,0);let r=Je(i,0,-t.thigh,0);ee(r,Pe(en(t.shinR,t.shin-2*t.shinR),t.shinCol||t.pant),0,-t.shin/2,0),t.ankle&&ee(r,ye(t.ankle,t.shinR*1.25,.03,t.shinR*1.25),0,-t.shin+.07,0);let o=Je(r,0,-t.shin+.03,0);ee(o,ye(t.shoe,.075,.055,.14,0,0,.05));let s=Pe(Ve.cone,t.shoe);return s.scale.set(.035,.11,.035),s.rotation.x=-.75,ee(o,s,0,.03,.19),{hip:i,knee:r,foot:o}}function Oa(n,e,t){let i=Je(n,e*t.shX,t.shY,0);ee(i,ye(t.sleeve,t.shR,t.shR,t.shR)),ee(i,Pe(en(t.upR,t.upper-2*t.upR),t.sleeve),0,-t.upper/2,0),t.band&&ee(i,ye(t.band,t.upR*1.25,.03,t.upR*1.25),0,-t.upper+.03,0);let r=Je(i,0,-t.upper,0);ee(r,Pe(en(t.foreR,t.fore-2*t.foreR),t.foreCol),0,-t.fore/2,0),t.cuff&&ee(r,ye(t.cuff,t.foreR*1.3,.03,t.foreR*1.3),0,-t.fore*.8,0);let o=Je(r,0,-t.fore,0);return ee(o,ye(t.skin,.075,.08,.075)),{sh:i,elbow:r,hand:o}}function Ba(n,e,t,i,r,o=1){let s=Je(n,e*t,i,r);ee(s,ye(16777215,.09*o,.105*o,.055));let a=ye(1380368,.046*o,.054*o,.03,e*-.008,-.005,.05,{out:!1});return ee(s,a),ee(a,ye(16777215,.3,.3,.3,.35,.4,.6,{out:!1})),{e:s,pupil:a}}function Na(n,e,t,i,r,o,s,a){let l=Je(n,0,o,0);for(let c=0;c<t;c++){let h=c/(t-1)*2-1,m=h*i,p=-r*(1-h*h),d=s*Math.sqrt(1-h*h*.85);l.add(ye(e,a,a,a,m,p,d,{out:!1}))}return l}function Wl(n,e,t,i,r,o,s,a,l){let c=Je(n,o,s,a),h=Pe(Ve.box,e);if(h.scale.set(t,i,r),ee(c,h,0,-i/2,0),l){let m=Pe(Ve.sharp,l,{out:!1});m.scale.set(t*1.02,.035,r*1.1),ee(c,m,0,-i+.03,0)}return c}function _n(){let s={name:"raja",root:new le.Group};s.body=Je(s.root,0,.62,0),s.hipY=.62;let a={hipX:.105,thigh:.31,shin:.29,thighR:.11,shinR:.08,pant:15964701,ankle:Ht,shoe:7027230},l=Fa(s.body,1,a),c=Fa(s.body,-1,a);s.legL=l.hip,s.shinL=l.knee,s.legR=c.hip,s.shinR=c.knee,s.L1=a.thigh,s.L2=a.shin,ee(s.body,ye(15964701,.22,.15,.19,0,.02,0)),s.torso=Je(s.body,0,.05,0),ee(s.torso,ye(14166074,.235,.3,.19,0,.3,0)),ee(s.torso,ye(14166074,.24,.12,.2,0,.1,0)),ee(s.torso,ye(2378184,.15,.19,.06,0,.3,.15));for(let v=0;v<9;v++){let _=v/9*Math.PI*2;s.torso.add(ye(15266294,.018,.018,.012,Math.cos(_)*.1,.3+Math.sin(_)*.13,.2,{out:!1}))}s.torso.add(ye(es,.03,.03,.015,0,.3,.21,{out:!1})),ee(s.torso,ye(Ht,.245,.04,.2,0,.04,0)),ee(s.torso,Pe(en(.075,.07),12550745),0,.58,.01),s.torso.add(Na(s.torso,kl,15,.13,.13,.55,.17,.022)),s.torso.add(Na(s.torso,kl,19,.16,.22,.55,.19,.022)),s.torso.add(Na(s.torso,es,21,.18,.3,.56,.2,.018)),s.stole=[Wl(s.torso,1842466,.12,.6,.035,.165,.56,.13,Ht),Wl(s.torso,1842466,.12,.6,.035,-.165,.56,.13,Ht)];for(let v of[1,-1])ee(s.torso,ye(1842466,.1,.05,.13,v*.17,.56,.02));let h={shX:.28,shY:.5,shR:.1,sleeve:14166074,band:2378184,upR:.075,upper:.21,foreR:.06,fore:.2,foreCol:12550745,cuff:Ht,skin:12550745},m=Oa(s.torso,1,h),p=Oa(s.torso,-1,h);s.armL=m.sh,s.foreL=m.elbow,s.handL=m.hand,s.armR=p.sh,s.foreR=p.elbow,s.handR=p.hand,s.head=Je(s.torso,0,.86,.01),ee(s.head,ye(12550745,.25,.3,.25)),ee(s.head,ye(12550745,.19,.13,.19,0,-.18,.03)),ee(s.head,ye(Bi,.27,.25,.26,0,.07,-.05));for(let[v,_,D]of[[.2,-.02,-.12],[-.2,-.02,-.12],[.12,-.08,-.2],[-.12,-.08,-.2],[0,-.06,-.24]])s.head.add(ye(Bi,.09,.09,.09,v,_,D));for(let v of[1,-1])ee(s.head,ye(12550745,.05,.075,.035,v*.26,0,0)),ee(s.head,ye(Bi,.03,.08,.04,v*.24,.05,.09,{out:!1}));ee(s.head,ye(10709573,.055,.07,.06,0,-.04,.26)),s.eyeL=Ba(s.head,1,.1,.07,.22),s.eyeR=Ba(s.head,-1,.1,.07,.22),s.browL=ee(s.head,ye(Bi,.085,.026,.03,.1,.19,.23)),s.browR=ee(s.head,ye(Bi,.085,.026,.03,-.1,.19,.23)),s.mouth=ee(s.head,ye(3804429,.075,.05,.04,0,-.17,.23,{out:!1})),s.hatY=.255,s.hat=Je(s.head,0,s.hatY,0);let d=Pe(Ve.cyl,Ht);d.scale.set(.25,.08,.25),ee(s.hat,d,0,0,0);let g=Pe(new le.CylinderGeometry(.62,1,1,24),es);g.scale.set(.235,.36,.235),ee(s.hat,g,0,.22,0);let x=Pe(Ve.cyl,Ht);x.scale.set(.2,.05,.2),ee(s.hat,x,0,.3,0);let f=ye(Ht,.16,.13,.16,0,.42,0);ee(s.hat,f);let u=Pe(Ve.cone,es);u.scale.set(.06,.2,.06),ee(s.hat,u,0,.6,0),ee(s.hat,ye(14164778,.035,.035,.035,0,.71,0,{out:!1}));let y=ye(1381658,.16,.22,.05,0,.2,.21);ee(s.hat,y),y.rotation.x=-.12;for(let v=0;v<12;v++){let _=v/12*Math.PI*2;s.hat.add(ye(16777215,.017,.017,.012,Math.sin(_)*.12,.2+Math.cos(_)*.17,.25-Math.cos(_)*.02,{out:!1}))}ee(s.hat,ye(16777215,.07,.07,.03,0,.2,.25,{out:!1})),ee(s.hat,ye(3116287,.05,.05,.035,0,.2,.27,{out:!1}));for(let v of[1,-1]){let _=ye(Ht,.05,.13,.08,v*.25,-.1,.02);ee(s.hat,_),_.rotation.z=v*.15,s.hat.add(ye(14164778,.025,.025,.025,v*.27,-.09,.09,{out:!1}))}for(let v=0;v<6;v++){let _=v/6*Math.PI*2+Math.PI/6;s.hat.add(ye([14164778,2073451][v%2],.028,.028,.028,Math.sin(_)*.255,0,Math.cos(_)*.255,{out:!1}))}return s.height=2,s}function vn(){let o={name:"mantri",root:new le.Group};o.body=Je(o.root,0,.64,0),o.hipY=.64;let s={hipX:.085,thigh:.33,shin:.31,thighR:.075,shinR:.062,pant:15984324,shoe:9062946},a=Fa(o.body,1,s),l=Fa(o.body,-1,s);o.legL=a.hip,o.shinL=a.knee,o.legR=l.hip,o.shinR=l.knee,o.L1=s.thigh,o.L2=s.shin,o.torso=Je(o.body,0,.05,0);let c=Pe(new le.CylinderGeometry(.21,.31,.42,24),14170495);ee(o.torso,c,0,-.08,0);let h=Pe(Ve.tor,Ht);h.scale.set(.31,.31,.09),h.rotation.x=Math.PI/2,ee(o.torso,h,0,-.28,0);let m=Pe(Ve.tor,16220207,{out:!1});m.scale.set(.285,.285,.06),m.rotation.x=Math.PI/2,ee(o.torso,m,0,-.22,0),ee(o.torso,ye(14170495,.22,.3,.18,0,.3,0));let p=Pe(Ve.sharp,Ht,{out:!1});p.scale.set(.035,.62,.02),p.rotation.z=.12,ee(o.torso,p,.03,.12,.19),ee(o.torso,ye(Ht,.225,.035,.19,0,.12,0)),ee(o.torso,Pe(en(.075,.06),14920832),0,.58,.02),o.torso.add(Na(o.torso,kl,21,.14,.3,.56,.18,.024));let d={shX:.25,shY:.5,shR:.085,sleeve:14170495,upR:.062,upper:.2,foreR:.054,fore:.2,foreCol:14170495,cuff:Ht,skin:14920832},g=Oa(o.torso,1,d),x=Oa(o.torso,-1,d);o.armL=g.sh,o.foreL=g.elbow,o.handL=g.hand,o.armR=x.sh,o.foreR=x.elbow,o.handR=x.hand,o.head=Je(o.torso,0,.85,.01),ee(o.head,ye(14920832,.25,.29,.25)),ee(o.head,ye(14920832,.19,.12,.19,0,-.18,.03));for(let v of[1,-1])ee(o.head,ye(14920832,.05,.072,.035,v*.25,0,0)),ee(o.head,ye(15703174,.045,.026,.02,v*.14,-.08,.2,{out:!1}));ee(o.head,ye(13340772,.055,.07,.06,0,-.04,.25)),o.eyeL=Ba(o.head,1,.1,.06,.21),o.eyeR=Ba(o.head,-1,.1,.06,.21),o.browL=ee(o.head,ye(Bi,.08,.024,.03,.1,.18,.22)),o.browR=ee(o.head,ye(Bi,.08,.024,.03,-.1,.18,.22)),o.mouth=ee(o.head,ye(3804429,.065,.045,.03,0,-.18,.22,{out:!1})),ee(o.head,ye(Bi,.255,.2,.255,0,.12,-.03)),o.tuft=Je(o.head,0,.29,.02),ee(o.tuft,Pe(en(.02,.1),Bi),0,.06,0),ee(o.tuft,ye(Bi,.035,.035,.035,.02,.14,0)),o.hatY=.225,o.hat=Je(o.head,0,o.hatY,0),ee(o.hat,ye(15290410,.33,.2,.32,0,.07,-.01));let f=Pe(Ve.tor,16220207);f.scale.set(.29,.29,.18),f.rotation.x=Math.PI/2+.22,ee(o.hat,f,0,.05,0);let u=Pe(Ve.tor,13187618);u.scale.set(.26,.26,.16),u.rotation.x=Math.PI/2-.28,u.rotation.z=.45,ee(o.hat,u,0,.15,0);let y=Pe(Ve.tor,Ht);return y.scale.set(.295,.295,.07),y.rotation.x=Math.PI/2,ee(o.hat,y,0,-.03,0),ee(o.hat,ye(es,.055,.055,.035,0,.02,.3)),ee(o.hat,ye(14164778,.028,.028,.028,0,.02,.33,{out:!1})),o.tail=Wl(o.hat,15290410,.15,.36,.04,0,.02,-.29,Ht),o.tail.rotation.x=.25,o.height=1.8,o}function kt(n,e){let t=e.mouth??0,i=e.angry??0,r=e.wide??0;n.mouth.scale.y=(n.name==="raja"?.04:.03)+t*.11;for(let o of[n.eyeL,n.eyeR])o.e.scale.setScalar(1+r*.3);n.browL.rotation.z=-i*.45+r*.15,n.browR.rotation.z=i*.45-r*.15,n.browL.position.y=n.browR.position.y=(n.name==="raja"?.19:.18)+r*.045-i*.02}function ii(n,e,t){for(let i of[n.eyeL,n.eyeR])i.pupil.position.set(e*.03+(i===n.eyeL?-.006:.006),t*.03-.004,.04)}function Mn(n,e,t){n.stole&&n.stole.forEach((i,r)=>{let o=r?-1:1;i.rotation.x=-.12*e-Math.abs(Math.sin(t*9+r*1.7))*.2*e,i.rotation.z=o*(e*.45+Math.sin(t*13+r*2)*.18*e)}),n.tail&&(n.tail.rotation.x=.25+e*.6+Math.sin(t*11)*.18*e,n.tail.rotation.z=Math.sin(t*7)*.15*e)}function Wn(n){for(let e of["legL","legR","shinL","shinR","armL","armR","foreL","foreR","torso","head","body"])n[e].rotation.set(0,0,0);n.body.scale.set(1,1,1),n.body.position.set(0,n.hipY,0),n.torso.position.y=.05,Mn(n,0,0)}var x2=Math.PI*2,Xl=(n,e,t)=>Math.max(e,Math.min(t,n));function Sn(n,e,t={}){Wn(n);let i=t.amp??1,r=t.lean??.22,o=t.knee??1,s=Math.sin(e),a=Math.sin(e+Math.PI);n.legL.rotation.x=-s*.95*i,n.legR.rotation.x=-a*.95*i,n.shinL.rotation.x=Math.max(0,Math.sin(e+1.6))*1.25*o+.08,n.shinR.rotation.x=Math.max(0,Math.sin(e+1.6+Math.PI))*1.25*o+.08,n.body.position.y=n.hipY+Math.abs(Math.cos(e))*.075*i-.03,n.torso.rotation.x=r,n.torso.rotation.y=s*.18,n.head.rotation.x=-r*.8+Math.abs(Math.cos(e))*.05,n.head.rotation.z=s*.04;let l=t.armMode||"swing";l==="swing"?(n.armL.rotation.x=s*1.05*i,n.armR.rotation.x=a*1.05*i,n.foreL.rotation.x=-.9-Math.max(0,s)*.4,n.foreR.rotation.x=-.9-Math.max(0,a)*.4):l==="panic"&&(n.armL.rotation.x=-2.5+Math.sin(e*2)*.35,n.armR.rotation.x=-2.5+Math.sin(e*2+1.5)*.35,n.armL.rotation.z=-.35,n.armR.rotation.z=.35,n.foreL.rotation.x=-.25+Math.sin(e*2)*.4,n.foreR.rotation.x=-.25+Math.sin(e*2+2)*.4),n.hat&&n.hat.parent===n.head&&(n.hat.rotation.z=Math.sin(e+.9)*.1,n.hat.position.y=n.hatY+Math.max(0,Math.cos(e+.4))*.025),Mn(n,.55*i,e/2.2)}function tn(n,e={}){Wn(n),n.legL.rotation.x=n.legR.rotation.x=-1.45,n.shinL.rotation.x=n.shinR.rotation.x=1.35,n.body.position.y=e.hip??.2,n.torso.rotation.x=e.lean??.1}function ql(n,e,t,i,r,o,s,a){let l=n.L1*a,c=n.L2*a,h=o-i,m=s-r,p=Math.hypot(h,m);p=Xl(p,.05,l+c-.001);let d=Math.atan2(h,-m),g=Math.acos(Xl((l*l+p*p-c*c)/(2*l*p),-1,1)),x=Math.acos(Xl((c*c+p*p-l*l)/(2*c*p),-1,1)),f=d+g,u=d-x;e.rotation.x=-f,t.rotation.x=f-u}var dp=16182482,pi=14263866,ni=1778467,_t=(n,e,t,i,r,o,s,a,l)=>{let c=Pe(l&&l.sharp?Ve.sharp:Ve.box,e,l);return c.scale.set(t,i,r),ee(n,c,o,s,a)},za=(n,e,t,i,r,o,s,a=0,l=0,c)=>{let h=Pe(Ve.cyl,e,c);return h.scale.set(t,i,t),h.rotation.set(a,0,l),ee(n,h,r,o,s)},Xn=(n,e,t,i,r,o,s,a=0)=>{let l=Math.hypot(o-i,s-r),c=Pe(Ve.cyl,e,{out:!0});return c.scale.set(t,l,t),c.position.set((i+o)/2,(r+s)/2,a),c.rotation.z=Math.atan2(o-i,-(s-r))+Math.PI,n.add(c),c};function qr(n,e,t,i,r,o=pi,s=!1){let a=Je(n,t,i,r),l=Je(a),c=Pe(Ve.tor,ni);c.scale.set(e*.82,e*.82,e*1.15),ee(l,c);let h=Pe(Ve.cyl,2765876);h.scale.set(e*.78,.08,e*.78),h.rotation.x=Math.PI/2,ee(l,h);let m=Pe(Ve.cyl,o);m.scale.set(e*.42,.11,e*.42),m.rotation.x=Math.PI/2,ee(l,m);for(let p=0;p<3;p++){let d=Pe(Ve.sharp,15782542,{out:!1});d.scale.set(e*1.5,.045,.125),d.rotation.z=p*Math.PI/3,ee(l,d,0,0,0)}return l}function pp(){let n=new le.Group,e=Je(n),t=Je(e);_t(t,1809550,2.1,.34,.74,0,.32,0),_t(t,1809550,.8,.22,.68,.7,.5,0),_t(t,1809550,.5,.24,.68,-.82,.5,0),_t(t,pi,2,.035,.02,0,.4,.375,{out:!1}),_t(t,pi,2,.035,.02,0,.4,-.375,{out:!1}),_t(t,8075810,.12,.34,.54,-.5,.66,0),_t(t,8075810,.46,.12,.54,-.28,.5,0);for(let a of[1,-1])_t(t,pi,.04,.34,.04,.42,.78,a*.3,{sharp:!0}).rotation.z=.35;let i=new le.Mesh(new le.PlaneGeometry(.34,.56),new le.MeshBasicMaterial({color:12579050,transparent:!0,opacity:.38,side:le.DoubleSide,depthWrite:!1}));i.position.set(.45,.78,0),i.rotation.set(0,Math.PI/2,.35),t.add(i);let r=Pe(Ve.tor,2763306);r.scale.set(.12,.12,.12),r.rotation.y=Math.PI/2-.4,ee(t,r,.22,.74,0);for(let a of[1,-1])ee(t,ye(16774084,.09,.09,.09,1.04,.56,a*.24,{out:!0}));_t(t,dp,.1,.09,.86,1.1,.26,0),_t(t,dp,.1,.09,.86,-1.1,.26,0),za(t,ni,.045,.2,-1.1,.18,.22,0,Math.PI/2);let o=Pe(Ve.cone,pi);o.scale.set(.07,.2,.07),o.rotation.z=-Math.PI/2,ee(t,o,1,.7,-.24);let s=[];for(let[a,l]of[[.68,.4],[-.68,.4],[.68,-.4],[-.68,-.4]])s.push(qr(t,.25,a,.25,l));return{group:n,bob:e,body:t,wheels:s,seat:{x:-.32,y:.54},tail:{x:-1.2,y:.2},bumper:{x:-1.14,y:.3}}}function mp(){let n=new le.Group,e=Je(n,-.52,.2,0),t=Je(e,.52,-.2,0);_t(t,15632954,.95,.42,.46,-.38,.44,0),_t(t,pi,.85,.035,.02,-.38,.46,.235,{out:!1}),_t(t,pi,.85,.035,.02,-.38,.46,-.235,{out:!1}),_t(t,3810327,.8,.11,.34,-.32,.7,0),_t(t,745046,.5,.06,.38,.32,.2,0);let i=_t(t,15632954,.1,.66,.4,.66,.56,0);i.rotation.z=-.12,Xn(t,ni,.03,.74,.9,.8,.22,0),Xn(t,ni,.03,.72,.92,.66,1.18,0);let r=za(t,ni,.03,.62,.66,1.18,0,Math.PI/2,0);for(let a of[1,-1])ee(t,ye(2236962,.05,.05,.08,.66,1.18,a*.33));ee(t,ye(16774084,.1,.1,.1,.82,1.06,0)),ee(t,ye(14164778,.05,.05,.05,-.86,.5,0,{out:!1})),za(t,ni,.04,.24,-.88,.26,.16,0,Math.PI/2);let o=Pe(new le.TorusGeometry(1,.2,8,20,Math.PI),15632954);o.scale.set(.26,.26,.36),ee(t,o,.8,.2,0);let s=[qr(t,.2,-.52,.2,0),qr(t,.2,.8,.2,0)];return{group:n,pitch:e,body:t,wheels:s,seats:[{x:-.1,y:.74},{x:-.5,y:.74}],tail:{x:-.95,y:.28}}}function gp(){let n=new le.Group,e=Je(n),t=Je(e);_t(t,14042429,1.05,.12,.64,-.5,.4,0),_t(t,14042429,.78,.14,.54,-.55,.52,0),_t(t,14042429,.1,.5,.56,-.98,.72,0);for(let d of[1,-1])_t(t,14042429,1,.3,.05,-.5,.56,d*.31),_t(t,pi,.9,.04,.02,-.5,.56,d*.34,{out:!1});let i=(d,g)=>{let x=new le.Shape;return x.absarc(0,0,d,0,Math.PI,!1),x.lineTo(-g,0),x.absarc(0,0,g,Math.PI,0,!0),x.closePath(),x},r=new le.ExtrudeGeometry(i(.88,.62),{depth:.7,bevelEnabled:!1,curveSegments:28}),o=Pe(r,15906891);o.position.set(-.6,.7,-.35),t.add(o);for(let d of[-.37,.37]){let g=Pe(new le.ExtrudeGeometry(i(.9,.86),{depth:.04,bevelEnabled:!1,curveSegments:28}),14042429,{out:!1});g.position.set(-.6,.62,d-.02),t.add(g)}let s=[qr(t,.3,-.62,.3,.38,pi),qr(t,.3,-.62,.3,-.38,pi)],a=Je(e);Xn(a,ni,.032,0,.4,.5,.48,0),Xn(a,ni,.035,.5,.48,.36,.9,0),Xn(a,ni,.035,.5,.48,.86,.95,0),Xn(a,ni,.035,.36,.9,.86,.95,0),Xn(a,ni,.03,.86,.95,1.04,.34,0),za(a,ni,.028,.5,.86,1,0,Math.PI/2,0),_t(a,3810327,.34,.08,.22,.34,.93,0);let l=qr(a,.34,1.04,.34,0,pi);s.push(l);let c=Je(a,.5,.48,0),h=Je(c),m=Pe(Ve.sharp,ni);m.scale.set(.3,.04,.04),ee(h,m,0,0,0);let p=[];for(let d of[1,-1]){let g=Je(h,d*.14,0,d*.2);_t(g,3355443,.16,.035,.1,0,0,0,{sharp:!0}),p.push(g)}return ee(a,ye(pi,.12,.12,.03,.5,.48,.1)),{group:n,bob:e,wheels:s,crank:h,pedals:p,crankPos:{x:.5,y:.48},saddle:{x:.34,y:.93},passenger:{x:-.6,y:.52},bar:{x:.86,y:1}}}var Ga=15316028;function xp(){let n=new le.Group,e=Pe(new le.TorusGeometry(.42,.022,8,28,Math.PI),8014367);e.rotation.z=-Math.PI/2,n.add(e);let t=Pe(Ve.cyl,16182482,{out:!1});t.scale.set(.006,.84,.006),t.position.set(0,0,0),n.add(t);let i=Pe(Ve.cyl,Ga);return i.scale.set(.035,.12,.035),i.position.set(.42,0,0),n.add(i),n}function _p(){let n=new le.Group,e=Pe(Ve.cyl,9067051,{out:!0});e.scale.set(.014,.7,.014),e.rotation.z=Math.PI/2,n.add(e);let t=Pe(Ve.cone,14673638);t.scale.set(.04,.12,.04),t.rotation.z=-Math.PI/2,ee(n,t,.4,0,0);for(let i of[0,Math.PI/2]){let r=Pe(Ve.sharp,16738874,{out:!1});r.scale.set(.12,.07,.006),r.rotation.x=i,ee(n,r,-.3,0,0)}return n}function vp(){let n=new le.Group,e=Pe(Ve.cyl,15984320);e.scale.set(.085,.4,.085),e.rotation.x=Math.PI/2,e.position.set(0,-.08,0),n.add(e);let t=Pe(Ve.cyl,12859180);t.scale.set(.07,.03,.07),t.rotation.x=Math.PI/2,ee(n,t,0,-.08,.21);let i=Pe(Ve.cyl,12859180);i.scale.set(.1,.035,.1),i.rotation.x=Math.PI/2,ee(n,i,0,-.08,-.21);let r=Je(n,0,-.08,0),o=Pe(Ve.sharp,16446428,{out:!0});o.scale.set(.5,.012,.3),ee(r,o,-.25,0,0);for(let s=0;s<4;s++){let a=Pe(Ve.sharp,7035450,{out:!1});a.scale.set(.34-s*.04,.004,.02),ee(r,a,-.2-s*.015,.008,-.08+s*.055)}return n.userData.bill=r,n}function Mp(){let n=new le.Group;ee(n,ye(12094026,.17,.17,.17,0,-.17,0));let e=Pe(Ve.cyl,12094026);e.scale.set(.07,.08,.07),ee(n,e,0,-.03,0);let t=Pe(Ve.ring,12859180,{out:!1});t.scale.set(.075,.075,.075),t.rotation.x=Math.PI/2,ee(n,t,0,-.05,0);let i=Pe(Ve.cyl,Ga,{out:!1});return i.scale.set(.08,.02,.08),i.rotation.z=Math.PI/2,i.rotation.x=.2,ee(n,i,0,-.17,.17),n}function Sp(){let n=new le.Group,e=15895579;for(let i of[.2,.13,.06]){let r=Pe(Ve.ring,e);r.scale.set(i,i,i*2.4),r.rotation.x=Math.PI/2-.35,n.add(r)}let t=ye(16769162,.05,.04,.05,0,0,0,{out:!1});return n.add(t),n}function yp(n=16769354){let e=Pe(new le.OctahedronGeometry(1,0),n,{out:!1});return e.scale.set(.07,.07,.025),e}function Ep(){let n=new le.Group;ee(n,ye(Ga,.045,.045,.045,0,.09,0));let e=Pe(Ve.cyl,13115439);e.scale.set(.03,.15,.03),ee(n,e,0,0,0);let t=Pe(Ve.box,Ga);t.scale.set(.05,.035,.2),ee(n,t,0,-.08,0);let i=.74,r=.16,o=new le.Shape;o.moveTo(0,0);for(let l=1;l<=12;l++){let c=l/12;o.lineTo(r*c*c,-i*c)}for(let l=12;l>=0;l--){let c=l/12;o.lineTo(r*c*c+.065*(1-c*c*c)+(l===12?.012:0),-i*c+(l===12?.03:0))}let s=new le.ExtrudeGeometry(o,{depth:.014,bevelEnabled:!1});s.translate(-.03,0,-.007);let a=Pe(s,14937326);return a.rotation.y=-Math.PI/2,n.add(a),a.position.set(0,-.1,0),n}var qn=Math.PI*2,Zn=Math.PI/2-.45,zi=.62,ri=.6,Va=2.4,Yn=(n,e,t)=>(t=Math.min(1,Math.max(0,(t-n)/(e-n))),t*t*(3-2*t)),Ri=new le.Vector3,Yl;function Ci(n,e,t=0){if(!Yl){let r=document.createElement("canvas");r.width=r.height=64;let o=r.getContext("2d"),s=o.createRadialGradient(32,32,2,32,32,31);s.addColorStop(0,"rgba(0,0,0,.65)"),s.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=s,o.fillRect(0,0,64,64),Yl=new le.CanvasTexture(r)}let i=new le.Mesh(new le.PlaneGeometry(1,1),new le.MeshBasicMaterial({map:Yl,transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(t,.006,.05),i.scale.set(e,e*.42,1),n.add(i),i}function yn(n,e,t,i,r=0){return e.root.scale.setScalar(t),e.root.position.set(i,r,0),e.root.rotation.y=Zn,n.add(e.root),e}function Jn(n,e,t,i,r){let o=new le.Group;return o.visible=!1,n.scene.add(o),{g:o,dir:e,rear:t,front:i,speed:r,wx:s=>o.position.x+e*s}}function En(n,e,t,i,r,o=.1){i-(t.t??-1)>o&&(t.t=i,n.fx.puff(e.wx(r),.06,.12,{vx:-e.dir*.5,vy:.22,s0:.03,s1:.13,life:.38,a:.34}))}function Ha(n,e,t,i,r,o=.14){r-(i.s??-1)>o&&(i.s=r,t.head.getWorldPosition(Ri),n.fx.drop(Ri.x,Ri.y+.12,Ri.z,(Math.random()-.5)*1.2-e.dir*.5,1+Math.random()*.8))}var bp=(n,e=15)=>.55+.4*Math.sin(n*e);function ng(n){let e=Jn(n,1,1,3.2,2.7),t=e.g,i=yn(t,_n(),zi,.2),r=yn(t,vn(),ri,2.2),o=Ep();o.scale.setScalar(1.6),i.handR.add(o),Ci(t,.8,.2);let s=Ci(t,.7,2.2),a={r:{},m:{}};return e.update=(l,c)=>{let h=l*Va*qn;i.root.position.x=.2+.35*Math.sin(l*1.3),Sn(i,h,{armMode:"none",lean:.3,amp:1.05}),i.armL.rotation.x=Math.sin(h)*1,i.foreL.rotation.x=-.9,i.armR.rotation.x=-2.6+Math.sin(l*9)*.55,i.armR.rotation.z=-.15,i.foreR.rotation.x=-.4,kt(i,{angry:1,mouth:bp(l)}),ii(i,1,0),Sn(r,h+1.3,{armMode:"panic",lean:.32,amp:1.15}),r.head.rotation.y=-2.2+Math.sin(l*6)*.15,kt(r,{wide:1,mouth:.9}),ii(r,-1,0),En(n,e,a.r,l,i.root.position.x-.15),En(n,e,a.m,l+.05,2),Ha(n,e,r,a,l)},e}function rg(n){let e=Jn(n,-1,2.6,1.4,4.2),t=e.g,i=pp();t.add(i.group),Ci(t,2.4,-.05);let r=_n();r.root.scale.setScalar(zi),r.root.rotation.y=Zn,tn(r,{hip:.2}),r.root.position.set(i.seat.x,i.seat.y-.2*zi,0),i.body.add(r.root);let o=Je(i.body,i.bumper.x,i.bumper.y+.05,0),s=vn();s.root.scale.setScalar(ri),o.add(s.root),s.root.position.set(0,-.97,.02);let a={};return e.update=(l,c)=>{let h=Math.sin(l*31)*.012+Math.sin(l*6.5)*.02;i.bob.position.y=Math.max(0,h),i.bob.rotation.z=Math.sin(l*6.5+1)*.012;let m=-(l*e.speed)/.25;for(let p of i.wheels)p.rotation.z=m;tn(r,{hip:.2,lean:.12}),r.armL.rotation.x=-1.15,r.foreL.rotation.x=-.4,r.armR.rotation.x=-1.15,r.foreR.rotation.x=-.4,r.armR.rotation.x+=Math.max(0,Math.sin(l*5.5))*-.5,r.head.rotation.z=Math.sin(l*8)*.06,kt(r,{angry:.2,mouth:.6+.35*Math.sin(l*11),wide:.2}),r.hat.rotation.z=-.3+Math.sin(l*17)*.08,Mn(r,1,l),Wn(s),o.rotation.z=-Math.PI/2+Math.sin(l*13)*.22+.15,s.armL.rotation.x=s.armR.rotation.x=Math.PI-.08,s.armL.rotation.z=.08,s.armR.rotation.z=-.08,s.legL.rotation.x=Math.sin(l*15)*.7,s.legR.rotation.x=-Math.sin(l*15)*.7,s.shinL.rotation.x=.5+Math.sin(l*15+1)*.4,s.shinR.rotation.x=.5-Math.sin(l*15+1)*.4,s.head.rotation.x=-.3,s.hat.rotation.z=.5+Math.sin(l*20)*.15,Mn(s,1.2,l),kt(s,{wide:1,mouth:1}),ii(s,0,.3),l-(a.t??-1)>.05&&(a.t=l,n.fx.puff(e.wx(i.tail.x-.05),.2,.1,{vx:-e.dir*.9,vy:.35,s0:.04,s1:.2,life:.55,a:.38,color:13227220}))},e}function og(n){let e=Jn(n,1,1,3.4,2.7),t=e.g,i=yn(t,vn(),ri,.2),r=yn(t,_n(),zi,2.3),o=vp();o.scale.setScalar(1.8),i.handR.add(o);let s=Mp();s.scale.setScalar(1.7),r.handR.add(s),Ci(t,.7,.2),Ci(t,.8,2.3);let a={r:{},m:{}};return e.update=(l,c)=>{let h=l*Va*qn;Sn(r,h+.5,{armMode:"none",lean:.3,amp:1.1}),r.armL.rotation.x=-2.3+Math.sin(l*12)*.4,r.armL.rotation.z=-.3,r.foreL.rotation.x=-.3,r.armR.rotation.x=-1+Math.sin(h)*.45,r.foreR.rotation.x=-.5,r.head.rotation.y=-2.1+Math.sin(l*5)*.15,kt(r,{wide:1,mouth:.85}),ii(r,-1,0),Sn(i,h,{armMode:"none",lean:.32,amp:1.05}),i.armR.rotation.x=-2.6+Math.sin(l*8)*.45,i.foreR.rotation.x=-.4,i.armR.rotation.z=-.1,i.armL.rotation.x=-1.55,i.foreL.rotation.x=-.1,o.userData.bill.rotation.y=Math.sin(l*10)*.25,o.rotation.z=.5,kt(i,{angry:1,mouth:bp(l,13)}),ii(i,1,0),En(n,e,a.r,l,2.15),En(n,e,a.m,l+.04,.05),Ha(n,e,r,a,l),l-(a.c??-1)>.1&&(a.c=l,s.getWorldPosition(Ri),n.fx.coin(Ri.x,Ri.y-.05,Ri.z,-e.dir*(.5+Math.random()*1.2),1.3+Math.random()*1.2))},e}function sg(n){let e=Jn(n,-1,1,3.6,2.5),t=e.g,i=yn(t,_n(),zi,.2),r=yn(t,vn(),ri,2.7),o=xp();o.scale.setScalar(1.5);let s=new le.Vector3(0,-1,0),a=new le.Vector3(0,0,1),l=new le.Vector3(-1,0,0);o.quaternion.setFromRotationMatrix(new le.Matrix4().makeBasis(s,a,l)),o.position.set(0,.42*1.5,0),i.handL.add(o),Ci(t,.8,.2),Ci(t,.7,2.7);let c=[];for(let f=0;f<4;f++){let u=_p();u.scale.setScalar(1.15),u.visible=!1,t.add(u),c.push(u)}let h=[{t:.9,hit:!1,up:.5},{t:2,hit:!1,up:.28},{t:3.1,hit:!0,up:0},{t:4.9,hit:!1,up:.45}],m=.5,p=1.1,d={r:{},m:{}},g=!1,x=()=>{for(let f of c)f.visible=!1;g&&(r.head.add(r.hat),r.hat.position.set(0,r.hatY,0),r.hat.rotation.set(0,0,0),r.hat.scale.set(1,1,1),g=!1)};return e.enter=x,e.exit=x,e.update=(f,u)=>{let y=f*Va*qn,v=0;for(let L of h)v=Math.max(v,Yn(L.t-.45,L.t-.05,f)*(1-Yn(L.t,L.t+.07,f)));Sn(i,y,{armMode:"none",lean:.2,amp:1}),i.armL.rotation.x=-1.5,i.foreL.rotation.x=0,i.armL.rotation.z=-.1,i.armR.rotation.x=-1.35-.2*v,i.foreR.rotation.x=.15+1.75*v,i.armR.rotation.z=.2,i.head.rotation.y=-.15,i.head.rotation.x=-.1,kt(i,{angry:.9,mouth:.15+(1-v)*.35*Math.max(0,Math.sin(f*9))}),ii(i,1,0);let _=0,D=null;h.forEach((L,b)=>{let M=c[b],C=(f-L.t)/m;if(C<0||C>3.2){M.visible=!1;return}(C===0||!L.p0)&&(o.getWorldPosition(Ri),t.worldToLocal(Ri),L.p0=Ri.clone(),L.p0.x+=.15,L.p0.y=.86);let z=2.7,O=p+L.up,F=(z-L.p0.x)/m,V=(O-L.p0.y)/m,G=Math.min(C,3.2),K=.14*Math.sin(Math.PI*Math.min(G,1));M.position.set(L.p0.x+F*m*G,L.p0.y+V*m*G+(G<=1?K:0),.12),M.rotation.z=Math.atan2(V+(G<=1?.14*Math.PI*Math.cos(Math.PI*G)/m:0),F),M.visible=!0,L.hit&&C>=1&&(D=M)});let A=h[2].t+m;f>=A&&!g&&(t.attach(r.hat),g=!0),f<A&&g&&x(),g&&D&&(r.hat.position.copy(D.position),r.hat.position.x+=.1,r.hat.rotation.z+=11*u,r.hat.rotation.x+=6*u);let P=Yn(A,A+.1,f);Sn(r,y+1.1,{armMode:"panic",lean:.3,amp:1.1}),P>0&&(r.armR.rotation.x=-2.6,r.armR.rotation.z=.2,r.foreR.rotation.x=-1.9,r.armL.rotation.x=-.6+Math.sin(f*14)*.5,r.foreL.rotation.x=-.5,r.armL.rotation.z=-.2,r.head.rotation.x=.15),r.head.rotation.y=-2.2+Math.sin(f*7)*.12,kt(r,{wide:1,mouth:P>0?1:.7,angry:0}),ii(r,-1,.1),r.tuft.rotation.z=Math.sin(f*12)*.5,En(n,e,d.r,f,.05),En(n,e,d.m,f+.04,2.6),Ha(n,e,r,d,f,.1)},e}function ag(n){let e=Jn(n,1,1.4,2,4),t=e.g,i=mp();t.add(i.group),Ci(t,1.8,0);let r=_n();r.root.scale.setScalar(zi),r.root.rotation.y=Zn,tn(r),r.root.position.set(i.seats[0].x+.05,i.seats[0].y-.2*zi,0),i.body.add(r.root);let o=vn();o.root.scale.setScalar(ri),o.root.rotation.y=Zn,tn(o),o.root.position.set(i.seats[1].x-.02,i.seats[1].y-.2*ri,0),i.body.add(o.root);let s={};return e.update=(a,l)=>{let c=Yn(.5,1.4,a)*(.36+.07*Math.sin(a*3.1));i.pitch.rotation.z=c,i.group.position.y=0;let h=-(a*e.speed)/.2;for(let m of i.wheels)m.rotation.z=h;i.body.position.y=-.2+Math.sin(a*24)*.01,tn(r,{lean:-.05-c*.1}),r.armL.rotation.x=r.armR.rotation.x=-1,r.foreL.rotation.x=r.foreR.rotation.x=-.6,r.hat.rotation.z=-.35+Math.sin(a*17)*.08,Mn(r,1,a),kt(r,{angry:0,mouth:.7+.25*Math.sin(a*9),wide:.1}),ii(r,1,0),tn(o,{lean:.02}),o.armL.rotation.x=o.armR.rotation.x=-1.35,o.foreL.rotation.x=o.foreR.rotation.x=-.9,o.armL.rotation.z=.25,o.armR.rotation.z=-.25,o.hat.rotation.z=-.45+Math.sin(a*19)*.1,Mn(o,1.1,a),o.head.rotation.x=-.15,kt(o,{wide:1,mouth:1}),ii(o,0,.1),a-(s.t??-1)>.05&&(s.t=a,n.fx.puff(e.wx(-1.1),.22+c*.3,.1,{vx:-e.dir*.8,vy:.3,s0:.04,s1:.2,life:.5,a:.36,color:13095120})),c<.3&&En(n,e,s,a,-.9,.08)},e}function lg(n){let e=Jn(n,-1,1.8,2.4,3.2),t=e.g,i=gp();t.add(i.group),Ci(t,2.6,.1);let r=_n();r.root.scale.setScalar(zi),r.root.rotation.y=Zn,tn(r),r.root.position.set(i.passenger.x,i.passenger.y-.2*zi,0),i.bob.add(r.root);let o=vn();o.root.scale.setScalar(ri),o.root.rotation.y=Zn,i.bob.add(o.root);let s=.78;o.root.position.set(.4,s-o.hipY*ri,0);let a=new le.Group;i.bob.add(a),a.position.set(-.28,1,.1);let l=new le.Mesh(new le.CylinderGeometry(.014,.014,1.7,8),new le.MeshBasicMaterial({color:8014367}));l.position.set(.82,.3,0),l.rotation.z=-1.2,a.add(l);let c=Je(a,1.62,.64,0),h=new le.Mesh(new le.CylinderGeometry(.004,.004,.34,4),new le.MeshBasicMaterial({color:16182482}));h.position.y=-.17,c.add(h);let m=Sp();m.position.y=-.4,c.add(m);let p={};return e.update=(d,g)=>{i.bob.position.y=Math.abs(Math.sin(d*7))*.012;let x=d*7.5;i.crank.rotation.z=-x;let f=-(d*e.speed)/.3;for(let P of i.wheels)P.rotation.z=f;Wn(o),o.root.position.y=s-o.hipY*ri+Math.abs(Math.sin(x))*.02,o.torso.rotation.x=.5,o.head.rotation.x=-.55;let u=i.crankPos.x,y=i.crankPos.y,v=o.root.position.x,_=o.root.position.y+o.hipY*ri,D={x:u+.14*Math.cos(x),y:y-.14*Math.sin(x)},A={x:u-.14*Math.cos(x),y:y+.14*Math.sin(x)};ql(o,o.legR,o.shinR,v,_,D.x,D.y+.04,ri),ql(o,o.legL,o.shinL,v,_,A.x,A.y+.04,ri),o.armL.rotation.x=o.armR.rotation.x=-1.7,o.foreL.rotation.x=o.foreR.rotation.x=-.15,o.armL.rotation.z=.05,o.armR.rotation.z=-.05,kt(o,{wide:.6,mouth:.6+.3*Math.sin(d*12)}),ii(o,1,1),tn(r,{lean:-.12}),r.armR.rotation.x=-1.75+Math.sin(d*4)*.12,r.foreR.rotation.x=-.5,r.armR.rotation.z=.1,r.armL.rotation.x=-.4,r.foreL.rotation.x=-1.2,r.armL.rotation.z=-.3,kt(r,{angry:0,mouth:.25+.15*Math.max(0,Math.sin(d*3)),wide:0}),ii(r,1,0),r.head.rotation.z=.08,c.rotation.z=.28*Math.sin(d*5.2),m.rotation.y=d*3,Ha(n,e,o,p,d,.07),d-(p.d??-1)>.12&&(p.d=d,n.fx.puff(e.wx(-.2),.05,.3,{vx:-e.dir*.4,vy:.2,s0:.05,s1:.2,life:.4,a:.45}))},e}function cg(n){let e=Jn(n,1,.8,2.6,2.6),t=e.g,i=yn(t,vn(),ri,.3),r=yn(t,_n(),zi,1.9),o=Ci(t,.7,.3),s=Ci(t,.8,1.9),a=(d,g)=>{let x=new le.Group;d.root.add(x),x.position.y=g;let f=[];for(let u=0;u<4;u++){let y=yp(u%2?16769354:16777215);y.scale.multiplyScalar(2.2),x.add(y),f.push(y)}return x.visible=!1,{grpS:x,stars:f}},l=a(i,2.2),c=a(r,2.35),h=2.3,m={r:{},m:{}},p=(d,g,x,f,u,y,v)=>{let _=((x+f)%h+h)%h,D=x*Va*qn+f,A=0,P=0,L=0,b=0,M=0,C=0,z=!0;if(!(_<.7))if(_<.9)b=Yn(.7,.9,_),z=!1;else if(_<1.6){let V=(_-.9)/.7;z=!1,A=4*(u==="flip"?.55:.75)*V*(1-V),u==="flip"?P=V*qn:L=V*qn,M=Math.sin(Math.PI*V)}else _<1.72?(b=1-Yn(1.6,1.72,_)*.4,z=!1):_<2.3&&(C=1-Yn(2,2.3,_),z=!1,C<.01&&(z=!0));z?Sn(d,D,{amp:1,lean:.25}):(Wn(d),d.legL.rotation.x=-.4-M*1.3,d.legR.rotation.x=-.4-M*1.3,d.shinL.rotation.x=.5+M*1.5,d.shinR.rotation.x=.5+M*1.5,d.armL.rotation.x=d.armR.rotation.x=-1.2-M*.8+b*.6,d.foreL.rotation.x=d.foreR.rotation.x=-.9-M*.7,d.torso.rotation.x=.15+M*.6+b*.35,C>0&&(d.torso.rotation.z=Math.sin(x*10)*.15*C,d.head.rotation.z=Math.sin(x*8)*.25*C,d.legL.rotation.x=Math.sin(x*9)*.3*C,d.armL.rotation.z=-.6,d.armR.rotation.z=.6,d.armL.rotation.x=-.4,d.armR.rotation.x=-.4)),d.body.position.y=d.hipY-b*.2+A/d.root.scale.x,d.body.rotation.x=P,d.root.rotation.y=Zn+L,d.body.scale.set(1+b*.22,1-b*.26,1+b*.22),kt(d,{wide:z?0:1,mouth:z?.2:C>0?.7:.8,angry:0}),y.scale.setScalar(Math.max(.35,1-A*1)*(d.name==="raja"?.8:.7)),y.scale.y*=.42;let O=u==="flip"?c:l,F=d.name==="raja"?c:l;if(F.grpS.visible=C>.02,F.grpS.visible&&F.stars.forEach((V,G)=>{let K=x*6+G*(qn/4);V.position.set(Math.cos(K)*.38,Math.sin(K*2)*.03,Math.sin(K)*.38),V.rotation.y=K}),z)En(n,e,g,x+f*.1,v-.05);else if(_>=1.6&&_<1.72&&(g.l??-9)<x-.5){g.l=x;for(let V=0;V<5;V++)n.fx.puff(e.wx(v)+(V-2)*.1,.06,.1,{vx:(V-2)*.35,vy:.2,s0:.06,s1:.26,life:.5,a:.55})}};return e.update=(d,g)=>{p(i,m.m,d,1.2,"jump",o,.3),p(r,m.r,d,0,"flip",s,1.9)},e}function Tp(n){return[ng(n),rg(n),og(n),sg(n),ag(n),lg(n),cg(n)]}var ka=1.9;function F2(n){let e=document.createElement("canvas"),t;try{t=new le.WebGLRenderer({canvas:e,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return null}n.appendChild(e),t.setClearColor(0,0);let i=new le.Scene;i.add(new le.HemisphereLight(15137782,2906712,1.5));let r=new le.DirectionalLight(16773328,2.4);r.position.set(-3,5,6),i.add(r);let o=new le.DirectionalLight(7660495,1.3);o.position.set(4,3,-5),i.add(o);let s=new le.OrthographicCamera(-1,1,ka/2,-ka/2,.1,60),a=up(i),l=Tp({scene:i,fx:a}),c=0,h=0,m=0;function p(){let F=n.clientWidth,V=n.clientHeight;if(!F||!V||F===h&&V===m)return;h=F,m=V,c=F/V*ka,t.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),t.setSize(F,V,!1),e.style.width="100%",e.style.height="100%",s.left=-c/2,s.right=c/2,s.updateProjectionMatrix();let G=ka/2-.1,K=.1;s.position.set(c/2,G+10*Math.sin(K),10*Math.cos(K)),s.lookAt(c/2,G,0)}let d=0,g=0,x=.4,f=null;function u(F){let V=f,G=V.dir>0?-V.front:c+V.front,K=V.dir>0?c+V.rear:-V.rear;V.g.position.x=G+(K-G)*F,V.g.scale.x=V.dir}function y(F){f=l[F],f.g.visible=!0,g=0,f.dur=(c+f.rear+f.front)/f.speed,f.enter&&f.enter(),u(0),f.update(0,.016)}function v(){f.g.visible=!1,f.exit&&f.exit(),f=null,d=(d+1)%l.length,x=.3}function _(F){if(a.update(F),!f){x-=F,x<=0&&y(d);return}g+=F;let V=g/f.dur;if(V>=1){v();return}u(V),f.update(g,F)}let D=0,A=0,P=!1;function L(F){if(D=0,!P)return;let V=Math.min(.05,(F-A)/1e3||.016);A=F,_(V),t.render(i,s),D=requestAnimationFrame(L)}function b(){P=!0,D||(A=performance.now(),D=requestAnimationFrame(L))}function M(){P=!1,D&&(cancelAnimationFrame(D),D=0)}function C(F,V){M(),p();for(let K of l)K.g.visible=!1,K.exit&&K.exit();a.clear(),f=null,d=F,y(F);let G=V*f.dur;for(let K=0;K<G;K+=1/30)g=K,a.update(1/30),u(Math.min(.999,K/f.dur)),f.update(K,1/30);g=G,u(V),f.update(G,1/30),t.render(i,s)}p();let z="ResizeObserver"in window?new ResizeObserver(p):null;z?z.observe(n):window.addEventListener("resize",p);let O={play:b,pause:M,seek:C,resize:p,canvas:e};return window.__stunt3d=O,O}export{F2 as start};
