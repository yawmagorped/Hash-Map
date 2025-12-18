import { LinkedList } from "./LinkedList.js";

class HashMap {
    #loadFactor = 0.75;
    #capacity = 16;
    #occupied = 0;
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
        if (hashCode < 0 || hashCode >= this.#capacity - 1) {
            throw new Error("Trying to access index out of bounds");
        } else if (this.#buckets[hashCode]) {
            if (this.#buckets[hashCode].containsKey(key)) {
                this.#buckets[hashCode].findByKey(key).setValue(value);
                this.#buckets[hashCode].toString();
            } else {
                this.#buckets[hashCode].append(key, value);
                this.#buckets[hashCode].toString();
                this.#occupied++;
            }
        } else {
            this.#buckets[hashCode] = LinkedList();
            this.#buckets[hashCode].append(key, value);
            this.#buckets[hashCode].toString();
            this.#occupied++;
        }

        //grow your bucket
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
        }
    }
}

let hashMap = new HashMap();
hashMap.set("ali", 4);
console.log("get ali's value: " + hashMap.get("ali"));
console.log("ali exist? " + hashMap.has("ali"));
console.log("alice exist? " + hashMap.has("alice"));
hashMap.remove("ali");
console.log("removed ali");
console.log("ali exist? " + hashMap.has("ali"));