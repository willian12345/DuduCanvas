import { Application, ImgLoader, Shape, Text, RichText, Container, Image, ModeImage, Stage } from '../../src/index';
import { checkPermission, showAuthTips, savePicture, getCanvasTempPath, getCanvasSize } from '../../utils/util';

let timer: number;
let stage: Stage | null;
Component({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },
  methods: {
    handleTap(e: any) {
      console.log(e)
    },
    async saveToTmpPath() {
      checkPermission()
      if (!stage) {
        return;
      }
      const tmpPath = await getCanvasTempPath(stage.canvas, 'myCanvas');
      if (!tmpPath) {
        return;
      }
      const authed = await checkPermission()
      if (!authed) {
        showAuthTips()
        return;
      }

      const r = await savePicture(tmpPath);
      if (r) {
        wx.showToast({
          title: '保存完成'
        });
      }
    }
  },
  lifetimes: {
    detached() {
      clearInterval(timer)
    },
    async ready() {
      const { canvasWidth, canvasHeight } = getCanvasSize();

      this.setData({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
      });

      const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight }, this);
      stage = await app.init();
      if (!stage) {
        return
      }
      // stage.scale = .5
      const loader = new ImgLoader(stage.canvas, [
        {
          id: 'avatar',
          src: '../../assets/avatar.jpeg',
        },
        {
          id: 'pic',
          src: 'https://cdn.xiaolvye.cn/avatar/e1688q9f6yyy_cover.jpg'
        },
        {
          id: 'hoz',
          src: '../../assets/hoz.png'
        },
      ])
      await loader.load();

      const avatarTexture = loader.get('avatar')
      if (!avatarTexture) {
        return;
      }
      const picTexture = loader.get('pic')
      if (!picTexture) {
        return;
      }
      const hozTexture = loader.get('hoz')
      if (!hozTexture) {
        return;
      }
      
      const pic = new ModeImage({
        texture: picTexture,
        width: 300,
        height: 300,
        mode: 'aspectFit'
      })
      console.log(pic)
      pic.x = 300
      stage.addChild(pic)
      stage.update();

      

      // 按 等比缩放至 280 宽度
      const avatar1 = new Image({
        image: picTexture.image,
        width: 150,
        height: picTexture.height * (150/picTexture.width),
      })
      // 非等比的 avatar1 需要用正圆形的 avatarWrapper 包一下
      const avatarWrapper = new Container()
      avatarWrapper.width = 150
      avatarWrapper.height = 150
      avatarWrapper.x = 300
      avatarWrapper.y = 350
      avatarWrapper.borderRadius = '100%'
      avatarWrapper.addChild(avatar1)
      stage.addChild(avatarWrapper)
      stage.update();

      const avatar2 = new Image({
        image: avatarTexture.image,
        width: 80,
        height: 80
      })

      avatar2.x = stage.width * .5 + 200;
      avatar2.y = stage.height * .5 + 200;
      
      // 设置导出图片时背景白色
      stage.backgroundColor = 'green'      

      const card = new Container()

      card.width = 210
      card.height = 210
      card.backgroundColor = '#9BBD00'
      card.border = '2px solid red'
      card.borderRadius = 10
      card.alignItems = 'center'
      card.direction = 'column'
      card.gap = 10


      const hello = new Text()
      hello.text = 'Hello'

      const word = new Text()
      word.text = 'World'
      card.addChild(hello, word)
      stage.addChild(card, avatar2)
      stage.update()

    }
  },
})
