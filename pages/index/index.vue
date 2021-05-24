<template>
	<view class="index">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<view class="header">
				<view class="hitem" v-for="(item,index) in menu" :key="index" :index="index" @click="go(index)">
					<image :src="item.image" class="itembg"></image>
					<view class="label">
						{{item.name}}
					</view>
				</view>
			</view>

			<view class="list">
				<view class="tr">
					<view class="title">
						用户留言
						<view class="read" v-if="false">
							3
						</view>
					</view>
				</view>
				<view class="lc">
					<Nodata title="暂无留言" />
				</view>
			</view>
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

	</view>
</template>

<script>
	import navigationCustom from '@/components/struggler-navigationCustom/navigation-custom';
	import CartItem from '@/components/index/cartItem.vue';
	import Nodata from '@/components/index/nodata.vue';
	export default{
		components:{
			navigationCustom,
			CartItem,
			Nodata
		},
		data(){
			return{
				config: {
					title: '首万物业', //title
					bgcolor: '#FF9C00', //背景颜色
					fontcolor: 'white', //文字颜色，默认白色
					type: 4, //type 1，3胶囊 2，4无胶囊模式
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
						image:'../../static/image/i1.png',
						name:'车辆查询'
					},
					{
						image:'../../static/image/i2.png',
						name:'违停排行榜'
					},
					{
						image:'../../static/image/i3.png',
						name:'通知公告'
					},
					{
						image:'../../static/image/i4.png',
						name:'活动'
					},
					{
						image:'../../static/image/i5.png',
						name:'抽奖'
					},
					{
						image:'../../static/image/i6.png',
						name:'曝光台'
					},
					{
						image:'../../static/image/i7.png',
						name:'动态'
					},
					{
						image:'../../static/image/i8.png',
						name:'房产'
					},
					{
						image:'../../static/image/i9.png',
						name:'招聘'
					}
				],
				navlist:[
					'车辆违停',
					'公告',
					'活动'
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
			this.checkToken((result)=>{
				if(result){
					this.total = 0
					this.page = 1
					this.getList()
				}
			})

		},
		onShow() {
			
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
						url:'/pages/index/stoplist'
					})
				}else if(index == 2){
					uni.navigateTo({
						url:'/pages/index/announcelist'
					})
				}else if(index == 3){
					uni.navigateTo({
						url:'/pages/index/activity'
					})
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
				this.total = 0
				this.page = 1
				this.list = []
				this.getList()
			},
			getList(ismore){
				var data = {
					page:this.page,
					page_size:this.page_size
				}
				if(this.navindex == 0){
					this.$u.api.getIllegalstopPublish(data).then((result)=>{
						this.total = result.total
						if(ismore){
							this.list = this.list.concat(result.list)
						}else{
							this.list = result.list
						}
					})
				}else if(this.navindex == 1){
					this.$u.api.noticesgetList(data).then((result)=>{
						this.total = result.total
						if(ismore){
							this.list = this.list.concat(result.list)
						}else{
							this.list = result.list
						}
					})
				}else if(this.navindex == 2){
					this.$u.api.communityactivityGetList(data).then((result)=>{
						this.total = result.total
						if(ismore){
							this.list = this.list.concat(result.list)
						}else{
							this.list = result.list
						}
					})
				}
			},
			selectHandler(item){
				this.selectObject = item
				this.toolShow = true
			},
			delHandler(id){
				if(this.navindex == 0){
					this.$u.api.illegalstopDelete({id:id}).then((result)=>{
						this.$u.toast('删除成功')
						setTimeout(()=>{
							this.total = 0
							this.page = 1
							this.list = []
							this.getList()
						})
					})
				}else if(this.navindex == 1){
					this.$u.api.noticesdelete({id:id}).then((result)=>{
						this.$u.toast('删除成功')
						setTimeout(()=>{
							this.total = 0
							this.page = 1
							this.list = []
							this.getList()
						})
					})
				}else if(this.navindex == 2){
					this.$u.api.communityactivitydelete({id:id}).then((result)=>{
						this.$u.toast('删除成功')
						setTimeout(()=>{
							this.total = 0
							this.page = 1
							this.list = []
							this.getList()
						})
					})
				}
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
		background: #F7F9FF;
		.content{
			display: flex;
			flex-direction: column;
			.header{
				padding: 50rpx 72rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				background: white;
				margin-bottom: 20rpx;
				.hitem{
					// width:222rpx;
					width:130rpx;
					height: 190rpx;
					margin-right:112rpx;
					margin-bottom: 50rpx;
					z-index: 20;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					.itembg{
						width: 130rpx;
						height: 133rpx;
						z-index: -1;
					}
					.label{
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #020433;
						margin-top:34rpx;
						white-space: nowrap;
					}
				}
				.hitem:after{
					// position: absolute;
					// content:'';
					// left:25rpx;
					// top:78rpx;
					// width: 45rpx;
					// height: 4rpx;
					// border-radius: 2rpx;
					// background: #FFFFFF;
				}
				.hitem:nth-child(3n){
					margin-right: 0rpx;
				}
			}
			.list{
				display: flex;
				flex-direction: column;
				background: white;
				.tr{
					height: 138rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.title{
						width: fit-content;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #020433;
						line-height: 47rpx;
						text-align: center;
						position: relative;
						.read{
							width: 32rpx;
							height: 32rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 50%;
							background: #ED3269;
							font-size: 20rpx;
							color:white;
							position: absolute;
							right:-20rpx;
							top:-20rpx;
						}
					}
				}
				.lc{
					display: flex;
					flex-direction: column;
					padding:20rpx 0;
					box-sizing: border-box;
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
