<template>
	<view class="carinfo">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">

			<view class="header">
				{{detail.car_detail.car_num}}
			</view>
			<view class="cardes">
				<u-section line-color="#FF9C00" font-size="36" color="#020433" title="基本信息" :arrow="false" :right="false"></u-section>
				<view class="cdlist">
					<view class="cditem">
						车主姓名：{{detail.car_detail.user_name}}
					</view>
					<view class="cditem">
						所在小区：{{detail.car_detail.community.title}}
					</view>
					<view class="cditem">
						门牌号：{{detail.car_detail.house_number}}
					</view>
					<view class="cditem">
						性别：{{sexlist[detail.car_detail.user_sex]}}
					</view>
					<view class="cditem">
						职业：{{detail.car_detail.occupation || '保密'}}
					</view>
					<view class="cditem">
						车位性质：{{detail.car_detail.parking_properties || '保密'}}
					</view>
					<view class="cditem">
						车位编号：{{detail.car_detail.parking_num || '保密'}}
					</view>
					<view class="cditem">
						其他：{{detail.car_detail.mark || '保密'}}
					</view>
				</view>
			</view>
			<view class="cardes">
				<u-section line-color="#FF9C00" font-size="36" color="#020433" title="违停信息" :arrow="false" :right="false"></u-section>
			</view>
		</view>
		<view class="content cont2">
			<view class="list">
				<CartItem v-for="(item,index) in detail.illegal_list" :key="index" :item="item" @selectHandler="selectHandler"/>
				<Nodata v-if="nodataflag" :title="nodataString"></Nodata>
			</view>
		</view>
		<view class="footer">
			<view class="btn cancel" @click="pushCar">
				添加违停
			</view>
			<view class="btn sc" @click="call(detail.car_detail.user_mobile)">
				联系车主
			</view>
		</view>
		<u-popup v-model="callshow" mode="center" border-radius="16">
			<view class="callshop">
				<view class="callitem" v-for="(item,index) in mobileList" :key="index">
					<view class="label">手机号</view>
					<view class="mobile">{{item}}</view>
					<view class="btns" @click="call(item)">
						拔打
					</view>
				</view>
			</view>
		</u-popup>
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
				callshow:false,
				sexlist:[
					'保密',
					'男',
					'女'
				],
				num:3,
				config: {
					title: '车辆查询详情', //title
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
				keyword:'',
				carInputShow:false,
				nocarShow:false,
				id:'',
				detail:{
					car_detail:{},
					illegal_list:[]
				},
				nodataString:'暂无违停信息',
				nodataflag:false,
				mobileList:[]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods:{
			getDetail(){
				var data = {
					car_id:this.id
				}
				this.$u.api.carDetail(data).then((result)=>{
					this.$nextTick(() => {
						this.detail = result
						if(this.detail.illegal_list.length){
							this.nodataflag = false
						}else{
							this.nodataflag = true
						}
						this.$forceUpdate()
					})
					
				})
			},
			pushCar(){
				uni.redirectTo({

					url:'/pages/index/exposure'
				})
			},
			call(item){
				if(item.indexOf(',') > -1){
					this.mobileList = item.join(",")
					this.callshow = true
				}else{
					var that = this
					uni.makePhoneCall({
						phoneNumber:item
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.callshop{
		width: 528rpx;
		min-height: 120rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		.callitem{
			width:100%;
			height:120rpx;
			padding:0 32rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1rpx solid #DEDEDE;
			.label{
				font-size: 28rpx;
				font-family: PingFang-SC-Medium, PingFang-SC;
				font-weight: 500;
				color: #666666;
				margin-right: 24rpx;
			}
			.mobile{
				font-size: 28rpx;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				color: #333333;
				margin-right: auto;
			}
			.btns{
				width: 100rpx;
				color:white;
				height: 56rpx;
				font-size: 26rpx;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				line-height: 56rpx;
				text-align: center;
				background: #FF9C00;
				border-radius: 8rpx;
			}
		}
		.callitem:last-child{
			border-bottom: 1rpx solid transparent;
		}
	}
	.carinfo{
		display: flex;
		flex-direction: column;
		.content{
			width:100%;
			// min-height: 100vh;
			background: #F7F9FF;
			.header{
				width:100%;
				height: 130rpx;
				background: white;
				padding: 25rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FF9C00;
				margin-bottom: 20rpx;
			}
			.cardes{
				width:100%;
				padding:50rpx 25rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				background: white;
				margin-bottom: 20rpx;
				.cdlist{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					align-content: flex-start;
					padding-top:25rpx;
					.cditem{
						width:50%;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #020433;
						padding-top:15rpx;
						padding-bottom: 15rpx;
					}
					.cditem:nth-last-of-type(2){
						width:100%;
					}
					.cditem:nth-last-of-type(1){
						width:100%;
					}
				}

			}
			.cardes:nth-last-of-type(1){
				margin-bottom: 0rpx!important;
				padding-bottom: 0rpx!important;
			}
		}
		.cont2{
			padding-bottom: 0rpx!important;
			margin-bottom: 0rpx!important;
			background: white;
			.list{
				display: flex;
				flex-direction: column;
				padding:20rpx 0 200rpx 0;
				box-sizing: border-box;
			}
		}
		.footer{
			width: 100%;
			height: 191rpx;
			background: #FFFFFF;
			box-shadow: 0px -4rpx 8rpx 0rpx rgba(2, 4, 51, 0.08);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: fixed;
			left:0;
			bottom: 0;
			.btn{
				width: 323rpx;
				height: 99rpx;
				margin-left:10rpx;
				margin-right:10rpx;
				border-radius: 10rpx;
				font-size: 38rpx;
				font-family: PingFang SC;
				font-weight: bold;
				text-align: center;
				line-height: 99rpx;
			}
			.cancel{
				background: #EEF2FA;
				color: #404B69;
			}
			.sc{
				background: #FF9C00;
				color: #FFFFFF;
			}
		}
	}
</style>
