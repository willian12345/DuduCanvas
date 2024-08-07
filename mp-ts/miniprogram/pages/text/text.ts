import {Text, Application} from '../../src/index'
Component({
  data: {
    hellworld: 'hello',
  },
  lifetimes: {
    attached() {

    },
    async ready(){
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

        const app = new Application('#myCanvas', {width: 375, height: 400}, this);
        const stage = await app.init();
        // let t = new Text({text: '通过单独引用各个类的方式实现编码', fontSize: 60, fontFamily: 'myFont'})
        // t.x = 300
        // t.y = 100
        // t.textAlign = 'end'
        const t1 = new Text()
        t1.text = '你好'
        t1.textAlign = 'center'
        t1.x = 100
        t1.y = 0
        // t1.wrapWidth = 100
        // t1.wrapHeight = 100
        t1.fontSize = 20
        t1.letterSpace = 20
        // t1.writeMode = 'vertical-lr'
        t1.lineGap = 12;
        t1.color = 'green';
        // console.log(t1.width, t1.height)
        // 给文本加个底色
        t1.graphics.fillStyle('yellow')
        .fillRect(0, 0, t1.width, t1.height)   
        stage.addChild(t1)
        stage.update()
        // console.log(t1.width)

        // setInterval(()=> {
        //   t1.text = t1.text + '你'
        //   stage.update();
        // }, 1000)
    }
  },
})
