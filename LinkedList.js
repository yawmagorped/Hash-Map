export {LinkedList};
const LinkedList = () => {
    let head = Node();
    let tail = Node();
    head.setValue("head");
    tail.setValue("tail");

    const append = (key, value) => {
        let newNode = Node();
        if (head.getNextNode() === null) { //first element
            newNode.initialize(key, value, head, tail);
            head.setNextNode(newNode);
            tail.setPrevNode(newNode);

        } else {
            newNode.initialize(key, value, tail.getPrevNode(), null);
            tail.getPrevNode().setNextNode(newNode);
            tail.setPrevNode(newNode);
            newNode.setNextNode(tail);
        }
    } 
    
    const prepend = (key, value) => {
        let newNode = Node();
        if (head.getNextNode() === null) {
            newNode.initialize(key, value, head, tail);
            head.setNextNode(newNode);
            tail.setPrevNode(newNode);
        } else {
            newNode.initialize(value, null, head.getNextNode());
            head.getNextNode().setPrevNode(newNode);
            head.setNextNode(newNode);
            newNode.setPrevNode(head);
        }
    }
    
    const size = () => {
        let counter = 0;
        let node = head.getNextNode();
        while(node !== null && node.getNextNode() !== null) {
            node = node.getNextNode();
            counter++;
        }
        return counter;
    }

    const getHead = () => { //hehe
        return head;
    }

    const getTail = () => {
        return tail;
    }

    const at = (index) => {
        let counter = 0;
        let node = head.getNextNode();

        while(node !== null && counter < index) {
            node = node.getNextNode();
            counter++;
        }
        return node;
    }

    const pop = () => {
        if (head.getNextNode() === null)
            return null;
        else {
            let lastNode = tail.getPrevNode();
            lastNode.getPrevNode().setNextNode(tail);
            tail.setPrevNode(lastNode.getPrevNode());
            return lastNode;
        }
    }

    const containsValue = (value) => {
        let counter = 0;
        let node = head.getNextNode();

        while(node !== null && node.getNextNode() !== null) {
            if (node.getValue() == value) {
                return true;
            }
            node = node.getNextNode();
            counter++;
        }
        return false;
    }

    const containsKey = (key) => {
        let counter = 0;
        let node = head.getNextNode();

        while(node !== null && node.getNextNode() !== null) {
            if (node.getKey() == key) {
                return true;
            }
            node = node.getNextNode();
            counter++;
        }
        return false;
    }

    const findByValue = (value) => {
        let counter = 0;
        let node = head.getNextNode();

        while(node !== null && node.getNextNode() !== null) {
            if (node.getValue() == value) {
                return node;
            }
            node = node.getNextNode();
            counter++;
        }
        return null;
    }

    const findByKey = (key) => {
        let counter = 0;
        let node = head.getNextNode();

        while(node !== null && node.getNextNode() !== null) {
            if (node.getKey() == key) {
                return node;
            }
            node = node.getNextNode();
            counter++;
        }
        return null;
    }

    const getAllKeys = () => {
        let arr = [];
        let counter = size();
        let node = head.getNextNode();
        for (let i = 0; i < counter; i++) {
            arr.push(node.getKey());
            node = node.getNextNode();
        }
        return arr;
    }

    const getAllValues = () => {
        let arr = [];
        let counter = size();
        let node = head.getNextNode();
        for (let i = 0; i < counter; i++) {
            arr.push(node.getValue());
            node = node.getNextNode();
        }
        return arr;
    }

    const toString = () => {
        let counter = size();
        let node = head.getNextNode();
        for (let i = 0; i < counter - 1; i++) {
            process.stdout.write(`(${node.getKey()},${node.getValue()}) -> `);
            node = node.getNextNode();
        }
        process.stdout.write(`(${node.getKey()},${node.getValue()})\n`);
    }

    const insertAt = (key, value, index) => {
        let frontNode = at(index);
        let behindNode = frontNode.getPrevNode();
        if (frontNode === null)
            throw "couldn't find the index";

        let newNode = Node();
        newNode.initialize(key, value, behindNode, frontNode);
        behindNode.setNextNode(newNode);
        frontNode.setPrevNode(newNode);
    }
    const removeAt = (index) => {
        let nodeToRemove = at(index);
        let behindNode = nodeToRemove.getPrevNode();
        let frontNode = nodeToRemove.getNextNode();
        if (nodeToRemove === null)
            throw "couldn't find the index";


        behindNode.setNextNode(frontNode);
        frontNode.setPrevNode(behindNode);
    }

    const removeNode = (nodeToRemove) => {
        let behindNode = nodeToRemove.getPrevNode();
        let frontNode = nodeToRemove.getNextNode();
        if (nodeToRemove === null)
            throw "couldn't find the index";

        behindNode.setNextNode(frontNode);
        frontNode.setPrevNode(behindNode);
    }

    return {append, prepend, size, getHead, getTail, at, pop, containsValue, containsKey, findByValue, findByKey, toString, insertAt, removeAt, removeNode, getAllKeys, getAllValues};
}

const Node = () => {
    let _value;
    let _key;
    let _nextNode = null;
    let _prevNode = null;

    const initialize = (key, value, prev, next) => {
        _key = key;
        _value = value;
        _prevNode = prev;
        _nextNode = next;
    }

    const printNode = (name) => {
        console.log("this is -> " + name);
        console.log("value:" + _value);
        console.log("nextNode:" + _nextNode().getValue());
        console.log("prevNode:" + _prevNode().getValue());
    }

    const copyNode = (node) => {
        _key = node.getKey();
        _value = node.getValue();
        _nextNode = node.getNextNode();
        _prevNode = node.getPrevNode();
    }

    const setKey = (key) => {
        _key = key;
    }
    const getKey = () =>{
        return _key;
    }
    const setValue = (value) => {
        _value = value;
    } 
    const getValue = () => {
        return _value;
    }
    const setNextNode = (node) => {
        _nextNode = node;
    } 
    const getNextNode = () => {
        return _nextNode;
    }
    const setPrevNode = (node) => {
        _prevNode = node;
    }
    const getPrevNode = () => {
        return _prevNode;
    } 

    return {initialize, setNextNode, getNextNode, setPrevNode, getPrevNode, setValue, getValue, setKey, getKey, copyNode, printNode};
}

// let linkedList = LinkedList();
// linkedList.append(1);
// linkedList.prepend(4);
// console.log("removed -> "+linkedList.pop().getValue());
// linkedList.append(1);
// linkedList.prepend(3);
// linkedList.append(2);  //linked list should be: [3,4,1,2]
// console.log( "list 1 to 4: " + 
//     linkedList.at(0).getValue(),
//     linkedList.at(1).getValue(),
//     linkedList.at(2).getValue(),
//     linkedList.at(3).getValue());
// console.log("size of the list: " + linkedList.size());
// if (linkedList.contains(3)) {
//     console.log("list contains 3");
// }
// if (!linkedList.contains(12)) {
//     console.log("list containsn't 12");
// }
// console.log("the value 1 is the index: " + linkedList.find(1));
// linkedList.toString();
// linkedList.insertAt("hello there", 2);
// linkedList.toString();
// linkedList.removeAt(2);
// linkedList.toString();
// linkedList.prepend(64);
// linkedList.toString();