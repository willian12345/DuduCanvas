// Matrix2D 矩阵：
// [a  c  tx]
// [b  d  ty]
// [0  0  1 ]

// 位移 (dx, dy)
// [1  0  dx]
// [0  1  dy]
// [0  0  1 ]

// 缩放 (sx, sy)
// [sx 0  0 ]
// [0  sy 0 ]
// [0  0  1 ]

// 旋转 angle
// [cos(a) -sin(a) 0]
// [sin(a)  cos(a) 0]
// [0       0      1]

export type TMatrix2D = {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
};

export default class Matrix2D {
  static DEG_TO_RAD = Math.PI / 180;
  static identity = null;
  a = 1; // 水平缩放/旋转
  b = 0; // 水平倾斜
  c = 0; // 垂直倾斜
  d = 1; // 垂直缩放/旋转
  tx = 0; // X轴位移
  ty = 0; // Y轴位移

  constructor(
    a: number = 1,
    b: number = 0,
    c: number = 0,
    d: number = 1,
    tx: number = 0,
    ty: number = 0
  ) {
    this.setValues(a, b, c, d, tx, ty);
  }
  setValues(
    a: number,
    b: number,
    c: number,
    d: number,
    tx: number,
    ty: number
  ) {
    this.a = a == null ? 1 : a;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d == null ? 1 : d;
    this.tx = tx || 0;
    this.ty = ty || 0;
    return this;
  }
  append(a: number, b: number, c: number, d: number, tx: number, ty: number) {
    var a1 = this.a;
    var b1 = this.b;
    var c1 = this.c;
    var d1 = this.d;
    if (a != 1 || b != 0 || c != 0 || d != 1) {
      this.a = a1 * a + c1 * b;
      this.b = b1 * a + d1 * b;
      this.c = a1 * c + c1 * d;
      this.d = b1 * c + d1 * d;
    }
    this.tx = a1 * tx + c1 * ty + this.tx;
    this.ty = b1 * tx + d1 * ty + this.ty;
    return this;
  }
  prepend(a: number, b: number, c: number, d: number, tx: number, ty: number) {
    var a1 = this.a;
    var c1 = this.c;
    var tx1 = this.tx;

    this.a = a * a1 + c * this.b;
    this.b = b * a1 + d * this.b;
    this.c = a * c1 + c * this.d;
    this.d = b * c1 + d * this.d;
    this.tx = a * tx1 + c * this.ty + tx;
    this.ty = b * tx1 + d * this.ty + ty;
    return this;
  }

  appendMatrix(matrix: TMatrix2D) {
    return this.append(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.tx,
      matrix.ty
    );
  }

  prependMatrix(matrix: TMatrix2D) {
    return this.prepend(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.tx,
      matrix.ty
    );
  }

  appendTransform(
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    rotation: number,
    skewX: number,
    skewY: number,
    regX: number,
    regY: number
  ) {
    if (rotation % 360) {
      var r = rotation * Matrix2D.DEG_TO_RAD;
      var cos = Math.cos(r);
      var sin = Math.sin(r);
    } else {
      cos = 1;
      sin = 0;
    }

    if (skewX || skewY) {
      skewX *= Matrix2D.DEG_TO_RAD;
      skewY *= Matrix2D.DEG_TO_RAD;
      this.append(
        Math.cos(skewY),
        Math.sin(skewY),
        -Math.sin(skewX),
        Math.cos(skewX),
        x,
        y
      );
      this.append(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        0,
        0
      );
    } else {
      this.append(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        x,
        y
      );
    }

    if (regX || regY) {
      this.tx -= regX * this.a + regY * this.c;
      this.ty -= regX * this.b + regY * this.d;
    }
    return this;
  }

  prependTransform(
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    rotation: number,
    skewX: number,
    skewY: number,
    regX: number,
    regY: number
  ) {
    if (rotation % 360) {
      var r = rotation * Matrix2D.DEG_TO_RAD;
      var cos = Math.cos(r);
      var sin = Math.sin(r);
    } else {
      cos = 1;
      sin = 0;
    }

    if (regX || regY) {
      this.tx -= regX;
      this.ty -= regY;
    }
    if (skewX || skewY) {
      skewX *= Matrix2D.DEG_TO_RAD;
      skewY *= Matrix2D.DEG_TO_RAD;
      this.prepend(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        0,
        0
      );
      this.prepend(
        Math.cos(skewY),
        Math.sin(skewY),
        -Math.sin(skewX),
        Math.cos(skewX),
        x,
        y
      );
    } else {
      this.prepend(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        x,
        y
      );
    }
    return this;
  }

