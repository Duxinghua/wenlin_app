<template>
	<view class="announcelist">
		<navigation-custom :config="config" :scrollTop="scrollTop" @customConduct="customConduct" :scrollMaxHeight="scrollMaxHeight" />
		<view class="list">
			<Citem v-for="(item,index) in list" :key="index" :item="item" :type="diyType"/>
			<Nodata :title="nodataString" v-if="nodataFlag" />
		</view>
		<image src="../../static/image/jia.png" class="jia" @click="target"></image>
	</view>
</template>

<script>
	import navigationCustom from '@/components/struggler-navigationCustom/navigation-custom';
	import Citem from '@/components/index/cartItem.vue';
	import Nodata from '@/components/index/nodata.vue'
	export default{
		components:{
			navigationCustom,
			Citem,
			Nodata
		},
		data(){
			return {
				diyType:3,
				config: {
					title: '通知公告', //title
					bgcolor: 'white', //背景颜色
					fontcolor: 'rgba(51, 51, 51, 1)', //文字颜色，默认白色
					type: 1, //type 1，3胶囊 2，4无胶囊模式
					transparent: false, //是否背景透明 默认白色
					linear: false, //是为开启下滑渐变
					share: false //是否将主页按钮显示为分享按钮
					// menuIcon:"../static/icon/back_.png", 当type为3或者4的时候左边的icon文件位置，注意位置与当前页面不一样
					// menuText:"返回", 当type为3或4的时候icon右边的文字
				},
				nodataString:'暂无公告',
				nodataFlag:false,
				page:1,
				page_size:10,
				list:[]
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			target(){
				uni.navigateTo({
					url:'notices'
				})
			},
			getList(ismore){
				var data = {
					page:this.page,
					page_size:this.page_size
				}
				this.$u.api.noticesgetList(data).then((result)=>{
						this.total = result.total
						if(ismore){
							this.list = this.list.concat(result.list)
						}else{
							this.list = result.list
						}
						if(this.list.length){
							this.nodataFlag = false
						}else{
							this.nodataFlag = true
						}
				})
		
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
	.announcelist{
		display: flex;
		flex-direction: column;
		background: #F7F9FF;
		min-height: 100vh;
		.list{
			display: flex;
			flex-direction: column;
		}
		.jia{
			position: fixed;
			right:14rpx;
			bottom: 266rpx;
			width:107rpx;
			height:107rpx;
			border-radius: 50%;
		}
	}
</style>
