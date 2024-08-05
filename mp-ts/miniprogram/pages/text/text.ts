import { UniformBlock } from 'XrFrame/kanata/lib/index';
import {Text, Application} from '../../src/index'
Component({
  data: {
    hellworld: 'hello',
  },
  lifetimes: {
    attached() {

    },
    async ready(){
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

        const app = new Application('#myCanvas', {width: 375, height: 400}, this);
        const stage = await app.init();
        let t = new Text({text: '通过单独引用各个类的方式实现编码', fontSize: 60, fontFamily: 'myFont'})
        t.x = 300
        t.y = 100
        t.textAlign = 'end'
        const t1 = new Text()
        t1.text = ' 你好嘟嘟-通过单独引用各个                 hellworld 类的方式实现编码'
        t1.x = 300
        t1.wrapHeight = 200
        t1.writeMode = 'vertical-rl'
        t1.lineGap = 12;
        stage.addChild(t, t1)
        console.log(t)
        stage.update()
    }
  },
})