  rotate(angle: number) {
    angle = angle * Matrix2D.DEG_TO_RAD;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);

    var a1 = this.a;
    var b1 = this.b;

    this.a = a1 * cos + this.c * sin;
    this.b = b1 * cos + this.d * sin;
    this.c = -a1 * sin + this.c * cos;
    this.d = -b1 * sin + this.d * cos;
    return this;
  }

  skew(skewX: number, skewY: number) {
    skewX = skewX * Matrix2D.DEG_TO_RAD;
    skewY = skewY * Matrix2D.DEG_TO_RAD;
    this.append(
      Math.cos(skewY),
      Math.sin(skewY),
      -Math.sin(skewX),
      Math.cos(skewX),
      0,
      0
    );
    return this;
  }
  scale(x: number, y: number) {
    this.a *= x;
    this.b *= x;
    this.c *= y;
    this.d *= y;
    return this;
  }
  translate(x: number, y: number) {
    this.tx += this.a * x + this.c * y;
    this.ty += this.b * x + this.d * y;
    return this;
  }
  identity() {
    this.a = this.d = 1;
    this.b = this.c = this.tx = this.ty = 0;
    return this;
  }

  invert() {
    var a1 = this.a;
    var b1 = this.b;
    var c1 = this.c;
    var d1 = this.d;
    var tx1 = this.tx;
    var n = a1 * d1 - b1 * c1;

    this.a = d1 / n;
    this.b = -b1 / n;
    this.c = -c1 / n;
    this.d = a1 / n;
    this.tx = (c1 * this.ty - d1 * tx1) / n;
    this.ty = -(a1 * this.ty - b1 * tx1) / n;
    return this;
  }
  isIdentity() {
    return (
      this.tx === 0 &&
      this.ty === 0 &&
      this.a === 1 &&
      this.b === 0 &&
      this.c === 0 &&
      this.d === 1
    );
  }
  equals(matrix: TMatrix2D) {
    return (
      this.tx === matrix.tx &&
      this.ty === matrix.ty &&
      this.a === matrix.a &&
      this.b === matrix.b &&
      this.c === matrix.c &&
      this.d === matrix.d
    );
  }
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
  transformPoint(x: number, y: number, _pt: { x: number; y: number }) {
    // 点的转换，矩阵乘法：
    // [a  c  tx]   [x]   [x * a + y * c + tx]
    // [b  d  ty] * [y] = [x * b + y * d + ty]
    // [0  0  1 ]   [1]   [1]
    const pt = _pt || { x: 0, y: 0 };
    pt.x = x * this.a + y * this.c + this.tx;
    pt.y = x * this.b + y * this.d + this.ty;
    return pt;
  }
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
  decompose(target: any) {
    if (target == null) {
      target = {};
    }
    target.x = this.tx;
    target.y = this.ty;
    //使用勾股定理/毕达哥拉斯定理计算
    target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
    target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
    // 计算倾斜角度
    var skewX = Math.atan2(-this.c, this.d);
    var skewY = Math.atan2(this.b, this.a);

    // 判断是否可以简化为纯旋转
    var delta = Math.abs(1 - skewX / skewY);
    if (delta < 0.00001) {
      // 当两个倾斜角度几乎相等时，可以视为纯旋转
      target.rotation = skewY / Matrix2D.DEG_TO_RAD;
      if (this.a < 0 && this.d >= 0) {
        target.rotation += target.rotation <= 0 ? 180 : -180;
      }
      target.skewX = target.skewY = 0;
    } else {
      // 否则保留倾斜信息
      target.skewX = skewX / Matrix2D.DEG_TO_RAD;
      target.skewY = skewY / Matrix2D.DEG_TO_RAD;
    }
    return target;
  }

  copy(matrix: TMatrix2D) {
    return this.setValues(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.tx,
      matrix.ty
    );
  }
  clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
  }
}
