export default class MoveTo {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    exec(ctx, instance) {
        const [_x, _y] = instance.getPosition();
        ctx.moveTo(this.x + _x, this.y + _y);
    }
}
