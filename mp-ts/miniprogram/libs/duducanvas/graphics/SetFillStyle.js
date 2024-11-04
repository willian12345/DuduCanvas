export default class SetFillStyle {
    constructor(style) {
        this.style = style;
    }
    exec(ctx, instance) {
        if (typeof this.style === 'string') {
            return ctx.fillStyle = this.style;
        }
        return ctx.fillStyle = this.style.exec(ctx, instance);
    }
}
