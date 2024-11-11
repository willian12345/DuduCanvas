import { Application, ImgLoader, Shape, Text, RichText, Container, Image, Stage } from '../../src/index';
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
        width: 50,
        height: 50
      })
      // 设置导出图片时背景白色
      stage.backgroundColor = 'green'

      const rect = new Container()
      rect.width = 400
      rect.height = 400
      rect.x = 0
      rect.y = 0
      rect.addChild(avatar)
      rect.overflowHidden = true

      stage.addChild(rect)
      stage.update();

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
      stage.addChild(card)
      stage.update()

    }
  },
})
