export default class LineWidth {
    lineWidth: number
    constructor(width = 1) {
        this.lineWidth = width
    }
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D) {
        ctx.lineWidth = this.lineWidth
    }
}