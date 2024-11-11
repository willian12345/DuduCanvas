import Stage from './Stage';
export default class Application {
    id: string;
    width: number;
    height: number;
    componentInstance?: any;
    constructor(id: string, { width, height, debug }: {
        width: number;
        height: number;
        debug?: boolean;
    }, componentInstance?: any);
    init(): Promise<Stage>;
}
