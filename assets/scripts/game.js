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

let masterNum = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        monsterPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad () {
        this.spawnNewMonster();
        // cc.NodePool
        let timer = setInterval(() => {
            this.spawnNewMonster()
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
        }, 10000);
    },
    spawnNewMonster: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newMonster = cc.instantiate(this.monsterPrefab);
        newMonster.name = `monster_node_${masterNum++}`;
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newMonster);
        // 为星星设置一个随机位置
        common.setMonsterNode(newMonster)
    }
});
