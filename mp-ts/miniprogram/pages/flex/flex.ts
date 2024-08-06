
import { Application, ImgLoader, Text, Container, Image, } from '../../src/index';

const getCanvasSize = () => {
  // 根据屏幕宽度计算 canvas 宽度
  const systemInfo = wx.getSystemInfoSync();
  const screenWidth = systemInfo.windowWidth;
  const designWidth = 750;
  const designHeight = 1334;
  const canvasWidth = screenWidth;
  const canvasHeight = (screenWidth / designWidth) * designHeight;
  return {
    canvasWidth,
    canvasHeight,
  }
}

Component({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },
  lifetimes: {
    async ready() {
      const { canvasWidth, canvasHeight } = getCanvasSize();

      this.setData({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
      });

      const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight }, this);
      const stage = await app.init();
      const container = new Container()
      const loader = new ImgLoader(stage.canvas, [
        {
          id: 'avatar',
          src: '../../assets/avatar.jpeg'
        }
      ])
      await loader.load()
      // container.direction = 'row'
      // container.alignItems = 'center'
      container.justifyContent = 'space-around'
      container.x = 0
      container.y = 0
      container.width = canvasWidth
      container.height = 300
      container.backgroundColor = 'green'
      const t1 = new Text()
      t1.fontSize = 20
      t1.text = '你好啊世界'
      container.addChild(t1)


      const avatarTexture = loader.get('avatar')
      if (avatarTexture) {
        for (let i = 0; i < 2; i++) {
          const avatar = new Image({
            image: avatarTexture.image,
            width: 20 * i + 20,
            height: 20 * i + 20,
          })
          if (i == 1) {
            avatar.borderRadius = '100%'
            avatar.alpha = .5
            avatar.border = '4 solid blue'
          }
          container.addChild(avatar)
        }
      }

      const t2 = new Text()
      t2.fontSize = 30
      t2.text = '上将村'

      const subContainer = new Container()
      subContainer.width = 120
      subContainer.height = 40
      subContainer.borderRadius = 20
      subContainer.border = '2 solid red'
      subContainer.backgroundColor = '#999'
      subContainer.addChild(t2)

      container.addChild(subContainer)

      stage.addChild(container)
      stage.update();
    }
  },
})
