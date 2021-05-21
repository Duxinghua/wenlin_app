<template>
	<view class="tops">
		<image src="../../static/image/o1.png" class="logo"></image>
		<view class="udes">
			<view class="unamew">
				<text>用户昵称七个字</text>
				<view class="tips">物业</view>
			</view>
			<view class="number">
				{{ item.create_time | formatTime }}
				<text>浏览量420</text>
			</view>
		</view>
		<view class="arrow" @click.stop="selectHandler"><view class="aritem" v-for="(item, index) in 3" :index="index" :key="index"></view></view>
		
	</view>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object,
				default:{
					create_time:''
				}
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			selectHandler(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tops{
		display: flex;
		flex-direction: row;
		align-items: center;
		width:100%;
		.logo{
			width:80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 30rpx;
		}
		.udes{
			display: flex;
			flex-direction: column;
			width:525rpx;
			.unamew{
				display: flex;
				flex-direction: row;
				align-items: center;
				text{
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #020433;
					margin-right: 20rpx;
				}
				.tips{
					width: 66rpx;
					height: 30rpx;
					background: #08C299;
					border-radius: 10rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color:#ffffff;
					line-height: 30rpx;
					text-align: center;
				}
			}
			.number{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #95A0B6;
				margin-top:13rpx;
				text{
					padding-left:20rpx
				}
			}
		}
		.arrow {
			display: flex;
			flex-direction: row;
			margin-left: auto;
			.aritem {
				width: 8rpx;
				height: 8rpx;
				background: #95a0b6;
				border: 4rpx solid #95a0b6;
				border-radius: 50%;
				margin-left: 5rpx;
			}
		}
	}
</style>
