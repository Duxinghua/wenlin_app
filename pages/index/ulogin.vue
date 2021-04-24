<template>
	<view class="ulogin">
		<image src="../../static/image/ulogo.png" class="logo"></image>
		<view class="inputitem">
			<view class="label">
				账号：
			</view>
			<input type="text" placeholder="请输入账号" v-model="mobile" />
		</view>
		<view class="inputitem">
			<view class="label">
				密码：
			</view>
			<input type="password" placeholder="请输入密码" v-model="password" />
		</view>
		<view class="submit" @click="loginHandler">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				mobile:'',
				password:''
			}
		},
		onLoad() {
			
		},
		methods:{
			loginHandler(){
				if(!this.mobile){
					return this.$u.toast('请输入手机号')
				}
				if(!this.password){
					return this.$u.toast('请输入密码')
				}
				this.$u.api.wxAdminLoginBySecret({mobile:this.mobile,password:this.password}).then((result)=>{
						uni.setStorageSync('token',result.token)
						uni.setStorageSync('wxadmin',result.wxadmin)
						uni.redirectTo({
							url:'/pages/index/index'
						})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ulogin{
		background: white;
		width:100%;
		display: flex;
		flex-direction: column;
		padding:40rpx;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		height: 100vh;
		.logo{
			width: 160rpx;
			height: 223rpx;
		}
		.inputitem{
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 120rpx;
			width: 100%;
			padding-top:20rpx;
			border-bottom: 2rpx solid #F0EDF1;
			.label{
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #3C2D2D;
				width:120rpx;
			}
		}
		.inputitem:nth-of-type(1){
			margin-top:100rpx;
		}
		.submit{
			width: 499rpx;
			height: 97rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 97rpx;
			margin-top:220rpx;
			background: #FF9C00;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
