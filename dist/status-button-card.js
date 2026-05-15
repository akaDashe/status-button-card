function t(t,e,i,a){var n,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(s=(o<3?n(s):o>3?n(e,i,s):n(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new o(i,t,a)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,_=m.trustedTypes,f=_?_.emptyScript:"",g=m.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&l(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const o=a?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,a)=>{if(i)t.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of a){const a=document.createElement("style"),n=e.litNonce;void 0!==n&&a.setAttribute("nonce",n),a.textContent=i.cssText,t.appendChild(a)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=a;const o=n.fromAttribute(e,t.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(t,e,i,a=!1,n){if(void 0!==t){const o=this.constructor;if(!1===a&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,g?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=t=>t,C=A.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,H=`<${P}>`,T=document,O=()=>T.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,V="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,z=/>/g,U=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,Z=T.createTreeWalker(T,129);function Y(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,a=[];let n,o=2===e?"<svg>":3===e?"<math>":"",s=R;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,h=0;for(;h<i.length&&(s.lastIndex=h,c=s.exec(i),null!==c);)h=s.lastIndex,s===R?"!--"===c[1]?s=j:void 0!==c[1]?s=z:void 0!==c[2]?(I.test(c[2])&&(n=RegExp("</"+c[2],"g")),s=U):void 0!==c[3]&&(s=U):s===U?">"===c[0]?(s=n??R,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,r=c[1],s=void 0===c[3]?U:'"'===c[3]?D:N):s===D||s===N?s=U:s===j||s===z?s=R:(s=U,n=void 0);const d=s===U&&t[e+1].startsWith("/>")?" ":"";o+=s===R?i+H:l>=0?(a.push(r),i.slice(0,l)+k+i.slice(l)+S+d):i+S+(-2===l?e:d)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class G{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let n=0,o=0;const s=t.length-1,r=this.parts,[c,l]=J(t,e);if(this.el=G.createElement(c,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=Z.nextNode())&&r.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(k)){const e=l[o++],i=a.getAttribute(t).split(S),s=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?at:tt}),a.removeAttribute(t)}else t.startsWith(S)&&(r.push({type:6,index:n}),a.removeAttribute(t));if(I.test(a.tagName)){const t=a.textContent.split(S),e=t.length-1;if(e>0){a.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],O()),Z.nextNode(),r.push({type:2,index:++n});a.append(t[e],O())}}}else if(8===a.nodeType)if(a.data===P)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=a.data.indexOf(S,t+1));)r.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,a){if(e===q)return e;let n=void 0!==a?i._$Co?.[a]:i._$Cl;const o=M(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=n:i._$Cl=n),void 0!==n&&(e=K(t,n._$AS(t,e.values),n,a)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??T).importNode(e,!0);Z.currentNode=a;let n=Z.nextNode(),o=0,s=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Q(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new nt(n,this,t)),this._$AV.push(e),r=i[++s]}o!==r?.index&&(n=Z.nextNode(),o++)}return Z.currentNode=T,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),M(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new X(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const n of t)a===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[a],i._$AI(n),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,a){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const a=t;let s,r;for(t=n[0],s=0;s<n.length-1;s++)r=K(this,a[i+s],e,s),r===q&&(r=this._$AH[s]),o||=!M(r)||r!==this._$AH[s],r===W?t=W:t!==W&&(t+=(r??"")+n[s+1]),this._$AH[s]=r}o&&!a&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class at extends tt{constructor(t,e,i,a,n){super(t,e,i,a,n),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===q)return;const i=this._$AH,a=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||a);a&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const ot=A.litHtmlPolyfillSupport;ot?.(G,Q),(A.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let n=a._$litPart$;if(void 0===n){const t=i?.renderBefore??null;a._$litPart$=n=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}rt._$litElement$=!0,rt.finalized=!0,st.litElementHydrateSupport?.({LitElement:rt});const ct=st.litElementPolyfillSupport;ct?.({LitElement:rt}),(st.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},dt=(t=ht,e,i)=>{const{kind:a,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,n,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const n=this[a];e.call(this,i),this.requestUpdate(a,n,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const mt=s`
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
`,_t="status-button-card",ft="status-button-card-editor",gt={light:"mdi:lightbulb",switch:"mdi:toggle-switch",climate:"mdi:thermometer",media_player:"mdi:speaker",cover:"mdi:blinds-horizontal",lock:"mdi:lock",camera:"mdi:cctv",sensor:"mdi:eye",binary_sensor:"mdi:motion-sensor",fan:"mdi:fan",vacuum:"mdi:robot-vacuum",person:"mdi:account",device_tracker:"mdi:map-marker",alarm_control_panel:"mdi:shield-check",input_boolean:"mdi:toggle-switch",weather:"mdi:weather-cloudy"},vt="rgba(46, 175, 80, 0.9)",bt="rgba(244, 67, 54, 1)",yt="rgba(255, 170, 0, 1)",$t="rgba(33, 150, 243, 1)",wt="rgb(130, 130, 130)",At="rgba(255, 193, 7, 1)",xt="rgba(0, 150, 136, 1)",Ct={lock:vt,alarm_control_panel:vt,light:At,switch:At,input_boolean:vt,climate:yt,media_player:$t,camera:vt,binary_sensor:$t,person:vt,device_tracker:vt,sensor:xt,vacuum:vt,fan:xt,cover:$t},Et={lock:bt,alarm_control_panel:wt},kt={lock:yt,alarm_control_panel:yt,cover:yt},St={light:["on"],switch:["on"],fan:["on"],input_boolean:["on"],climate:["heat","cool","heat_cool","fan_only","auto"],media_player:["playing","paused","on"],cover:["open","opening","closing"],lock:["locked"],binary_sensor:["on"],alarm_control_panel:["armed_home","armed_away","armed_night","armed_vacation"],camera:["recording","streaming"],vacuum:["cleaning","returning"],person:["home"],device_tracker:["home"]},Pt={lock:["locking","unlocking"],alarm_control_panel:["arming","pending"],cover:["opening","closing"]};function Ht(t){return t.split(".")[0]}function Tt(t,e){if(null==t)return!1;const i=t.trim(),a=[">=","<=","!=","~=",">","<","="];for(const t of a){if(!i.startsWith(t))continue;const a=i.slice(t.length).trim();if("="===t)return e===a;if("!="===t)return e!==a;if("~="===t)try{return new RegExp(a).test(e)}catch(t){return!1}const n=Number(e),o=Number(a);if(Number.isNaN(n)||Number.isNaN(o))return!1;if(">="===t)return n>=o;if("<="===t)return n<=o;if(">"===t)return n>o;if("<"===t)return n<o}return e===i}function Ot(t,e,i){if(t?.length){for(const i of t)if(i.state&&!i.state.startsWith("secondary:")&&Tt(i.state,e))return i;if(void 0!==i)for(const e of t){if(!e.state||!e.state.startsWith("secondary:"))continue;if(Tt(e.state.slice(10),i))return e}}}function Mt(t,e,i){const a=Ot(t.state_appearances,e.state,i?.state);if(a?.color)return a.color;const n=function(t){const e=Ht(t.entity_id),i=t.state,a=Pt[e];if(a?.includes(i))return"transitional";const n=St[e];return n?.length?n.includes(i)?"active":"inactive":"off"===i||"unavailable"===i||"unknown"===i||"idle"===i?"inactive":"active"}(e),o=Ht(e.entity_id);return"transitional"===n?t.transitional_color||kt[o]||wt:"active"===n?t.active_color||Ct[o]||vt:t.inactive_color||Et[o]||wt}const Lt="_default",Vt=[{value:"",label:"Default"},{value:vt,label:"Green"},{value:bt,label:"Red"},{value:yt,label:"Orange"},{value:$t,label:"Blue"},{value:"rgba(156, 39, 176, 1)",label:"Purple"},{value:At,label:"Amber"},{value:xt,label:"Teal"},{value:wt,label:"Grey"}].map(t=>({value:""===t.value?Lt:t.value,label:t.label}));function Rt(t){return t&&t.length?t:Lt}function jt(t){return t&&t!==Lt?t:void 0}const zt={light:["on","off","unavailable","unknown"],switch:["on","off","unavailable","unknown"],fan:["on","off","unavailable","unknown"],input_boolean:["on","off","unavailable","unknown"],automation:["on","off","unavailable","unknown"],script:["on","off","unavailable","unknown"],binary_sensor:["on","off","unavailable","unknown"],cover:["open","opening","closing","closed","unavailable","unknown"],lock:["locked","unlocked","locking","unlocking","jammed","unavailable","unknown"],climate:["off","heat","cool","heat_cool","auto","dry","fan_only","unavailable","unknown"],media_player:["playing","paused","idle","off","on","standby","buffering","unavailable","unknown"],alarm_control_panel:["disarmed","armed_home","armed_away","armed_night","armed_vacation","armed_custom_bypass","arming","pending","triggered","disarming","unavailable","unknown"],person:["home","not_home","unavailable","unknown"],device_tracker:["home","not_home","unavailable","unknown"],vacuum:["cleaning","docked","idle","paused","returning","error","unavailable","unknown"],camera:["idle","recording","streaming","unavailable","unknown"],sun:["above_horizon","below_horizon"],weather:["clear-night","cloudy","exceptional","fog","hail","lightning","lightning-rainy","partlycloudy","pouring","rainy","snowy","snowy-rainy","sunny","windy","windy-variant","unavailable","unknown"]};function Ut(t,e){if(!e)return[];const i=e.split(".")[0],a=new Set(zt[i]||["unavailable","unknown"]),n=t?.states[e];n?.state&&a.add(n.state);const o=n?.attributes?.options;return Array.isArray(o)&&o.forEach(t=>a.add(t)),[...a]}function Nt(t,e,i,a){t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,cancelable:Boolean(a?.cancelable),composed:!0}))}let Dt=class extends rt{constructor(){super(...arguments),this._expandedAppearance=-1,this._dragIndex=-1,this._dropBefore=-1,this._computeLabel=t=>{if(t.title)return t.title;return{entity:"Entity",secondary_entity:"Secondary entity (optional)",name:"Name (leave empty for entity name)",icon:"Icon",show_name:"Show name",show_label:"Show label (state)",active_color:"Active",inactive_color:"Inactive",transitional_color:"Transitional",tap_action:"Tap action",double_tap_action:"Double-tap action",hold_action:"Hold action",state:"State value",label:"Label",color:"Color",animate:"Blink animation",aspect_ratio:"Aspect ratio (e.g. 16/9)",object_fit:"Video fit",object_position:"Video position"}[t.name]??t.name},this._topChanged=t=>{t.stopPropagation();const e=t.detail.value,i={...this._config,...e,active_color:jt(e.active_color),inactive_color:jt(e.inactive_color),transitional_color:jt(e.transitional_color),show_name:!1!==e.show_name&&void 0,show_label:!1!==e.show_label&&void 0};Object.keys(i).forEach(t=>{void 0===i[t]&&delete i[t]}),this._config=i,Nt(this,"config-changed",{config:this._config})},this._onDragStart=t=>e=>{this._dragIndex=t,this._dropBefore=t,e.dataTransfer&&(e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",String(t)))},this._onDragOverItem=t=>e=>{if(this._dragIndex<0)return;e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="move");const i=e.currentTarget;if(!i)return;const a=i.getBoundingClientRect(),n=e.clientY-a.top<a.height/2?t:t+1;n!==this._dropBefore&&(this._dropBefore=n)},this._onDrop=t=>{if(this._dragIndex<0)return;t.preventDefault();const e=this._dragIndex,i=this._dropBefore;this._dragIndex=-1,this._dropBefore=-1;const a=this._config.state_appearances||[],n=function(t,e,i){if(e<0||e>=t.length)return t.slice();const a=Math.max(0,Math.min(i,t.length));if(a===e||a===e+1)return t.slice();const n=t.slice(),[o]=n.splice(e,1),s=a>e?a-1:a;return n.splice(s,0,o),n}(a,e,i);n!==a&&(this._expandedAppearance===e&&(this._expandedAppearance=n.indexOf(a[e])),this._writeConfig({state_appearances:n}))},this._onDragEnd=()=>{this._dragIndex=-1,this._dropBefore=-1}}setConfig(t){this._config=t}_topSchema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"secondary_entity",selector:{entity:{}}},{type:"expandable",name:"",title:"Appearance",iconPath:"M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",flatten:!0,schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"",type:"grid",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_label",selector:{boolean:{}}}]},{name:"",type:"grid",schema:[{name:"active_color",selector:{select:{options:Vt,mode:"dropdown"}}},{name:"inactive_color",selector:{select:{options:Vt,mode:"dropdown"}}},{name:"transitional_color",selector:{select:{options:Vt,mode:"dropdown"}}}]}]},{type:"expandable",name:"",title:"Actions",iconPath:"M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z",flatten:!0,schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{type:"optional_actions",name:"",flatten:!0,schema:["double_tap_action","hold_action"].map(t=>({name:t,selector:{ui_action:{default_action:"none"}}}))}]}]}_appearanceSchema(){const t=function(t,e,i){const a=[];return Ut(t,e).forEach(t=>a.push({value:t,label:t})),Ut(t,i).forEach(t=>a.push({value:`secondary:${t}`,label:`secondary: ${t}`})),a}(this.hass,this._config?.entity,this._config?.secondary_entity);return[{name:"state",required:!0,selector:{select:{mode:"dropdown",custom_value:!0,options:t}}},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}}},{name:"color",selector:{select:{options:Vt,mode:"dropdown"}}}]},{name:"label",selector:{text:{}}},{name:"animate",selector:{boolean:{}}}]}_cameraSchema(){return[{name:"entity",required:!0,selector:{entity:{domain:"camera"}}},{name:"",type:"grid",schema:[{name:"aspect_ratio",selector:{text:{}}},{name:"object_fit",selector:{select:{mode:"dropdown",options:[{value:"cover",label:"Cover (crop to fill)"},{value:"contain",label:"Contain (letterbox)"}]}}},{name:"object_position",selector:{select:{mode:"dropdown",options:[{value:"center",label:"Center"},{value:"top",label:"Top"},{value:"bottom",label:"Bottom"},{value:"left",label:"Left"},{value:"right",label:"Right"}]}}}]}]}_appearanceChanged(t,e){e.stopPropagation();const i=e.detail.value,a=[...this._config.state_appearances||[]];a[t]={...a[t],...i,color:jt(i.color)},Object.keys(a[t]).forEach(e=>{void 0===a[t][e]&&delete a[t][e]}),this._writeConfig({state_appearances:a})}_addAppearance(){const t=[...this._config.state_appearances||[],{state:""}];this._expandedAppearance=t.length-1,this._writeConfig({state_appearances:t})}_removeAppearance(t){const e=(this._config.state_appearances||[]).filter((e,i)=>i!==t);this._expandedAppearance=-1,this._writeConfig({state_appearances:e.length?e:void 0})}_normalizedCameras(t){return(t.cameras||[]).map(t=>"string"==typeof t?{entity:t}:{...t})}_cameraChanged(t,e,i){i.stopPropagation();const a=i.detail.value,n=this._config.state_appearances?.[t];if(!n)return;const o=this._normalizedCameras(n);o[e]={...o[e],...a},"cover"===o[e].object_fit&&delete o[e].object_fit,"center"===o[e].object_position&&delete o[e].object_position,o[e].aspect_ratio||delete o[e].aspect_ratio,this._writeAppearanceCameras(t,o)}_addCamera(t){const e=this._config.state_appearances?.[t];e&&this._writeAppearanceCameras(t,[...this._normalizedCameras(e),{entity:""}])}_removeCamera(t,e){const i=this._config.state_appearances?.[t];if(!i)return;const a=this._normalizedCameras(i).filter((t,i)=>i!==e);this._writeAppearanceCameras(t,a)}_writeAppearanceCameras(t,e){const i=[...this._config.state_appearances||[]];i[t]={...i[t],cameras:e.length?e:void 0},this._writeConfig({state_appearances:i})}_writeConfig(t){this._config={...this._config,...t},Object.keys(this._config).forEach(t=>{void 0===this._config[t]&&delete this._config[t]}),Nt(this,"config-changed",{config:this._config})}static get styles(){return s`
      :host {
        display: block;
      }

      ha-form {
        display: block;
      }

      .state-overrides {
        margin-top: 16px;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 500;
        margin: 16px 0 8px;
        color: var(--primary-text-color);
      }

      .appearance-item {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .appearance-item.dragging {
        opacity: 0.5;
      }

      .appearance-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 4px 4px 8px;
        min-height: 48px;
        background: var(--secondary-background-color);
      }

      .drag-handle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        cursor: grab;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .drag-handle:active {
        cursor: grabbing;
      }

      .drag-handle ha-svg-icon {
        --mdc-icon-size: 18px;
      }

      .drop-indicator {
        height: 2px;
        margin: 0 4px;
        background: var(--primary-color, #03a9f4);
        border-radius: 1px;
        pointer-events: none;
      }

      .appearance-label {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .appearance-body {
        padding: 12px;
        border-top: 1px solid var(--divider-color);
      }

      .camera-item {
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 12px;
        margin-top: 8px;
      }

      .camera-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
      }

      .add-btn {
        margin-top: 8px;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin: 4px 0 0;
      }
    `}_appearanceFormData(t){return{...t,color:Rt(t.color)}}_renderCameraItem(t,e,i){const a={...e,object_fit:e.object_fit||"cover",object_position:e.object_position||"center"};return B`
      <div class="camera-item">
        <ha-form
          .hass=${this.hass}
          .data=${a}
          .schema=${this._cameraSchema()}
          .computeLabel=${this._computeLabel}
          @value-changed=${e=>this._cameraChanged(t,i,e)}
        ></ha-form>
        <p class="hint">
          Pair "Cover" + "Bottom" to keep the lower part visible while cropping the top.
        </p>
        <div class="camera-actions">
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            @click=${()=>this._removeCamera(t,i)}
          ></ha-icon-button>
        </div>
      </div>
    `}_renderAppearanceItem(t,e){const i=this._expandedAppearance===e,a=t.state||"(empty)",n=this._dragIndex===e,o=this._config.state_appearances?.length??0,s=this._dragIndex>=0&&this._dropBefore===e,r=this._dragIndex>=0&&e===o-1&&this._dropBefore===o;return B`
      ${s?B`<div class="drop-indicator"></div>`:W}
      <div
        class="appearance-item ${n?"dragging":""}"
        @dragover=${this._onDragOverItem(e)}
        @drop=${this._onDrop}
      >
        <div class="appearance-header">
          <span
            class="drag-handle"
            draggable="true"
            title="Drag to reorder — first matching rule wins"
            @dragstart=${this._onDragStart(e)}
            @dragend=${this._onDragEnd}
          >
            <ha-svg-icon
              .path=${"M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"}
            ></ha-svg-icon>
          </span>
          ${t.icon?B`<ha-icon
                style="--mdc-icon-size:18px; color:${t.color||"var(--secondary-text-color)"}"
                icon=${t.icon}
              ></ha-icon>`:W}
          <span class="appearance-label">
            ${a}${t.label?` → ${t.label}`:""}
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
              <div class="appearance-body">
                <ha-form
                  .hass=${this.hass}
                  .data=${this._appearanceFormData(t)}
                  .schema=${this._appearanceSchema()}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${t=>this._appearanceChanged(e,t)}
                ></ha-form>
                <p class="hint">
                  Pick a state from the dropdown, or type a pattern: <code>locked</code> (exact),
                  <code>!= unavailable</code>, <code>&gt; 2</code>, <code>&gt;= 2</code>,
                  <code>&lt; 100</code>, <code>~= ^armed</code> (regex). Prefix with
                  <code>secondary:</code> to match against the secondary entity (e.g.
                  <code>secondary:&gt;50</code>).
                </p>
                <p class="hint">
                  <strong>Order matters:</strong> rules are evaluated top-to-bottom and the first
                  match wins. Drag the grip handle on the left to reorder — put more-specific
                  patterns above broader ones.
                </p>
                <div class="section-title">
                  <ha-svg-icon .path=${"M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"}></ha-svg-icon>
                  <span>Cameras revealed by this state</span>
                </div>
                ${this._normalizedCameras(t).map((t,i)=>this._renderCameraItem(e,t,i))}
                <ha-button outlined class="add-btn" @click=${()=>this._addCamera(e)}>
                  Add camera
                </ha-button>
              </div>
            `:W}
      </div>
      ${r?B`<div class="drop-indicator"></div>`:W}
    `}render(){if(!this.hass||!this._config)return W;const t={...this._config,show_name:!1!==this._config.show_name,show_label:!1!==this._config.show_label,active_color:Rt(this._config.active_color),inactive_color:Rt(this._config.inactive_color),transitional_color:Rt(this._config.transitional_color)},e=this._config.state_appearances||[];return B`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${this._topSchema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="state-overrides">
        <div class="section-title">
          <ha-svg-icon .path=${"M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M7,7H9V9H7V7M7,11H9V13H7V11M7,15H9V17H7V15M17,17H11V15H17V17M17,13H11V11H17V13M17,9H11V7H17V9Z"}></ha-svg-icon>
          <span>State Overrides</span>
        </div>
        ${e.map((t,e)=>this._renderAppearanceItem(t,e))}
        <ha-button outlined class="add-btn" @click=${this._addAppearance}>
          Add state override
        </ha-button>
      </div>
    `}};t([pt({attribute:!1})],Dt.prototype,"hass",void 0),t([ut()],Dt.prototype,"_config",void 0),t([ut()],Dt.prototype,"_expandedAppearance",void 0),t([ut()],Dt.prototype,"_dragIndex",void 0),t([ut()],Dt.prototype,"_dropBefore",void 0),Dt=t([lt(ft)],Dt),console.info("%c STATUS-BUTTON-CARD %c v1.0.0-beta.3 ","color: white; background: #607d8b; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #607d8b; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;");let It=class extends rt{constructor(){super(...arguments),this._dblClickTimer=null,this._holdTimer=null,this._held=!1,this._clearCamerasTimer=null,this._onResize=null,this._videoObservers=[],this._cameras=[],this._camerasOpen=!1}static get styles(){return mt}static getConfigElement(){return document.createElement(ft)}static getStubConfig(t){const e=Object.keys(t.states).find(t=>t.startsWith("lock."));return{type:`custom:${_t}`,entity:e||"lock.front_door"}}setConfig(t){!function(t){if(!t||"object"!=typeof t)throw new Error("Invalid configuration");if(!t.entity||"string"!=typeof t.entity)throw new Error("Entity is required")}(t),this._config=t}getCardSize(){return 1}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("_camerasOpen"))return!0;if(t.has("_cameras"))return!0;if(t.has("hass")){const e=t.get("hass");if(!e)return!0;const i=[this._config.entity];return this._config.secondary_entity&&i.push(this._config.secondary_entity),i.some(t=>e.states[t]!==this.hass.states[t])}return!0}updated(t){if(!this._config||!this.hass)return;if(!t.has("hass")&&!t.has("_config"))return;const e=this.hass.states[this._config.entity];if(!e)return;const i=this._config.secondary_entity?this.hass.states[this._config.secondary_entity]:void 0,a=function(t,e,i){const a=Ot(t.state_appearances,e.state,i?.state);return n=a?.cameras,n?.length?n.map(t=>"string"==typeof t?{entity:t}:{...t}).filter(t=>!!t.entity):[];var n}(this._config,e,i),n=a.length>0;if(n){const t=this._cameras.length===a.length&&this._cameras.every((t,e)=>t.entity===a[e].entity&&t.aspect_ratio===a[e].aspect_ratio);t||(this._cameras=a),null!==this._clearCamerasTimer&&(clearTimeout(this._clearCamerasTimer),this._clearCamerasTimer=null)}n!==this._camerasOpen&&(this._camerasOpen=n,!n&&this._cameras.length>0&&(null!==this._clearCamerasTimer&&clearTimeout(this._clearCamerasTimer),this._clearCamerasTimer=setTimeout(()=>{this._cameras=[],this._clearCamerasTimer=null},700))),this._updateRevealOffset(),requestAnimationFrame(()=>{this._applyVideoFit(),this._setupVideoObservers()}),setTimeout(()=>this._applyVideoFit(),250),setTimeout(()=>this._applyVideoFit(),1500)}_setupVideoObservers(){if(this._videoObservers.forEach(t=>t.disconnect()),this._videoObservers=[],!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".camera-panel").forEach(t=>{const e=new MutationObserver(()=>this._applyVideoFit());e.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src","srcset"]}),this._videoObservers.push(e)})}_applyVideoFit(){if(!this.shadowRoot)return;const t=(t,e)=>{const i=[],a=[t];for(;a.length;){const t=a.pop();t.querySelectorAll(e).forEach(t=>i.push(t)),t.querySelectorAll("*").forEach(t=>{const e=t.shadowRoot;e&&a.push(e)})}return i};this.shadowRoot.querySelectorAll(".camera-panel").forEach(e=>{const i=e.dataset.objectPosition||"center",a=e.dataset.objectFit||"cover";t(e,"ha-camera-stream, ha-web-rtc-player").forEach(t=>{const e=t;e.style.setProperty("display","block","important"),e.style.setProperty("width","100%","important"),e.style.setProperty("height","100%","important"),e.style.setProperty("overflow","hidden","important")});const n=t(e,"video, img");n.forEach(t=>{const e=t;e.style.setProperty("object-fit",a,"important"),e.style.setProperty("object-position",i,"important"),e.style.setProperty("width","100%","important"),e.style.setProperty("height","100%","important")}),n.length>0&&e.classList.add("fit-ready")})}connectedCallback(){super.connectedCallback(),this._onResize=()=>this._updateRevealOffset(),window.addEventListener("resize",this._onResize)}disconnectedCallback(){super.disconnectedCallback(),this._onResize&&(window.removeEventListener("resize",this._onResize),this._onResize=null),null!==this._clearCamerasTimer&&(clearTimeout(this._clearCamerasTimer),this._clearCamerasTimer=null),this._videoObservers.forEach(t=>t.disconnect()),this._videoObservers=[],this._camerasOpen=!1}_updateRevealOffset(){const t=this._config?.state_appearances?.some(t=>t.cameras?.length);if(!t)return;const e=this.getBoundingClientRect();if(!e.width)return;const i=this._findColumnElement(),a=i?i.getBoundingClientRect():{left:0,width:window.innerWidth};this.style.setProperty("--dsb-host-offset-x",a.left-e.left+"px"),this.style.setProperty("--dsb-column-width",`${a.width}px`);const n=e.left+e.width/2;this.style.setProperty("--dsb-pointer-x",n-a.left+"px")}_findColumnElement(){const t=t=>{const e=t.tagName.toLowerCase();return"hui-horizontal-stack-card"===e||"hui-vertical-stack-card"===e||"hui-grid-card"===e||"hui-section"===e||"hui-grid-section"===e};let e=this.parentNode;for(let i=0;i<20&&e;i++)if(e instanceof ShadowRoot)e=e.host;else{if(e instanceof HTMLElement&&t(e))return e;e=e.parentNode}let i=this.parentElement;for(;i&&i!==document.body;){if(i.getBoundingClientRect().width>=240)return i;i=i.parentElement}return null}_handleAction(t){if(t&&"none"!==t.action)switch(t.action){case"more-info":this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:this._config.entity}}));break;case"navigate":t.navigation_path&&(history.pushState(null,"",t.navigation_path),window.dispatchEvent(new Event("location-changed",{bubbles:!0,composed:!0})));break;case"url":t.url_path&&window.open(t.url_path,"_blank");break;case"call-service":case"perform-action":{const e=t.service||t.perform_action;if(e){const[i,a]=e.split(".");this.hass.callService(i,a,t.service_data||{},t.target||{entity_id:this._config.entity})}break}case"toggle":{const t=this.hass.states[this._config.entity];if(!t)break;const e=Ht(this._config.entity),i={lock:["locked","lock.lock","lock.unlock"],cover:["open","cover.close","cover.open"]}[e];if(i){const[e,a,n]=i,o=t.state===e?n:a,[s,r]=o.split(".");this.hass.callService(s,r,{},{entity_id:this._config.entity})}else{["light","switch","fan","input_boolean","media_player","automation","script"].includes(e)?this.hass.callService(e,"toggle",{},{entity_id:this._config.entity}):this.hass.callService("homeassistant","toggle",{},{entity_id:this._config.entity})}break}}}_handleTap(){if(!this._held)return this._dblClickTimer?(clearTimeout(this._dblClickTimer),this._dblClickTimer=null,void this._handleAction(this._config.double_tap_action||{action:"none"})):void(this._dblClickTimer=setTimeout(()=>{this._dblClickTimer=null,this._handleAction(this._config.tap_action||{action:"more-info"})},250));this._held=!1}_handlePointerDown(){this._held=!1,this._holdTimer=setTimeout(()=>{this._held=!0,this._handleAction(this._config.hold_action||{action:"none"})},500)}_handlePointerUp(){this._holdTimer&&(clearTimeout(this._holdTimer),this._holdTimer=null)}_getCardStyle(){const t=[];return this._config.icon_size&&t.push(`--dsb-icon-size: ${this._config.icon_size}`),this._config.min_width&&t.push(`--dsb-min-width: ${this._config.min_width}`),this._config.max_width&&t.push(`--dsb-max-width: ${this._config.max_width}`),this._config.height&&t.push(`--dsb-height: ${this._config.height}`),t.join("; ")}_renderCameraReveal(t){const e=this._config.state_appearances?.some(t=>t.cameras?.length);if(!e)return W;const i=[`--dsb-camera-aspect: ${this._config.camera_aspect_ratio||"16 / 9"}`,`--dsb-pointer-color: ${t}`].join("; ");return B`
      <div
        class="camera-reveal-wrapper ${this._camerasOpen?"open":""}"
        style="${i}"
        @click=${t=>t.stopPropagation()}
      >
        <div class="camera-pointer"></div>
        <div class="camera-reveal">
          ${this._cameras.map(t=>{const e=this.hass?.states[t.entity],i=t.aspect_ratio||"16 / 9",a=t.object_position||"center",n=t.object_fit||"cover";return B`
              <div
                class="camera-panel"
                style="aspect-ratio: ${i}"
                data-object-position=${a}
                data-object-fit=${n}
              >
                <div class="camera-spinner"></div>
                <div class="camera-media">
                  ${e?B`
                        <ha-camera-stream
                          .hass=${this.hass}
                          .stateObj=${e}
                          muted
                          playsinline
                        ></ha-camera-stream>
                      `:B`
                        <hui-image
                          .hass=${this.hass}
                          .cameraImage=${t.entity}
                          cameraView="live"
                        ></hui-image>
                      `}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}render(){if(!this._config||!this.hass)return B``;const t=this.hass.states[this._config.entity];if(!t)return B`<ha-card>Entity not found</ha-card>`;const e=this._config.secondary_entity?this.hass.states[this._config.secondary_entity]:void 0,i=Mt(this._config,t,e),a=function(t,e,i){const a=Ot(t.state_appearances,e.state,i?.state);if(a?.icon)return a.icon;if(t.icon)return t.icon;if(e.attributes.icon)return e.attributes.icon;const n=Ht(e.entity_id);return gt[n]||"mdi:help-circle"}(this._config,t,e),n=function(t,e,i){const a=Ot(t.state_appearances,e.state,i?.state);return a?.label?a.label:e.state.replace(/_/g," ").toUpperCase()}(this._config,t,e),o=function(t,e,i){const a=Ot(t.state_appearances,e.state,i?.state);if(void 0!==a?.animate)return a.animate;const n=Ht(e.entity_id),o=Pt[n];return o?.includes(e.state)||!1}(this._config,t,e),s=function(t,e){return void 0!==t.name?t.name:e.attributes.friendly_name||"Button"}(this._config,t),r=!1!==this._config.show_name,c=!1!==this._config.show_label;return B`
      <ha-card
        style="${this._getCardStyle()}"
        @click=${this._handleTap}
        @pointerdown=${this._handlePointerDown}
        @pointerup=${this._handlePointerUp}
        @pointercancel=${this._handlePointerUp}
      >
        <div class="button-layout" style="border-bottom: 3px solid ${i}">
          <ha-icon
            class="btn-icon ${o?"animate":""}"
            icon=${a}
            style="color: ${i}"
          ></ha-icon>
          ${r?B`<span class="btn-name">${s}</span>`:W}
          ${c?B`<span class="btn-label" style="color: ${i}">${n}</span>`:W}
        </div>
      </ha-card>
      ${this._renderCameraReveal(i)}
    `}};t([pt({attribute:!1})],It.prototype,"hass",void 0),t([ut()],It.prototype,"_config",void 0),t([ut()],It.prototype,"_cameras",void 0),t([ut()],It.prototype,"_camerasOpen",void 0),It=t([lt(_t)],It),window.customCards=window.customCards||[],window.customCards.push({type:_t,name:"Status Button Card by akaDashe",description:"A customisable button card focused on entity status with state-based icons, colors, and labels",preview:!0});export{It as StatusButtonCard};
