export default class CreateLinearGradient {
    constructor(x0, y0, x1, y1) {
        this.name = 'CreateLinearGradient';
        this.colorStops = [];
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
    exec(ctx, instance) {
        const [_x, _y] = instance.getPosition();
        const gradient = ctx.createLinearGradient(this.x0 + _x, this.y0 + _y, this.x1 + _x, this.y1 + _y);
        this.colorStops.map(v => gradient.addColorStop(v[0], v[1]));
        return gradient;
    }
    addColorStop(percent, color) {
        this.colorStops.push([percent, color]);
    }
}
