import { Application, ImgLoader, Text, Container, Image, RichText } from '../../src/index';

const getCanvasSize = () => {
    // 根据屏幕宽度计算 canvas 宽度
    const systemInfo = wx.getWindowInfo();
    const screenWidth = systemInfo.windowWidth;
    const designWidth = 750;
    const designHeight = 1024;
    // 宽高放大一倍
    const canvasWidth = screenWidth * 2;
    const canvasHeight = ((screenWidth / designWidth) * designHeight) * 2;
    const ratio = canvasWidth / 210
    return {
        canvasWidth,
        canvasHeight,
        ratio
    }
}

Component({
    data: {
        canvasWidth: 0,
        canvasHeight: 0
    },
    lifetimes: {
        async ready() {
            const { canvasWidth, canvasHeight, ratio } = getCanvasSize();



            this.setData({
                canvasWidth: canvasWidth,
                canvasHeight: canvasHeight
            });

            const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight });
            const stage = await app.init();
            if(!stage){
                return;
            }
            const loader = new ImgLoader(stage.canvas, [
                {
                    id: 'avatar',
                    src: '../../assets/avatar.jpeg'
                }
            ])
            await loader.load()

            const card = new Container()
            card.direction = 'column'
            card.width = 210 * ratio
            card.height = 300 * ratio 
            card.backgroundColor = 'pink'
            

            const header = new Container()
            header.width = 210 * ratio
            header.direction = 'row'
            header.justifyContent = 'flex-start'
            header.height = 20 * ratio
            const title = new Text({text: '想了解我？快和我的AI聊聊吧', fontFamily: 'PingFang SC'})
            title.textAlign = 'left'
            title.fontWeight = 400
            title.fontSize = 14 * ratio
            title.color = 'black'
            header.addChild(title)


            // 灰色矩形
            const rect = new Container()
            rect.direction = 'column'
            rect.justifyContent = 'space-around'
            rect.width = 210 * ratio
            rect.height = 169 * ratio
            rect.backgroundColor = '#f5f5f5'
            rect.overflowHidden = true;

            card.addChild(header, rect)

            // 大圈套小圈
            const circle0 = new Container()
            circle0.x = 0
            circle0.y = -10 * ratio
            circle0.width = 178 * ratio
            circle0.height = 178 * ratio
            circle0.borderRadius = '100%'
            circle0.shadow = '0 0 20px rgba(0,0,0,.02)'
            circle0.backgroundColor = 'red'

            const circle1 = new Container()
            circle1.x = 0
            circle1.y = 0
            circle1.width = 138 * ratio
            circle1.height = 138 * ratio
            circle1.borderRadius = '100%'
            circle1.shadow = '0 0 20px rgba(0,0,0,.02)'
            circle1.backgroundColor = 'green'

            const circle2 = new Container()
            circle2.x = 0
            circle2.y = 0
            circle2.width = 102 * ratio
            circle2.height = 102 * ratio
            circle2.borderRadius = '100%'
            circle2.shadow = '0 0 20px rgba(0,0,0,.02)'
            circle2.backgroundColor = 'blue'

            // 头像
            const avatarTexture = loader.get('avatar')
            if (avatarTexture) {
                const avatar = new Image({
                    image: avatarTexture.image,
                    width: 80 * ratio,
                    height: 80 * ratio,
                })
                avatar.borderRadius = '100%'
                circle2.addChild(avatar)
            }

            circle1.addChild(circle2)

            circle0.addChild(circle1)

            rect.addChild(circle0)

            // 名称与公司名容器
            const infoList = new Container()
            infoList.y = -20;
            infoList.direction = 'column'
            infoList.gap = 8 * ratio
            infoList.width = 216 * ratio
            infoList.height = 42 * ratio

            // 用户名
            const name = new RichText({
                text: 'Nexthuman',
                fontSize: 15 * ratio,
                color: 'black',
                fontWeight: 500
            })
            name.wrapWidth = 120 * ratio
            name.lineClamp = 1
            name.height = 22 * ratio

            // 单位名
            const companyName = new RichText()
            companyName.x = 0
            companyName.y = 0
            companyName.lineClamp = 1
            companyName.text = '唯物（杭州）科技有限公司'
            companyName.wrapWidth = 160 * ratio
            companyName.fontSize = 12 * ratio
            companyName.color = 'rgba(0, 0, 0, .45)'
            companyName.letterSpace = 4
            companyName.lineGap = 8
            infoList.addChild(name, companyName)
            rect.addChild(infoList)
            stage.addChild(card)
            
            stage.update();
        }
    },
})
