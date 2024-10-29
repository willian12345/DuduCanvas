import { createSelectorQuery } from './config';
import DisplayObjectContainer from './DisplayObjectContainer';
import Stage  from './Stage';
export default class Application {
  id: string
  width: number
  height: number
  componentInstance: any
  constructor(id: string, {width, height, debug = false}: {width: number, height: number, debug?: boolean}, componentInstance: any){
    this.id = id;
    this.width = width;
    this.height = height;
    this.componentInstance = componentInstance;
    DisplayObjectContainer.setDebug(debug);
  }
  init(){
    return new Promise((resolve) => {
      const query = this.componentInstance ? createSelectorQuery().in(this.componentInstance) : createSelectorQuery()
      query.select(this.id) 
      .node(async ({node}:any) => {
          resolve(new Stage(node, {width: this.width, height: this.height}))
      })
      .exec()
    }) as Promise<Stage>
  }
}