import {Stage, Text, Application, Container} from '../../src/index'
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

let stage: Stage;
let t1: Text;

Component({
  data: {
    canvasWidth: 0,
    canvasHeight: 0
  },
  methods: {
    sliderchange(e:any){
      console.log(e.detail.value)
      t1.letterSpace = e.detail.value;
      stage.update();
    },
  },
  lifetimes: {
    
    async ready(){
        const { canvasWidth, canvasHeight } = getCanvasSize();
        this.setData({
          canvasWidth: canvasWidth,
          canvasHeight: canvasHeight
        });

        // await new Promise((resolve) => {
        //   wx.loadFontFace({
        //     family: 'myFont',
        //     source: 'https://cdn.jsdelivr.net/gh/Tallone/qutools-fonts/mini-hwmct.ttf',
        //     scopes: ['native'],
        //     success: (res)=> {
        //       console.log(res)
        //       resolve(true)
        //     }
        //   })
        // })

        const app = new Application('#myCanvas', {width: canvasWidth, height: canvasHeight, debug: true}, this);
        stage = await app.init();

        // const container = new Container();
        // container.height = 400;
        // container.x = 0;
        // container.y = 0;
        // container.width = canvasWidth;
        // container.justifyContent = 'center'
        // container.alignItems = 'flex-start'
        // container.backgroundColor = 'green';
        // let t = new Text({text: 'yoyogo 你好啊世界yoyogo ', fontSize: 12})
        // t.x = canvasWidth * .5
        // t.y = 0
        // t.rotation = 30
        // t.color = 'red';
        // stage.addChild(t)
        // stage.update();

        t1 = new Text()
        t1.text = `析] 为避免影响调试，开发者工具在非自定义启动模式`
        t1.x = 0
        t1.y = 0
        t1.color = 'green'
        t1.textAlign = 'left'
        t1.wrapWidth = 200
        // t1.wrapHeight = 400
        t1.fontSize = 20
        // t1.letterSpace = 30
        t1.lineGap = 40
        // t1.writeMode = 'vertical-lr'
        // t1.writeMode = 'vertical-rl'
        // t1.lineGap = 12;
        t1.color = 'red';
        console.log(t1.height,333)
        // 给文本加个底色
        t1.graphics.fillStyle('yellow')
        .fillRect(0, 0, t1.width, t1.height)   
        // container.addChild(t1)
        stage.addChild(t1)
        stage.update()
    }
  },
})
