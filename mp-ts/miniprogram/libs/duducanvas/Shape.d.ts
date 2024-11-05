/**
 * Shape 图形类
 * 1、包含了各类绘制 api
 * 2、Shape 对象内 通过 graphics 对象可以绘制无限个图形
 * 3、所有绘制 api 命令都存在于 graphics 对象内， graphics 绘制在 Shape 对象内不参与 z 轴排序
 *
 */
import DisplayObject from './DisplayObject';
export default class Shape extends DisplayObject {
    name: string;
    isMask: boolean;
    constructor();
    _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, isMask?: boolean): void;
    getBounds(): any;
}
