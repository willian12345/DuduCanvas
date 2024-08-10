import Text from "../Text";
export declare const NO_ROTATION_RANGE: number[][];
export declare function needRotation(char: string): boolean;
/**
 *  文本绘制命令
 */
export declare class FillText {
    instance: Text;
    name: string;
    text: string;
    x: number;
    y: number;
    constructor(text: string, x: number, y: number);
    exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: Text): void;
}
