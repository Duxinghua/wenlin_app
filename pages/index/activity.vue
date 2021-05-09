<template>
	<view class="notices">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<u-input v-model="title" type="text" height="85"  :border="true" placeholder="请输入标题内容" />
			<u-input v-model="content" height="229" type="textarea" :border="true"  placeholder="请输入正文文内容"/>
			<view class="imgwrap">
				<view class="imgitem"  v-for="(item,index) in uploadList" :key="index"  v-if="uploadList.length">
					<image src="../../static/image/imguploaddel.png" class="uploadclose" @click="uploadDel(index)" />
					<image mode="aspectFill" :src="item.http_url"></image>
				</view>
				
				<view class="imgupload"  @click="chooseImage" v-if="uploadList.length<9">
					<image src="../../static/image/uploadico.png" class="imgjia"></image>
				</view>
			</view>
			<view class="pushwrap pushwrapmg">
				<view class="label">活动时间:</view>
				<u-input style="flex:1" v-model="activity_time"  input-align="left" type="text"  :border="false" placeholder="请输入活动时间" />
				<!-- <u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
			<view class="pushwrap">
				<view class="label">活动地点:</view>
				<u-input style="flex:1" v-model="address"  input-align="left" type="text"   :border="false" placeholder="请输入活动地点" />
				<!-- <u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
			<view class="pushwrap">
				<view class="label">报名时间:</view>
				<u-input style="flex:1" v-model="join_start_time"  input-align="left" type="text"   :border="false" placeholder="请输入报名时间" />
			<!-- 	<u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
			<view class="pushwrap">
				<view class="label">结束时间:</view>
				<u-input style="flex:1" v-model="join_end_time"  input-align="left" type="text" :border="false" placeholder="请输入结束时间" />
