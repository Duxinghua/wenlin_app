<template>
	<view class="carsearch">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<u-search  placeholder="请输入车牌号后三位" height="80" v-model="car_num" clearabled="true" disabled="true" @click="openInput" @clear="clearHandler" show-action="false"></u-search>
			<view class="list">
				<view class="tips" v-if="searchFlag">
					尾号为<text>{{car_num}}</text>的车辆有：
				</view>
				<view class="caritem" v-for="(item,index) in cartlist" :key="index" :index="index" @click="cartHandler(item)">
					<view class="no">NO.{{index+1}}</view>
					<view class="carno">{{item.car_num}}</view>
					<view class="cname">{{item.community.title}}</view>
					<view class="ccount">违停<text>{{item.total}}</text>次</view>
				</view>
				<Nodata :title="nodataString" v-if="nodataFlag"></Nodata>
			</view>
			<image src="../../static/image/jia.png" class="jia" @click="target"></image>
		</view>
		<!-- 搜索输入 -->
		<u-popup v-model="carInputShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="622" closeable="true">
			<view class="cishow">
				<view class="title">请输入车牌号后三位</view>
				<u-message-input :maxlength="num" width="140" height="140" inputType="text" @change="mchange" @finish="mfinish" ></u-message-input>
				<view class="btns">
					<view class="btn cancen" @click="csearchHandler">取消</view>
					<view class="btn sc" @click="searchHandler">确定</view>
				</view>
			</view>
		</u-popup>
		<!-- 提示 -->
		<u-popup v-model="nocarShow" mode="center" border-radius="20" close-icon-size="40" width="622" height="475" closeable="true">
			<view class="cishow tips">
				<view class="title">抱歉，暂无尾号为<text>{{car_num}}</text>的车辆登记信息</view>
				<view class="btns" @click="reset">
					确定
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import navigationCustom from '@/components/struggler-navigationCustom/navigation-custom';
	import Nodata from '@/components/index/nodata.vue';
	export default{
		components:{
			navigationCustom,
			Nodata
		},
		data(){
			return{
				num:3,
				config: {
					title: '车辆查询', //title
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
				car_num:'',
				page:1,
				page_size:10,
				total:0,
				carInputShow:false,
				nocarShow:false,
				cartlist:[],
				searchFlag:true,
				nodataFlag:true,
				nodataString:'暂无车辆信息'
			}
		},
		onLoad() {
		
		},
		onShow() {
			//this.carInputShow = true
		},
		methods:{
			target(){
				uni.navigateTo({
					url:'exposure'
				})
			},
			cartHandler(item){
				if(this.searchFlag){
					uni.navigateTo({
						url:'/pages/index/carinfo?id='+item.car_id
					})
				}
			},
			getListTop(ismore){
				if(!this.searchFlag){
					var data = {
						page:this.page,
						page_size:this.page_size
					}
					this.$u.api.illegalstopList(data).then((result)=>{
						this.total = result.total
						if(ismore){
							this.cartlist = this.cartlist.concat(result.list)
						}else{
							this.cartlist = result.list
						}
						if(this.cartlist.length){
							this.nodataFlag = false
						}else{
							this.nodataFlag = true
						}
						
					})
				}else{
					var data = {
						car_num:this.car_num,
						page:this.page,
						page_size:this.page_size
					}
					this.$u.api.searchCar(data).then((result)=>{
						this.total = result.total
						if(this.page == 1){
							if(!result.list){
								this.nocarShow = true
								this.cartlist = []
							}
						}
						if(ismore){
							this.cartlist = this.cartlist.concat(result.list)
						}else{
							this.cartlist = result.list
						}
						if(this.cartlist.length){
							this.nodataFlag = false
						}else{
							this.nodataFlag = true
						}
					})
				}
				
			},
			clearHandler(){
				this.searchFlag = true
				this.car_num = ''
				this.page = 1
				this.total = 0
				this.getListTop()
			},
			searchHandler(){
				if(this.car_num.toString().length != 3){
					this.$u.toast('请输入车牌号后三位')
					return 
				}else{
					this.page = 1
					this.total = 0
					this.searchFlag = true
					this.carInputShow = false
					this.getListTop()
				}
			},
			csearchHandler(){
				this.carInputShow = false;
				this.searchFlag = true;
				this.page = 1
				this.total = 0
				this.car_num = ''
				this.cartlist = []
				// this.getListTop()
			},
			openInput(){
				this.carInputShow = true
			},
			mchange(e){
				
			},
			mfinish(e){
				this.car_num = e
			}
		},
		onReachBottom() {
			if(this.total >= this.page){
				this.page ++
				this.getListTop(true)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carsearch{
		display: flex;
		flex-direction: column;
		width:100%;
		min-height: 100vh;
		.content{
			padding:25rpx;
			box-sizing: border-box;
			/deep/ .u-section{
				margin:40rpx auto;
			}
			.jia{
				width:133rpx;
				height:133rpx;
				position: fixed;
				bottom: 353rpx;
				right:0rpx;
			}
			.list{
				display: flex;
				flex-direction: column;
				.tips{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #020433;
					text{
						color:#ED3269;
					}
					margin-bottom: 20rpx;
				}
				.caritem{
					display: flex;
					flex-direction: row;
					width:100%;
					align-items: center;
					height: 99rpx;
					border-bottom: 2rpx solid #EEF2FA;
					.no{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FF9C00;
						width:20%;
					}
					.carno{
						font-size: 34rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #020433;
						width:25%;
					}
					.cname{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #020433;
						width:30%;
						text-align: center;
					}
					.ccount{
						width:25%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #020433;
						text-align: right;
						text{
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF9C00;
							padding:0 10rpx;
						}
					}
				}
			}

		}
		.cishow{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 80rpx;
			box-sizing: border-box;
			.title{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #404B69;
				margin-bottom: 80rpx;
				text{
					color:#ED3269;
				}
			}
			.btns{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 80rpx;
				.btn{
					width: 264rpx;
					height: 99rpx;
					border-radius: 10rpx;
					font-size: 38rpx;
					line-height: 99rpx;
					text-align: center;
					font-family: PingFang SC;
					font-weight: bold;
					margin-left:15rpx;
					margin-right:15rpx;
				}
				.cancen{
					background: #EEF2FA;
					color:#404B69;
				}
				.sc{
					background: #FF9C00;
					color: #FFFFFF;
				}
			}
		}
		.tips{
			padding-top:20rpx;
			.title{
				width: 400rpx;
				text-align: center;
				margin-bottom: 60rpx;
			}
			.btns{
				margin-top:40rpx;
				width: 590rpx;
				height: 99rpx;
				background: #FF9C00;
				border-radius: 10rpx;
				line-height: 99rpx;
				text-align: center;
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
