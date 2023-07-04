import { stringify } from "./string";

export function createHashTable(list = [], key = "id") {
    // 创建一个哈希表
    const hashTable = {};
    for (const element of list) {
        hashTable[element[key]] = element;
    }
    return hashTable;
}

//数据快照
export function dataSnapshot(data) {
    const snapshot = stringify(data);
    return (changeData) => snapshot === stringify(changeData);
}
