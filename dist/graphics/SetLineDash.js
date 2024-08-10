export default class SetLineDash {
    constructor(dash = []) {
        this.lineDash = dash;
    }
    exec(ctx) {
        ctx.setLineDash(this.lineDash);
    }
}
