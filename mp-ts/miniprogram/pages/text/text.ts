import {Stage, Text, Application, RichText} from '../../src/index'
const getCanvasSize = () => {
  // 根据屏幕宽度计算 canvas 宽度
  const systemInfo = wx.getWindowInfo();
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

let stage: Stage|null = null;
let t1: RichText;

Component({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },
  methods: {
    sliderchange(e:any){
      console.log(e.detail.value)
      t1.letterSpace = e.detail.value;
      stage?.update();
    },
  },
  lifetimes: {
    
    async ready(){
        const { canvasWidth, canvasHeight } = getCanvasSize();
        this.setData({
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight
        });

        await new Promise((resolve) => {
          wx.loadFontFace({
            family: 'myFont',
            source: 'https://cdn.jsdelivr.net/gh/Tallone/qutools-fonts/mini-hwmct.ttf',
            scopes: ['native'],
            success: (res)=> {
              console.log(res)
              resolve(true)
            }
          })
        })

        const app = new Application('#myCanvas', {width: canvasWidth, height: canvasHeight, debug: true}, this);
        stage = await app.init();
        if(!stage){
          return;
        }
        
        let t = new Text({text: 'yoyogo 你好啊世界yoyogo ', fontSize: 12})
        t.x = canvasWidth * .5
        t.y = 0
        t.rotation = 30
        t.color = 'red';
        stage.addChild(t)
        stage.update();

        t1 = new RichText()
        t1.text = `🍺析] 为避免影响调试，开发者工具在非自定义启动模式`
        t1.x = 0
        t1.y = 0
        t1.lineClamp = 2
        t1.color = 'green'
        t1.textAlign = 'left'
        t1.wrapWidth = 200
        t1.fontSize = 20
        t1.lineGap = 40
        t1.color = 'red';
        // 给文本加个底色
        t1.graphics.fillStyle('yellow')
        .fillRect(0, 0, t1.width, t1.height)
        stage.addChild(t1)
        stage.update()
    }
  },
})
