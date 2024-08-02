import {Stage, Application} from '../../src/index'
Component({
  data: {
    hellworld: 'hello',
  },
  lifetimes: {
    attached() {

    },
    async ready(){
        const app = new Application('#myCanvas', {width: 375, height: 400}, this);
        const stage = await app.init();
    
        console.log(stage)
    }
  },
})
