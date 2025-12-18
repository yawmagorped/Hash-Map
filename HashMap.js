import { LinkedList } from "./LinkedList.js";

class HashMap {
    #loadFactor = 0.75;
    #capacity = 16;
    #keyCount = 0;
    #buckets = [];
    constructor() {

    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.#capacity) {
            throw new Error("Trying to access index out of bounds");
        } else if (this.#buckets[hashCode]) {
            if (this.#buckets[hashCode].containsKey(key)) {
                this.#buckets[hashCode].findByKey(key).setValue(value);
                this.#buckets[hashCode].toString();
            } else {
                this.#buckets[hashCode].append(key, value);
                this.#buckets[hashCode].toString();
                this.#keyCount++;
                this.growth();
            }
        } else {
            this.#buckets[hashCode] = LinkedList();
            this.#buckets[hashCode].append(key, value);
            this.#buckets[hashCode].toString();
            this.#keyCount++;
            this.growth();
        }
    }   

    get(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.#capacity - 1) {
            throw new Error("Trying to access index out of bounds");
        } else if (this.#buckets[hashCode] && this.#buckets[hashCode].containsKey(key)) {
            return this.#buckets[hashCode].findByKey(key).getValue();
        } else {
            return null;
        }
    }

    has(key) {
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.#capacity - 1) {
            throw new Error("Trying to access index out of bounds");
        } else if (this.#buckets[hashCode]) {
            return this.#buckets[hashCode].containsKey(key);
        } else {
            return false;
        }
    }

    remove(key) { 
        let hashCode = this.hash(key);
        if (hashCode < 0 || hashCode >= this.#capacity - 1) {
            throw new Error("Trying to access index out of bounds");
        } else if (this.#buckets[hashCode] && this.#buckets[hashCode].containsKey(key)) {
            this.#buckets[hashCode].removeNode(this.#buckets[hashCode].findByKey(key));
            this.#keyCount--;
        }
    }

    length() {
        return this.#keyCount;
    }

    clear() {
        this.#buckets = [];
        this.#keyCount = 0;
    }

    keys() {
        let arr = [];
        for (let i = 0; i < this.#capacity; i++) {
            if(this.#buckets[i]) {
                arr = arr.concat(this.#buckets[i].getAllKeys());
            }
        }
        return arr;
    }

    values() {
        let arr = [];
        for (let i = 0; i < this.#capacity; i++) {
            if(this.#buckets[i]) {
                arr = arr.concat(this.#buckets[i].getAllValues());
            }
        }
        return arr;
    }

    entries() {
        let arr = [];
        let keysArr = this.keys();
        let valueArr = this.values();
        for (let i = 0; i < this.#keyCount; i++) {
            arr.push([keysArr[i], valueArr[i]]);
        }
        return arr;
    }

    growth() {
        if ( (this.length() / this.#capacity) > this.#loadFactor) {
            console.log("I have grown");
            this.#capacity = this.#capacity * 2;
            let entries = this.entries();
            this.clear();
            for (let i = 0; i < entries.length; i++) {
                this.set(entries[i][0], entries[i][1]);                
            }
        } else
            return;
    }
}

let test = new HashMap();

// test.set("alia", 4);
// test.set("ali", 4);
// console.log("get ali's value: " + test.get("ali"));
// console.log("ali exist? " + test.has("ali"));
// console.log("alice exist? " + test.has("alice"));
// test.remove("ali");
// console.log("removed ali");
// console.log("ali exist? " + test.has("ali"));
// console.log("length: " + test.length());

// test.set("ali0", 41);
// test.set("ali1", 42);
// test.set("ali2", 43);
// test.set("ali3", 44);
// test.set("ali4", 45);

// console.log("all the keys: " + test.keys());
// console.log("all the values: " + test.values());
// console.log("all entries: " + test.entries());
// test.set('apple', 'red')
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')

// test.set("ali", 4);
// console.log("get ali's value: " + test.get("ali"));
// console.log("ali exist? " + test.has("ali"));
// console.log("alice exist? " + test.has("alice"));
// test.remove("ali");
// console.log("removed ali");
// console.log("ali exist? " + test.has("ali"));
// console.log("length: " + test.length());
// console.log("all the keys: " + test.keys());
// console.log("all the values: " + test.values());
// console.log("all entries: " + test.entries());