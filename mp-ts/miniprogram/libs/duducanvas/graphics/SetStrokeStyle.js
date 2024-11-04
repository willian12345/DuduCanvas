export default class SetStrokeStyle {
    constructor(style) {
        this.style = style;
    }
    exec(ctx) {
        ctx.strokeStyle = this.style;
    }
}
