import { createSelectorQuery } from './config';
import { isWeb } from './utils';
import DisplayObjectContainer from './DisplayObjectContainer';
import Stage  from './Stage';

export default class Application {
  id: string
  width: number
  height: number
  componentInstance?: any
  constructor(id: string, {width, height, debug = false }: {width: number, height: number, debug?: boolean}, componentInstance?: any){
    this.id = id;
    this.width = width;
    this.height = height;
    this.componentInstance = componentInstance;
    DisplayObjectContainer.setDebug(debug);
  }
  init(){
    if(isWeb()){
      return this.createWebStage()
    }
    return this.createStage()
  }
  // 小程序
  createStage(){
    return new Promise((resolve: (value: Stage | null) => void)=> {
      const query = this.componentInstance ? createSelectorQuery().in(this.componentInstance) : createSelectorQuery()
      try{
        query.select(this.id)
        .node((res:any) => {
            if(res?.node){
              resolve(new Stage(res.node, {width: this.width, height: this.height}))
            }else{
              resolve(null)
            }
        })
        .exec()
      }catch(e){
        resolve(null)
      }
    })
    
  }
  // 普通 web
  async createWebStage(){
    const targetCanvas = document.getElementById(this.id) as HTMLCanvasElement | undefined
    if(!targetCanvas){
      return null
    }
    return new Stage(targetCanvas, {width: this.width, height: this.height}) 
  }
  destroy(){
    // todo 
  }
}