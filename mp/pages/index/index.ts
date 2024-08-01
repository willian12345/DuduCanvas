import {Application, ImgLoader, Stage, Text, Group, Image} from '../../src/index'
Page({
  data:{
    tempPath: ''
  },
  onUnload: function () {
    if(this.timer){
      clearInterval(this.timer)
    }
  },
  onHide: function(){
    // 如果不清除，则canvas 会影响其它页面 新版渲染的 canvas 好神奇？？？
    // 怀疑小程序用的 flutter 只有一个实例
    if(this.timer){
      clearInterval(this.timer)
    }
  },
  onLoad: async function () {
    this.timer;
    const app = new Application('#myCanvas', {width: 375, height: 400}, this);
    const stage = await app.init();
    
    console.log(stage)
    this.canvas = stage.canvas;
    const loader = await new ImgLoader(stage.canvas, [
      {
        id: 'avatar',
        src: '/image/132.jpeg'
      }
    ])
    const t1 = new Text()
    t1.color = '#cda79f'
    t1.fontSize = 20
    t1.text = 'Dudu canvas 示例'
    t1.x = 40
    t1.y = 40
    // 给文本加个底色
    t1.graphics.fillStyle('yellow')
    .fillRect(0, 0, t1.width, t1.height)        
    stage.addChild(t1)
    const avatar = new Image({
      image: loader.get('avatar').image,
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
    stage.addChild(t1, group)

    const centerX = stage.width * .5
    let score = 0
    const textScore = new Text({
      font: `normal bold 56px PingFang-SC`,
      color: 'black',
    })
    textScore.text = score
    textScore.x = (centerX - (textScore.width * .5))
    textScore.y = 100
    stage.addChild(textScore)
    stage.update();

    this.timer = setInterval(()=>{
      score++
      textScore.text = score
      textScore.x = (centerX - (textScore.width * .5))
      stage.update()
    }, 1000)
  },
  genTempPath(){
    wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			fileType: 'jpg',
			quality: '.8',
			canvas: this.canvas,
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
