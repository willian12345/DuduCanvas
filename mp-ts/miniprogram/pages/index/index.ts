import DisplayObject from '../../src/DisplayObject';
import {Application, ImgLoader, Shape, Text, RichText, CreateLinearGradient, Container, Image, ModeImage, Stage, TContext2d } from '../../src/index';
import { checkPermission, showAuthTips, savePicture, getCanvasTempPath, getCanvasSize } from '../../utils/util';

let timer: number;
let stage: Stage | null;

function applyOptimizedBlur(ctx: TContext2d, self: DisplayObject) {
    const radius = 10;
    const width = self.width
    const height = self.height
    // 获取图像数据
    const imageData = ctx.getImageData(self.x, self.y, width, height) as ImageData;
    const data = imageData.data;
    
    // 水平模糊
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0;
            let count = 0;
            
            // 水平方向采样
            for (let dx = -radius; dx <= radius; dx++) {
                const nx = x + dx;
                if (nx >= 0 && nx < width) {
                    const idx = (y * width + nx) * 4;
                    r += data[idx];
                    g += data[idx + 1];
                    b += data[idx + 2];
                    a += data[idx + 3];
                    count++;
                }
            }
            
            // 计算平均值
            const idx = (y * width + x) * 4;
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
            data[idx + 3] = a / count;
        }
    }
    
    // 垂直模糊
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0;
            let count = 0;
            
            // 垂直方向采样
            for (let dy = -radius; dy <= radius; dy++) {
                const ny = y + dy;
                if (ny >= 0 && ny < height) {
                    const idx = (ny * width + x) * 4;
                    r += data[idx];
                    g += data[idx + 1];
                    b += data[idx + 2];
                    a += data[idx + 3];
                    count++;
                }
            }
            
            // 计算平均值
            const idx = (y * width + x) * 4;
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
            data[idx + 3] = a / count;
        }
    }
    
    // 将处理后的图像数据放回Canvas
    ctx.putImageData(imageData, self.x, self.y);
}
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
      timer && clearInterval(timer)
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
      
      stage.backgroundColor = 'green'      
      
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

      // 按 等比缩放至 280 宽度
      const avatar1 = new Image({
        image: hozTexture.image,
        width: hozTexture.width,
        height: hozTexture.height,
      })
      // 非等比的 avatar1 需要用正圆形的 avatarWrapper 包一下
      const avatarWrapper = new Container()
      avatarWrapper.width = hozTexture.width
      avatarWrapper.height = hozTexture.height
      avatarWrapper.overflowHidden=true
      avatarWrapper.x = 40
      avatarWrapper.y = 100
      avatarWrapper.addChild(avatar1)
      
      stage.addChild(avatarWrapper)
      stage.update();

      const rectWidth = stage.width

      const linearGradient = new CreateLinearGradient(rectWidth, 0, rectWidth, 200)
      linearGradient.addColorStop(0, '#ffffffcc'); // #ffffffcc 相当于 rgba(255,255,255,0.8)
      linearGradient.addColorStop(1, '#ffffff4d'); // #ffffff4d 相当于 rgba(255,255,255,0.3)
          
      const rect = new Shape()
      rect.graphics.fillStyle(linearGradient)
      rect.graphics.fillRect(40, 0, rectWidth, 200)
      rect.width = rectWidth
      rect.height = 200
      
      

      const rectContainer = new Container()
      // rectContainer.flex = false
      rectContainer.width = rectWidth
      rectContainer.height = 112
      rectContainer.x = 0
      rectContainer.filters = [applyOptimizedBlur]
      rectContainer.overflowHidden = true
      rectContainer.borderRadius = '24px 24px 0 0'
      rectContainer.addChild(rect)

      const textContainer = new Container()
      textContainer.width = rectWidth
      textContainer.alignItems = 'flex-start'
      textContainer.height = 112
      textContainer.y = 24
      textContainer.x = 24
      textContainer.gap = 16
      textContainer.direction = 'column'
      
      let t1 = new RichText({text: '朱迪的七七八八朱迪的七七八八朱迪的七七八八朱迪的七七八八', fontSize: 28, fontFamily: 'PingFangSC-Medium', fontWeight: 500})
      t1.wrapWidth = 372
      t1.lineClamp = 1
      t1.color = '#111A34';
      let t2 = new RichText({text: '深圳小蓝本科技科有限公司 | UI设计师UI设计师', fontSize: 20, fontFamily: 'PingFangSC-Regular', fontWeight: 400})
      t2.wrapWidth = 372
      t2.lineClamp = 1
      t2.color = '#414A64';
      textContainer.addChild(t1, t2)
      
      
      


      stage.addChild(rectContainer, textContainer)
      stage.update()

    }
  },
})
