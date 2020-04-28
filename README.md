## Developing...
## 小程序 canvas 海报生成最佳实践
- 网络图片必须先通过 getImageInfo 下载后才能绘制
- 微信头像需要下载后上传至自己的服务器绘制，直接使用微信服务器上的头像绘制时某些 Android 机型上会下载超时导致绘制失败
- canvas page页面下不能嵌在Component组件内，否则某些机型会导致绘制失败
- canvas 不能像h5中的canvas那样通过style来缩小，所以为了生成海报不模糊必须将 canvas 至少设置放大两倍，然后将canvas通过 css position 负值移到屏幕外，绘制后可以直接通过image标签来实现预览


## 微信小程序 canvas 基础库

#### 快速开始
##### 添加图片
```
  // 如果有图片先加载图片
  DuduCan.load([{
      id: 'avatar',
      src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
    }
  ])
  .done((loader) => {
    // 新建 Stage 舞台, 即 canvas 对象
    DuduCan.Stage('myCanvas', (ctx, stage) => {
      // 添加图片，
      const img = new DuduCan.Image({
        image: loader.get('avatar'), // 'avatar'是 load 时的 id
        sx: 0,
        sy: 0, 
        sWidth: 72, 
        sHeight: 72,
        dx: 0, 
        dy: 0, 
        dWidth: 120,
        dHeight: 120
      })
      // 添加至舞台
      stage.addChild(img)
      // 渲染画面
      stage.render()      
    }, this)
  })
```

##### 添加文本
```
DuduCan.Stage('myCanvas', (ctx, stage) => {
  const t1 = new DuduCan.Text()
  .fillText('你好世界Hello')
  t1.color = 'red'
  t1.x = 100
  t1.y = 300
  // 添加至舞台
  stage.addChild(t1)
  // 别忘记渲染画面
  stage.render()
})
```




#### 类
- ImgLoader
- Stage
- DisplayObject
- Container
- Image
- Shape
- Sprite
- Text


