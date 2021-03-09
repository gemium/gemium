/**
 * Browser history memory
 * @class
 */
class Pages {
    #cursor = -1;
    #stack = [];

    get stack() {
        return [...this.#stack];
    }

    get current() {
        return this.#stack[this.#cursor];
    }

    get next() {
        return this.#stack[this.#cursor + 1];
    }

    get last() {
        return this.#stack[this.#cursor - 1];
    }

    toLast() {
        if(this.last) {
            this.#cursor--;
            return this.current;
        }

        return null;
    }

    toNext() {
        if(this.next) {
            this.#cursor++;
            return this.current;
        }
        return null;
    }
    /**
     * Clears the upper stack, and sets the cursor to `url`
     * @param {string} url
     */
    to(url) {
        if(this.#stack.length > (this.#cursor + 1)) {
            // `Array.splice(n)` clears array, beginning with the nth element
            //
            // Note: the +1 *here* is because we don't want to remove the last
            // element. Above, we were comparing it to a length, which was not
            // zero-based.
            this.#stack.splice(this.#cursor + 1);
        }

        this.#stack.push(url);
        this.#cursor++;
    }
}

module.exports = Pages;
