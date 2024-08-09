import {Text, Application} from '../../src/index'
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
    attached() {

    },
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

        const app = new Application('#myCanvas', {width: canvasWidth, height: canvasHeight}, this);
        const stage = await app.init();
        
        let t = new Text({text: '单行文本居中显示', fontSize: 12})
        t.x = canvasWidth * .5
        t.y = 80
        t.rotation = 30
        t.color = 'red';
        stage.addChild(t)
        stage.update();


        const t1 = new Text()
        t1.text = '通过单独引用单行文本居中显示依赖异常情况，可能会导'
        t1.x = 0
        t1.y = 180
        // t1.wrapWidth = 120
        t1.wrapHeight = 100
        t1.fontSize = 20
        t1.letterSpace = 10
        t1.lineGap = 20
        t1.writeMode = 'vertical-lr'
        // t1.writeMode = 'vertical-rl'
        // t1.lineGap = 12;
        t1.color = 'green';
        // console.log(t1.width, t1.height)
        // 给文本加个底色
        // t1.graphics.fillStyle('yellow')
        // .fillRect(0, 0, t1.width, t1.height)   
        stage.addChild(t1)
        stage.update()
        // console.log(t1.width)

        // setInterval(()=> {
        //   t.rotation += 8;
        //   stage.update();
        // }, 1000)
    }
  },
})
