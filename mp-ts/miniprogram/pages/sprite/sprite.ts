
import {ImgLoader, Image, Text, Application, Sprite} from '../../src/index'
Component({
  lifetimes: {
    attached() {

    },
    async ready(){
        
        const app = new Application('#myCanvas', {width: 375, height: 400}, this);
        const stage = await app.init();
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
        const button = new Image({
          image: imageSource.image,
          width: 128, 
          height: 64
        })
        button.x = stage.width / 2 - button.width / 2
        button.y = 80
        const t1 = new Text({text: '原始按钮大小'})
        t1.fontSize = 14
        t1.color = 'white';
        t1.textAlign = 'center'
        t1.x = button.width * .5
        t1.y = button.height * .5 - (t1.height * .5)
        button.addChild(t1)
        stage.addChild(button)
        stage.update();
        

        // 九宫格按钮，可随意拉升宽高示例
        // const bigButton = new Sprite(imageSource)
        // bigButton.sliceBounds = {left: 29, top: 21, right: 23, bottom: 24}
        // bigButton.x = stage.width * .5;
        // bigButton.y = 320
        // bigButton.width = 320
        // bigButton.height = 80
        // bigButton.regX = bigButton.width * .5
        // bigButton.regY = bigButton.height * .5

        // const t2 = new Text({text: '九宫格拉伸按钮'})
        // t2.fontSize = 20
        // t2.textAlign = 'center'
        // t2.x = bigButton.width * .5
        // t2.y = bigButton.height * .5 - (t2.height * .5)
        // bigButton.addChild(t2)

        // stage.addChild(bigButton)
        // stage.update();
    }
  },
})
