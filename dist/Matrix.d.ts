export type TMatrix2D = {
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
    /**
      // 矩阵的六个属性可以看作是变换系数
      a = 1;   // 水平缩放/旋转系数
      b = 0;   // 水平倾斜系数
      c = 0;   // 垂直倾斜系数
      d = 1;   // 垂直缩放/旋转系数
      tx = 0;  // 水平位移系数
      ty = 0;  // 垂直位移系数
  
      // 假设对象移动到(100,100)并旋转45度后的矩阵大致是：
      // a = 0.707  (cos 45°)
      // b = 0.707  (sin 45°)
      // c = -0.707 (-sin 45°)
      // d = 0.707  (cos 45°)
      // tx = 100
      // ty = 100
  
      // invert() 后的矩阵（变换系数）大致是：
      // a = 0.707
      // b = -0.707
      // c = 0.707
      // d = 0.707
      // tx = -141.421 (-100√2)
      // ty = 0
      碰撞检测应用：
      hitTest(screenX: number, screenY: number) {
          // 1. 获取逆变换系数
          const inverseMatrix = this.matrix.clone().invert();
          
          // 2. 直接用这些系数将屏幕坐标转换为本地坐标
          // 就像是代入一个公式：
          // localX = screenX * a + screenY * c + tx
          // localY = screenX * b + screenY * d + ty
          const localPoint = inverseMatrix.transformPoint(
              screenX,
              screenY,
              {x:0, y:0}
          );
          
          // 本地坐标系中判断点击位置
          return (
              localPoint.x >= 0 &&
              localPoint.x <= this.width &&
              localPoint.y >= 0 &&
              localPoint.y <= this.height
          );
      }
    */
    transformPoint(x: number, y: number, _pt: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    /**
      从矩阵分解提取成基本变换属性（位移、缩放、旋转、倾斜）
      举例：
      const matrix = new Matrix2D();
      matrix.appendTransform(100, 100, 2, 1.5, 45, 0, 0, 0, 0);
  
      const decomposed = {};
      matrix.decompose(decomposed);
      console.log(decomposed);
      // 输出类似：
      // {
      //   x: 100,          // 位移
      //   y: 100,
      //   scaleX: 2,       // 缩放
      //   scaleY: 1.5,
      //   rotation: 45,    // 旋转角度
      //   skewX: 0,        // 倾斜
      //   skewY: 0
      // }
     */
    decompose(target: any): any;
    copy(matrix: TMatrix2D): this;
    clone(): Matrix2D;
}
