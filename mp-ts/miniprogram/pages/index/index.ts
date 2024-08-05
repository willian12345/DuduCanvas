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
        let t = new Text({text: '你好世界', fontSize: 60, fontFamily: 'myFont'})
        t.x = 0
        t.y = 100
        stage.addChild(t)
        stage.update()
    }
  },
})
