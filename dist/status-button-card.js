function e(e,t,i,a){var s,n=arguments.length,o=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new n(i,e,a)},r=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!c(e,t),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&l(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const n=a?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...p(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=a;const n=s.fromAttribute(t,e.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,i,a=!1,s){if(void 0!==e){const n=this.constructor;if(!1===a&&(s=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??y)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=e=>e,C=A.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,T=`<${P}>`,O=document,H=()=>O.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,V=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,Z=O.createTreeWalker(O,129);function J(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,a=[];let s,n=2===t?"<svg>":3===t?"<math>":"",o=z;for(let t=0;t<i;t++){const i=e[t];let r,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===z?"!--"===c[1]?o=L:void 0!==c[1]?o=V:void 0!==c[2]?(I.test(c[2])&&(s=RegExp("</"+c[2],"g")),o=j):void 0!==c[3]&&(o=j):o===j?">"===c[0]?(o=s??z,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,r=c[1],o=void 0===c[3]?j:'"'===c[3]?D:N):o===D||o===N?o=j:o===L||o===V?o=z:(o=j,s=void 0);const p=o===j&&e[t+1].startsWith("/>")?" ":"";n+=o===z?i+T:l>=0?(a.push(r),i.slice(0,l)+k+i.slice(l)+S+p):i+S+(-2===l?t:p)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class G{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,n=0;const o=e.length-1,r=this.parts,[c,l]=Y(e,t);if(this.el=G.createElement(c,i),Z.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Z.nextNode())&&r.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(k)){const t=l[n++],i=a.getAttribute(e).split(S),o=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?ae:ee}),a.removeAttribute(e)}else e.startsWith(S)&&(r.push({type:6,index:s}),a.removeAttribute(e));if(I.test(a.tagName)){const e=a.textContent.split(S),t=e.length-1;if(t>0){a.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],H()),Z.nextNode(),r.push({type:2,index:++s});a.append(e[t],H())}}}else if(8===a.nodeType)if(a.data===P)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(S,e+1));)r.push({type:7,index:s}),e+=S.length-1}s++}}static createElement(e,t){const i=O.createElement("template");return i.innerHTML=e,i}}function K(e,t,i=e,a){if(t===q)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const n=M(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=K(e,s._$AS(e,t.values),s,a)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??O).importNode(t,!0);Z.currentNode=a;let s=Z.nextNode(),n=0,o=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new Q(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new se(s,this,e)),this._$AV.push(t),r=i[++o]}n!==r?.index&&(s=Z.nextNode(),n++)}return Z.currentNode=O,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=K(this,e,t),M(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new X(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new G(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new Q(this.O(H()),this.O(H()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,a){const s=this.strings;let n=!1;if(void 0===s)e=K(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==q,n&&(this._$AH=e);else{const a=e;let o,r;for(e=s[0],o=0;o<s.length-1;o++)r=K(this,a[i+o],t,o),r===q&&(r=this._$AH[o]),n||=!M(r)||r!==this._$AH[o],r===F?e=F:e!==F&&(e+=(r??"")+s[o+1]),this._$AH[o]=r}n&&!a&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class ae extends ee{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=K(this,e,t,0)??F)===q)return;const i=this._$AH,a=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==F&&(i===F||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){K(this,e)}}const ne=A.litHtmlPolyfillSupport;ne?.(G,Q),(A.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class re extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new Q(t.insertBefore(H(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}re._$litElement$=!0,re.finalized=!0,oe.litElementHydrateSupport?.({LitElement:re});const ce=oe.litElementPolyfillSupport;ce?.({LitElement:re}),(oe.litElementVersions??=[]).push("4.2.2");const le=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},pe=(e=he,t,i)=>{const{kind:a,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function de(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return de({...e,state:!0,attribute:!1})}const me=o`
  :host {
    display: block;
  }

  ha-card {
    border: none;
    box-shadow: none !important;
    background: none !important;
    overflow: visible;
    padding: var(--dsb-padding, 4px 0 8px) !important;
    width: var(--dsb-width, 100%);
    min-width: var(--dsb-min-width, 68px);
    max-width: var(--dsb-max-width, none);
    height: var(--dsb-height, 68px);
    margin: 0;
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

  /*
   * Outer wrapper:
   *   - Spans full viewport width for an edge-to-edge feel.
   *   - margin-left = -hostX shifts it to the viewport's left edge.
   *   - max-height drives in-flow height for the slide animation.
   *   - JS sets --dsb-host-offset-x and --dsb-pointer-x on every render/resize.
   */
  .camera-reveal-wrapper {
    /* Width = the host's column width (set by JS); falls back to viewport. */
    width: var(--dsb-column-width, 100vw);
    margin-left: var(--dsb-host-offset-x, 0px);
    /* Padding moved to .camera-reveal so the pointer stays in unpadded
       coordinates and aligns correctly with the button. */
    max-height: 0;
    overflow: hidden;
    transition:
      max-height 600ms cubic-bezier(0.16, 1, 0.3, 1),
      margin-top 600ms cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .camera-reveal-wrapper.open {
    max-height: var(--dsb-reveal-max-height, 720px);
    margin-top: 0;
    pointer-events: auto;
  }

  /* Pointer triangle that visually anchors the reveal to the button.
     Slides + fades on the same curve as the camera reveal below it. */
  .camera-pointer {
    position: relative;
    height: 8px;
    overflow: visible;
    transform: translateY(-24px);
    opacity: 0;
    transition:
      transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 600ms ease;
  }

  .camera-reveal-wrapper.open > .camera-pointer {
    transform: translateY(0);
    opacity: 1;
  }

  .camera-pointer::before {
    content: "";
    position: absolute;
    left: var(--dsb-pointer-x, 50%);
    top: 0;
    transform: translateX(-50%);
    width: 28px;
    height: 8px;
    background: var(--dsb-pointer-color, currentColor);
    /* Apex at top (touching button), wide base at bottom (opening into cameras) */
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  }

  /* Inner content: vertical stack, framed with a colored border + rounded corners. */
  .camera-reveal {
    margin: 0 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    overflow: hidden;
    min-height: 0;
    border: 3px solid var(--dsb-pointer-color, currentColor);
    border-radius: 14px;
    transform: translateY(-24px);
    opacity: 0;
    transition:
      transform 600ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 600ms ease;
  }

  .camera-reveal-wrapper.open > .camera-reveal {
    transform: translateY(0);
    opacity: 1;
  }

  .camera-panel {
    position: relative;
    width: 100%;
    /* Each panel uses its own aspect ratio (set inline per camera);
       defaults to 16/9 if not specified. */
    aspect-ratio: var(--dsb-camera-aspect, 16 / 9);
    /* Cap individual panel height so portrait cameras don't dominate. */
    max-height: 60vh;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.6);
  }

  /* Inner wrapper for the camera media — fades in once the video is fitted. */
  .camera-media {
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 100ms ease;
  }

  .camera-panel.fit-ready .camera-media {
    opacity: 1;
  }

  /* Spinner shown while the camera connects + initial frame is fitted. */
  .camera-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    margin: -16px 0 0 -16px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: var(--dsb-pointer-color, currentColor);
    border-radius: 50%;
    animation: dsb-spin 800ms linear infinite;
    opacity: 1;
    transition: opacity 100ms ease;
    pointer-events: none;
  }

  .camera-panel.fit-ready .camera-spinner {
    opacity: 0;
  }

  @keyframes dsb-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .camera-panel hui-image {
    width: 100%;
    height: 100%;
  }

  /* Force any rendered image/video inside the camera panel to crop-fit
     (object-fit: cover) so the camera image doesn't distort when the
     configured aspect ratio differs from the camera's native one. */
  .camera-panel hui-image img,
  .camera-panel hui-image video,
  .camera-panel img,
  .camera-panel video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }

  /* Horizontal separator between stacked cameras (matches border color) */
  .camera-panel + .camera-panel {
    border-top: 3px solid var(--dsb-pointer-color, currentColor);
  }

  .camera-panel hui-image {
    display: block;
    width: 100%;
    height: 100%;
  }

  :host {
    position: relative;
    overflow: visible;
  }
`,_e="status-button-card",fe="status-button-card-editor",ge={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermometer",media_player:"mdi:speaker",cover:"mdi:blinds-horizontal",lock:"mdi:lock",camera:"mdi:cctv",sensor:"mdi:eye",binary_sensor:"mdi:motion-sensor",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",person:"mdi:account",device_tracker:"mdi:map-marker",alarm_control_panel:"mdi:shield-check",input_boolean:"mdi:toggle-switch",weather:"mdi:weather-cloudy"},ve="rgba(46, 175, 80, 0.9)",be="rgba(244, 67, 54, 1)",ye="rgba(255, 170, 0, 1)",$e="rgba(33, 150, 243, 1)",we="rgb(130, 130, 130)",Ae="rgba(255, 193, 7, 1)",xe="rgba(0, 150, 136, 1)",Ce=[{value:"",label:"Default"},{value:ve,label:"Green"},{value:be,label:"Red"},{value:ye,label:"Orange"},{value:$e,label:"Blue"},{value:"rgba(156, 39, 176, 1)",label:"Purple"},{value:Ae,label:"Amber"},{value:xe,label:"Teal"},{value:we,label:"Grey"}],Ee={lock:ve,alarm_control_panel:ve,light:Ae,switch:Ae,input_boolean:ve,climate:ye,media_player:$e,camera:ve,binary_sensor:$e,person:ve,device_tracker:ve,sensor:xe,vacuum:ve,fan:xe,cover:$e},ke={lock:be,alarm_control_panel:we},Se={lock:ye,alarm_control_panel:ye,cover:ye},Pe={light:["on"],switch:["on"],fan:["on"],input_boolean:["on"],climate:["heat","cool","heat_cool","fan_only","auto"],media_player:["playing","paused","on"],cover:["open","opening","closing"],lock:["locked"],binary_sensor:["on"],alarm_control_panel:["armed_home","armed_away","armed_night","armed_vacation"],camera:["recording","streaming"],vacuum:["cleaning","returning"],person:["home"],device_tracker:["home"]},Te={lock:["locking","unlocking"],alarm_control_panel:["arming","pending"],cover:["opening","closing"]};function Oe(e){return e.split(".")[0]}function He(e,t,i){if(!e?.length)return;let a=e.find(e=>e.state===t);return a||(i&&(a=e.find(e=>e.state===`secondary:${i}`),a)?a:void 0)}function Me(e,t,i){const a=He(e.state_appearances,t.state,i?.state);if(a?.color)return a.color;const s=function(e){const t=Oe(e.entity_id),i=e.state,a=Te[t];if(a?.includes(i))return"transitional";const s=Pe[t];return s?.length?s.includes(i)?"active":"inactive":"off"===i||"unavailable"===i||"unknown"===i||"idle"===i?"inactive":"active"}(t),n=Oe(t.entity_id);return"transitional"===s?e.transitional_color||Se[n]||we:"active"===s?e.active_color||Ee[n]||ve:e.inactive_color||ke[n]||we}const Re=[{value:"more-info",label:"More info"},{value:"navigate",label:"Navigate"},{value:"toggle",label:"Toggle"},{value:"call-service",label:"Call service"},{value:"perform-action",label:"Perform action"},{value:"url",label:"Open URL"},{value:"none",label:"None"}],Ue=(async()=>{if(!["ha-entity-picker","ha-icon-picker","ha-switch","ha-textfield","ha-select","ha-list-item","ha-expansion-panel","ha-button","ha-icon-button","ha-formfield","ha-svg-icon"].every(e=>customElements.get(e)))try{const e=await(window.loadCardHelpers?.());if(!e)return;const t=await e.createCardElement({type:"entities",entities:["sun.sun"]});t&&await(t.constructor?.getConfigElement?.())}catch(e){}})();let ze=class extends re{constructor(){super(...arguments),this._expandedAppearance=-1,this._ready=!1}async connectedCallback(){super.connectedCallback(),await Ue,this._ready=!0}static get styles(){return o`
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

      .select-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
        flex: 1;
      }

      .select-row > span {
        font-size: 12px;
        color: var(--secondary-text-color);
        padding-left: 4px;
      }

      .select-row > select {
        appearance: none;
        background-color: var(
          --mdc-text-field-fill-color,
          rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05)
        );
        color: var(--primary-text-color, inherit);
        border: none;
        border-bottom: 1px solid var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42));
        border-radius: 4px 4px 0 0;
        padding: 14px 32px 14px 12px;
        font: inherit;
        font-size: 14px;
        line-height: 1.15;
        width: 100%;
        cursor: pointer;
        transition: border-bottom-color 150ms ease;
        background-image:
          linear-gradient(45deg, transparent 50%, currentColor 50%),
          linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position:
          calc(100% - 16px) 50%,
          calc(100% - 11px) 50%;
        background-size:
          5px 5px,
          5px 5px;
        background-repeat: no-repeat;
      }

      .select-row > select:hover {
        border-bottom-color: var(--primary-text-color);
      }

      .select-row > select:focus {
        outline: none;
        border-bottom: 2px solid var(--primary-color, #03a9f4);
        padding-bottom: 13px;
      }
    `}setConfig(e){this._config=e}_fire(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_set(e,t){this._config={...this._config,[e]:t},this._fire()}_updateAppearance(e,t){const i=[...this._config.state_appearances||[]];i[e]={...i[e],...t},this._set("state_appearances",i)}_removeAppearance(e){const t=(this._config.state_appearances||[]).filter((t,i)=>i!==e);this._set("state_appearances",t.length?t:void 0),this._expandedAppearance=-1}_addAppearance(){const e=[...this._config.state_appearances||[],{state:""}];this._set("state_appearances",e),this._expandedAppearance=e.length-1}_normalizedAppearanceCameras(e){return(e.cameras||[]).map(e=>"string"==typeof e?{entity:e}:{...e})}_writeAppearanceCameras(e,t){this._updateAppearance(e,{cameras:t.length?t:void 0})}_addAppearanceCamera(e){const t=this._config.state_appearances?.[e];t&&this._writeAppearanceCameras(e,[...this._normalizedAppearanceCameras(t),{entity:""}])}_updateAppearanceCamera(e,t,i){const a=this._config.state_appearances?.[e];if(!a)return;const s=this._normalizedAppearanceCameras(a);s[t]={...s[t],...i},void 0===i.aspect_ratio&&"aspect_ratio"in i&&delete s[t].aspect_ratio,void 0===i.object_position&&"object_position"in i&&delete s[t].object_position,void 0===i.object_fit&&"object_fit"in i&&delete s[t].object_fit,this._writeAppearanceCameras(e,s)}_removeAppearanceCamera(e,t){const i=this._config.state_appearances?.[e];if(!i)return;const a=this._normalizedAppearanceCameras(i).filter((e,i)=>i!==t);this._writeAppearanceCameras(e,a)}_renderActionEditor(e,t){const i=this._config[e]||{action:"tap_action"===e?"more-info":"none"};return B`
      <label class="select-row">
        <span>${t}</span>
        <select
          .value=${i.action}
          @change=${t=>{const i=t.target.value;i&&this._set(e,{action:i})}}
        >
          ${Re.map(e=>B`<option value=${e.value}>${e.label}</option>`)}
        </select>
      </label>
      ${"navigate"===i.action?B`<ha-textfield
            .label=${"Navigation path"}
            .value=${i.navigation_path||""}
            @input=${t=>this._set(e,{...i,navigation_path:t.target.value})}
          ></ha-textfield>`:F}
      ${"url"===i.action?B`<ha-textfield
            .label=${"URL"}
            .value=${i.url_path||""}
            @input=${t=>this._set(e,{...i,url_path:t.target.value})}
          ></ha-textfield>`:F}
      ${"call-service"===i.action||"perform-action"===i.action?B`
            <ha-textfield
              .label=${"Service (e.g. lock.unlock)"}
              .value=${i.service||i.perform_action||""}
              @input=${t=>this._set(e,{...i,service:t.target.value,perform_action:t.target.value})}
            ></ha-textfield>
            <ha-textfield
              .label=${"Service data (JSON, optional)"}
              .value=${i.service_data?JSON.stringify(i.service_data):""}
              @input=${t=>{try{const a=t.target.value?JSON.parse(t.target.value):void 0;this._set(e,{...i,service_data:a})}catch(e){}}}
            ></ha-textfield>
          `:F}
    `}_renderAppearanceItem(e,t){const i=this._expandedAppearance===t,a=e.state||"(empty)";return B`
      <div class="appearance-item">
        <div class="appearance-header">
          ${e.icon?B`<ha-icon
                style="--mdc-icon-size:18px; color:${e.color||"var(--secondary-text-color)"}"
                icon=${e.icon}
              ></ha-icon>`:F}
          <span class="appearance-label">
            ${a}${e.label?` → ${e.label}`:""}
          </span>
          <ha-icon-button
            .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}
            @click=${()=>{this._expandedAppearance=i?-1:t}}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${()=>this._removeAppearance(t)}
          ></ha-icon-button>
        </div>
        ${i?B`
              <div class="appearance-options">
                <ha-textfield
                  .label=${"State value"}
                  .value=${e.state||""}
                  @input=${e=>this._updateAppearance(t,{state:e.target.value})}
                ></ha-textfield>
                <p class="hint">
                  Use entity state (e.g. locked, unlocked). For secondary entity prefix with
                  "secondary:" (e.g. secondary:on).
                </p>

                <ha-icon-picker
                  .hass=${this.hass}
                  .label=${"Icon for this state"}
                  .value=${e.icon||""}
                  @value-changed=${e=>{e.stopPropagation(),this._updateAppearance(t,{icon:e.detail.value||void 0})}}
                ></ha-icon-picker>

                <ha-textfield
                  .label=${"Label for this state"}
                  .value=${e.label||""}
                  @input=${e=>this._updateAppearance(t,{label:e.target.value||void 0})}
                ></ha-textfield>

                <label class="select-row">
                  <span>Color for this state</span>
                  <select
                    .value=${e.color||""}
                    @change=${e=>{const i=e.target.value;this._updateAppearance(t,{color:i||void 0})}}
                  >
                    ${Ce.map(e=>B`<option value=${e.value}>${e.label}</option>`)}
                  </select>
                </label>

                <ha-formfield .label=${"Blink animation"}>
                  <ha-switch
                    .checked=${!0===e.animate}
                    @change=${e=>this._updateAppearance(t,{animate:e.target.checked||void 0})}
                  ></ha-switch>
                </ha-formfield>

                <p class="hint" style="margin-top: 12px; font-weight: 500">
                  Cameras revealed by this state
                </p>
                <p class="hint">
                  Cameras slide down when this state is active. Leave empty to reveal nothing.
                </p>
                ${this._normalizedAppearanceCameras(e).map((e,i)=>this._renderAppearanceCameraItem(t,e,i))}
                <ha-button @click=${()=>this._addAppearanceCamera(t)}>Add camera</ha-button>
              </div>
            `:F}
      </div>
    `}_renderAppearanceCameraItem(e,t,i){return B`
      <div
        class="appearance-item"
        style="background: var(--secondary-background-color, transparent)"
      >
        <div class="appearance-options">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${t.entity||""}
            .label=${"Camera entity"}
            .includeDomains=${["camera"]}
            allow-custom-entity
            @value-changed=${t=>{t.stopPropagation(),this._updateAppearanceCamera(e,i,{entity:t.detail.value||""})}}
          ></ha-entity-picker>

          <ha-textfield
            .label=${"Aspect ratio (optional, e.g. 16/9, 9/16, 4/3)"}
            .value=${t.aspect_ratio||""}
            placeholder="16 / 9"
            @input=${t=>this._updateAppearanceCamera(e,i,{aspect_ratio:t.target.value||void 0})}
          ></ha-textfield>
          <p class="hint">Frame aspect ratio. Defaults to 16/9 across all cameras.</p>

          <label class="select-row">
            <span>Video fit</span>
            <select
              .value=${t.object_fit||"cover"}
              @change=${t=>{const a=t.target.value;this._updateAppearanceCamera(e,i,{object_fit:"cover"===a?void 0:a})}}
            >
              <option value="cover">Cover (crop to fill, default)</option>
              <option value="contain">Contain (letterbox, no crop)</option>
            </select>
          </label>

          <label class="select-row">
            <span>Video position within frame</span>
            <select
              .value=${t.object_position||"center"}
              @change=${t=>{const a=t.target.value;this._updateAppearanceCamera(e,i,{object_position:"center"===a?void 0:a})}}
            >
              <option value="center">Center (default)</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
          <p class="hint">
            Pair "Cover" with "Bottom" to keep the lower part of the video visible while cropping
            the top.
          </p>
          <p class="hint">
            Where the video sits inside the frame when its aspect doesn't match the frame's.
          </p>

          <ha-button @click=${()=>this._removeAppearanceCamera(e,i)}>
            Remove camera
          </ha-button>
        </div>
      </div>
    `}render(){if(!this.hass||!this._config||!this._ready)return B``;const e=this._config.state_appearances||[];return B`
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
            @value-changed=${e=>{e.stopPropagation(),this._set("entity",e.detail.value)}}
          ></ha-entity-picker>

          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.secondary_entity||""}
            .label=${"Secondary entity (optional)"}
            allow-custom-entity
            @value-changed=${e=>{e.stopPropagation(),this._set("secondary_entity",e.detail.value||void 0)}}
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
            @input=${e=>this._set("name",e.target.value||void 0)}
          ></ha-textfield>

          <ha-icon-picker
            .hass=${this.hass}
            .label=${"Default icon (leave empty for auto)"}
            .value=${this._config.icon||""}
            @value-changed=${e=>{e.stopPropagation(),this._set("icon",e.detail.value||void 0)}}
          ></ha-icon-picker>

          <ha-formfield .label=${"Show name"}>
            <ha-switch
              .checked=${!1!==this._config.show_name}
              @change=${e=>this._set("show_name",!!e.target.checked&&void 0)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${"Show label (state)"}>
            <ha-switch
              .checked=${!1!==this._config.show_label}
              @change=${e=>this._set("show_label",!!e.target.checked&&void 0)}
            ></ha-switch>
          </ha-formfield>

          <div class="triple">
            <label class="select-row">
              <span>Active</span>
              <select
                .value=${this._config.active_color||""}
                @change=${e=>{const t=e.target.value;this._set("active_color",t||void 0)}}
              >
                ${Ce.map(e=>B`<option value=${e.value}>${e.label}</option>`)}
              </select>
            </label>
            <label class="select-row">
              <span>Inactive</span>
              <select
                .value=${this._config.inactive_color||""}
                @change=${e=>{const t=e.target.value;this._set("inactive_color",t||void 0)}}
              >
                ${Ce.map(e=>B`<option value=${e.value}>${e.label}</option>`)}
              </select>
            </label>
            <label class="select-row">
              <span>Transitional</span>
              <select
                .value=${this._config.transitional_color||""}
                @change=${e=>{const t=e.target.value;this._set("transitional_color",t||void 0)}}
              >
                ${Ce.map(e=>B`<option value=${e.value}>${e.label}</option>`)}
              </select>
            </label>
          </div>
        </div>
      </ha-expansion-panel>

      <!-- State Overrides -->
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${"M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M17,17H11V15H17V17M17,13H11V11H17V13M17,9H11V7H17V9Z"}></ha-svg-icon>
        <h3 slot="header">State Overrides</h3>
        <div class="content">
          ${e.map((e,t)=>this._renderAppearanceItem(e,t))}
          <ha-button @click=${this._addAppearance}> Add state override </ha-button>
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
    `}};e([de({attribute:!1})],ze.prototype,"hass",void 0),e([ue()],ze.prototype,"_config",void 0),e([ue()],ze.prototype,"_expandedAppearance",void 0),e([ue()],ze.prototype,"_ready",void 0),ze=e([le(fe)],ze),console.info("%c STATUS-BUTTON-CARD %c v1.0.0-beta.2 ","color: white; background: #607d8b; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #607d8b; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let Le=class extends re{constructor(){super(...arguments),this._dblClickTimer=null,this._holdTimer=null,this._held=!1,this._clearCamerasTimer=null,this._onResize=null,this._videoObservers=[],this._cameras=[],this._camerasOpen=!1}static get styles(){return me}static getConfigElement(){return document.createElement(fe)}static getStubConfig(e){const t=Object.keys(e.states).find(e=>e.startsWith("lock."));return{type:`custom:${_e}`,entity:t||"lock.front_door"}}setConfig(e){!function(e){if(!e||"object"!=typeof e)throw new Error("Invalid configuration");if(!e.entity||"string"!=typeof e.entity)throw new Error("Entity is required")}(e),this._config=e}getCardSize(){return 1}shouldUpdate(e){if(e.has("_config"))return!0;if(e.has("_camerasOpen"))return!0;if(e.has("_cameras"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;const i=[this._config.entity];return this._config.secondary_entity&&i.push(this._config.secondary_entity),i.some(e=>t.states[e]!==this.hass.states[e])}return!0}updated(e){if(!this._config||!this.hass)return;if(!e.has("hass")&&!e.has("_config"))return;const t=this.hass.states[this._config.entity];if(!t)return;const i=this._config.secondary_entity?this.hass.states[this._config.secondary_entity]:void 0,a=function(e,t,i){const a=He(e.state_appearances,t.state,i?.state);return s=a?.cameras,s?.length?s.map(e=>"string"==typeof e?{entity:e}:{...e}).filter(e=>!!e.entity):[];var s}(this._config,t,i),s=a.length>0;if(s){const e=this._cameras.length===a.length&&this._cameras.every((e,t)=>e.entity===a[t].entity&&e.aspect_ratio===a[t].aspect_ratio);e||(this._cameras=a),null!==this._clearCamerasTimer&&(clearTimeout(this._clearCamerasTimer),this._clearCamerasTimer=null)}s!==this._camerasOpen&&(this._camerasOpen=s,!s&&this._cameras.length>0&&(null!==this._clearCamerasTimer&&clearTimeout(this._clearCamerasTimer),this._clearCamerasTimer=setTimeout(()=>{this._cameras=[],this._clearCamerasTimer=null},700))),this._updateRevealOffset(),requestAnimationFrame(()=>{this._applyVideoFit(),this._setupVideoObservers()}),setTimeout(()=>this._applyVideoFit(),250),setTimeout(()=>this._applyVideoFit(),1500)}_setupVideoObservers(){if(this._videoObservers.forEach(e=>e.disconnect()),this._videoObservers=[],!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".camera-panel").forEach(e=>{const t=new MutationObserver(()=>this._applyVideoFit());t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset"]}),this._videoObservers.push(t)})}_applyVideoFit(){if(!this.shadowRoot)return;const e=(e,t)=>{const i=[],a=[e];for(;a.length;){const e=a.pop();e.querySelectorAll(t).forEach(e=>i.push(e)),e.querySelectorAll("*").forEach(e=>{const t=e.shadowRoot;t&&a.push(t)})}return i};this.shadowRoot.querySelectorAll(".camera-panel").forEach(t=>{const i=t.dataset.objectPosition||"center",a=t.dataset.objectFit||"cover";e(t,"ha-camera-stream, ha-web-rtc-player").forEach(e=>{const t=e;t.style.setProperty("display","block","important"),t.style.setProperty("width","100%","important"),t.style.setProperty("height","100%","important"),t.style.setProperty("overflow","hidden","important")});const s=e(t,"video, img");s.forEach(e=>{const t=e;t.style.setProperty("object-fit",a,"important"),t.style.setProperty("object-position",i,"important"),t.style.setProperty("width","100%","important"),t.style.setProperty("height","100%","important")}),s.length>0&&t.classList.add("fit-ready")})}connectedCallback(){super.connectedCallback(),this._onResize=()=>this._updateRevealOffset(),window.addEventListener("resize",this._onResize)}disconnectedCallback(){super.disconnectedCallback(),this._onResize&&(window.removeEventListener("resize",this._onResize),this._onResize=null),null!==this._clearCamerasTimer&&(clearTimeout(this._clearCamerasTimer),this._clearCamerasTimer=null),this._videoObservers.forEach(e=>e.disconnect()),this._videoObservers=[],this._camerasOpen=!1}_updateRevealOffset(){const e=this._config?.state_appearances?.some(e=>e.cameras?.length);if(!e)return;const t=this.getBoundingClientRect();if(!t.width)return;const i=this._findColumnElement(),a=i?i.getBoundingClientRect():{left:0,width:window.innerWidth};this.style.setProperty("--dsb-host-offset-x",a.left-t.left+"px"),this.style.setProperty("--dsb-column-width",`${a.width}px`);const s=t.left+t.width/2;this.style.setProperty("--dsb-pointer-x",s-a.left+"px")}_findColumnElement(){const e=e=>{const t=e.tagName.toLowerCase();return"hui-horizontal-stack-card"===t||"hui-vertical-stack-card"===t||"hui-grid-card"===t||"hui-section"===t||"hui-grid-section"===t};let t=this.parentNode;for(let i=0;i<20&&t;i++)if(t instanceof ShadowRoot)t=t.host;else{if(t instanceof HTMLElement&&e(t))return t;t=t.parentNode}let i=this.parentElement;for(;i&&i!==document.body;){if(i.getBoundingClientRect().width>=240)return i;i=i.parentElement}return null}_handleAction(e){if(e&&"none"!==e.action)switch(e.action){case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}));break;case"navigate":e.navigation_path&&(history.pushState(null,"",e.navigation_path),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0})));break;case"url":e.url_path&&window.open(e.url_path,"_blank");break;case"call-service":case"perform-action":{const t=e.service||e.perform_action;if(t){const[i,a]=t.split(".");this.hass.callService(i,a,e.service_data||{},e.target||{entity_id:this._config.entity})}break}case"toggle":{const e=this.hass.states[this._config.entity];if(!e)break;const t=Oe(this._config.entity),i={lock:["locked","lock.lock","lock.unlock"],cover:["open","cover.close","cover.open"]}[t];if(i){const[t,a,s]=i,n=e.state===t?s:a,[o,r]=n.split(".");this.hass.callService(o,r,{},{entity_id:this._config.entity})}else{["light","switch","fan","input_boolean","media_player","automation","script"].includes(t)?this.hass.callService(t,"toggle",{},{entity_id:this._config.entity}):this.hass.callService("homeassistant","toggle",{},{entity_id:this._config.entity})}break}}}_handleTap(){if(!this._held)return this._dblClickTimer?(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,void this._handleAction(this._config.double_tap_action||{action:"none"})):void(this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this._config.tap_action||{action:"more-info"})},250));this._held=!1}_handlePointerDown(){this._held=!1,this._holdTimer=setTimeout(()=>{this._held=!0,this._handleAction(this._config.hold_action||{action:"none"})},500)}_handlePointerUp(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_getCardStyle(){const e=[];return this._config.icon_size&&e.push(`--dsb-icon-size: ${this._config.icon_size}`),this._config.min_width&&e.push(`--dsb-min-width: ${this._config.min_width}`),this._config.max_width&&e.push(`--dsb-max-width: ${this._config.max_width}`),this._config.height&&e.push(`--dsb-height: ${this._config.height}`),e.join("; ")}_renderCameraReveal(e){const t=this._config.state_appearances?.some(e=>e.cameras?.length);if(!t)return F;const i=[`--dsb-camera-aspect: ${this._config.camera_aspect_ratio||"16 / 9"}`,`--dsb-pointer-color: ${e}`].join("; ");return B`
      <div
        class="camera-reveal-wrapper ${this._camerasOpen?"open":""}"
        style="${i}"
        @click=${e=>e.stopPropagation()}
      >
        <div class="camera-pointer"></div>
        <div class="camera-reveal">
          ${this._cameras.map(e=>{const t=this.hass?.states[e.entity],i=e.aspect_ratio||"16 / 9",a=e.object_position||"center",s=e.object_fit||"cover";return B`
              <div
                class="camera-panel"
                style="aspect-ratio: ${i}"
                data-object-position=${a}
                data-object-fit=${s}
              >
                <div class="camera-spinner"></div>
                <div class="camera-media">
                  ${t?B`
                        <ha-camera-stream
                          .hass=${this.hass}
                          .stateObj=${t}
                          muted
                          playsinline
                        ></ha-camera-stream>
                      `:B`
                        <hui-image
                          .hass=${this.hass}
                          .cameraImage=${e.entity}
                          cameraView="live"
                        ></hui-image>
                      `}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return B``;const e=this.hass.states[this._config.entity];if(!e)return B`<ha-card>Entity not found</ha-card>`;const t=this._config.secondary_entity?this.hass.states[this._config.secondary_entity]:void 0,i=Me(this._config,e,t),a=function(e,t,i){const a=He(e.state_appearances,t.state,i?.state);if(a?.icon)return a.icon;if(e.icon)return e.icon;if(t.attributes.icon)return t.attributes.icon;const s=Oe(t.entity_id);return ge[s]||"mdi:help-circle"}(this._config,e,t),s=function(e,t,i){const a=He(e.state_appearances,t.state,i?.state);return a?.label?a.label:t.state.replace(/_/g," ").toUpperCase()}(this._config,e,t),n=function(e,t,i){const a=He(e.state_appearances,t.state,i?.state);if(void 0!==a?.animate)return a.animate;const s=Oe(t.entity_id),n=Te[s];return n?.includes(t.state)||!1}(this._config,e,t),o=function(e,t){return void 0!==e.name?e.name:t.attributes.friendly_name||"Button"}(this._config,e),r=!1!==this._config.show_name,c=!1!==this._config.show_label;return B`
      <ha-card
        style="${this._getCardStyle()}"
        @click=${this._handleTap}
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
      >
        <div class="button-layout" style="border-bottom: 3px solid ${i}">
          <ha-icon
            class="btn-icon ${n?"animate":""}"
            icon=${a}
            style="color: ${i}"
          ></ha-icon>
          ${r?B`<span class="btn-name">${o}</span>`:F}
          ${c?B`<span class="btn-label" style="color: ${i}">${s}</span>`:F}
        </div>
      </ha-card>
      ${this._renderCameraReveal(i)}
    `}};e([de({attribute:!1})],Le.prototype,"hass",void 0),e([ue()],Le.prototype,"_config",void 0),e([ue()],Le.prototype,"_cameras",void 0),e([ue()],Le.prototype,"_camerasOpen",void 0),Le=e([le(_e)],Le),window.customCards=window.customCards||[],window.customCards.push({type:_e,name:"Status Button Card by akaDashe",description:"A customisable button card focused on entity status with state-based icons, colors, and labels",preview:!0});export{Le as StatusButtonCard};
