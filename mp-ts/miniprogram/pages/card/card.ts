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

            const app = new Application('#myCanvas', { width: canvasWidth, height: canvasHeight, }, this);
            const stage = await app.init();
            
            const card = new Container()
            const loader = new ImgLoader(stage.canvas, [
                {
                    id: 'avatar',
                    src: '../../assets/avatar.jpeg'
                },
                {
                    id: 'arrow',
                    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAZCAYAAAArK+5dAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADxSURBVHgBxZbdDYMwDIQdJmAERuho2SDZpGwSNugIsAHd4Gq3QU2lKrGhqJ+Ul8i+C3Z+IPonAHoegUfiMePNmuc8j4GsSFIW0HJVG+VVrbAjOb4lHnCcUFv5r/Dfat4qi6VsEjuUBmMjIeK1o27Qk8rVtwg51mrSW2q/xyRKQoIeq0mSYOuet5jMhH2oTTrah1NHsskCG9FQotXaZIu4MElwhA6ruOC3hDPEhaFzzt05d2q3ik8lkRz/C+kYWXvZsjWX3Qw9n5ddNjnvui5MtA2vEauFw5lPZmEiPWm9ESUTDvxd+CxQftWS554PUU3jAQjUh4VxFIXRAAAAAElFTkSuQmCC'
                  }
            ])
            await loader.load()

            card.direction = 'column'
            card.x = 0
            card.y = 0
            card.width = 210 * ratio
            card.height = 168 * ratio
            card.backgroundColor = '#9BBD00'

            const header = new Container()
            header.width = 210 * ratio
            header.direction = 'row'
            header.justifyContent = 'flex-start'
            header.height = 18 * ratio
            const title = new Text()
            title.textAlign = 'left'
            title.fontSize = 10 * ratio
            title.x = 10 * ratio
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
            
            // 灰色分割线
            cardInfo.graphics
                .beginPath()
                .setLineDash([10, 10])
                .strokeStyle('rgba(0,0,0, .1)')
                .lineWidth(2)
                .moveTo(0, cardInfo.height + (11 * ratio))
                .lineTo(cardInfo.width, cardInfo.height + (11 * ratio))
                .stroke()

            // 头像
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
            infoList.width = 264 * ratio
            infoList.height = 80 * ratio
            // 用户名
            const name = new Text({
                text: 'NextHuman',
                fontSize: 14 * ratio,
                color: 'black',
                fontWeight: 500
            })
            name.height = 22 * ratio
            // 单位名
            const companyName = new RichText()
            companyName.x = 0
            companyName.y = 0
            companyName.text = '唯物（杭州）科技有限公司'
            companyName.wrapWidth = 132 * ratio
            companyName.fontSize = 11 * ratio
            companyName.color = 'rgba(0, 0, 0, .45)'
            companyName.letterSpace = 4
            companyName.lineGap = 8
            infoList.addChild(name, companyName)
            cardInfo.addChild(infoList)
            roundedCard.addChild(cardInfo)
            
            // 立即对话按钮
            const button = new Container()
            button.backgroundColor = '#F57011'
            button.width = 180 * ratio
            button.height = 37 * ratio
            button.gap = 4 * ratio
            button.borderRadius = 38  * ratio

            const buttonText = new Text({ text: '立即对话', fontSize: 15 * ratio, color: 'white' })
            button.addChild(buttonText)
            // button icon
            const arrowTexture = loader.get('arrow')
            if (arrowTexture) {
                const icon = new Image({
                    image: arrowTexture.image,
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
