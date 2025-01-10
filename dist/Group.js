import DisplayObjectContainer from './DisplayObjectContainer';
/**
 * Group 组
 * 可添加多个显示对象进 Group 内，变成一个显示组，可集中对 Group 组操作
 */
export default class Group extends DisplayObjectContainer {
    constructor() {
        super();
        this.name = 'Group';
        this._display = 'block';
        this._alignItems = 'flex-start';
        this._justifyContent = 'flex-start';
    }
    set width(v) {
        this._width = v;
    }
    get width() {
        return this._width;
    }
    set height(v) {
        this._height = v;
    }
    get height() {
        return this._height;
    }
    get display() {
        return this._display;
    }
    set display(v) {
        this._display = v;
    }
    get alignItems() {
        return this._alignItems;
    }
    set alignItems(v) {
        this._alignItems = v;
    }
    get justifyContent() {
        return this._justifyContent;
    }
    set justifyContent(v) {
        this._justifyContent = v;
    }
}
