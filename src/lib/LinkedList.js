import LinkedListNode from './LinkedListNode'

class LinkedList {
    constructor(value) {
        const node = new LinkedListNode(value);
        this.head = node;
        this.tail = node;
    }

    addFirst = (value) => {
        const curHead = this.head;
        this.head = value;
        curHead.mext = value;
    };
}

export default LinkedList;