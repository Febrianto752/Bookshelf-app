const wrapperBookshelf = document.getElementById('wrapper-bookshelf');
const bookshelfAvailable = wrapperBookshelf.getElementsByClassName('bookshelf-available')[0];
const bookshelfReading = wrapperBookshelf.getElementsByClassName('bookshelf-reading')[0];
const formAddBook = wrapperBookshelf.getElementsByClassName('add-book')[0];
const titleSection = wrapperBookshelf.getElementsByClassName('title-bookshelf')[0];
const modal = wrapperBookshelf.getElementsByClassName('modal')[0];

const sectionContents = [bookshelfAvailable, bookshelfReading, formAddBook];

const toggleNavLinkActive = function (activeNavLink) {
  for (let nav of navLink) {
    nav.classList.remove('active');
  }
  activeNavLink.classList.add('active');
}

const showContents = function (section) {
  for (let section of sectionContents) {
    section.classList.remove('show-content');
    formAddBook.style.display = 'none';
  }
  if (section == 'Available') {
    bookshelfAvailable.classList.add('show-content');
    titleSection.innerText = 'LIST OF AVAILABLE BOOK FOR READ';
  } else if (section == 'Reading') {
    bookshelfReading.classList.add('show-content');
    titleSection.innerText = 'LIST OF BOOK BEING READ';
  } else {
    formAddBook.classList.add('show-content');
    formAddBook.style.display = 'block';
    titleSection.innerText = 'FORM ADD NEW BOOK DATA';
  }
}

const makeBook = function (title, author, year, isComplete = true) {
  let book = composeBookObject(title, author, year, isComplete);
  saveData(book);
  let cardBookElement = makeCard(book.id, title);
  return cardBookElement;
}

const makeCard = function (idBook, bookTitle) {
  card = `<div class="card" data-idbook="${idBook}">
  <div class="card-image">
    <img src="./assets/img/img.png" alt="img">
    <div class="overlay">
      get detail
    </div>
  </div>
  <div class="card-body">
    <p>${bookTitle}</p>
    <button class="btn-edit">Edit</button>
    <button class="btn-delete">Delete</button>
  </div>
</div>`;
  return card;

}

const removeBookCard = function (bookCardElement) {
  removeBookData(bookCardElement.dataset.idbook);
  bookCardElement.remove();
}

const showModal = function (typeModal, idBook) {
  let book = findBookById(idBook);
  setModalMode(typeModal, book);
  modal.classList.add('show-modal');
}

const setModalMode = function (typeMode, book) {
  let modalContent = null;
  if (typeMode == 'modal-detail') {
    modalContent = `<div class="modal-header">
    <h2>DETAIL BOOK</h2>
  </div>
  <div class="modal-body">
    <div class="book-image">
      <img src="./assets/img/img.png" alt="gambar">
    </div>
    <div class="detail-book">
    <h3>Title : ${book.title}</h3>
    <p>Author : ${book.author}</p>
    <p>Publication Year : ${book.year}</p>
    <p>Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa, quae inventore illum
      possimus voluptatum vitae qui nihil, veniam, debitis in velit quo ad voluptates repellat recusandae
      dolorum
      at laborum.</p>
      <p>Status : ${(book.isComplete == true)? 'available': 'being read'}</p>
    </div>
  </div>
  <div class="modal-footer">
    <span data-idbook="123" style="display: none;"></span>
    ${(book.isComplete == true)? '<button class="btn-read">Read</button>':'<button class="btn-finished-reading">Finished Reading</button>'}
    <button class="btn-close">Close</button>
  </div>`;
  } else if (typeMode == 'form-edit') {
    modalContent = `<div class="modal-header">
    <h2>FORM EDIT BOOK</h2>
  </div>
  <div class="modal-body">
    <form class="form-edit">
    <input type="hidden" id="idbook" value="${book.id}">
    <input type="hidden" id="status" value="${book.isComplete}">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" placeholder="Enter Title..." id="update-title" required value="${book.title}">
    </div>
    <div class="form-group">
      <label for="author">Author</label>
      <input type="text" placeholder="Enter Author Name..." id="update-author" required value="${book.author}">
    </div>
    <div class="form-group">
      <label for="year">Publication Year</label>
      <input type="number" placeholder="Enter Publication Year..." id="update-year" required value="${book.year}">
    </div>
    <div class="form-group mb-5">
      <label for="cover">Book Cover</label>
      <input type="file" id="cover" style="padding: 0;">
    </div>
    <button type="button" class="btn-update">Update</button>
    <button type="reset" class="btn-reset">Reset</button>
    <button type="button" class="btn-close">Close</button>
  </form>
  </div>`;
  }
  modal.innerHTML = modalContent;
  modal.setAttribute('data-idbook', book.id);
}

const changeBookshelf = function (idbook) {
  let book = findBookById(idbook);
  if (book.isComplete == true) {
    book.isComplete = false;
  } else {
    book.isComplete = true;
  }
  updateBookById(book);
  renderBookshelf();
  modal.classList.remove('show-modal');
}

const renderBookshelf = function (keyword = false) {
  let books = loadDataFromStorage();
  bookshelfAvailable.innerHTML = '';
  bookshelfReading.innerHTML = '';
  for ([i, book] of books.entries()) {
    if (keyword) {
      if (book.title.includes(keyword)) {
        cardBookDistribution(book);
      }
    } else {
      cardBookDistribution(book);
    }
  }
  if (books.length < 1) {
    bookshelfAvailable.innerHTML = `<h3 class="data-not-found">BOOKSHELF IS EMPTY, PLEASE ADD NEW BOOK!</h3>`;
    bookshelfReading.innerHTML = `<h3 class="data-not-found">BOOKSHELF IS EMPTY, PLEASE ADD NEW BOOK!</h3>`;
  }
}

const cardBookDistribution = function (book) {
  let cardElement = makeCard(book.id, book.title);
  if (book.isComplete == true) {
    bookshelfAvailable.innerHTML += cardElement;
  } else {
    bookshelfReading.innerHTML += cardElement;
  }
}