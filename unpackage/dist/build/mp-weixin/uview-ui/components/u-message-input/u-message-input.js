(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-message-input/u-message-input"],{"1e1f":function(t,e,n){"use strict";n.r(e);var a=n("e1a4"),r=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=r.a},6391:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"6c21":function(t,e,n){"use strict";var a=n("ffbd"),r=n.n(a);r.a},df9e:function(t,e,n){"use strict";n.r(e);var a=n("6391"),r=n("1e1f");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n("6c21");var i,l=n("f0c5"),o=Object(l["a"])(r["default"],a["b"],a["c"],!1,null,"3660cb29",null,!1,a["a"],i);e["default"]=o.exports},e1a4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-message-input",props:{maxlength:{type:[Number,String],default:4},dotFill:{type:Boolean,default:!1},mode:{type:String,default:"box"},value:{type:[String,Number],default:""},breathe:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},bold:{type:Boolean,default:!1},fontSize:{type:[String,Number],default:60},activeColor:{type:String,default:"#2979ff"},inactiveColor:{type:String,default:"#606266"},width:{type:[Number,String],default:"80"},disabledKeyboard:{type:Boolean,default:!1}},watch:{value:{immediate:!0,handler:function(t){t=String(t),this.valueModel=t.substring(0,this.maxlength)}}},data:function(){return{valueModel:""}},computed:{animationClass:function(){var t=this;return function(e){return t.breathe&&t.charArr.length==e?"u-breathe":""}},charArr:function(){return this.valueModel.split("")},charArrLength:function(){return this.charArr.length},loopCharArr:function(){return new Array(this.maxlength)}},methods:{getVal:function(t){var e=t.detail.value;this.valueModel=e,String(e).length>this.maxlength||(this.$emit("change",e),String(e).length==this.maxlength&&this.$emit("finish",e))}}};e.default=a},ffbd:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-message-input/u-message-input-create-component',
    {
        'uview-ui/components/u-message-input/u-message-input-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("df9e"))
        })
    },
    [['uview-ui/components/u-message-input/u-message-input-create-component']]
]);
