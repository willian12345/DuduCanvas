import DisplayObject from './DisplayObject.js';
/**
 * Stage
 * 舞台对象
 * 所有显示对象都在舞台对象下，舞台通过渲染函数
 * Stage 的 render 发起所有子元素的 draw 方法调用
 * 子元素自身再递归调用子元素 draw 方法
 */
export default class Stage extends DisplayObject {
    /**
     *
     * @param {*} id canvas id
     * @param {*} callback 初始化舞台后的回调
     * @param {*} componentInstance 如果是在自定义组件内，则需要将组件实例 this 传进来
     */
    context: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;
    constructor(canvas: WechatMiniprogram.Canvas, { width, height }: {
        width: number;
        height: number;
    });
    name: string;
    canvas: WechatMiniprogram.Canvas;
    /**
     * 获取 canvas 上下文
     */
    getContext(): WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D;
    /**
     * 重新渲染舞台
     */
    update(): void;
    private _render;
}
