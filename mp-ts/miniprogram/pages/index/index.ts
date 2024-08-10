import { Application, ImgLoader, Text, Image, } from '../../src/index';

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
let timer: number;
Component({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },
  lifetimes: {
    detached(){
      clearInterval(timer)
    },
    async ready() {
      const { canvasWidth, canvasHeight } = getCanvasSize();

      this.setData({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
      });

      const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight }, this);
      const stage = await app.init();
      const loader = new ImgLoader(stage.canvas, [
        {
          id: 'avatar',
          src: '../../assets/avatar.jpeg'
        }
      ])
      await loader.load();

      const avatarTexture = loader.get('avatar')
      if (!avatarTexture) {
        return;
      }
      const avatar = new Image({
        image: avatarTexture.image,
        width: 100,
        height: 100
      })
      avatar.x = stage.width / 2
      avatar.y = stage.width / 2
      avatar.regX = 50
      avatar.regY = 50
      avatar.borderRadius = '10 40 10';
      

      const name = new Text()
      name.color = '#6c5149'
      name.text = '龙傲天'
      name.textAlign = "center"
      name.x = avatar.x
      name.y = 110
      stage.addChild(avatar, name)
      stage.update();

       // 异步更改属性后需要调用 stage.update() 方法
    timer = setInterval(() => {
      avatar.rotation += 2
      name.text = `龙傲天 旋转：${avatar.rotation}`
      stage.update()
    }, 400)
    }
  },
})
