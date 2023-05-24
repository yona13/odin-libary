/* Variable Definitions */
let library;

/**
 * Book Object
 * 
 * Book Object is made of:
 *      -> a title (string)
 *      -> an author (string)
 *      -> a page count (int)
 *      -> a 'read' (boolean)
 */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/**
 * Book Information Function
 * 
 * Returns a string of the information related to the book
 * @returns information string
 */
Book.prototype.info = function() {
    return `${this.title} by ${this.author}; ${this.pages} pages; ${this.read ? "read" : "not yet read"};`;
}

/**
 * Same Book Function
 * 
 * Returns true if b1 and b2 are the same, false otherwise
 * @param {Book} b1 book 1
 * @param {Book} b2 book 2
 * @returns true if books are the same
 */
function sameBook(b1, b2) {
    return b1.title === b2.title && b1.author === b2.author;
}

/**
 * Update Function
 * 
 * Updates Local Storage with the current library array
 */
function update() {
    localStorage.setItem("library", JSON.stringify(library));
}

/**
 * Add Book to Library Function
 * 
 * Adds Book to the Library Arrary
 * @param {Book} book object to add to array
 */
function addBookToLibrary(book) {
    // Check if the new book exists
    let inLibrary = false;
    library.forEach(b => {
        if (sameBook(b, book))
            inLibrary = true;
    });

    // Add to library if it's not in
    if (!inLibrary) {
        library.push(book);
        update();
    }

    // Otherwise alert user of duplicate
    else
        window.alert(`${book.title} is already in your library.`);
}

/**
 * Remove Book from Library Function
 * 
 * Finds book in library and removes it from library array
 * @param {Book} book book object to remove
 */
function removeBookFromLibrary(book) {
    library.splice(library.indexOf(book), 1);
    update();
}

/**
 * Update Book Status Function
 * 
 * Updates read value of book object
 * @param {Book} book book object to update
 */
function updateBookStatus(book) {
    library.forEach(b => {
        if (sameBook(b, book))
            b.read = !b.read;
    });
    update();
}

/**
 * Library Setup Function
 * 
 * Builds Library Array from Local Storage, if available
 */
function setup() {
    if (localStorage.getItem("library"))
        library = JSON.parse(localStorage.getItem("library"));
    else {
        library = [];
        // const b1 = new Book("The Jungle Book", "Rudyard Kipling", 214, false);
        // const b2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
        // const b3 = new Book("Lord of the Flies", "William Golding", 225, true);
        // library.push(b1);
        // library.push(b2);
        // library.push(b3);
    }
}