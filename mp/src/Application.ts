import { createSelectorQuery } from './config';
import Stage  from './Stage';
export default class Application {
  id: string
  width: number
  height: number
  componentInstance: any
  constructor(id: string, {width, height}: {width: number, height: number}, componentInstance: any){
    this.id = id;
    this.width = width;
    this.height = height;
    this.componentInstance = componentInstance;
  }
  init(){
    return new Promise((resolve) => {
      const query = this.componentInstance ? createSelectorQuery().in(this.componentInstance) : createSelectorQuery()
      query.select(this.id) 
      .node(async ({node: canvas}) => {
          resolve(new Stage(canvas, {width: this.width, height: this.height}))
      })
      .exec()
    }) as Promise<Stage>
  }
}