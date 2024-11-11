import DisplayObject, { TContext2d } from './DisplayObject';
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
