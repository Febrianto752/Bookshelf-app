const STORAGE_KEY = 'bookshelf_app';

let booksData = [];

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

const loadDataFromStorage = function () {
  if (isStorageExist()) {
    let books = localStorage.getItem(STORAGE_KEY);
    if (books) {
      return JSON.parse(books);
    }
    return [];
  }
}

function saveData(newBook) {
  let books = loadDataFromStorage();
  books.push(newBook)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

const composeBookObject = function (title, author, year, isComplete = true) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isComplete
  };
}

const updateBookById = function (book) {
  let books = loadDataFromStorage();
  books.forEach((e, i) => {
    if (e.id == book.id) {
      books[i] = book;
    }
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

const findBookById = function (idBook) {
  let books = loadDataFromStorage();
  return books.find((book) => book.id == idBook);
}

const removeBookData = function (bookId) {
  let books = loadDataFromStorage();
  for ([i, book] of books.entries()) {
    if (book.id == bookId) {
      books.splice(i, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      break;
    }
  }
}