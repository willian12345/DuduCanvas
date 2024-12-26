export default class SetLineDash {
    lineDash: number[];
    constructor(dash?: number[]);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
}
