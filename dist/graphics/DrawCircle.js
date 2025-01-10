export default class DrawCircle {
    constructor(x, y, radius, fill = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fill = fill;
    }
    exec(ctx, instance) {
        // 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        if (!instance.isMask && this.fill) {
            ctx.fill();
        }
    }
}
