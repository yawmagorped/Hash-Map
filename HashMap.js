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
        
    }    
}

let hashMap = new HashMap();
hashMap.set("ali", 4);

