<template>
	<view class="exposure">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="content">
			<view class="cheinput" @click="carHandler">
				被曝光车牌号：
				<u-input v-model="car_num" @click.stop="carHandler" type="text"  disabled="true" :border="false" placeholder="请选择车牌" />
			</view>
			<u-input v-model="content" height="200" type="textarea" :border="false"  :placeholder="placeholder"/>
			<view class="imgwrap">
			<view class="imgitem"  v-for="(item,index) in uploadList" :key="index"  v-if="uploadList.length">
					<image src="../../static/image/imguploaddel.png" class="uploadclose" @click="uploadDel(index)" />
					<image mode="aspectFill" :src="item.http_url"></image>
				</view>
				
				<view class="imgupload"  @click="chooseImage" v-if="uploadList.length<9">
					<image src="../../static/image/uploadico.png" class="imgjia"></image>
				</view>
			</view>
			<view class="pushwrap" @click="pushSelect">
				<view class="label">发布到</view>
				<u-input  @click.stop="pushSelect" v-model="community_title"  input-align="right" type="text"  disabled="true" :border="false" placeholder="请选择小区" />
				<u-icon  color="#95A0B6" name="arrow-right"></u-icon>
			</view>
			<view class="btns" @click="submit">
				提交
			</view>
		</view>
		<u-select v-model="cshow" :list="clist" label-name="title" value-name="community_id" @confirm="confirmHandler"></u-select>
		<u-keyboard mode="car" tips="请输入车牌号" :cancelBtn="false"  @change="valChange"  @backspace="backspace" v-model="carshow"></u-keyboard>
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
					title: '违停车辆曝光', //title
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
				carshow:false,
				car_num:'',
				placeholder:'请输入文字（选填） 注意：曝光违停车辆的时候请注意遮挡部分车牌号再拍照',
				uploadList:[],//上传
				content:'',
				cshow:false,
				clist:[],
				community_id:'',
				community_title:''
			}
		},
		onShow(){
			this.getComList()
		},
		methods:{
			submit(){
				var data = {}
				if(this.car_num.length < 3){
					return this.$u.toast('请输入车牌号')
				}else{
					data.car_num = this.car_num
				}
				if(!this.community_id){
					return this.$u.toast('请选择小区')
				}else{
					data.community_id = this.community_id
				}
				if(this.uploadList.length == 0){
					return this.$u.toast('请选择上传图片')
				}else{
					var list = []
					this.uploadList.map((item)=>{
						list.push(item.url)
					})
					data.images = list.toString()
				}
				data.content = this.content
				this.$u.api.publishIllegalstop(data).then((result)=>{
					this.$u.toast('发布成功')
					uni.navigateBack({
						delta:1
					})
				})
			},
			confirmHandler(e){
				this.community_id = e[0].value
				this.community_title = e[0].label
			},
			pushSelect(){
				this.cshow = true
			},
			getComList(){
				this.$u.api.adminCommunity({}).then((result)=>{
					this.clist = result
				})
			},
			carHandler(){
				this.carshow = true
			},
			valChange(e){
				this.car_num += e;
			},
			backspace() {
				// 删除value的最后一个字符
				if(this.car_num.length) this.car_num = this.car_num.substr(0, this.car_num.length - 1);
				console.log(this.car_num)
			},
			//图片处理
			uploadDel(e){
				this.uploadList.splice(e,1)
			},
			//上传图片处理
			chooseImage(){
				var that = this
				uni.chooseImage({
						count: 9 - this.uploadList.length, // 默认9
						sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
						success: function(res) {
							// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
							// goods.localIds = res.localIds
							// _this.asyncUploadImage(goodsindex)
							var s = res.tempFilePaths
							s.map((item)=>{
								that.upload(item,{modular:'illegalstop'}).then((result)=>{
									console.log(result)
									if(result.code == 1){
										console.log(result.data)
										that.uploadList.push(result.data)
									}
								})
							})
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.exposure{
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		background: white;
		.content{
			padding:25rpx;
			box-sizing: border-box;
			.cheinput{
				height: 61rpx;
				width: 100%;
				padding-left:20rpx;
				background: rgba(255, 156, 0, 0);
				border: 1px solid #404B69;
				border-radius: 10rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 30rpx;
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
				margin-top:20rpx;
				.label{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #95A0B6;
					margin-right:auto;
				}
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
			}
		}
	}
</style>
