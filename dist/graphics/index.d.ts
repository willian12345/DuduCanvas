import type { TStyle } from './SetFillStyle';
/**
 * Graphics 绘制类
 * 绘制命令，添加绘制命令集，最终在 draw 方法内集中绘制
 */
export default abstract class Graphics {
    name: string;
    protected _instructions: any[];
    constructor();
    protected _append(instructionsObject: any): void;
    protected _remove(instructionName: string): void;
    protected _drawGraphics(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D): void;
    /**
     * 命令方法名与 w3c 一致
     */
    graphics: {
        beginPath: () => any;
        moveTo: (x: number, y: number) => any;
        setLineDash: (dash: number[]) => any;
        lineWidth: (width: number) => any;
        lineCap: (style: WechatMiniprogram.CanvasRenderingContext.CanvasLineCap) => any;
        lineJoin: (style: WechatMiniprogram.CanvasRenderingContext.CanvasLineJoin) => any;
        lineTo: (x: number, y: number) => any;
        quadraticCurveTo: (cpx: number, cpy: number, x: number, y: number) => any;
        bezierCurveTo: (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) => any;
        /**
         画一个以（x,y）为圆心的以radius为半径的圆弧（圆），
         从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
         */
        arc: (x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean) => any;
        /**
         根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点
         */
        arcTo: (x1: number, y1: number, x2: number, y2: number, radius: number) => any;
        stroke: () => any;
        fill: () => any;
        fillStyle: (style: TStyle) => any;
        strokeStyle: (style: string) => any;
        fillCircle: (x?: number, y?: number, radius?: number) => any;
        strokeCircle: (x?: number, y?: number, radius?: number) => any;
        fillRect: (x?: number, y?: number, w?: number, h?: number) => any;
        /**
         * 画一个矩形(非填充)。 用 strokeStyle 设置矩形线条的颜色，如果没设置默认是黑色
         */
        strokeRect: (x?: number, y?: number, w?: number, h?: number) => any;
        fillRoundRect: (x?: number, y?: number, w?: number, h?: number, radius?: string | number | {
            tl: number;
            tr: number;
            br: number;
            bl: number;
        }, fill?: boolean, stroke?: boolean) => any;
        strokeRoundRect: (x: number, y: number, w: number, h: number, radius: number | Record<string, number>) => any;
        /**
         * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容的方
         */
        clearRect: (x: number, y: number, w: number, h: number) => any;
        clip: () => any;
    };
    abstract addChild(): void;
}
