import { Stage, Text } from '../../src/index'
Page({

    /**
     * Page initial data
     */
    data: {

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        new Stage('#myCanvas', (stage, ctx) => {

        const t0 = new Text({font: 'italic 18px sans-serif'})
            t0.text = '通过可实现文字竖排'
            stage.addChild(t0)
            setTimeout(()=>{
                t0.rotation += 10
                stage.update()
            }, 2000)
        }, this)
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    }
})