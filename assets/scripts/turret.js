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
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        clickFlag: true,
        turretAble: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.bindClickEvent();
    },

    bindClickEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this), this.node);
    },
    onClick() {
        if (this.clickFlag) {
            this.clickFlag = false;
            let sprite = this.node.getComponent(cc.Sprite);
            sprite.spriteFrame = this.turretAble;
            setInterval(() => {
                this.spawnNewBullet.call(this);
            }, 500)
        }
    },
    spawnNewBullet: function () {
        let targetMonster = common.searchMonsterNode({x: this.node.x, y: this.node.y}, 300);
        if (targetMonster) {
            let bullet = cc.instantiate(this.bulletPrefab);
            bullet.name = 'bullet';
            bullet.setPosition(this.node.x, this.node.y);
            // 将新增的节点添加到 Canvas 节点下面
            let canvas = cc.find("Canvas");
            canvas.addChild(bullet);
        }
    }

    // update (dt) {},
});
