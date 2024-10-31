export const getCanvasSize = () => {
	// 根据屏幕宽度计算 canvas 宽度
	const systemInfo = wx.getWindowInfo();
	const screenWidth = systemInfo.windowWidth;
  const designWidth = 750;
  const designHeight = 800;
  const canvasWidth = screenWidth * 2;
  const canvasHeight = ((screenWidth / designWidth) * designHeight) * 2;
	return {
		canvasWidth,
		canvasHeight,
	}
}

export const showAuthTips = ()=> {
	// 用户未授权
	wx.showModal({
		title: '需要授权',
		content: '为了正常使用保存功能，请您授权保存至项目权限',
		showCancel: false,
		confirmText: '去授权',
		success: function (res) {
			if (res.confirm) {
				// 用户点击去授权，跳转到设置页面
				wx.openSetting({
					success: function (data) {
						console.log(data)
						if (data.authSetting['scope.writePhotosAlbum']) {
				
							// 用户重新授权后，可以再次调用相关接口
							// 这里可以再次尝试获取用户信息
						}
					},
					fail: function (err) {
						console.error('打开设置失败', err);
					}
				});
			}
		}
	});
}

// 相册权限测试
export const checkPermission = async () => {
	try {
		const result = await new Promise((resolve, reject) => {
			wx.authorize({
				scope: 'scope.writePhotosAlbum',
				success() {
					resolve(true);
				},
				fail() {
					reject(false);
				}
			});
		});
		return result
	} catch {
		return false;
	}
}

export const savePicture = async (tmpPath : string) => {
  return new Promise((resove, reject) => {
    const params = {
      filePath: tmpPath,
      success() {
        console.log('save success');
        resove(true);
      },
      fail(error : any) {
        console.log(error);
        reject(false);
      }
    };
    wx.saveImageToPhotosAlbum(params);
  })

}

export const getCanvasTempPath = (canvas:any , canvasId: string):Promise<string> => {
	return new Promise((resolve, reject)=> {
		wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			fileType: 'jpg',
			quality: .8,
			canvas: canvas,
			canvasId: canvasId,
			success:  (res) => {
				console.log(res.tempFilePath)
				resolve(res.tempFilePath);
				// wx.showToast({
				// 	title: 'canvas转图成功' + res.tempFilePath,
				// 	duration: 3000
				// })
			},
			fail:  (res) => {
				console.log(res)
				wx.showToast({
					title: 'canvas转图片失败' + JSON.stringify(res),
					icon: 'none',
					duration: 3000
				})
				reject('')
			}
		}, this)
	})
    
  }