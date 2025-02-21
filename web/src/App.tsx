
import { Application, ImgLoader, Image, Text, Container, RichText } from '../../dist/index'
import './App.css'
import { useEffect } from 'react'

function App() {
  
  const init = async ()=> {
    const app = new Application('myCanvas', { width: 800, height: 600})
    app.init()
    const stage = await app.init();
      if (!stage) {
        return
      }
      const loader = new ImgLoader(stage.canvas, [
        {
          id: 'avatar',
          src: '/src/assets/avatar.jpeg'
        }
      ])
      await loader.load();

      const avatarTexture = loader.get('avatar')
      
      if (!avatarTexture) {
        return;
      }
      const avatar1 = new Image({
        image: avatarTexture.image,
        width: 320,
        height: 320
      })

      const avatar2 = new Image({
        image: avatarTexture.image,
        width: 80,
        height: 80
      })
      avatar2.regX = 40
      avatar2.regY = 40
      avatar2.x = stage.width * .5;
      avatar2.y = stage.height * .5;
      
      // 设置导出图片时背景白色
      stage.backgroundColor = 'green'

      const rect = new Container()
      rect.width = 200
      rect.height = 200
      rect.x = 300
      rect.y = 100
      rect.backgroundColor = 'white'
      rect.overflowHidden = true
      rect.addChild(avatar1)

      stage.addChild(rect)
      stage.update();

      const card = new Container()

      card.width = 210
      card.height = 210
      card.backgroundColor = '#9BBD00'
      card.border = '2px solid red'
      card.borderRadius = 10
      card.alignItems = 'center'
      card.direction = 'column'
      card.gap = 10


      const hello = new Text()
      hello.text = 'Hello'
      const t1 = new RichText()
      t1.text = `见到这行字说明你离发财已经不远了，一定要坚持下去，加油`
      t1.x = 210
      t1.y = 410
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

      
      card.addChild(hello)
      stage.addChild(card, avatar2, t1)
      stage.update()
      
      setInterval(()=> {
        avatar2.rotation+=1
        stage.update()
      }, 100)
  }

  
  useEffect(()=> {
    init()
  }, [])
  return (
    <div>
      <canvas id='myCanvas' width={800} height={600}></canvas>
    </div>
  )
}

export default App
