## 边用边开发中...
## 小程序 canvas 海报生成注意事项
- 网络图片必须先通过 getImageInfo 下载后才能绘制
- 微信头像需要下载后上传至自己的服务器绘制，直接使用微信服务器上的头像绘制时某些 Android 机型上会下载超时导致绘制失败
- canvas page页面下不能嵌在Component组件内，否则某些机型会导致绘制失败
- canvas 不能像h5中的canvas那样通过style来缩小，所以为了生成海报不模糊必须将 canvas 至少设置放大两倍，然后将canvas通过 css position 负值移到屏幕外，绘制后可以直接通过image标签来实现预览


## 微信小程序 canvas 基础库

#### 快速开始

##### 页面内添加 canvas 标签
```
  <canvas id="myCanvas" canvas-id="myCanvas" style="width: 375px; height: 800px"></canvas>
```
##### 添加图片
```
  // 如果有图片先加载图片
  DuduCan.load([{
      id: 'avatar',
      src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
    }
  ])
  .done((loader) => {
    // 通过页面中的 id 新建 Stage 舞台, 所有可视对象 (DisplayObject) 都将绘制在舞台
    DuduCan.Stage('myCanvas', stage => {
      // 添加图片，
      const img = DuduCan.Image({
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
      // 渲染
      stage.render()      
    }, this)
  })
```

##### 添加文本
```
DuduCan.Stage('myCanvas', stage => {
  const t1 = DuduCan.Text({
    text: '你好世界Hello', 
    color: 'red'
  })
  t1.x = 100
  t1.y = 300
  // 添加至舞台
  stage.addChild(t1)
  // 别忘记渲染
  stage.render()
})
```

##### 获取 context 直接操作 canvas 
###### 库只包含了一些简单的 API, 某些情况下无法满足业务需求，可直接操作 context 手动绘制
```
  DuduCan.Stage('myCanvas', (stage, context) => {
    context.fillStyle = 'blue'
    context.fillRect(50, 100, 100, 100)
    // 这里需要调用 stage.render 实例方法才能保住在 stage 上原先绘制的图形
    // 如果直接调用的是 context.draw()，则画布将完全重绘
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


