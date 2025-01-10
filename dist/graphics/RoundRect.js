// CanvasRenderingContext2D.roundRect
// https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/roundRect
// 目前小程序还不支持，所以使用网上的 polyfill
// https://cdn.jsdelivr.net/gh/Kaiido/roundRect/roundRect.js
function roundRect(x, y, w, h, radii, ctx) {
    if (!([x, y, w, h].every((input) => Number.isFinite(input)))) {
        return;
    }
    radii = parseRadiiArgument(radii);
    let upperLeft, upperRight, lowerRight, lowerLeft;
    if (radii.length === 4) {
        upperLeft = toCornerPoint(radii[0]);
        upperRight = toCornerPoint(radii[1]);
        lowerRight = toCornerPoint(radii[2]);
        lowerLeft = toCornerPoint(radii[3]);
    }
    else if (radii.length === 3) {
        upperLeft = toCornerPoint(radii[0]);
        upperRight = toCornerPoint(radii[1]);
        lowerLeft = toCornerPoint(radii[1]);
        lowerRight = toCornerPoint(radii[2]);
    }
    else if (radii.length === 2) {
        upperLeft = toCornerPoint(radii[0]);
        lowerRight = toCornerPoint(radii[0]);
        upperRight = toCornerPoint(radii[1]);
        lowerLeft = toCornerPoint(radii[1]);
    }
    else if (radii.length === 1) {
        upperLeft = toCornerPoint(radii[0]);
        upperRight = toCornerPoint(radii[0]);
        lowerRight = toCornerPoint(radii[0]);
        lowerLeft = toCornerPoint(radii[0]);
    }
    else {
        throw new RangeError(`${radii.length} is not a valid size for radii sequence.`);
    }
    const corners = [upperLeft, upperRight, lowerRight, lowerLeft];
    const negativeCorner = corners.find(({ x, y }) => x < 0 || y < 0);
    if (corners.some(({ x, y }) => !Number.isFinite(x) || !Number.isFinite(y))) {
        return;
    }
    if (negativeCorner) {
        throw new RangeError(`Radius value ${negativeCorner} is negative.`);
    }
    fixOverlappingCorners(corners);
    if (w < 0 && h < 0) {
        ctx.moveTo(x - upperLeft.x, y);
        ctx.ellipse(x + w + upperRight.x, y - upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI * 1.5, -Math.PI);
        ctx.ellipse(x + w + lowerRight.x, y + h + lowerRight.y, lowerRight.x, lowerRight.y, 0, -Math.PI, -Math.PI / 2);
        ctx.ellipse(x - lowerLeft.x, y + h + lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, -Math.PI / 2, 0);
        ctx.ellipse(x - upperLeft.x, y - upperLeft.y, upperLeft.x, upperLeft.y, 0, 0, -Math.PI / 2);
    }
    else if (w < 0) {
        ctx.moveTo(x - upperLeft.x, y);
        ctx.ellipse(x + w + upperRight.x, y + upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI / 2, -Math.PI, 1);
        ctx.ellipse(x + w + lowerRight.x, y + h - lowerRight.y, lowerRight.x, lowerRight.y, 0, -Math.PI, -Math.PI * 1.5, 1);
        ctx.ellipse(x - lowerLeft.x, y + h - lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, Math.PI / 2, 0, 1);
        ctx.ellipse(x - upperLeft.x, y + upperLeft.y, upperLeft.x, upperLeft.y, 0, 0, -Math.PI / 2, 1);
    }
    else if (h < 0) {
        ctx.moveTo(x + upperLeft.x, y);
        ctx.ellipse(x + w - upperRight.x, y - upperRight.y, upperRight.x, upperRight.y, 0, Math.PI / 2, 0, 1);
        ctx.ellipse(x + w - lowerRight.x, y + h + lowerRight.y, lowerRight.x, lowerRight.y, 0, 0, -Math.PI / 2, 1);
        ctx.ellipse(x + lowerLeft.x, y + h + lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, -Math.PI / 2, -Math.PI, 1);
        ctx.ellipse(x + upperLeft.x, y - upperLeft.y, upperLeft.x, upperLeft.y, 0, -Math.PI, -Math.PI * 1.5, 1);
    }
    else {
        ctx.moveTo(x + upperLeft.x, y);
        ctx.ellipse(x + w - upperRight.x, y + upperRight.y, upperRight.x, upperRight.y, 0, -Math.PI / 2, 0);
        ctx.ellipse(x + w - lowerRight.x, y + h - lowerRight.y, lowerRight.x, lowerRight.y, 0, 0, Math.PI / 2);
        ctx.ellipse(x + lowerLeft.x, y + h - lowerLeft.y, lowerLeft.x, lowerLeft.y, 0, Math.PI / 2, Math.PI);
        ctx.ellipse(x + upperLeft.x, y + upperLeft.y, upperLeft.x, upperLeft.y, 0, Math.PI, Math.PI * 1.5);
    }
    ctx.closePath();
    ctx.moveTo(x, y);
    function toDOMPointInit(value) {
        const { x, y, z, w } = value;
        return { x, y, z, w };
    }
    function parseRadiiArgument(value) {
        // https://webidl.spec.whatwg.org/#es-union
        // with 'optional (unrestricted double or DOMPointInit
        //   or sequence<(unrestricted double or DOMPointInit)>) radii = 0'
        const type = typeof value;
        if (type === "undefined" || value === null) {
            return [0];
        }
        if (type === "function") {
            return [NaN];
        }
        if (type === "object") {
            if (typeof value[Symbol.iterator] === "function") {
                return [...value].map((elem) => {
                    // https://webidl.spec.whatwg.org/#es-union
                    // with '(unrestricted double or DOMPointInit)'
                    const elemType = typeof elem;
                    if (elemType === "undefined" || elem === null) {
                        return 0;
                    }
                    if (elemType === "function") {
                        return NaN;
                    }
                    if (elemType === "object") {
                        return toDOMPointInit(elem);
                    }
                    return toUnrestrictedNumber(elem);
                });
            }
            return [toDOMPointInit(value)];
        }
        return [toUnrestrictedNumber(value)];
    }
    function toUnrestrictedNumber(value) {
        return +value;
    }
    function toCornerPoint(value) {
        var _a, _b;
        const asNumber = toUnrestrictedNumber(value);
        if (Number.isFinite(asNumber)) {
            return {
                x: asNumber,
                y: asNumber
            };
        }
        if (Object(value) === value) {
            return {
                x: toUnrestrictedNumber((_a = value.x) !== null && _a !== void 0 ? _a : 0),
                y: toUnrestrictedNumber((_b = value.y) !== null && _b !== void 0 ? _b : 0)
            };
        }
        return {
            x: NaN,
            y: NaN
        };
    }
    function fixOverlappingCorners(corners) {
        const [upperLeft, upperRight, lowerRight, lowerLeft] = corners;
        const factors = [
            Math.abs(w) / (upperLeft.x + upperRight.x),
            Math.abs(h) / (upperRight.y + lowerRight.y),
            Math.abs(w) / (lowerRight.x + lowerLeft.x),
            Math.abs(h) / (upperLeft.y + lowerLeft.y)
        ];
        const minFactor = Math.min(...factors);
        if (minFactor <= 1) {
            for (const radii of corners) {
                radii.x *= minFactor;
                radii.y *= minFactor;
            }
        }
    }
}
export default class RoundRect {
    constructor(x, y, width, height, radius, fill = false, stroke = false) {
        if (typeof stroke === 'undefined') {
            this.stroke = true;
        }
        else {
            this.stroke = stroke;
        }
        if (typeof radius === 'undefined') {
            radius = 0;
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.radius = radius;
    }
    exec(ctx, instance) {
        let radius = this.radius, width = this.width, height = this.height;
        let fill, stroke;
        if (instance.masked) { // instance.isMask
            fill = false;
            stroke = false;
        }
        else {
            fill = this.fill;
            stroke = this.stroke;
        }
        // console.log(width, height, radius, 9999)
        roundRect(0, 0, width, height, radius, ctx);
        if (instance.isMask) {
            // ctx.clip()
        }
        else {
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }
        }
    }
}
