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

      const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight, debug: true }, this);
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
      stage.backgroundColor = 'green'

      avatar.rotation = 0
      avatar.regX = 100
      avatar.regY = 100
      avatar.x = canvasWidth * .5;
      avatar.y = 400
      // avatar.borderRadius = '100%'
      avatar.borderRadius = '20 80 20';
      stage.addChild(avatar)
      stage.update();
      
      

      const name = new Text()
      name.color = 'white'
      name.text = '龙傲天'
      name.textAlign = 'center'
      name.fontSize = 32
      name.x = canvasWidth * .5;
      name.y = 180;
      stage.addChild(name)
      stage.update();
      const name1 = new Text()
      name1.color = '#FFFF00'
      name1.text = '給給給'
      name1.fontSize = 26
      name1.textAlign = "left"
      name1.x = 0
      name1.y = 50
      const name2 = new Text()
      name2.color = '#0000FF'
      name2.text = 'YOYOYO'
      name2.fontSize = 26
      name2.textAlign = "left"
      name2.x = 0
      name2.y = 150
      stage.addChild(name1, name2)
      stage.update();

       // 异步更改属性后需要调用 stage.update() 方法
      timer = setInterval(() => {
        avatar.rotation += 2
        // name.y += 2;
        // name.text = `龙傲天 旋转：${avatar.rotation}`
        stage.update()
      }, 400)
    }
  },
})
