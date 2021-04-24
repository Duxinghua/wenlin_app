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
			<view class="pushwrap">
				<view class="label">发布到</view>
				<u-input v-model="pushname"  input-align="right" type="text"  disabled="true" :border="false" placeholder="请选择小区" />
				<u-icon  color="#95A0B6" name="arrow-right"></u-icon>
			</view>
			<view class="btns">
				提交
			</view>
		</view>
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
					title: '发布通知', //title
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
				uploadList:[]
			}
		},
		methods:{
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
								that.Api.uploadOne(item).then((result)=>{
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
	.notices{
		display: flex;
		flex-direction: column;
		.content{
			padding:0 25rpx;
			box-sizing: border-box;
			/deep/ .u-input:nth-last-of-type(1){
				margin-top: 40rpx;
				margin-bottom: 40rpx;
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
