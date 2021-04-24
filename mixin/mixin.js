module.exports = {
	data(){
		return {
			config: {
				title: '详情', //title
				bgcolor: 'white', //背景颜色
				fontcolor: 'rgba(51, 51, 51, 1)', //文字颜色，默认白色
				type: 1, //type 1，3胶囊 2，4无胶囊模式
				transparent: false, //是否背景透明 默认白色
				linear: false, //是为开启下滑渐变
				share: false //是否将主页按钮显示为分享按钮
				// menuIcon:"../static/icon/back_.png", 当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
				// menuText:"返回", 当type为3或4的时候icon右边的文字
			},
			scrollTop: 0, // 当linear为true的时候需要通过onpagescroll传递参数
			scrollMaxHeight: 200, //滑动的高度限制，超过这个高度即背景全部显示
		}
	},
	onLoad() {
		
	},
	methods:{
		setTitle(title){
			this.config.title = title
		},
		customConduct(){
			
		}
	}
}
