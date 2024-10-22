(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",p="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+_(i,2,"0")+":"+_(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,l),r=n-s<0,a=t.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=f;var g="$isDayjsObject",$=function(e){return e instanceof D||!(!e||!e[g])},M=function e(t,n,i){var s;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(s=r),n&&(b[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;b[o]=t,s=o}return!i&&s&&(y=s),s||!i&&y},w=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},T=m;T.l=M,T.i=$,T.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function f(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var _=f.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return T},_.isValid=function(){return!(this.$d.toString()===p)},_.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return w(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<w(e)},_.$g=function(e,t,n){return T.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,c=!!T.u(t)||t,p=T.p(e),v=function(e,t){var i=T.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?i:i.endOf(a)},h=function(e,t){return T.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},f=this.$W,_=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case d:return c?v(1,0):v(31,11);case l:return c?v(1,_):v(0,_+1);case o:var b=this.$locale().weekStart||0,g=(f<b?f+7:f)-b;return v(c?m-g:m+(6-g),_);case a:case u:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var o,c=T.p(e),p="set"+(this.$u?"UTC":""),v=(o={},o[a]=p+"Date",o[u]=p+"Date",o[l]=p+"Month",o[d]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],h=c===a?this.$D+(t-this.$W):t;if(c===l||c===d){var f=this.clone().set(u,1);f.$d[v](h),f.init(),this.$d=f.set(u,Math.min(this.$D,f.daysInMonth())).$d}else v&&this.$d[v](h);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[T.p(e)]()},_.add=function(n,c){var u,p=this;n=Number(n);var v=T.p(c),h=function(e){var t=w(p);return T.w(t.date(t.date()+Math.round(e*n)),p)};if(v===l)return this.set(l,this.$M+n);if(v===d)return this.set(d,this.$y+n);if(v===a)return h(1);if(v===o)return h(7);var f=(u={},u[s]=e,u[r]=t,u[i]=1e3,u)[v]||1,_=this.$d.getTime()+n*f;return T.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=n.meridiem,u=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},v=function(e){return T.s(r%12||12,e,"0")},f=d||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return T.s(t.$y,4,"0");case"M":return o+1;case"MM":return T.s(o+1,2,"0");case"MMM":return u(n.monthsShort,o,c,3);case"MMMM":return u(c,o);case"D":return t.$D;case"DD":return T.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return u(n.weekdaysMin,t.$W,l,2);case"ddd":return u(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return T.s(r,2,"0");case"h":return v(1);case"hh":return v(2);case"a":return f(r,a,!0);case"A":return f(r,a,!1);case"m":return String(a);case"mm":return T.s(a,2,"0");case"s":return String(t.$s);case"ss":return T.s(t.$s,2,"0");case"SSS":return T.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,u,p){var v,h=this,f=T.p(u),_=w(n),m=(_.utcOffset()-this.utcOffset())*e,y=this-_,b=function(){return T.m(h,_)};switch(f){case d:v=b()/12;break;case l:v=b();break;case c:v=b()/3;break;case o:v=(y-m)/6048e5;break;case a:v=(y-m)/864e5;break;case r:v=y/t;break;case s:v=y/e;break;case i:v=y/1e3;break;default:v=y}return p?v:T.a(v)},_.daysInMonth=function(){return this.endOf(l).$D},_.$locale=function(){return b[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=M(e,t,!0);return i&&(n.$L=i),n},_.clone=function(){return T.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},f}(),S=D.prototype;return w.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(e){S[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,D,w),e.$i=!0),w},w.locale=M,w.isDayjs=$,w.unix=function(e){return w(1e3*e)},w.en=b[y],w.Ls=b,w.p={},w}()},646:function(e){e.exports=function(){"use strict";var e,t,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2628e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:o,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},u=function(e){return e instanceof y},p=function(e,t,n){return new y(e,n,t.$l)},v=function(e){return t.p(e)+"s"},h=function(e){return e<0},f=function(e){return h(e)?Math.ceil(e):Math.floor(e)},_=function(e){return Math.abs(e)},m=function(e,t){return e?h(e)?{negative:!0,format:""+_(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},y=function(){function h(e,t,n){var i=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return p(e*d[v(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){i.$d[v(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var s=e.match(c);if(s){var r=s.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var _=h.prototype;return _.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*d[n]}),0)},_.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=f(e/o),e%=o,this.$d.months=f(e/l),e%=l,this.$d.days=f(e/r),e%=r,this.$d.hours=f(e/s),e%=s,this.$d.minutes=f(e/i),e%=i,this.$d.seconds=f(e/n),e%=n,this.$d.milliseconds=e},_.toISOString=function(){var e=m(this.$d.years,"Y"),t=m(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=m(n,"D"),s=m(this.$d.hours,"H"),r=m(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=m(a,"S"),l=e.negative||t.negative||i.negative||s.negative||r.negative||o.negative,c=s.format||r.format||o.format?"T":"",d=(l?"-":"")+"P"+e.format+t.format+i.format+c+s.format+r.format+o.format;return"P"===d||"-P"===d?"P0D":d},_.toJSON=function(){return this.toISOString()},_.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(e,t){return t||String(i[e])}))},_.as=function(e){return this.$ms/d[v(e)]},_.get=function(e){var t=this.$ms,n=v(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?f(t/d[n]):this.$d[n],t||0},_.add=function(e,t,n){var i;return i=t?e*d[v(t)]:u(e)?e.$ms:p(e,this).$ms,p(this.$ms+i*(n?-1:1),this)},_.subtract=function(e,t){return this.add(e,t,!0)},_.locale=function(e){var t=this.clone();return t.$l=e,t},_.clone=function(){return p(this.$ms,this)},_.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},_.valueOf=function(){return this.asMilliseconds()},_.milliseconds=function(){return this.get("milliseconds")},_.asMilliseconds=function(){return this.as("milliseconds")},_.seconds=function(){return this.get("seconds")},_.asSeconds=function(){return this.as("seconds")},_.minutes=function(){return this.get("minutes")},_.asMinutes=function(){return this.as("minutes")},_.hours=function(){return this.get("hours")},_.asHours=function(){return this.as("hours")},_.days=function(){return this.get("days")},_.asDays=function(){return this.as("days")},_.weeks=function(){return this.get("weeks")},_.asWeeks=function(){return this.as("weeks")},_.months=function(){return this.get("months")},_.asMonths=function(){return this.as("months")},_.years=function(){return this.get("years")},_.asYears=function(){return this.as("years")},h}(),b=function(e,t,n){return e.add(t.years()*n,"y").add(t.months()*n,"M").add(t.days()*n,"d").add(t.hours()*n,"h").add(t.minutes()*n,"m").add(t.seconds()*n,"s").add(t.milliseconds()*n,"ms")};return function(n,i,s){e=s,t=s().$utils(),s.duration=function(e,t){var n=s.locale();return p(e,{$l:n},t)},s.isDuration=u;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(e,t){return u(e)?b(this,e,1):r.bind(this)(e,t)},i.prototype.subtract=function(e,t){return u(e)?b(this,e,-1):a.bind(this)(e,t)}}}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class i{getTemplate(){return'<form class="event event--edit" action="#" method="post">\n          <header class="event__header">\n            <div class="event__type-wrapper">\n              <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                <span class="visually-hidden">Choose event type</span>\n                <img class="event__type-icon" width="17" height="17" src="img/icons/bus.png" alt="Event type icon">\n              </label>\n              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n              <div class="event__type-list">\n                <fieldset class="event__type-group">\n                  <legend class="visually-hidden">Event type</legend>\n\n                  <div class="event__type-item">\n                    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>\n                    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">\n                    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n                  </div>\n\n                  <div class="event__type-item">\n                    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n                  </div>\n                </fieldset>\n              </div>\n            </div>\n\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-1">\n                Bus\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n              <datalist id="destination-list-1">\n                <option value="Amsterdam"></option>\n                <option value="Geneva"></option>\n                <option value="Chamonix"></option>\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-1">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-1">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-1">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">Cancel</button>\n          </header>\n\n          <section class="event__details">\n            <section class="event__section  event__section--destination">\n              <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n              <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n              <div class="event__photos-container">\n                <div class="event__photos-tape">\n                  <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n                  <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n                  <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n                  <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n                  <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n                </div>\n              </div>\n            </section>\n          </section>\n        </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const s=36e5,r={TAXI:"taxi",BUS:"bus",TRAIN:"train",SHIP:"ship",DRIVE:"drive",FLIGHT:"flight",CHECK_IN:"check-in",SIGHTSEEING:"sightseeing",RESTAURANT:"restaurant"},a="hh:mm",o="YYYY-MM-DD",l="add",c="edit",d={id:null,basePrice:0,dateFrom:"",dateTo:"",destination:"",isFavorite:!1,offers:[],type:r.TRAIN};var u=n(484),p=n.n(u),v=n(646),h=n.n(v);p().extend(h());const f=(e,t)=>e?p()(e).format(t):"",_=e=>e.replace(e[0],e[0].toUpperCase());class m{constructor({points:e=d,offers:t,destinations:n,editType:i}){this.points=e,this.offersApp=t,this.destinationsApp=n,this.editType=i}getTemplate(){return function(e,t,n,i){const{basePrice:s,offers:a,destination:o,type:c}=e,d=(u=c,Object.values(r).map((e=>`<div class="event__type-item">\n        <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===u?"checked":""}>\n        <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${_(e)}</label>\n      </div>`)).join(""));var u;const p=function(e){return e?`<section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n          ${e}\n        </div>\n      </section>`:""}(function(e,t){return e.offers?e.offers.map((({title:e,price:n,id:i})=>{const s=e.split(" ").findLast((e=>e.length>3)).toLowerCase();return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${s}-1" type="checkbox" name="event-offer-${s}" ${t.includes(i)?"checked":""}>\n        <label class="event__offer-label" for="event-offer-${s}-1">\n          <span class="event__offer-title">${e}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${n}</span>\n        </label>\n      </div>`})).join(""):""}(t.find((e=>e.type===c)),a)),v=n.find((e=>e.id===o)),h=function(e){return e?`<section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${e}</p>\n      </section>`:""}(function(e,t){return e?t===l?e.description:`${e.description}\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n            ${e.pictures.map((({src:e,description:t})=>`<img class="event__photo" src="${e}" alt="${t}"></img>`)).join("")}\n            </div>\n          </div>`:""}(v,i)),f=_(c),m=v?v.name:"",y=function(e){return e===l?'<button class="event__reset-btn" type="reset">Cancel</button>':'<button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>'}(i);return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${c}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                ${d}\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              ${f}\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${m}" list="destination-list-1">\n            <datalist id="destination-list-1">\n              <option value="Amsterdam"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">\n            —\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              €\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${s}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          ${y}\n        </header>\n\n        <section class="event__details">\n          ${p}\n          ${h}\n        </section>\n      </form>\n    </li>`}(this.points,this.offersApp,this.destinationsApp,this.editType)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{constructor({point:e,offers:t,destinations:n}){this.point=e,this.offersApp=t,this.destinationsApp=n}getTemplate(){return((e,t,n)=>{const{basePrice:i,dateFrom:r,dateTo:l,offers:c,destination:d,isFavorite:u,type:v}=e,h=f(r,"MMM D"),m=f(r,a),y=f(l,a),b=f(r,o),g=f(r,o),$=((e,t)=>{const n=p()(t).diff(p()(e));let i;switch(!0){case n>=864e5:i=p().duration(n).format("DD[D] HH[H] mm[M]");break;case n>=s:i=p().duration(n).format("HH[H] mm[M]");break;case n<s:i=p().duration(n).format("mm[M]")}return i})(r,l),M=((e,t)=>e.offers?e.offers.filter((e=>t.includes(e.id))).map((({title:e,price:t})=>`<li class="event__offer">\n          <span class="event__offer-title">${e}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t}</span>\n        </li>`)).join(""):"")(t.find((e=>e.type===v)),c),w=((e,t)=>{const n=_(t);return e?`${n} ${e.name}`:`${n}`})(n.find((e=>e.id===d)),v);return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${b}">${h}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${v}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${w}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${b}T${m}">${m}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${g}T${y}">${y}</time>\n          </p>\n          <p class="event__duration">${$}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n           ${M}\n        </ul>\n        <button class="${u?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn"}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`})(this.point,this.offersApp,this.destinationsApp)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n          <div class="trip-sort__item  trip-sort__item--day">\n            <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n            <label class="trip-sort__btn" for="sort-day">Day</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--event">\n            <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n            <label class="trip-sort__btn" for="sort-event">Event</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--time">\n            <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n            <label class="trip-sort__btn" for="sort-time">Time</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--price">\n            <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n            <label class="trip-sort__btn" for="sort-price">Price</label>\n          </div>\n\n          <div class="trip-sort__item  trip-sort__item--offer">\n            <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n            <label class="trip-sort__btn" for="sort-offer">Offers</label>\n          </div>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class g{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=[{id:"destination-1",description:"Nagasaki - with crowded streets",name:"Nagasaki",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/19.jpg",description:"Nagasaki with an embankment of a mighty river as a centre of attraction"},{src:"https://loremflickr.com/248/152/chamonix,city?lock=1094",description:"Chamonix image"}]},{id:"destination-2",description:"Munich - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Munich",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Munich with an embankment of a mighty river as a centre of attraction"},{src:"https://24.objects.htmlacademy.pro/static/destinations/15.jpg",description:"Munich in a middle of Europe"},{src:"https://24.objects.htmlacademy.pro/static/destinations/12.jpg",description:"Munich for those who value comfort and coziness"}]},{id:"destination-3",description:"Chamonix - in a middle of Europe",name:"Chamonix",pictures:[]},{id:"destination-4",description:"Rome - with crowded streets",name:"Rome",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Rome middle-eastern paradise"},{src:"https://24.objects.htmlacademy.pro/static/destinations/14.jpg",description:"Rome famous for its crowded street markets with the best street food in Asia"},{src:"https://24.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Rome a perfect place to stay with a family"}]}],M=[{type:"taxi",offers:[{id:"taxi-1",title:"Upgrade to a business class",price:48},{id:"taxi-2",title:"Choose the radio station",price:141}]},{type:"flight",offers:[{id:"flight-1",title:"Choose meal",price:142},{id:"flight-2",title:"Choose seats",price:90},{id:"flight-3",title:"Upgrade to comfort class",price:215}]},{type:"train",offers:[{id:"train-1",title:"Book a taxi at the arrival point",price:152},{id:"train-2",title:"Order a breakfast",price:30},{id:"train-3",title:"Wake up at a certain time",price:44}]},{type:"drive",offers:[{id:"drive-1",title:"With automatic transmission",price:144},{id:"drive-2",title:"With air conditioning",price:95}]}],w=[{id:2,basePrice:1294,dateFrom:"2024-10-25T18:41:09.899Z",dateTo:"2024-10-27T09:05:09.899Z",destination:"destination-2",isFavorite:!0,offers:["flight-1","flight-2"],type:"flight"},{id:3,basePrice:1619,dateFrom:"2024-10-28T15:57:09.899Z",dateTo:"2024-10-29T03:09:09.899Z",destination:"destination-3",isFavorite:!1,offers:["taxi-1","taxi-2"],type:"taxi"},{id:4,basePrice:6096,dateFrom:"2024-10-30T12:44:09.899Z",dateTo:"2024-11-01T12:11:09.899Z",destination:"destination-4",isFavorite:!1,offers:["drive-1","drive-2"],type:"drive"},{id:5,basePrice:3295,dateFrom:"2024-11-03T06:31:09.899Z",dateTo:"2024-11-04T03:00:09.899Z",destination:"destination-4",isFavorite:!1,offers:["train-1","train-2","train-3"],type:"train"}];function T(){return(e=w)[Math.floor(Math.random()*e.length)];var e}const D=document.querySelector(".trip-main"),S=document.querySelector(".page-body"),k=S.querySelector(".trip-controls__filters"),x=S.querySelector(".trip-events"),E=new class{points=Array.from({length:4},T);offers=M;destinations=$;getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}},O=new class{eventsList=new g;constructor({boardContainer:e,pointsModel:t}){this.boardContainer=e,this.pointsModel=t}init(){this.points=[...this.pointsModel.getPoints()],this.offers=[...this.pointsModel.getOffers()],this.destinations=[...this.pointsModel.getDestinations()],t(new b,this.boardContainer),t(this.eventsList,this.boardContainer),t(new m({point:this.points[0],offers:this.offers,destinations:this.destinations,editType:c}),this.eventsList.getElement()),t(new i({point:this.points[0],offers:this.offers,destinations:this.destinations,editType:l}),this.eventsList.getElement());for(let e=0;e<this.points.length;e++)t(new y({point:this.points[e],offers:this.offers,destinations:this.destinations}),this.eventsList.getElement())}}({boardContainer:x,pointsModel:E});t(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},D,"afterbegin"),t(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n            <div class="trip-filters__filter">\n              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n              <label class="trip-filters__filter-label" for="filter-future">Future</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n              <label class="trip-filters__filter-label" for="filter-present">Present</label>\n            </div>\n\n            <div class="trip-filters__filter">\n              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n              <label class="trip-filters__filter-label" for="filter-past">Past</label>\n            </div>\n\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},k),O.init()})()})();
//# sourceMappingURL=bundle.ea51f29acf7954b054e4.js.map