import { createSelectorQuery } from './config';
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
}
