export declare type TMatrix2D = {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
};
export default class Matrix2D {
    static DEG_TO_RAD: number;
    static identity: any;
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    setValues(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
    append(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
    prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): this;
    appendMatrix(matrix: TMatrix2D): this;
    prependMatrix(matrix: TMatrix2D): this;
    appendTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): this;
    prependTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): this;
    rotate(angle: number): this;
    skew(skewX: number, skewY: number): this;
    scale(x: number, y: number): this;
    translate(x: number, y: number): this;
    identity(): this;
    invert(): this;
    isIdentity(): boolean;
    equals(matrix: TMatrix2D): boolean;
    transformPoint(x: number, y: number, _pt: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    decompose(target: any): any;
    copy(matrix: TMatrix2D): this;
    clone(): Matrix2D;
}
