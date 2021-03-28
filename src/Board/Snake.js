class Snake extends Array {
    getHead = () => this.length > 0 ? this[this.length - 1] : null;

    getTail = () => this.length > 0 ? this[0] : null;

    addHead = (value) => this.push(value);

    removeTail = () => this.shift();
}

export default Snake;