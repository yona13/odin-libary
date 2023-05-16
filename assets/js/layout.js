/* Elements and Variable Definitions */
const themeToggle = document.querySelector(".slider");
const newBookButton = document.querySelector(".new-book");
const formBubble = document.querySelector(".form");
const bookForm = document.querySelector(".book-form");
const libraryContainer = document.querySelector(".library");
const disableMode = document.querySelector(".disable-mode");

/* Functions */

/**
 * Book from Form Data Function
 * 
 * Returns Book object from User Input
 * @returns book
 */
function bookFromForm() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read-1").checked;
    return new Book(title, author, pages, read);
}

/**
 * Set Theme Function 
 * 
 * Sets the Root Theme for the Webpage
 */
function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === "light" ? "dark" : "light";
    root.className = newTheme;
}

/**
 * 
 * @param {Book} book 
 */
function createBookCard(book) {
    const exitButton = document.createElement("button");
    exitButton.className = "remove-book-button";
    exitButton.textContent = "x";
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    const title = document.createElement("h1");
    title.textContent = book.title;
    const author = document.createElement("h2");
    author.textContent = book.author;
    const pageCount = document.createElement("h2");
    pageCount.textContent = `${book.pages} pages`;
    const readbutton = document.createElement("button");
    readbutton.textContent = book.read ? "Read" : "Not Read";
    readbutton.className = book.read ? "book-button read" : "book-button not-read"; 

    bookCard.appendChild(exitButton);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pageCount);
    bookCard.appendChild(readbutton)

    return bookCard;
}

/**
 * Render Function
 * 
 * Setups Local Storage and Builds Library Table
 */
function render() {
    setup();

    library.forEach(book => {
        libraryContainer.appendChild(createBookCard(book));
    });
}

/* Initialise Layout */
setTheme();
render();

/* Event Listeners for Elements */

/* New Book Button Click Event Listener */
newBookButton.addEventListener("click", (e) => {
    bookForm.reset();
    formBubble.className += " active";
    disableMode.className += " active";
});

disableMode.addEventListener("click", (e) => {
    formBubble.className = "form";
    disableMode.className = "disable-mode";
});

/* New Book Form Submission Event Listener */
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = bookFromForm();
    addBookToLibrary(newBook);
    library.forEach(b => {console.log(b.valueOf())});
});

/* Theme Toggle Checked Event Listener */
themeToggle.addEventListener("click", (e) => {setTheme()});