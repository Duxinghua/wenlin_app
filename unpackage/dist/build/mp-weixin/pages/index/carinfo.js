(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/carinfo"],{1027:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){e.e("components/struggler-navigationCustom/navigation-custom").then(function(){return resolve(e("0d2f"))}.bind(null,e)).catch(e.oe)},o=function(){e.e("components/index/cartItem").then(function(){return resolve(e("0c43"))}.bind(null,e)).catch(e.oe)},c={components:{navigationCustom:i,CartItem:o},data:function(){return{sexlist:["女","男","保密"],num:3,config:{title:"车辆查询详情",bgcolor:"white",fontcolor:"rgba(51, 51, 51, 1)",type:1,transparent:!1,linear:!1,share:!1},scrollTop:0,scrollMaxHeight:200,keyword:"",carInputShow:!1,nocarShow:!1,id:"",detail:{car_detail:{},illegal_list:[]}}},onLoad:function(t){this.id=t.id,this.getDetail()},methods:{getDetail:function(){var t=this,n={car_id:this.id};this.$u.api.carDetail(n).then((function(n){t.$nextTick((function(){t.detail=n,t.$forceUpdate()}))}))},pushCar:function(){t.redirectTo({url:"/pages/index/exposure"})},call:function(){var n=this;t.makePhoneCall({phoneNumber:n.detail.car_detail.user_mobile})}}};n.default=c}).call(this,e("543d")["default"])},"7e86":function(t,n,e){"use strict";e.r(n);var i=e("cb46"),o=e("ef9c");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("e6a4");var u,a=e("f0c5"),r=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,"ef4e2444",null,!1,i["a"],u);n["default"]=r.exports},9834:function(t,n,e){"use strict";(function(t){e("8cdf");i(e("66fd"));var n=i(e("7e86"));function i(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},cb46:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var i={uSection:function(){return e.e("uview-ui/components/u-section/u-section").then(e.bind(null,"5b94"))}},o=function(){var t=this,n=t.$createElement;t._self._c},c=[]},d499:function(t,n,e){},e6a4:function(t,n,e){"use strict";var i=e("d499"),o=e.n(i);o.a},ef9c:function(t,n,e){"use strict";e.r(n);var i=e("1027"),o=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=o.a}},[["9834","common/runtime","common/vendor"]]]);