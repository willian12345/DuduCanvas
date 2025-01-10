export default class MoveTo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    exec(ctx, instance) {
        ctx.moveTo(this.x, this.y);
    }
}
