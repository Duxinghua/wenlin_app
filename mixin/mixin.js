module.exports = {
	data(){
		return {
			community_id:'',
			community_title:'',
			uploadList:[]
		}
	},
	methods:{
		getComList(){
			this.$u.api.adminCommunity({}).then((result)=>{
				this.clist = result
			})
		},
		checkToken(cb){
			if(uni.getStorageSync('token')){
				cb({result:true})
			}else{
				uni.login({
					success: (res) => {
						that.$u.api.wxAdminLoginByCode({code:res.code}).then((result)=>{
					
							uni.setStorageSync('wxadmin',result.wxadmin)
								if(result.token.length > 2){
									uni.setStorage({
										key:'token',
										data:result.token,
										success: () => {
											cb({result:true})
										}
									})
								}else{
									cb({result:true})
								}
						})
					}
				})
			}
		},
		confirmHandler(e){
			this.community_id = e[0].value
			this.community_title = e[0].label
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
							that.upload(item,{}).then((result)=>{
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
