let monsterNode = {};

const setMonsterNode = function(node) {
    monsterNode[node.name] = node
};

const getMonsterNode = () => monsterNode;

const delMonsterNode = function(nodeName) {
    delete monsterNode[nodeName]
};

const searchMonsterNode = function(node, range) {
    if (Object.keys(monsterNode).length) {
        for(let i in monsterNode) {
            if (monsterNode.hasOwnProperty(i)) {
                let item = monsterNode[i];
                if (Math.sqrt(Math.pow(node.x - item.x, 2) + Math.pow(node.y - item.y, 2)) <= range) {
                    return item;
                }
            }
        }
    }

    return null
};

module.exports = {
    monsterNode,
    setMonsterNode,
    getMonsterNode,
    delMonsterNode,
    searchMonsterNode
};