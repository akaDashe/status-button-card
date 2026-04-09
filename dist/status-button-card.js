function t(t,e,i,s){var n,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,i,o):n(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,f=_.trustedTypes,g=f?f.emptyScript:"",v=_.reactiveElementPolyfillSupport,$=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),y={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,v?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,M=`<${P}>`,H=document,T=()=>H.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,L="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,V=/-->/g,R=/>/g,z=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Z=new WeakMap,J=H.createTreeWalker(H,129);function F(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===N?"!--"===l[1]?o=V:void 0!==l[1]?o=R:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=z):void 0!==l[3]&&(o=z):o===z?">"===l[0]?(o=n??N,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?z:'"'===l[3]?j:D):o===j||o===D?o=z:o===V||o===R?o=N:(o=z,n=void 0);const d=o===z&&t[e+1].startsWith("/>")?" ":"";a+=o===N?i+M:c>=0?(s.push(r),i.slice(0,c)+C+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[F(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,c]=G(t,e);if(this.el=K.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=c[a++],i=s.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),J.nextNode(),r.push({type:2,index:++n});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===P)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)r.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=U(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??H).importNode(e,!0);J.currentNode=s;let n=J.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new Y(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new nt(n,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(n=J.nextNode(),a++)}return J.currentNode=H,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new K(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Y(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=Q(this,t,e,0),a=!U(t)||t!==this._$AH&&t!==W,a&&(this._$AH=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=Q(this,s[i+o],e,o),r===W&&(r=this._$AH[o]),a||=!U(r)||r!==this._$AH[o],r===q?t=q:t!==q&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}a&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===W)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(K,Y),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class rt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Y(e.insertBefore(T(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:b},dt=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const _t=o`
  :host {
    display: block;
  }

  ha-card {
    border: none;
    box-shadow: none !important;
    background: none !important;
    overflow: visible;
    padding: var(--dsb-padding, 4px 2px 8px) !important;
    min-width: var(--dsb-min-width, 68px);
    max-width: var(--dsb-max-width, 85px);
    height: var(--dsb-height, 68px);
    margin: 0 -2px;
    border-radius: 0 !important;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    box-sizing: border-box;
  }

  .button-layout {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    height: 100%;
    padding-bottom: 5px;
  }

  .btn-icon {
    --mdc-icon-size: var(--dsb-icon-size, 26px);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }

  .btn-icon.animate {
    animation: blink 1s ease infinite;
  }

  .btn-icon.animate ha-icon {
    animation: blink 1s ease infinite;
  }

  .btn-name {
    font-size: 12px;
    color: var(--dsb-name-color, rgb(130, 130, 130));
    margin-top: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .btn-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    transition: color 0.3s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`,ft="status-button-card",gt="status-button-card-editor",vt={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermometer",media_player:"mdi:speaker",cover:"mdi:blinds-horizontal",lock:"mdi:lock",camera:"mdi:cctv",sensor:"mdi:eye",binary_sensor:"mdi:motion-sensor",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",person:"mdi:account",device_tracker:"mdi:map-marker",alarm_control_panel:"mdi:shield-check",input_boolean:"mdi:toggle-switch",weather:"mdi:weather-cloudy"},$t="rgba(46, 175, 80, 0.9)",mt="rgba(244, 67, 54, 1)",bt="rgba(255, 170, 0, 1)",yt="rgba(33, 150, 243, 1)",At="rgb(130, 130, 130)",xt="rgba(255, 193, 7, 1)",wt="rgba(0, 150, 136, 1)",Et=[{value:"",label:"Default"},{value:$t,label:"Green"},{value:mt,label:"Red"},{value:bt,label:"Orange"},{value:yt,label:"Blue"},{value:"rgba(156, 39, 176, 1)",label:"Purple"},{value:xt,label:"Amber"},{value:wt,label:"Teal"},{value:At,label:"Grey"}],St={lock:$t,alarm_control_panel:$t,light:xt,switch:xt,input_boolean:$t,climate:bt,media_player:yt,camera:$t,binary_sensor:yt,person:$t,device_tracker:$t,sensor:wt,vacuum:$t,fan:wt,cover:yt},Ct={lock:mt,alarm_control_panel:At},kt={lock:bt,alarm_control_panel:bt,cover:bt},Pt={light:["on"],switch:["on"],fan:["on"],input_boolean:["on"],climate:["heat","cool","heat_cool","fan_only","auto"],media_player:["playing","paused","on"],cover:["open","opening","closing"],lock:["locked"],binary_sensor:["on"],alarm_control_panel:["armed_home","armed_away","armed_night","armed_vacation"],camera:["recording","streaming"],vacuum:["cleaning","returning"],person:["home"],device_tracker:["home"]},Mt={lock:["locking","unlocking"],alarm_control_panel:["arming","pending"],cover:["opening","closing"]};function Ht(t){return t.split(".")[0]}function Tt(t,e,i){if(!t?.length)return;let s=t.find(t=>t.state===e);return s||(i&&(s=t.find(t=>t.state===`secondary:${i}`),s)?s:void 0)}function Ut(t,e,i){const s=Tt(t.state_appearances,e.state,i?.state);if(s?.color)return s.color;const n=function(t){const e=Ht(t.entity_id),i=t.state,s=Mt[e];if(s?.includes(i))return"transitional";const n=Pt[e];return n?.length?n.includes(i)?"active":"inactive":"off"===i||"unavailable"===i||"unknown"===i||"idle"===i?"inactive":"active"}(e),a=Ht(e.entity_id);return"transitional"===n?t.transitional_color||kt[a]||At:"active"===n?t.active_color||St[a]||$t:t.inactive_color||Ct[a]||At}const Ot=[{value:"more-info",label:"More info"},{value:"navigate",label:"Navigate"},{value:"toggle",label:"Toggle"},{value:"call-service",label:"Call service"},{value:"perform-action",label:"Perform action"},{value:"url",label:"Open URL"},{value:"none",label:"None"}],Lt=(async()=>{if(!["ha-entity-picker","ha-icon-picker","ha-switch","ha-textfield","ha-select","ha-list-item","ha-expansion-panel","ha-button","ha-icon-button","ha-formfield","ha-svg-icon"].every(t=>customElements.get(t)))try{const t=await(window.loadCardHelpers?.());if(!t)return;const e=await t.createCardElement({type:"entities",entities:["sun.sun"]});e&&await(e.constructor?.getConfigElement?.())}catch(t){}})();let Nt=class extends rt{constructor(){super(...arguments),this._expandedAppearance=-1,this._ready=!1}async connectedCallback(){super.connectedCallback(),await Lt,this._ready=!0}static get styles(){return o`
      :host {
        display: block;
      }

      ha-expansion-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: 0;
        --ha-card-border-radius: 0;
      }

      ha-expansion-panel ha-svg-icon {
        color: var(--secondary-text-color);
      }

      h3 {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content {
        padding: 12px;
      }

      .content > *:not(:first-child) {
        margin-top: 8px;
      }

      .side-by-side {
        display: flex;
        align-items: flex-end;
      }

      .side-by-side > * {
        flex: 1;
        padding-right: 8px;
        padding-inline-end: 8px;
        padding-inline-start: initial;
      }

      .side-by-side > *:last-child {
        flex: 1;
        padding-right: 0;
        padding-inline-end: 0;
        padding-inline-start: initial;
      }

      .triple {
        display: flex;
        align-items: flex-end;
      }

      .triple > * {
        flex: 1;
        padding-right: 8px;
        padding-inline-end: 8px;
        padding-inline-start: initial;
      }

      .triple > *:last-child {
        flex: 1;
        padding-right: 0;
        padding-inline-end: 0;
        padding-inline-start: initial;
      }

      ha-textfield,
      ha-icon-picker,
      ha-entity-picker,
      ha-select {
        display: block;
        width: 100%;
      }

      ha-formfield {
        display: flex;
        min-height: 56px;
        align-items: center;
      }

      ha-switch {
        padding: 16px 6px;
      }

      .appearance-item {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
      }

      .appearance-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 4px 4px 16px;
        min-height: 48px;
      }

      .appearance-label {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .appearance-options {
        padding: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .appearance-options > *:not(:first-child) {
        margin-top: 8px;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin: 0;
        padding-top: 4px;
      }
    `}setConfig(t){this._config=t}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_set(t,e){this._config={...this._config,[t]:e},this._fire()}_updateAppearance(t,e){const i=[...this._config.state_appearances||[]];i[t]={...i[t],...e},this._set("state_appearances",i)}_removeAppearance(t){const e=(this._config.state_appearances||[]).filter((e,i)=>i!==t);this._set("state_appearances",e.length?e:void 0),this._expandedAppearance=-1}_addAppearance(){const t=[...this._config.state_appearances||[],{state:""}];this._set("state_appearances",t),this._expandedAppearance=t.length-1}_renderActionEditor(t,e){const i=this._config[t]||{action:"tap_action"===t?"more-info":"none"};return B`
      <ha-select
        .label=${e}
        .value=${i.action}
        fixedMenuPosition
        naturalMenuWidth
        @selected=${e=>{const i=e.target.value;i&&this._set(t,{action:i})}}
        @closed=${t=>t.stopPropagation()}
      >
        ${Ot.map(t=>B`<ha-list-item .value=${t.value}>${t.label}</ha-list-item>`)}
      </ha-select>
      ${"navigate"===i.action?B`<ha-textfield
            .label=${"Navigation path"}
            .value=${i.navigation_path||""}
            @input=${e=>this._set(t,{...i,navigation_path:e.target.value})}
          ></ha-textfield>`:q}
      ${"url"===i.action?B`<ha-textfield
            .label=${"URL"}
            .value=${i.url_path||""}
            @input=${e=>this._set(t,{...i,url_path:e.target.value})}
          ></ha-textfield>`:q}
      ${"call-service"===i.action||"perform-action"===i.action?B`
            <ha-textfield
              .label=${"Service (e.g. lock.unlock)"}
              .value=${i.service||i.perform_action||""}
              @input=${e=>this._set(t,{...i,service:e.target.value,perform_action:e.target.value})}
            ></ha-textfield>
            <ha-textfield
              .label=${"Service data (JSON, optional)"}
              .value=${i.service_data?JSON.stringify(i.service_data):""}
              @input=${e=>{try{const s=e.target.value?JSON.parse(e.target.value):void 0;this._set(t,{...i,service_data:s})}catch(t){}}}
            ></ha-textfield>
          `:q}
    `}_renderAppearanceItem(t,e){const i=this._expandedAppearance===e,s=t.state||"(empty)";return B`
      <div class="appearance-item">
        <div class="appearance-header">
          ${t.icon?B`<ha-icon
                style="--mdc-icon-size:18px; color:${t.color||"var(--secondary-text-color)"}"
                icon=${t.icon}
              ></ha-icon>`:q}
          <span class="appearance-label">
            ${s}${t.label?` → ${t.label}`:""}
          </span>
          <ha-icon-button
            .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
            @click=${()=>{this._expandedAppearance=i?-1:e}}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${()=>this._removeAppearance(e)}
          ></ha-icon-button>
        </div>
        ${i?B`
              <div class="appearance-options">
                <ha-textfield
                  .label=${"State value"}
                  .value=${t.state||""}
                  @input=${t=>this._updateAppearance(e,{state:t.target.value})}
                ></ha-textfield>
                <p class="hint">
                  Use entity state (e.g. locked, unlocked). For secondary entity prefix with
                  "secondary:" (e.g. secondary:on).
                </p>

                <ha-icon-picker
                  .hass=${this.hass}
                  .label=${"Icon for this state"}
                  .value=${t.icon||""}
                  @value-changed=${t=>{t.stopPropagation(),this._updateAppearance(e,{icon:t.detail.value||void 0})}}
                ></ha-icon-picker>

                <ha-textfield
                  .label=${"Label for this state"}
                  .value=${t.label||""}
                  @input=${t=>this._updateAppearance(e,{label:t.target.value||void 0})}
                ></ha-textfield>

                <ha-select
                  .label=${"Color for this state"}
                  .value=${t.color||""}
                  fixedMenuPosition
                  naturalMenuWidth
                  @selected=${t=>{const i=t.target.value;this._updateAppearance(e,{color:i||void 0})}}
                  @closed=${t=>t.stopPropagation()}
                >
                  ${Et.map(t=>B`<ha-list-item .value=${t.value}>${t.label}</ha-list-item>`)}
                </ha-select>

                <ha-formfield .label=${"Blink animation"}>
                  <ha-switch
                    .checked=${!0===t.animate}
                    @change=${t=>this._updateAppearance(e,{animate:t.target.checked||void 0})}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `:q}
      </div>
    `}render(){if(!this.hass||!this._config||!this._ready)return B``;const t=this._config.state_appearances||[];return B`
      <!-- Entity -->
      <ha-expansion-panel outlined expanded>
        <ha-svg-icon slot="leading-icon" .path=${"M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z"}></ha-svg-icon>
        <h3 slot="header">Entity</h3>
        <div class="content">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.entity||""}
            .label=${"Entity"}
            allow-custom-entity
            @value-changed=${t=>{t.stopPropagation(),this._set("entity",t.detail.value)}}
          ></ha-entity-picker>

          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.secondary_entity||""}
            .label=${"Secondary entity (optional)"}
            allow-custom-entity
            @value-changed=${t=>{t.stopPropagation(),this._set("secondary_entity",t.detail.value||void 0)}}
          ></ha-entity-picker>
        </div>
      </ha-expansion-panel>

      <!-- Appearance -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${"M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z"}></ha-svg-icon>
        <h3 slot="header">Appearance</h3>
        <div class="content">
          <ha-textfield
            .label=${"Name (leave empty for entity name)"}
            .value=${this._config.name||""}
            @input=${t=>this._set("name",t.target.value||void 0)}
          ></ha-textfield>

          <ha-icon-picker
            .hass=${this.hass}
            .label=${"Default icon (leave empty for auto)"}
            .value=${this._config.icon||""}
            @value-changed=${t=>{t.stopPropagation(),this._set("icon",t.detail.value||void 0)}}
          ></ha-icon-picker>

          <ha-formfield .label=${"Show name"}>
            <ha-switch
              .checked=${!1!==this._config.show_name}
              @change=${t=>this._set("show_name",!!t.target.checked&&void 0)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show label (state)"}>
            <ha-switch
              .checked=${!1!==this._config.show_label}
              @change=${t=>this._set("show_label",!!t.target.checked&&void 0)}
            ></ha-switch>
          </ha-formfield>

          <div class="triple">
            <ha-select
              .label=${"Active"}
              .value=${this._config.active_color||""}
              fixedMenuPosition
              naturalMenuWidth
              @selected=${t=>{const e=t.target.value;this._set("active_color",e||void 0)}}
              @closed=${t=>t.stopPropagation()}
            >
              ${Et.map(t=>B`<ha-list-item .value=${t.value}>${t.label}</ha-list-item>`)}
            </ha-select>
            <ha-select
              .label=${"Inactive"}
              .value=${this._config.inactive_color||""}
              fixedMenuPosition
              naturalMenuWidth
              @selected=${t=>{const e=t.target.value;this._set("inactive_color",e||void 0)}}
              @closed=${t=>t.stopPropagation()}
            >
              ${Et.map(t=>B`<ha-list-item .value=${t.value}>${t.label}</ha-list-item>`)}
            </ha-select>
            <ha-select
              .label=${"Transitional"}
              .value=${this._config.transitional_color||""}
              fixedMenuPosition
              naturalMenuWidth
              @selected=${t=>{const e=t.target.value;this._set("transitional_color",e||void 0)}}
              @closed=${t=>t.stopPropagation()}
            >
              ${Et.map(t=>B`<ha-list-item .value=${t.value}>${t.label}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-expansion-panel>

      <!-- State Overrides -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${"M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M17,17H11V15H17V17M17,13H11V11H17V13M17,9H11V7H17V9Z"}></ha-svg-icon>
        <h3 slot="header">State Overrides</h3>
        <div class="content">
          ${t.map((t,e)=>this._renderAppearanceItem(t,e))}
          <ha-button @click=${this._addAppearance}> Add state override </ha-button>
        </div>
      </ha-expansion-panel>

      <!-- Sizing -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${"M13,9V15H16L12,19L8,15H11V9H8L12,5L16,9H13Z"}></ha-svg-icon>
        <h3 slot="header">Sizing</h3>
        <div class="content">
          <div class="side-by-side">
            <ha-textfield
              .label=${"Min width"}
              .value=${this._config.min_width||""}
              placeholder="68px"
              @input=${t=>this._set("min_width",t.target.value||void 0)}
            ></ha-textfield>
            <ha-textfield
              .label=${"Max width"}
              .value=${this._config.max_width||""}
              placeholder="85px"
              @input=${t=>this._set("max_width",t.target.value||void 0)}
            ></ha-textfield>
          </div>
          <div class="side-by-side">
            <ha-textfield
              .label=${"Height"}
              .value=${this._config.height||""}
              placeholder="68px"
              @input=${t=>this._set("height",t.target.value||void 0)}
            ></ha-textfield>
            <ha-textfield
              .label=${"Icon size"}
              .value=${this._config.icon_size||""}
              placeholder="32px"
              @input=${t=>this._set("icon_size",t.target.value||void 0)}
            ></ha-textfield>
          </div>
        </div>
      </ha-expansion-panel>

      <!-- Actions -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${"M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z"}></ha-svg-icon>
        <h3 slot="header">Actions</h3>
        <div class="content">
          ${this._renderActionEditor("tap_action","Tap action")}
          ${this._renderActionEditor("double_tap_action","Double tap action")}
          ${this._renderActionEditor("hold_action","Hold action")}
        </div>
      </ha-expansion-panel>
    `}};t([pt({attribute:!1})],Nt.prototype,"hass",void 0),t([ut()],Nt.prototype,"_config",void 0),t([ut()],Nt.prototype,"_expandedAppearance",void 0),t([ut()],Nt.prototype,"_ready",void 0),Nt=t([ct(gt)],Nt),console.info("%c STATUS-BUTTON-CARD %c v1.0.0-beta.1 ","color: white; background: #607d8b; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #607d8b; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let Vt=class extends rt{constructor(){super(...arguments),this._dblClickTimer=null,this._holdTimer=null,this._held=!1}static get styles(){return _t}static getConfigElement(){return document.createElement(gt)}static getStubConfig(t){const e=Object.keys(t.states).find(t=>t.startsWith("lock."));return{type:`custom:${ft}`,entity:e||"lock.front_door"}}setConfig(t){!function(t){if(!t||"object"!=typeof t)throw new Error("Invalid configuration");if(!t.entity||"string"!=typeof t.entity)throw new Error("Entity is required")}(t),this._config=t}getCardSize(){return 1}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;const i=[this._config.entity];return this._config.secondary_entity&&i.push(this._config.secondary_entity),i.some(t=>e.states[t]!==this.hass.states[t])}return!0}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}));break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0})));break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"call-service":case"perform-action":{const e=t.service||t.perform_action;if(e){const[i,s]=e.split(".");this.hass.callService(i,s,t.service_data||{},t.target||{entity_id:this._config.entity})}break}case"toggle":{const t=this.hass.states[this._config.entity];if(!t)break;const e=Ht(this._config.entity),i={lock:["locked","lock.lock","lock.unlock"],cover:["open","cover.close","cover.open"]}[e];if(i){const[e,s,n]=i,a=t.state===e?n:s,[o,r]=a.split(".");this.hass.callService(o,r,{},{entity_id:this._config.entity})}else{["light","switch","fan","input_boolean","media_player","automation","script"].includes(e)?this.hass.callService(e,"toggle",{},{entity_id:this._config.entity}):this.hass.callService("homeassistant","toggle",{},{entity_id:this._config.entity})}break}}}_handleTap(){if(!this._held)return this._dblClickTimer?(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,void this._handleAction(this._config.double_tap_action||{action:"none"})):void(this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this._config.tap_action||{action:"more-info"})},250));this._held=!1}_handlePointerDown(){this._held=!1,this._holdTimer=setTimeout(()=>{this._held=!0,this._handleAction(this._config.hold_action||{action:"none"})},500)}_handlePointerUp(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_getCardStyle(){const t=[];return this._config.icon_size&&t.push(`--dsb-icon-size: ${this._config.icon_size}`),this._config.min_width&&t.push(`--dsb-min-width: ${this._config.min_width}`),this._config.max_width&&t.push(`--dsb-max-width: ${this._config.max_width}`),this._config.height&&t.push(`--dsb-height: ${this._config.height}`),t.join("; ")}render(){if(!this._config||!this.hass)return B``;const t=this.hass.states[this._config.entity];if(!t)return B`<ha-card>Entity not found</ha-card>`;const e=this._config.secondary_entity?this.hass.states[this._config.secondary_entity]:void 0,i=Ut(this._config,t,e),s=function(t,e,i){const s=Tt(t.state_appearances,e.state,i?.state);if(s?.icon)return s.icon;if(t.icon)return t.icon;if(e.attributes.icon)return e.attributes.icon;const n=Ht(e.entity_id);return vt[n]||"mdi:help-circle"}(this._config,t,e),n=function(t,e,i){const s=Tt(t.state_appearances,e.state,i?.state);return s?.label?s.label:e.state.replace(/_/g," ").toUpperCase()}(this._config,t,e),a=function(t,e,i){const s=Tt(t.state_appearances,e.state,i?.state);if(void 0!==s?.animate)return s.animate;const n=Ht(e.entity_id),a=Mt[n];return a?.includes(e.state)||!1}(this._config,t,e),o=function(t,e){return void 0!==t.name?t.name:e.attributes.friendly_name||"Button"}(this._config,t),r=!1!==this._config.show_name,l=!1!==this._config.show_label;return B`
      <ha-card
        style="${this._getCardStyle()}"
        @click=${this._handleTap}
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
      >
        <div class="button-layout" style="border-bottom: 3px solid ${i}">
          <ha-icon
            class="btn-icon ${a?"animate":""}"
            icon=${s}
            style="color: ${i}"
          ></ha-icon>
          ${r?B`<span class="btn-name">${o}</span>`:q}
          ${l?B`<span class="btn-label" style="color: ${i}">${n}</span>`:q}
        </div>
      </ha-card>
    `}};t([pt({attribute:!1})],Vt.prototype,"hass",void 0),t([ut()],Vt.prototype,"_config",void 0),Vt=t([ct(ft)],Vt),window.customCards=window.customCards||[],window.customCards.push({type:ft,name:"Status Button Card by Dashe",description:"A customisable button card focused on entity status with state-based icons, colors, and labels",preview:!0});export{Vt as StatusButtonCard};
