/**
 * lineJoin = "bevel|round|miter"
 * bevel	创建斜角。
 * round	创建圆角。
 * miter	默认。创建尖角。
 */
export default class LineJoin {
    constructor(style = 'bevel', miterLimit = 10) {
        this.lineJoin = style;
        this.miterLimit = miterLimit;
    }
    exec(ctx) {
        // miter 与 miterLimit 关系 具体可查看 https://www.w3school.com.cn/tags/canvas_miterlimit.asp
        if (this.miterLimit != 10 && this.lineJoin === 'bevel') {
            ctx.miterLimit = this.miterLimit;
        }
        ctx.lineJoin = this.lineJoin;
    }
}
