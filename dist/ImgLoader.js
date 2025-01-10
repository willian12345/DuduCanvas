export default class ImgLoader {
    constructor(canvas, imgArr) {
        this._total = 0;
        this._loaded = 0;
        this.canvas = canvas;
        this._total = imgArr.length;
        this._loaded = 0;
        this._imageMap = new Map();
        this.imgArr = imgArr;
    }
    load(loadProgressCallback) {
        return new Promise((resolve) => {
            this.imgArr.forEach(v => {
                const image = this.canvas.createImage();
                image.onload = () => {
                    this._imageMap.set(v.id, {
                        path: v.src,
                        width: image.width,
                        height: image.height,
                        image
                    });
                    this._loaded++;
                    if (loadProgressCallback) {
                        loadProgressCallback(this._loaded / this._total);
                    }
                    if ((this._loaded / this._total) >= 1) {
                        resolve(this);
                    }
                };
                image.src = v.src;
            });
        });
    }
    get(id) {
        return this._imageMap.get(id);
    }
}
