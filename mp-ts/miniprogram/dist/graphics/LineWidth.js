export default class LineWidth {
    constructor(width = 1) {
        this.lineWidth = width;
    }
    exec(ctx) {
        ctx.lineWidth = this.lineWidth;
    }
}