<!-- 				<u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
			<view class="pushwrap">
				<view class="label">限制人数:</view>
				<u-input style="flex:1" v-model="max_joins"  input-align="left" type="text"   :border="false" placeholder="（0表示人数不限）" />
				<!-- <u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
			<view class="pushwrap" @click.stop="modularshow = true">
				<view class="label">关联模块类型:</view>
				<u-input  @click="modularshow = true" style="flex:1" v-model="modular_type_value"  disabled="true" input-align="left" type="text"   :border="false" placeholder="选择模块类型,可不选" />
				<u-icon  color="#95A0B6" name="arrow-right"></u-icon>
			</view>
			<view class="pushwrap" @click="cshow = true">
				<view class="label">发布到</view>
				<u-input @click="cshow = true" style="flex:1"  disabled="true" v-model="community_title"  input-align="left" type="text"  :border="false" placeholder="请选择小区" />
				<u-icon  color="#95A0B6" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="content auther">
			<view class="header">
				联系人：
			</view>
			<view class="pushwrap">
				<view class="label">姓名:</view>
				<u-input style="flex:1" v-model="name"  input-align="left" type="text"   :border="false" placeholder="请输入姓名" />
				<!-- <u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
			<view class="pushwrap">
				<view class="label">电话:</view>
				<u-input style="flex:1" v-model="phone"  input-align="left" type="text"   :border="false" placeholder="请输入电话" />
				<!-- <u-icon  color="#95A0B6" name="arrow-right"></u-icon> -->
			</view>
		</view>
		<view class="content auther toolwrap">
			<view class="tool">
				<view class="name">
					关联营销模块
				</view>
				<u-switch v-model="open_modular" active-color="#FF9C00"  inactive-color="#F5F6FA"></u-switch>
			</view>
		</view>
		<view class="content auther toolwrap">
			<view class="tool">
				<view class="name">
					是否开启报名
				</view>
				<u-switch v-model="open_join" active-color="#FF9C00"  inactive-color="#F5F6FA"></u-switch>
			</view>
		</view>


		<view class="btns" @click="pushHandler">
			提交
		</view>
		<u-select v-model="cshow" :list="clist" label-name="title" value-name="community_id" @confirm="confirmHandler"></u-select>
		<u-select v-model="modularshow" :list="modularlist" label-name="name" value-name="value" @confirm="modularHandler"></u-select>
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
					title: '发布报名活动', //title
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
				checked:false,
				activity_time:'',
				address:'',
				open_join:false,
				open_modular:false,
				modularshow:false,
				join_start_time:'',
				join_end_time:'',
				max_joins:'',
				modular_type:'',
				modular_type_value:'',
				modularlist:[
					{
						name:'不关联',
						value:0
					},
					{
						name:'答题',
						value:1
					},
					{
						name:'抽奖',
						value:2
					}
				],
				name:'',
				phone:'',
				content:'',
				title:'',
				cshow:'',
				clist:[]
				
			}
		},
		onShow(){
			this.getComList()
		},
		methods:{
			modularHandler(e){
				this.modular_type = e[0].value
				this.modular_type_value = e[0].label
			},
			pushHandler(){
				var data = {}
				if(!this.title){
					return this.$u.toast('请输入活动标题')
				}else{
					data.title = this.title
				}
				if(!this.content.length){
					return this.$u.toast('请输入活动内容')
				}else{
					data.content = this.content
				}
				if(!this.uploadList.length){
					return this.$u.toast('至少上传一张图片')
				}else{
					var list = []
					this.uploadList.map((item)=>{
						list.push(item.url)
					})
					data.images = list.join(',')
				}
				if(!this.community_title.length){
					return this.$u.toast('请选择发布到那个机构')
				}else{
					data.community_id = this.community_id
				}
				if(!this.activity_time.length){
					return this.$u.toast('请输入活动时间')
				}else{
					data.activity_time = this.activity_time
				}
				if(!this.address.length){
					return this.$u.toast('请输入活动地址')
				}else{
					data.address = this.address
				}
				//join_start_time
				if(!this.join_start_time.length){
					return this.$u.toast('请输入活动报名时间')
				}else{
					data.join_start_time = this.join_start_time
				}
				if(!this.join_end_time.length){
					return this.$u.toast('请输入活动结束时间')
				}else{
					data.join_end_time = this.join_end_time
				}
				if(!this.modular_type_value.length){
					return this.$u.toast('请选择关联模块')
				}else{
					data.modular_type = this.modular_type
				}
				data.contacts = []
				var obj = {}
				if(!this.name.length){
					return this.$u.toast('请输入联系人')
				}else{
					obj.name = this.name
				}
				if(!this.phone.length){
					return this.$u.toast('请输入联系人电话')
				}else{
					obj.phone = this.phone
				}
				data.contacts.push(obj)
				data.contacts = JSON.stringify(data.contacts)
				data.max_joins = this.max_joins
				data.open_modular = this.open_modular ? 1 : 0
				data.open_join = this.open_join ? 1 : 0
				this.$u.api.communityActivityAdd(data).then((result)=>{
					this.$u.toast('发布成功')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},400)
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notices{
		display: flex;
		flex-direction: column;
		background: #F7F9FF;
		min-height: 100vh;
		padding-bottom: 280rpx;
		width:100%;
		.content{
			padding:0 25rpx;
			box-sizing: border-box;
			background: white;
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			/deep/ .u-input{
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}
			.imgwrap{
				display: flex;
				flex-direction: row;
				flex-wrap:wrap;
				.imgitem{
					width:191upx;
					height:153upx;
					position: relative;
					z-index: 1;
					margin-right:16upx;
					margin-bottom: 16upx;
					image{
						width:100%;
						height:100%;
						position: absolute;
						left:0;
						top:0;
						z-index: 2;
					}
					.uploadclose{
						position: absolute;
						left:151upx;
						top:0;
						width:40upx;
						z-index: 3;
						height:40upx;
					}
				}
				.imgupload{
					width:191upx;
					height:153upx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #DEDEDE;
					border-radius: 7upx;
					position: relative;
					.imgjia{
						position: absolute;
						left:0;
						top:0;
						width:100%;
						height:100%;
					}
				}
			}
			.pushwrap{
				display: flex;
				flex-direction: row;
				align-items: center;
				width:100%;
				.label{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #020433;
					margin-right:15rpx;
				}
				/deep/ .u-input{
					flex:1!important;
					margin-top:0!important;
					margin-bottom: 0!important;
				}
			}
			.pushwrapmg{
				margin-top:20rpx;
			}
		}
		.auther{
			.header{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #020433;
				width: 100%;
				height: 97rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #F0F0F0;
				margin-bottom: 10rpx;
			}
			.tool{
				height: 112rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-bottom: 0rpx;
				.name{
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #020433;
					margin-right: auto;
				}
			}
			.footer{
				display: flex;
				flex-direction: row;
				align-items: center;
				.zlist{
					display: flex;
					flex-direction: column;
					width:541rpx;
					.zitem{
						display: flex;
						flex-direction: row;
						align-items: center;
						.label{
							font-size: 28rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #020433;
							margin-right:15rpx;
						}
						/deep/ .u-input{
							flex:1!important;
							margin-top:0!important;
							margin-bottom: 0!important;
						}
					}
				}
			}
		}
		.toolwrap{
			padding-bottom: 0rpx;
		}
		.addbtn{
			width: 654rpx;
			height: 114rpx;
			line-height: 114rpx;
			text-align: center;
			background: rgba(149, 160, 182, 0);
			border: 1rpx solid #95A0B6;
			border-radius: 10rpx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #95A0B6;
			margin:20rpx auto;
		}
		.btns{
			width: 654rpx;
			height: 100rpx;
			background: #FF9C00;
			border-radius: 12rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			position: fixed;
			bottom: 100rpx;
			left:50%;
			transform: translateX(-50%);
			z-index: 150;
		}
	} 
</style>
