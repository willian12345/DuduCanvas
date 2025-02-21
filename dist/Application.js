var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSelectorQuery } from './config';
import { isWeb } from './utils';
import DisplayObjectContainer from './DisplayObjectContainer';
import Stage from './Stage';
export default class Application {
    constructor(id, { width, height, debug = false }, componentInstance) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.componentInstance = componentInstance;
        DisplayObjectContainer.setDebug(debug);
    }
    init() {
        if (isWeb()) {
            return this.createWebStage();
        }
        return this.createStage();
    }
    // 小程序
    createStage() {
        return new Promise((resolve) => {
            const query = this.componentInstance ? createSelectorQuery().in(this.componentInstance) : createSelectorQuery();
            try {
                query.select(this.id)
                    .node((res) => {
                    if (res === null || res === void 0 ? void 0 : res.node) {
                        resolve(new Stage(res.node, { width: this.width, height: this.height }));
                    }
                    else {
                        resolve(null);
                    }
                })
                    .exec();
            }
            catch (e) {
                resolve(null);
            }
        });
    }
    // 普通 web
    createWebStage() {
        return __awaiter(this, void 0, void 0, function* () {
            const targetCanvas = document.getElementById(this.id);
            if (!targetCanvas) {
                return null;
            }
            return new Stage(targetCanvas, { width: this.width, height: this.height });
        });
    }
    destroy() {
        // todo 
    }
}
