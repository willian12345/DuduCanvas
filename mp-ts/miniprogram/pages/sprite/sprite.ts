import {  getCanvasSize} from '../../utils/util';
import {ImgLoader, Image, Text, Application, Sprite, ModeImage, Container} from '../../src/index'
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
          },
          {
            id: 'avatar',
            src: '../../assets/avatar.jpeg',
          },
          {
            id: 'b64Image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
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

        // base64 demo
        const b64Texture = loader.get('b64Image');
        if(b64Texture){
          const base64Sprite = new Sprite(b64Texture)
          base64Sprite.x = 100
          base64Sprite.y = 200
          stage.addChild(base64Sprite)
        }

        const picTexture = loader.get('pic')
        if (!picTexture) {
          return;
        }
        const hozTexture = loader.get('hoz')
        if (!hozTexture) {
          return;
        }
        const avatarTexture = loader.get('avatar')
        if (!avatarTexture) {
          return;
        }

        // 按 等比缩放至 280 宽度
        const avatar1 = new Image({
          image: picTexture.image,
          width: 150,
          height: picTexture.height * (150/picTexture.width),
        })
        // 非等比的 avatar1 需要用正圆形的 avatarWrapper 包一下
        const avatarWrapper = new Container()
        avatarWrapper.width = 150
        avatarWrapper.height = 150
        avatarWrapper.x = 300
        avatarWrapper.y = 350
        avatarWrapper.borderRadius = '100%'
        avatarWrapper.addChild(avatar1)
        stage.addChild(avatarWrapper)
        stage.update();
  
        const avatar2 = new Image({
          image: avatarTexture.image,
          width: 80,
          height: 80
        })
  
        avatar2.x = stage.width * .5 + 200;
        avatar2.y = stage.height * .5 + 200;

        const pic = new ModeImage({
          texture: hozTexture,
          width: 300,
          height: 300,
          mode: 'aspectFit'
        })
        pic.x = 100
        pic.y = 420
        stage.addChild(pic)
        stage.update();
        
        stage.addChild(bigButton, avatar2)
        stage.update();
    }
  },
})
