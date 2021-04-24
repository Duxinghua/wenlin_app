<template>
	<view class="listitem">
		<view class="title">
			<text class="label" v-if="false">
				#物业通知
			</text>
			{{item.content}}
		</view>
		<view class="imglist" v-if="item.images">
			<view v-if="sindex < 3" :class="[item.images.length > 2 ? 'imgitem' : (item.images.length == 2 ? 'imgitem2' : (item.images.length == 1 ? 'imgitem3' : ''))]" v-for="(sitem,sindex) in item.images" :index="sindex" :key="sindex">
				<u-image :src="sitem" :height="autoHeight(item.images.length)" mode="aspectFill"></u-image>
			</view>
		</view>
		<view class="tool" @click="selectHandler(item)">
			<view class="time">
				{{item.create_time | formatTime}}
			</view>
			<view class="arrow" >
				<view class="aritem" v-for="(item,index) in 3" :index="index" :key="index"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			autoHeight(l){
				if(l == 1){
					return 380
				}else if(l == 2){
					return 260
				}else if(l > 2){
					return 173
				}
			},
			selectHandler(item){
				this.$emit('selectHandler',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listitem{
		display: flex;
		flex-direction: column;
		padding:35rpx 25rpx;
		background: white;
		margin-bottom: 20rpx;
		.title{
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color:#020433;
			margin-bottom: 15rpx;
			.label{
				color: #FF9C00;
				margin-right: 20rpx;
			}
		}
		.imglist{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-bottom: 34rpx;
			.imgitem{
				width: 226rpx;
				height: 173rpx;
				margin-right: 14rpx;
				border-radius: 10rpx;
				position: relative;
			}
			.imgitem:nth-of-type(3){
				margin-right: 0rpx;
			}
			.imgitem:nth-child(1) {
				border-radius: 7upx 0 0 7upx;
				overflow: hidden;
			}
			.imgitem:nth-child(3n) {
				border-radius: 0upx 7upx 7upx 0;
				margin-right: 0upx;
				overflow: hidden;
			}
			.imgitem2 {
				width: calc(50% - 5upx);
				height: 260upx;
				border-radius: 7upx 0 0 7upx;
				overflow: hidden;
			}
			.imgitem2:nth-child(2) {
				width: calc(50% - 5upx);
				margin-left:auto;
				height: 260upx;
				border-radius: 0upx 7upx 7upx 0;
				overflow: hidden;
			}
			.imgitem3 {
				width: 100%;
				height: 380upx;
				border-radius: 7upx;
				overflow: hidden;
			}
		}
		.tool{
			display: flex;
			flex-direction: row;
			align-items: center;
			.time{
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #95A0B6;
			}
			.arrow{
				display: flex;
				flex-direction: row;
				margin-left:auto;
				.aritem{
					width: 8rpx;
					height: 8rpx;
					background: #95A0B6;
					border: 4rpx solid #95A0B6;
					border-radius: 50%;
					margin-left:5rpx;
				}
			}
		}
	}
</style>
