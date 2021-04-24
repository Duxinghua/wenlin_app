module.exports = {
	methods:{
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
		}
	}
}
