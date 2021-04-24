<template>
	<view class="index">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<view class="header">
				<view class="hitem" v-for="(item,index) in menu" :key="index" :index="index" @click="go(index)">
					<image :src="item.image" class="itembg"></image>
					<view class="label">
						{{item.label}}
					</view>
					<view class="des">
						{{item.des}}
					</view>
				</view>
			</view>
			<view class="navCate">
				<view :class="['navitem',navindex == index ? 'navactive' : '']" v-for="(item,index) in navlist" :key="index" :index="index" @click="navHandler(index)">
					{{item}}
				</view>
			</view>
			<view class="list">
				<view class="listitem" v-for="(item,index) in list" :key="index">
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
							04-12 12:00
						</view>
						<view class="arrow" >
							<view class="aritem" v-for="(item,index) in 3" :index="index" :key="index"></view>
						</view>
					</view>
				</view>
			</view>
			<image src="../../static/image/idea.png" class="idea" @click="go(4)"></image>
		</view>
		<!-- 发布活动 -->
		<u-popup v-model="pushActiveShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="458" closeable="true">
			<view class="pushActivetips">
				<view class="pushitem" @click="go(5)">
					<image src="../../static/image/a1.png" class="ico"></image>
					<view class="label">发布普通活动</view>
				</view>
				<view class="pushitem" @click="go(5)">
					<image src="../../static/image/a2.png" class="ico"></image>
					<view class="label">发布报名活动</view>
				</view>
			</view>
		</u-popup>
		<!-- 发布其他-->
		<u-popup v-model="pushOtherShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="636" closeable="true">
			<view class="pushOthertips">
				<view class="poitem" @click="go(6)">
					<image src="../../static/image/o1.png" class="icon"></image>
					<view class="label">
						发布曝光台信息
					</view>
				</view>
				<view class="poitem">
					<image src="../../static/image/o2.png" class="icon"></image>
					<view class="label">
						发布房产信息
					</view>
				</view>
				<view class="poitem">
					<image src="../../static/image/o3.png" class="icon"></image>
					<view class="label">
						发布新鲜事信息
					</view>
				</view>
				<view class="poitem">
					<image src="../../static/image/o4.png" class="icon"></image>
					<view class="label">
						发布招聘信息
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 工具 -->
		<u-popup v-model="toolShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="359" closeable="true">
			<view class="toolTips">
				<view class="toolitem">
					<image src="../../static/image/t1.png" class="icot"></image>
					<view class="labelt">分享</view>
				</view>
				<view class="toolitem">
					<image src="../../static/image/t2.png" class="icot"></image>
					<view class="labelt">修改</view>
				</view>
				<view class="toolitem">
					<image src="../../static/image/t3.png" class="icot"></image>
					<view class="labelt">删除</view>
				</view>
			</view>
		</u-popup>
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
					title: '首万物业', //title
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
				menu:[
					{
						label:'车辆查询',
						des:'查询、曝光违停',
						image:'../../static/image/navitem1.png'
					},
					{
						label:'发布通知',
						des:'公告通知推送到 业主微信',
						image:'../../static/image/navitem2.png'
					},
					{
						label:'发布活动',
						des:'发布普通活动、 报名活动',
						image:'../../static/image/navitem3.png'
					},
					{
						label:'发布其他',
						des:'发布曝光台、新鲜事 房产、招聘',
						image:'../../static/image/navitem4.png'
					}
				],
				navlist:[
					'我的发布'
					// '用户留言'
				],
				navindex:0,
				pushActiveShow:false,
				pushOtherShow:false,
				toolShow:false,
				page:1,
				page_size:10,
				total:0,
				list:[],
				selectObject:{}
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.total = 0
			this.page = 1
			this.getList()
		},
		onHide() {
			this.pushActiveShow = false
			this.pushOtherShow  = false
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
			go(index){
				if(index == 0){
					uni.navigateTo({
						url:'/pages/index/carsearch'
					})
				}else if(index == 1){
					uni.navigateTo({
						url:'/pages/index/notices'
					})
				}else if(index == 2){
					this.pushActiveShow = true
		
				}else if(index == 3){
					this.pushOtherShow  = true
				}else if(index == 4){
					uni.navigateTo({
						url:'/pages/index/idea'
					})
				}else if(index == 5){
					uni.navigateTo({
						url:'/pages/index/activity'
					})
				}else if(index == 6){
					uni.navigateTo({
						url:'/pages/index/exposure'
					})
				}
			},
			navHandler(index){
				this.navindex = index
			},
			getList(ismore){
				var data = {
					page:this.page,
					page_size:this.page_size
				}
				this.$u.api.getIllegalstopPublish(data).then((result)=>{
					this.total = result.total
					if(ismore){
						this.list = this.list.concat(result.list)
					}else{
						this.list = result.list
					}
				})
			},
			selectHandler(item){
				this.selectObject = item
				this.toolShow = true
			}
		},
		onReachBottom() {
			if(this.total >= this.page){
				this.page++
				this.getList(true)
			}
		}
	}
		
</script>

<style lang="scss" scoped>
	.index{
		background: white;
		display: flex;
		flex-direction: column;
		.content{
			display: flex;
			flex-direction: column;
			.header{
				padding: 25rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.hitem{
					width:335rpx;
					height: 169rpx;
					margin-bottom: 26rpx;
					position: relative;
					z-index: 20;
					margin-right: auto;
					padding:25rpx;
					box-sizing: border-box;
					.itembg{
						position: absolute;
						left:0;
						top:0;
						width: 100%;
						height: 100%;
						z-index: -1;
					}
					.label{
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FFFFFF;
						margin-bottom: 25rpx;
					}
					.des{
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						width:180rpx;
					}
				}
				.hitem:after{
					position: absolute;
					content:'';
					left:25rpx;
					top:78rpx;
					width: 45rpx;
					height: 4rpx;
					border-radius: 2rpx;
					background: #FFFFFF;
				}
				.hitem:nth-child(2n){
					margin-right: 0rpx;
				}
			}
			.navCate{
				height: 82rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 100%;
				border-bottom: 2rpx solid #EEF2FA;
				.navitem{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #020433;
					margin:0 65rpx;
					
				}
				.navactive{
					color:#FF9C00;
					position: relative;
				}
				.navactive:after{
					position: absolute;
					content:'';
					left:50%;
					transform: translateX(-50%);
					bottom: -18rpx;
					width: 44rpx;
					height: 7rpx;
					background: #FF9C00;
					border-radius: 4rpx;
				}
			}
			.list{
				display: flex;
				flex-direction: column;
				background: #F7F9FF;
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
							margin-right: 15rpx;
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
			}
			.idea{
				width: 106rpx;
				height: 106rpx;
				position: fixed;
				bottom:300rpx;
				right: 25rpx;
			}
		}
		.pushActivetips{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			height: 100%;
			.pushitem{
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 50%;
				.ico{
					width: 134rpx;
					height: 134rpx;
					margin-bottom: 45rpx;
				}
				.label{
					font-size: 34rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #404B69;
				}
			}
			.pushitem:nth-last-of-type(1){
				border-left: 2rpx solid #CBD0DA;
			}
		}
		.pushOthertips{
			padding:94rpx 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-content: flex-start;
			.poitem{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 27rpx;
				margin-bottom: 27rpx;
				width: 50%;
				.icon{
					width:108rpx;
					height: 108rpx;
					margin-bottom: 30rpx;
				}
				.label{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #404B69;
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
