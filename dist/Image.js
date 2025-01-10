import SimpleCss from './SimpleCss';
/**
 * Image 图片显示类
 * 继承自SimpleCss类，支持 borderRadius、border
 */
export default class Image extends SimpleCss {
    constructor(args) {
        var _a, _b, _c, _d, _e, _f;
        super();
        this.name = 'Image';
        this.path = null;
        if (args.width !== undefined) {
            this.width = args.width;
        }
        if (args.height) {
            this.height = args.height;
        }
        this.sx = args.sx;
        this.sy = args.sy;
        this.sWidth = (_a = args.sWidth) !== null && _a !== void 0 ? _a : 0;
        this.sHeight = (_b = args.sHeight) !== null && _b !== void 0 ? _b : 0;
        this.dx = (_c = args.dx) !== null && _c !== void 0 ? _c : 0;
        this.dy = (_d = args.dy) !== null && _d !== void 0 ? _d : 0;
        this.dWidth = (_e = args.dWidth) !== null && _e !== void 0 ? _e : 0;
        this.dHeight = (_f = args.dHeight) !== null && _f !== void 0 ? _f : 0;
        this.image = args.image;
        // 如果设置了 width 则认 width 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
        if (!this.width && this.dWidth !== undefined) {
            this.width = this.dWidth;
        }
        else {
            this.dWidth = this.width;
        }
        // 如果设置了 height 则认 height 参数作为渲染宽度， 否则就将 dWidth 参数作为渲染宽度
        if (!this.height && this.dHeight !== undefined) {
            this.height = this.dHeight;
        }
        else {
            this.dHeight = this.height;
        }
        console.log(this.width, this.height);
    }
    _drawImage(ctx, x, y) {
        /**
         * !! 注意参数变化,可省略的原始图像位置尺寸信息是排在前面的
         * drawImage(img, dx, dy);
         * drawImage(img, dx, dy, dWidth, dHeight);
         * drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
         */
        ctx.globalAlpha = this._getAlpha();
        if (this.sx !== undefined && this.sy !== undefined) {
            // 如果传了原始图起点，则说明要填完整所有参数
            ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, x, y, this.dWidth, this.dHeight);
        }
        else if (this.dWidth != undefined) {
            // 如果传了绘制目标宽，则认为不管原图，只管绘制目标位置与宽高
            ctx.drawImage(this.image, 0, 0, this.dWidth, this.dHeight);
        }
        else {
            // 只管绘制目标位置，会绘制原始图大小
            ctx.drawImage(this.image, x, y);
        }
    }
    _draw(ctx) {
        let [x, y] = this.getPosition();
        x = this.dx + x;
        y = this.dy + y;
        // 绘制图片
        this._drawImage(ctx, x, y);
        super._draw(ctx);
    }
    draw(ctx) {
        this._draw(ctx);
    }
}
