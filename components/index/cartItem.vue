<template>
	<view class="listitem" @click="detailHandler">
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
		<view class="titles" v-if="item.title">
			{{item.title}}
		</view>
		<view class="title" v-if="item.content">
			<text class="label" v-if="false">#物业通知</text>
<!-- 			{{ item.content }} -->
			<u-parse :html="item.content"></u-parse>
		</view>
		<view class="imglist" v-if="item.images">
			<view
				v-if="sindex < 3"
				:class="[item.images.length > 2 ? 'imgitem' : item.images.length == 2 ? 'imgitem2' : item.images.length == 1 ? 'imgitem3' : '']"
				v-for="(sitem, sindex) in item.images"
				:index="sindex"
				:key="sindex"
			>
				<u-image :src="sitem" :height="autoHeight(item.images.length)" mode="aspectFill"></u-image>
			</view>
		</view>

		<u-popup v-model="toolShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="359" closeable="true">
			<view class="toolTips">
				<view class="toolitem" v-if="false">
					<image src="../../static/image/t1.png" class="icot"></image>
					<view class="labelt">分享</view>
				</view>
				<view class="toolitem" @click="edit" v-if="navindex != 2">
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
	props: {
		item: {
			type: Object
		},
		navindex:{
			type:[Number,String],
			default:0
		}
	},
	data() {
		return {
			toolShow: false
		};
	},
	methods: {
		autoHeight(l) {
			if (l == 1) {
				return 380;
			} else if (l == 2) {
				return 260;
			} else if (l > 2) {
				return 173;
			}
		},
		selectHandler() {
			this.toolShow = true;
		},
		edit() {
			this.toolShow = false;
			if(this.navindex == 0){
				uni.navigateTo({
					url: '/pages/index/exposure?id=' + this.item.id
				});
			}else if(this.navindex == 1){
				uni.navigateTo({
					url: '/pages/index/notices?id=' + this.item.id
				});
			}else if(this.navindex == 2){
				uni.navigateTo({
					url: '/pages/index/activity?id=' + this.item.id
				});
			}
		},
		detailHandler() {
			// uni.navigateTo({
			// 	url:'/pages/index/carinfo?id='+this.item.id
			// })
		},
		del() {
			this.toolShow = false;
			this.$emit('del', this.item.id);
		}
	}
};
</script>

<style lang="scss" scoped>
.listitem {
	display: flex;
	flex-direction: column;
	padding: 35rpx 25rpx;
	background: white;
	margin-bottom: 20rpx;
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
	.titles{
		width: 100%;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #020433;
		margin:28rpx auto;
	}
	.title {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #020433;
		margin-bottom: 15rpx;
		text-align: left;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		.label {
			color: #ff9c00;
			margin-right: 20rpx;
		}
	}
	.imglist {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-bottom: 34rpx;
		.imgitem {
			width: 226rpx;
			height: 173rpx;
			margin-right: 14rpx;
			border-radius: 10rpx;
			position: relative;
		}
		.imgitem:nth-of-type(3) {
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
			margin-left: auto;
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
	.tool {
		display: flex;
		flex-direction: row;
		align-items: center;
		.time {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #95a0b6;
		}

	}
	.toolTips {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		.toolitem {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			.icot {
				width: 82rpx;
				height: 82rpx;
				margin-bottom: 28rpx;
			}
			.labelt {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #020433;
			}
		}
	}
}
</style>
