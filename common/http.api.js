// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	//手机号授权登录
	let wxadminLogin = (params = {}) => vm.$u.get('wxadmin/wx_login/wxadminLogin', params);
	
	// 此处使用了传入的params参数，一切自定义即可
	//通过code登录
	let wxAdminLoginByCode = (params = {}) => vm.$u.post('wxadmin/wx_login/wxAdminLoginByCode', params);
	
	//账号和密码登录
	let wxAdminLoginBySecret = (params = {}) => vm.$u.post('wxadmin/wx_login/wxAdminLoginBySecret', params);
	
	//发布界面的小区列表（选择） {{online}}/api/wxadmin/community/adminCommunity
	let adminCommunity = (params = {}) => vm.$u.post('wxadmin/community/adminCommunity', params);
	
	//发布车辆违停曝光 wxadmin/communityCar/publishIllegalstop
	let publishIllegalstop = (params = {}) => vm.$u.post('wxadmin/community_car/publishIllegalstop', params);
	
	//查询车辆 wxadmin/communityCar/searchCar
	let searchCar = (params = {}) => vm.$u.post('wxadmin/community_car/searchCar', params);
	
	//{{localhost}}/api/wxadmin/community_car/getIllegalstopPublish  获取发布列表
	let getIllegalstopPublish = (params = {}) => vm.$u.post('wxadmin/community_car/getIllegalstopPublish', params);
	//{{localhost}}/api/wxadmin/community_car/illegalstopDetail 发布详情 id
	let illegalstopDetail = (params = {}) => vm.$u.post('wxadmin/community_car/illegalstopDetail', params);
	//{{localhost}}/api/wxadmin/community_car/illegalstopList  违停排行榜
	let illegalstopList = (params = {}) => vm.$u.post('wxadmin/community_car/illegalstopStatistics', params);
	//{{localhost}}/api/wxadmin/community_car/carDetail 车辆详情
	let carDetail = (params = {}) => vm.$u.post('wxadmin/community_car/carDetail', params);
	//{{online}}/api/wxadmin/community_notices/add 新增公告
	let noticesAdd = (params = {}) => vm.$u.post('wxadmin/community_notices/add', params);
	//api/wxadmin/community_activity/add 新增机构活动
	let communityActivityAdd = (params = {}) => vm.$u.post('wxadmin/community_activity/add', params);
    //修改车辆违停曝光 {{localhost}}/api/wxadmin/community_car/editIllegalstop
	let editIllegalstop = (params = {}) => vm.$u.post('wxadmin/community_car/editIllegalstop', params);
	//车辆违停删除 {{localhost}}/api/wxadmin/community_car/illegalstopDelete
	let illegalstopDelete = (params = {}) => vm.$u.post('wxadmin/community_car/illegalstopDelete', params);
	//获取发布的公告 {{online}}/api/wxadmin/community_notices/getList
	let noticesgetList = (params = {}) => vm.$u.post('wxadmin/community_notices/getList', params);	
	//公告详情 {{online}}/api/wxadmin/community_notices/detail
	let noticesdetail = (params = {}) => vm.$u.post('wxadmin/community_notices/detail', params);
	//修改机构公告 {{online}}/api/wxadmin/community_notices/edit
	let noticesedit = (params = {}) => vm.$u.post('wxadmin/community_notices/edit', params);
	//公告删除 {{online}}/api/wxadmin/community_notices/delete
	let noticesdelete = (params = {}) => vm.$u.post('wxadmin/community_notices/delete', params);
	//获取发布的活动  {{online}}/api/wxadmin/community_activity/getList
	let communityactivityGetList = (params = {}) => vm.$u.post('wxadmin/community_activity/getList', params);
	//活动删除 {{online}}/api/wxadmin/community_activity/delete
	let communityactivitydelete = (params = {}) => vm.$u.post('wxadmin/community_activity/delete', params);
	//活动详情 {{localhost}}/api/wxadmin/community_activity/detail
	let communityactivitydetail = (params = {}) => vm.$u.post('wxadmin/community_activity/detail', params);	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		wxadminLogin, 
		wxAdminLoginByCode,
		wxAdminLoginBySecret,
		adminCommunity,
		publishIllegalstop,
		searchCar,
		getIllegalstopPublish,
		illegalstopList,
		illegalstopDetail,
		carDetail,
		noticesAdd,
		communityActivityAdd,
		editIllegalstop,
		illegalstopDelete,
		noticesgetList,
		noticesdetail,
		noticesedit,
		noticesdelete,
		communityactivityGetList,
		communityactivitydelete,
		communityactivitydetail
	};
}

export default {
	install
}