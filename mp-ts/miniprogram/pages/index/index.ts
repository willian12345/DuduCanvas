import { Application, ImgLoader, Text, Image, Stage} from '../../src/index';
import {  checkPermission, showAuthTips, savePicture, getCanvasTempPath, getCanvasSize} from '../../utils/util';

let timer: number;
let stage: Stage;
Component({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },
  methods: {
    async saveToTmpPath(){
      checkPermission()
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
      stage = await app.init();
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
        width: 200,
        height: 200
      })
      // 设置导出图片时背景白色
      stage.graphics
      .fillStyle('white')
      .fillRect(0, 0, stage.width, stage.height)

      avatar.x = stage.width / 2
      avatar.y = stage.width / 2
      avatar.regX = 100
      avatar.regY = 100
      avatar.borderRadius = '20 80 20';
      

      const name = new Text()
      name.color = '#6c5149'
      name.text = '龙傲天'
      name.fontSize = 30
      name.textAlign = "center"
      name.x = avatar.x
      name.y = 220
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
