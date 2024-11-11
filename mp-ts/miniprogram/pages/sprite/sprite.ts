import {  getCanvasSize} from '../../utils/util';
import {ImgLoader, Text, Application, Sprite} from '../../src/index'
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
        const app = new Application('#myCanvas', {width: canvasWidth, height: canvasHeight}, this);
        const stage = await app.init();
        if(!stage){
          return
        }
        stage.backgroundColor = '#d85542';
        const loader = new ImgLoader(stage.canvas, [
          {
            id: 'button',
            src: '../../assets/button.png'
          }
        ])
        await loader.load()
        const imageSource = loader.get('button');
        if(!imageSource){
          return;
        }
        
        // 原始按钮大小
        const button = new Sprite(imageSource)
        button.y = 80
        button.width =  128
        button.height = 64
        button.x = stage.width * .5 - button.width * .5
  
        const t1 = new Text({text: '原始按钮大小'})
        t1.fontSize = 14
        t1.color = '#333';
        t1.textAlign = 'center'
        t1.x = button.width * .5
        t1.y = button.height * .5 - (t1.height * .5)
        button.addChild(t1)
        stage.addChild(button)
        stage.update();
        

        // 九宫格按钮，可随意拉升宽高示例
        const bigButton = new Sprite(imageSource)
        bigButton.sliceBounds = {left: 29, top: 21, right: 23, bottom: 24}
        bigButton.x = stage.width * .5;
        bigButton.y = 320
        bigButton.width = 320
        bigButton.height = 120
        bigButton.regX = bigButton.width * .5
        bigButton.regY = bigButton.height * .5

        const t2 = new Text({text: '九宫格拉伸按钮1'})
        t2.fontSize = 20
        t2.textAlign = 'center'
        t2.color = '#666'
        t2.x = bigButton.width * .5
        t2.y = bigButton.height * .5 - (t2.height * .5)
        bigButton.addChild(t2)

        stage.addChild(bigButton)
        stage.update();
    }
  },
})
