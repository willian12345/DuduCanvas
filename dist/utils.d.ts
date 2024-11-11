import DisplayObject from "./DisplayObject";
/**
 * getPosAfterRotation
 * 获取旋转后的坐标
 * @param {*} rotation 旋转角度
 * @param {*} x
 * @param {*} y
 * 旋转公式转自 Foundation Actionscript3.0 Animation
 * 第十章“坐标旋转及角度反弹”及第十八章“矩阵数学”
 * 可认为是绕虚拟z轴旋转矩阵
 * [cos  sin   0]
 * [-sin cos   0]
 * [ 0    0    1]
 * 计算 x 与 y
 * x = (x * cos + y * -sin)
 * y = (x * sin + y * cos)
 * 得
 * x = Math.cos(angle) * x - Math.sin(angle) * y
 * y =  Math.cos(angle) * y + Math.sin(angle) * x
 *
 */
export declare function getPosAfterRotation(rotation: number, x: number, y: number): {
    x: number;
    y: number;
};
/**
 * getMaxValue
 * 获取数组对象中最小x,最大x,最小y，最大y
 * @param {*} arr : [{x:1, y: 1}, {x: 100, y, 100}]
 */
export declare function getMaxValue(arr: {
    x: number;
    y: number;
}[]): number[];
export declare function findNodes(node: DisplayObject, arr?: DisplayObject[]): DisplayObject[];
/**
 * 类似 css margin,padding 等值的转换
 * 将 value 转换成为 [top right bottom left] 个值
 * @param {*} value
 */
export declare function getTransformedFourValue(value: number | string): number | number[];
