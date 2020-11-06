import { ImgLoader, Stage, Text, Group, Image, Shape, Sprite} from '../../duducanvas/index'
Page({
  data:{
    tempPath: ''
  },
  onLoad: function () {
    new ImgLoader([
      {
        id: 'avatar',
        src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
      }
    ])
    .then( loader => {
      new Stage('#myCanvas', stage => {

        const t1 = new Text()
        t1.color = '#cda79f'
        t1.text = 'DuduCanvas 示例'
        t1.fontSize = 20
        t1.x = 40
        t1.y = 40
        // 给文本加个底色
        t1.graphics.fillStyle('yellow')
        .fillRect(0, 0, t1.width, t1.height)        

        const avatar = new Image({
          image: loader.get('avatar'),
          width: 100, 
          height: 100,
        })
        // 头像显示成圆形
        avatar.borderRadius = '100%'
        
        

        const name = new Text()
        name.color = '#6c5149'
        name.text = '龙傲天'
        name.textAlign = "center"
        name.x = avatar.width * .5
        name.y = 110

        const group = new Group()
        group.x = stage.width * .5
        group.y = 220
        group.regX = avatar.width * .5
        group.addChild(avatar, name)
        console.log(group.getBounds())
        stage.addChild(t1, group)
        
      }, this)
    }) 
  },
  genTempPath(){
    wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			fileType: 'jpg',
			quality: '.8',
			canvasId: 'myCanvas',
			success:  (res) => {
        console.log(res.tempFilePath)
        this.setData({
          tempPath: res.tempFilePath
        })
        wx.showToast({
					title: 'canvas转图成功' + res.tempFilePath,
					duration: 3000
				})
			},
			fail:  (res) => {
				console.log(res)
				wx.showToast({
					title: 'canvas转图片失败' + JSON.stringify(res),
					icon: 'none',
					duration: 3000
				})
			}
		}, this)
  }
})
