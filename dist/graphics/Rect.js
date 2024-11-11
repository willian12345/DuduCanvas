export default class Rect {
    constructor(x, y, w, h, isStroke = false) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isStroke = isStroke;
    }
    exec(ctx, instance) {
        // 要先 beginPath 重新开始 path 以防之前就有开始的路径影响
        ctx.beginPath();
        if (instance.isMask) {
            ctx.rect(0, 0, this.w, this.h);
        }
        else {
            if (this.isStroke) {
                ctx.strokeRect(0, 0, this.w, this.h);
            }
            else {
                ctx.fillRect(0, 0, this.w, this.h);
                ctx.fill();
            }
        }
    }
}
