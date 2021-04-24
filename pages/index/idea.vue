<template>
	<view class="idea">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<u-input v-model="content" height="400" maxlength="500" :type="type" :border="border" placeholder="您的意见对我们非常重要，让我们一起把问邻做好，共建美好社区平台！"/>
			<view class="btns">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import navigationCustom from '@/components/struggler-navigationCustom/navigation-custom';
	export default{
		components:{
			navigationCustom
		},
		data(){
			return{
				config: {
					title: '给问邻提意见', //title
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
				type:'textarea',
				border:true,
				content:''
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.idea{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background: white;
		.content{
			padding:25rpx;
			box-sizing: border-box;
			.btns{
				width: 654rpx;
				height: 100rpx;
				background: #FF9C00;
				border-radius: 12rpx;
				text-align: center;
				line-height: 100rpx;
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				position: fixed;
				bottom: 100rpx;
				left:50%;
				transform: translateX(-50%);
			}
		}
	}
</style>
