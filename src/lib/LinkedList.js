import LinkedListNode from './LinkedListNode'

class LinkedList {
    constructor(value) {
        const node = new LinkedListNode(value);
        this.head = node;
        this.tail = node;
    }

    addFirst = (value) => {
        const node = new LinkedListNode(value);
        const curHead = this.head;
        this.head = node;
        curHead.next = node;
    };

    removeLast = () => {
        if (this.tail.next !== null) {
            this.tail = this.tail.next;
        }
    }
}

export default LinkedList;