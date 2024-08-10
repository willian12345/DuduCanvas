export default class Arc {
    name: string;
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    anticlockwise: boolean;
    constructor(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: any): void;
}
