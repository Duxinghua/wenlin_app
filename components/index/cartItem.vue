<template>
	<view class="listitem">
		<view class="title" v-if="item.content">
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
		<view class="tool" @click="selectHandler">
			<view class="time">
				{{item.create_time | formatTime}}
			</view>
			<view class="arrow" >
				<view class="aritem" v-for="(item,index) in 3" :index="index" :key="index"></view>
			</view>
		</view>
		
		<u-popup v-model="toolShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="359" closeable="true">
			<view class="toolTips">
				<view class="toolitem" v-if="false">
					<image src="../../static/image/t1.png" class="icot"></image>
					<view class="labelt">分享</view>
				</view>
				<view class="toolitem" @click="edit">
					<image src="../../static/image/t2.png" class="icot"></image>
					<view class="labelt">修改</view>
				</view>
				<view class="toolitem" @click="del">
					<image src="../../static/image/t3.png" class="icot"></image>
					<view class="labelt">删除</view>
				</view>
			</view>
		</u-popup>
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
				toolShow:false
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
			selectHandler(){
				this.toolShow = true
			},
			edit(){
				uni.navigateTo({
					url:'/pages/index/exposure?id='+this.item.id
				})
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
		.toolTips{
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100%;
			.toolitem{
				width: 33.33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100%;
				.icot{
					width:82rpx;
					height:82rpx;
					margin-bottom: 28rpx;
				}
				.labelt{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #020433;
				}
			}
		}
	}
</style>
