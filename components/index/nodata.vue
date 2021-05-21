<template>
	<view class="nodata">
		<image src="../../static/image/nodata.png" class="img"></image>
		<view class="title">{{title}}</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'暂无违停记录'
			}
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nodata{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 400rpx;
		.img{
			width:458rpx;
			height: 291rpx;
		}
		.title{
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #95A0B6;
			margin-top: 36rpx;
		}
	}
</style>
