/* Elements and Variable Definitions */
const themeToggle = document.querySelector(".slider");
const themeIcon = document.querySelector("i");
const newBookButton = document.querySelector(".new-book");
const formBubble = document.querySelector(".form");
const bookForm = document.querySelector(".book-form");
const libraryContainer = document.querySelector(".library");
const disableMode = document.querySelector(".disable-mode");
const themeBlock = document.querySelector(".theme-block");
let currentTheme;
let tall = false;

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
    if (tall)
        currentTheme = root.className === "light tall" ? "dark tall" : "light tall";
    else
        currentTheme = root.className === "light" ? "dark" : "light";
    root.className = currentTheme;
}

/**
 * Create Book Card Function
 * 
 * Generates div element containing book information
 * @param {Book} book book object
 * @returns div element, class = 'book-card'
 */
function createBookCard(book) {
    // Build book-card element (div)
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    // Build Remove button with Event listener
    const exitButton = document.createElement("button");
    exitButton.className = "remove-book-button";
    exitButton.textContent = "x";
    exitButton.addEventListener("click", (e) => {
        // removeBookFromLibrary(book);
        library.remove(book);
        render();
    });

    // Build book-title element (h1)
    const title = document.createElement("h1");
    title.textContent = `Title: "${book.title}"`;

    // Build book-author element (h2)
    const author = document.createElement("h2");
    author.textContent = `Author: ${book.author}`;

    // Build page-count element (h2)
    const pageCount = document.createElement("h2");
    pageCount.textContent = `No. Pages: ${book.pages} pages`;

    // Build Read button with Event Listener
    const readbutton = document.createElement("button");
    readbutton.textContent = book.read ? "Read" : "Not Read";
    readbutton.className = book.read ? "book-button read" : "book-button not-read"; 
    readbutton.addEventListener("click", (e) => {
        updateBookStatus(book);
        render();
    });

    // Add elements to book-card
    bookCard.appendChild(exitButton);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pageCount);
    bookCard.appendChild(readbutton);

    return bookCard;
}

/**
 * Update Layout Function
 * 
 * Changes between tall mode and normal mode
 */
function updateLayout() {
    const root = document.documentElement;
    if (document.body.clientHeight > document.body.clientWidth) {
        themeBlock.className += " tall";
        root.className += " tall";
        tall = true;
    } else {
        themeBlock.className = "theme-block";
        root.className = currentTheme;
        tall = false;
    }
}

/**
 * Render Function
 * 
 * Setups Local Storage and Builds Library Table
 */
function render() {
    updateLayout();
    libraryContainer.innerHTML = "";
    library.collection.forEach(media => {
        libraryContainer.appendChild(createBookCard(media));
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

/* Disable Mode Click Evenet Listener */
disableMode.addEventListener("click", (e) => {
    formBubble.className = "form";
    disableMode.className = "disable-mode";
});

/* New Book Form Submission Event Listener */
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = bookFromForm();
    library.add(newBook);
    // addBookToLibrary(newBook);
    formBubble.className = "form";
    disableMode.className = "disable-mode";

    render();
});

/* Theme Toggle Checked Event Listener */
themeToggle.addEventListener("click", (e) => {setTheme()});
themeIcon.addEventListener("click", (e) => {setTheme()});

/* Window Resize Event Listener */
window.addEventListener("resize", (e) => {updateLayout()});