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
 * Add Book to Library Function
 * 
 * Adds Book to the Library Arrary
 * @param {Book} book object to add to array
 */
function addBookToLibrary(book) {
    library.push(book);
}

/**
 * Library Setup Function
 * 
 * Builds Library Array from Local Storage, if available
 */
function setup() {
    if (localStorage.getItem("library"))
        library = JSON.parse(localStorage.getItem("library"));
    else
        library = [];
}