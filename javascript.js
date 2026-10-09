const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary('Titanic', 'DiCaprio', 190, true);
addBookToLibrary('Ana-Maria', 'Victor', 67, true);
addBookToLibrary('Victor', 'Autoarea Ana', 68, false);

const list = document.querySelector('.book-list');

function displayBooks() {
  list.replaceChildren();
  myLibrary.forEach((book) => {
    const item = document.createElement('li');
    item.dataset.id = book.id;

    const status = document.createElement('input');
    status.type = 'checkbox';
    status.ariaLabel = 'Read';
    status.checked = book.read;
    status.addEventListener('change', () => {
      book.toggleRead();
      displayBooks();
    });

    const text = document.createElement('span');
    text.textContent = `${book.title} by ${book.author} — ${book.pages} pages`;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      const index = myLibrary.findIndex(
        (libraryBook) => libraryBook.id === book.id
      );
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });

    item.append(status, text, deleteBtn);
    list.append(item);
  });
}

displayBooks();

const modal = document.querySelector('#book-modal');
const openBtn = document.querySelector('#open-modal');
openBtn.addEventListener('click', openModal);

function openModal() {
  modal.showModal();
}

const submitForm = document.querySelector('#book-form');
submitForm.addEventListener('submit', addBook);

function addBook(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = Number(document.querySelector('#pages').value);
  const read = document.querySelector('#read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  modal.close();
  submitForm.reset();
}