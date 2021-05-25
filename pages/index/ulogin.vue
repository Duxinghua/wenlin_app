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
		<u-popup v-model="loginshow" closeable="true" mode="center" border-radius="20" >
			<view class="loginwrap">
				<view class="title">
					授权更新头像信息
				</view>
				<button class="btns" plain="true" open-type="getUserInfo" @getuserinfo="getuserinfo">
					授权更新
				</button>
				<view class="ubtns" @click="cancelHandler">
					取消
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				mobile:'',
				password:'',
				loginshow:false
			}
		},
		onLoad() {
			
		},
		methods:{
			getuserinfo(e){
				var userinfo = e.detail.userInfo
				this.$u.api.updateUserInfo({
					nickName:userinfo.nickName,
					avatarUrl:userinfo.avatarUrl,
					gender:userinfo.gender
				}).then((result)=>{
						this.$u.toast('更新成功')
						setTimeout(()=>{
							this.loginshow = false
							uni.reLaunch({
								url:'./index'
							})
						},300)
				
				})
			},
			cancelHandler(){
				uni.reLaunch({
					url:'./index'
				})
			},
			loginHandler(){
				var that = this
				if(!this.mobile){
					return this.$u.toast('请输入手机号')
				}
				if(!this.password){
					return this.$u.toast('请输入密码')
				}
				uni.login({
					success: (res) => {
						that.$u.api.wxAdminLoginBySecret({code:res.code,mobile:that.mobile,password:that.password}).then((result)=>{
								uni.setStorageSync('token',result.token)
								uni.setStorageSync('wxadmin',result.wxadmin)
								that.loginshow = true
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.loginwrap{
		width:450rpx;
		height: 450rpx;
		border-radius: 20rpx;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.title{
			font-size: 28rpx;
			color:#333333;
		}
		.btns{
			margin-top:50rpx;
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background: #FF9C00;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			color: #FFFFFF;
			border-radius: 30rpx;
			border:none
		}
		.ubtns{
			margin-top:50rpx;
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background: #EEF2FA;
			color:#95A0B6;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 500;
			border-radius: 30rpx;
			border:none
		}
	}
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
