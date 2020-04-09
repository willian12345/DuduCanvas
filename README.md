## 开发中...
## 微信小程序 canvas 基础封装

#### 快速开始
```
  // 如果有图片先加载图片
  DuduCan.load([{
      id: 'avatar',
      src: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4ZVUCL6zw7Uia4gIG7bLrll0sD6AA96b8mzDd42UyoMYaxdl6icOOFQ6vTWeW3rU9ynB1q5uvnibcg/132'
    }
  ])
  .done((loader) => {
    // 新建 Stage 舞台, 即 canvas 对象
    new DuduCan.Stage('myCanvas', (ctx, stage) => {
      // 添加图片，
      const img = new DuduCan.Image({
        image: loader.get('health'),
        sx: 0,
        sy: 0, 
        sWidth: 72, 
        sHeight: 72,
        dx: 0, 
        dy: 0, 
        dWidth: 120,
        dHeight: 120
      })
      stage.addChild(container)
      // 渲染画面
      stage.update()      
    }, this)
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


