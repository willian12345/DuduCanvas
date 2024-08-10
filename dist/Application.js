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
import DisplayObject from './DisplayObject';
import Stage from './Stage';
export default class Application {
    constructor(id, { width, height, debug = false }, componentInstance) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.componentInstance = componentInstance;
        DisplayObject.setDebug(debug);
    }
    init() {
        return new Promise((resolve) => {
            const query = this.componentInstance ? createSelectorQuery().in(this.componentInstance) : createSelectorQuery();
            query.select(this.id)
                .node((_a) => __awaiter(this, [_a], void 0, function* ({ node }) {
                resolve(new Stage(node, { width: this.width, height: this.height }));
            }))
                .exec();
        });
    }
}
