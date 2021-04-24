
function wxUploadFile(filePath,formData,url) {
	let token = uni.getStorageSync("token")
	uni.showLoading({
		title: '正在上传',
		mask: true
	});
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: url,
			filePath: filePath,
			header: {
				"Content-Type": "multipart/form-data",
				'XX-Wxapp-AppId': 'wx370ab1fa38538af2',
				'XX-Device-Type': 'wxapp',
				'XX-Token': uni.getStorageSync('token')
			},
			name: 'file',
			formData:formData,//modular  = illegalstop
			success: res => {
				console.log(res)
				uni.hideLoading()
				if(res.data){
					var obj = JSON.parse(res.data)
					if(obj.code == 1){
						resolve(obj)
					}else if(obj.code == 0){
						uni.showToast({
							title: obj.msg,
							icon: "none",
							duration: 3000,
							mask: true
						});
						resolve(obj)
					}
				}else{
					uni.showToast({
						title: '您上传的图片超过最大尺寸，请调整后再试',
						icon: "none",
						duration: 3000,
						mask: true
					});
				}
			},
			fail: (err) => {
				reject({
					code: -1,
					msg: err
				})
			},
		})
	})
}

module.exports = {
	wxUploadFile
}
