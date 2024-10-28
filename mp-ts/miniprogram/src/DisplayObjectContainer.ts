import DisplayObject, { TContext2d } from './DisplayObject';
export default class DisplayObjectContainer extends DisplayObject {
    childs: DisplayObject[] = []
    constructor() {
        super();
    }
    protected _draw(context: TContext2d) {
        // 执行绘制 graphics 指令
        this._drawGraphics(context)
        this.childs.forEach((v) => {
            // 绘制前压栈
            context.save()
            // 设置投影
            if (v.shadow.length) {
                this._setShadow(v)
            }
            context.globalAlpha = this._getAlpha()
            v.updateContext(context);
            v.draw(context);
            // console.log(v, 222)
            context.restore();
        })
        
    }
    // 添加子元素
    addChild(...args: DisplayObject[]) {
        // 指定父级
        const childs = args.map((v, index) => {
            if (v._id === this._id) {
                throw new Error(`不能自己添加自己为 child :${v.name}`)
            } else if (v.isMask) {
                throw new Error(`已被设置成 mask 遮罩 不能 addChild 到其它父级内:${v.name}`)
            }
            // 如果添加的对象有 mask 遮罩则 mask 也指定父级，以对应对象的坐标
            if (v.mask) {
                v.mask.parent = this
            }
            v.parent = this
            v.zIndex = index
            return v
        })

        this.childs = this.childs.concat(childs)
    }
    // 删除子元素
    removeChild(child: DisplayObject) {
        this.childs = this.childs.filter(v => v._id != child._id)
    }
}