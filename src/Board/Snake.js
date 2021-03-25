import LinkedList from "../lib/LinkedList";

class Snake extends LinkedList {
    getHead = () => this.tail;

    getTail = () => this.head;

    addHead = (value) => this.addLast(value);

    removeTail = () => this.removeFirst();
}

export default Snake;