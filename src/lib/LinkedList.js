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
        node.next = curHead;
        if (this.tail === null) {
            this.tail = node;
        }
    };

    addLast = (value) => {
        if (this.head === null) {
            this.addFirst(value);
        } else {
            const node = new LinkedListNode(value);
            const curTail = this.tail;
            this.tail = node;
            curTail.next = node;
        }
    };

    removeFirst = () => {
        if (this.head !== null) {
            this.head = this.head.next;
            if (this.head === null) {
                this.tail = null;
            }
        }
    }

    removeLast = () => {
        if (this.head !== null) {
            let node = this.head;
            if (node.next == null) {
                this.head = null;
                this.tail = null;
            }
            else {
                while (node.next !== null && node.next.next !== null) {
                    node = node.next;
                }
                node.next = null;
                this.tail = node;
            }
        }
    };
}

export default LinkedList;