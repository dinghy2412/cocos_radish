// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        radish_5: {
            default: null,
            type: cc.SpriteFrame
        },
        radish_4: {
            default: null,
            type: cc.SpriteFrame
        },
        radish_3: {
            default: null,
            type: cc.SpriteFrame
        },
        radish_2: {
            default: null,
            type: cc.SpriteFrame
        },
        radish_1: {
            default: null,
            type: cc.SpriteFrame
        },
        hp: 5
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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.radish_5;
    },
    onCollisionEnter: function (other, self) {
        let nameRex = /^monster_node_/;
        if (nameRex.test(other.name)) {
           this.bruise();
        }
    },
    bruise() {
        this.hp = this.hp - 1;
        if (this.hp > 0) {
            let sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = this[`radish_${this.hp}`];
        } else {
            console.log('game over');
            this.node.destroy();
        }
    }

    // update (dt) {},
});
