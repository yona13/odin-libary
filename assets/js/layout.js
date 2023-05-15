/* Elements and Variable Definitions */
const newBookButton = document.querySelector(".new-book");
const newBookForm = document.querySelector(".book-form");
const themeToggle = document.querySelector(".slider");

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
 * Render Function
 * 
 * Setups Local Storage and Builds Library Table
 */
function render() {
    setup();
    // TODO: Build Library Table
}

/* Initialise Layout */
setTheme();
render();

/* Event Listeners for Elements */

/* New Book Button Click Event Listener */
newBookButton.addEventListener("click", (e) => {
    newBookForm.setAttribute("style", "visibility: visible");
});

/* New Book Form Submission Event Listener */
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = bookFromForm();
    addBookToLibrary(newBook);
    library.forEach(b => {console.log(b.valueOf())});
});

/* Theme Toggle Checked Event Listener */
themeToggle.addEventListener("click", (e) => {setTheme()});