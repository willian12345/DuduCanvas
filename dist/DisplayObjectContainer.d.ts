import DisplayObject from './DisplayObject';
import type { TContext2d } from './types/index';
export default class DisplayObjectContainer extends DisplayObject {
    childs: DisplayObject[];
    constructor();
    static setDebug(_debug: boolean): void;
    protected _draw(context: TContext2d): void;
    addChild(...args: DisplayObject[]): void;
    removeChild(child: DisplayObject): void;
    findNodesBounds(node: DisplayObjectContainer): {
        left: number;
        top: number;
        right: number;
        bottom: number;
        width: number;
        height: number;
    }[];
}
