// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

let common = require('./common');

cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        monsterPrefab: {
            default: null,
            type: cc.Prefab
        }
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

    onLoad () {
        this.spawnNewMonster();
        // cc.NodePool
        setInterval(() => {
            common.monsterNodePool++;
            this.spawnNewMonster()
        }, 1000);
        setInterval(() => {
            this.spawnNewBullet();
        }, 500)
    },

    arr: [],
    spawnNewMonster: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newMonster = cc.instantiate(this.monsterPrefab);
        newMonster.name = 'monster';
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newMonster);
        // 为星星设置一个随机位置
    },

    spawnNewBullet: function () {
        var bullet = cc.instantiate(this.bulletPrefab);
        bullet.setPosition(-266.551, -83.242);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(bullet);
    }

    // update (dt) {},
});
