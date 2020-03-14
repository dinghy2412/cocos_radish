// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const common = require('./common');

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        range: 300,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        boomPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        let targetMonster = common.searchMonsterNode(this.node, this.range);
        if (targetMonster) {
            let movTo = cc.moveTo(0.3, cc.p(targetMonster.x, targetMonster.y));
            this.node.runAction(movTo);
        } else {
            this.node.destroy();
        }
    },
    onCollisionEnter: function (other, self) {
        let canvas = cc.director.getScene().getChildByName('Canvas');
        var boom = cc.instantiate(this.boomPrefab);
        boom.setPosition(self.node.x, self.node.y);
        canvas.addChild(boom);
        self.node.destroy();
    },
    onCollisionExit: function () {
        // this.node.destroy();
    }
    // update (dt) {},
});
