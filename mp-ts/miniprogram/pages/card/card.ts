import { Application, ImgLoader, Text, Container, Image, Shape, RichText } from '../../src/index';

const getCanvasSize = () => {
    // 根据屏幕宽度计算 canvas 宽度
    const systemInfo = wx.getSystemInfoSync();
    const screenWidth = systemInfo.windowWidth;
    const designWidth = 210;
    const designHeight = 1334;
    const canvasWidth = screenWidth;
    const canvasHeight = (screenWidth / designWidth) * designHeight;
    const ratio = screenWidth / designWidth
    console.log(ratio, 111)
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

            const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight, debug: true }, this);
            const stage = await app.init();
            const card = new Container()
            const loader = new ImgLoader(stage.canvas, [
                {
                    id: 'avatar',
                    src: '../../assets/avatar.jpeg'
                }
            ])
            await loader.load()



            card.direction = 'column'
            card.x = 0
            card.y = 0
            card.width = canvasWidth
            card.height = 336
            card.backgroundColor = '#9BBD00'
            console.log(canvasWidth, 3333)

            const header = new Container()
            header.width = canvasWidth
            header.direction = 'row'
            header.justifyContent = 'flex-start'
            header.height = 18 * ratio
            const title = new Text()
            title.textAlign = 'left'
            title.fontSize = 10 * ratio
            title.x = 10
            title.text = '小 绿 页，你 的 智 能 主 页'
            title.color = 'white'
            header.addChild(title)

            // 白色圆角矩形
            const roundedCard = new Container()
            roundedCard.borderRadius = 20
            roundedCard.direction = 'column'
            roundedCard.justifyContent = 'space-around'
            roundedCard.width = 200 * ratio
            roundedCard.height = 133 * ratio
            roundedCard.backgroundColor = 'white'
            card.addChild(header, roundedCard)

            // 头像与名称信息行
            const cardInfo = new Container()
            cardInfo.direction = 'row'
            cardInfo.alignItems = 'center'
            cardInfo.justifyContent = 'flex-start'
            cardInfo.gap = 8 * ratio
            cardInfo.width = 180 * ratio
            cardInfo.height = 50 * ratio
            // cardInfo.borderBottom = '1px solid red'
            cardInfo.graphics
                .beginPath()
                .setLineDash([10, 10])
                .strokeStyle('rgba(0,0,0, .1)')
                .lineWidth(2)
                .moveTo(0, cardInfo.height + 22)
                .lineTo(cardInfo.width, cardInfo.height + 22)
                .stroke()


            const avatarTexture = loader.get('avatar')
            if (avatarTexture) {
                const avatar = new Image({
                    image: avatarTexture.image,
                    width: 40 * ratio,
                    height: 40 * ratio,
                })
                avatar.borderRadius = '100%'
                cardInfo.addChild(avatar)
            }
            // 名称与公司名列
            const infoList = new Container()
            infoList.direction = 'column'
            infoList.alignItems = 'flex-start'
            infoList.width = 264
            infoList.height = 80
            
            const name = new Text({
                text: 'NextHuman',
                fontSize: 14 * ratio,
                color: 'black'
            })
            name.height = 22 * ratio

            const companyName = new RichText()
            companyName.x = 0
            companyName.y = 0
            companyName.text = '名字超长的公司名称展示自动换行科技有限公司'
            companyName.wrapWidth = 132 * ratio
            companyName.fontSize = 11 * ratio
            companyName.color = 'rgba(0, 0, 0, .45)'
            companyName.letterSpace = 4
            companyName.lineGap = 8
            infoList.addChild(name, companyName)
            cardInfo.addChild(infoList)
            roundedCard.addChild(cardInfo)
            const button = new Container()
            button.backgroundColor = '#F57011'
            button.width = 180 * ratio
            button.height = 37 * ratio
            button.gap = 4
            button.borderRadius = 38

            const buttonText = new Text({ text: '立即对话', fontSize: 15 * ratio, color: 'white' })
            button.addChild(buttonText)
            // button icon
            if (avatarTexture) {
                const icon = new Image({
                    image: avatarTexture.image,
                    width: 12 * ratio,
                    height: 12 * ratio,
                })
                icon.borderRadius = '100%'
                button.addChild(icon)
            }

            roundedCard.addChild(button)
            

            stage.addChild(card)
            stage.update();
        }
    },
})
