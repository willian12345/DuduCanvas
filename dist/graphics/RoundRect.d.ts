import DisplayObject from "../DisplayObject";
export default class RoundRect {
    stroke: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: boolean;
    radius?: number | number[];
    constructor(x: number, y: number, width: number, height: number, radius?: number | number[], fill?: boolean, stroke?: boolean);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject): void;
}
