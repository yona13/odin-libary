class Media {
    /**
     * Media Constructor
     * 
     * All media objects must have a title
     * 
     * @param {string} title name of media
     */
    constructor (title) {
        this.title = title;
    }

    /**
     * Get Information Function
     * 
     * Get information related to the media object
     * 
     * @returns the title of the media object
     */
    info () { return this.title; }

    /**
     * The Same Function
     * 
     * Checks if another media object is the same
     * as this media object
     * 
     * @param {Media} media other media object 
     * @returns true if the same as this
     */
    same (media) { return media.title === this.title; }
}

class Book extends Media {
    /**
     * Book Constructor
     * 
     * Books extend the Media class, and require:
     *      - a title
     *      - an author
     *      - a page count
     *      - read/not read
     * 
     * @param {string} title book title
     * @param {string} author book author
     * @param {int} pages page count
     * @param {boolean} read read or not
     */
    constructor (title, author, pages, read) {
        super(title);
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    /**
     * Get Information Function
     * 
     * Get information related to the book
     * 
     * @returns description of the book
     */
    info () {
        return `${this.title} by ${this.author}; ${this.pages} pages; ${this.read ? "Have read" : "Haven't read"};`;
    }

    /**
     * The Same Function
     * 
     * Checks if another book is the same as this book
     * 
     * @param {Book} book 
     * @returns true if books are the same
     */
    same (book) {
        return book.title === this.title && book.author === this.author;
    }
}

class Library {
    /**
     * Library Constructor
     * 
     * Checks Local Storage for Library List
     */
    constructor() {
        if (localStorage.getItem("library"))
            this.collection = JSON.parse(localStorage.getItem("library"));
        else
            this.collection = [];
        console.log(this._collection);
    }

    /** Collection Getter */
    get collection () { return this._collection; }

    /** Collection Setter */
    set collection (objects) {
        this._collection = [];
        objects.forEach(obj => {
            // Only add book to library if it has correct keys
            if (
                Object.keys(obj).includes("title") &&
                Object.keys(obj).includes("author") &&
                Object.keys(obj).includes("pages") &&
                Object.keys(obj).includes("read")
            ) {
                const book = new Book(
                    obj.title,
                    obj.author,
                    obj.pages,
                    obj.read
                );
                this._collection.push(book)
            }
        });
    }

    /**
     * Sync Function
     * 
     * Adds library collection to local storage
     */
    sync () {
        localStorage.setItem("library", JSON.stringify(this._collection));
    }

    /**
     * Add Function
     * 
     * Adds new media to current collection
     * 
     * @param {Media} media media to include
     */
    add (media) {
        // Check if media is in library already
        let inLibrary = false;
        this._collection.forEach(m => {
            if (m.same(media)) inLibrary = true;
        });

        // Only add to library if media is not included already
        if (!inLibrary) {
            this._collection.push(media);
            console.log(`Adding ${media.title} to the library;`);
            this.sync();
        }
    }

    /**
     * Remove Function
     * 
     * Removes media from collection
     * 
     * @param {Media} media media to remove
     */
    remove (media) {
        this._collection.splice(this._collection.indexOf(media), 1);
        this.sync();
    }
}

/* Initialise Library Object */
let library = new Library();