import DisplayObjectContainer from './DisplayObjectContainer.js';
/**
 * Group 组
 * 可添加多个显示对象进 Group 内，变成一个显示组，可集中对 Group 组操作
 */
export default class Group extends DisplayObjectContainer {
    name: string;
    _display: string;
    _alignItems: string;
    _justifyContent: string;
    constructor();
    set width(v: number);
    get width(): number;
    set height(v: number);
    get height(): number;
    get display(): string;
    set display(v: string);
    get alignItems(): string;
    set alignItems(v: string);
    get justifyContent(): string;
    set justifyContent(v: string);
}
