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
            card.gap = 5
            card.width = 210 * ratio
            card.height = 200 * ratio
            card.backgroundColor = 'white'

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


            // 白色圆角矩形
            const rect = new Container()
            rect.direction = 'column'
            rect.justifyContent = 'space-around'
            rect.width = 210 * ratio
            rect.height = 169 * ratio
            rect.backgroundColor = '#f5f5f5'
            rect.borderRadius = 0;
            card.addChild(header, rect)

            const circle0 = new Container()
            circle0.x = 0
            circle0.y = -20 * ratio
            circle0.width = 178 * ratio
            circle0.height = 178 * ratio
            circle0.borderRadius = '100%'
            circle0.shadow = '0 0 20px rgba(0,0,0,.02)'
            circle0.backgroundColor = '#f6f6f6'

            const circle1 = new Container()
            circle1.x = 0
            circle1.y = 0
            circle1.width = 138 * ratio
            circle1.height = 138 * ratio
            circle1.borderRadius = '100%'
            circle1.shadow = '0 0 20px rgba(0,0,0,.02)'
            circle1.backgroundColor = '#f8f8f8'

            const circle2 = new Container()
            circle2.x = 0
            circle2.y = 0
            circle2.width = 102 * ratio
            circle2.height = 102 * ratio
            circle2.borderRadius = '100%'
            circle2.shadow = '0 0 20px rgba(0,0,0,.02)'
            circle2.backgroundColor = '#fafafa'

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
            infoList.y = 134 * ratio;
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

            stage.addChild(card, infoList)
            stage.update();
        }
    },
})
