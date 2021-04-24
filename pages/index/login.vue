<template>
	<view class="login">
		<image class="bg" src="../../static/image/bg.png" ></image>
		<view class="btn">一键登录</view>
		<view class="btn ubtn" @click="target">账号登录</view>
		<view class="info">问邻机构版</view>
	</view>
</template>

<script>
    export default {
		data(){
			return {
			
			}
		},
		onLoad() {
			
		},
		methods:{
			target(){
				uni.navigateTo({
					url:'/pages/index/ulogin'
				})
			}
		}
	}
</script>

<style lang="scss">
	.login{
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		.bg{
			width:100%;
			height:1004rpx;
		}
		.btn{
			width: 499rpx;
			height: 97rpx;
			line-height: 97rpx;
			text-align: center;
			background: #FF9C00;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #FFFFFF;
			margin:87rpx auto 29rpx auto;
			border-radius: 45rpx;
		}
		.ubtn{
			background: #EEF2FA;
			color:#95A0B6;
			margin-top: 0rpx;
		}
		.info{
			font-size: 25rpx;
			display: block;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #0D1C3F;
			margin:100rpx auto 50rpx auto;
			text-align: center;
		}
	}
</style>
