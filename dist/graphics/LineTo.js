export default class LineTo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    exec(ctx, instance) {
        ctx.lineTo(this.x, this.y);
    }
}
