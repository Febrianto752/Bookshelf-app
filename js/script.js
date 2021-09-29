const navLink = document.querySelectorAll('ul li');
const iconSearch = document.getElementsByClassName('icon-search')[0];
const inputSearch = document.getElementsByClassName('keyword')[0];

document.addEventListener("DOMContentLoaded", function () {
  renderBookshelf();
});

navLink[0].addEventListener('click', function (e) {
  toggleNavLinkActive(e.target);
  showContents(e.target.innerText);

})
navLink[1].addEventListener('click', function (e) {
  toggleNavLinkActive(e.target);
  showContents(e.target.innerText);
})
navLink[2].addEventListener('click', function (e) {
  toggleNavLinkActive(e.target);
  showContents(e.target.innerText);
})

wrapperBookshelf.addEventListener('click', function (e) {
  if (e.target.className == 'btn-save') {
    let inputTitle = document.getElementById('title').value;
    let inputAuthor = document.getElementById('author').value;
    let inputYear = Number(document.getElementById('year').value);
    // let bookCardElement = makeBook(inputTitle, inputAuthor, inputYear);
    if (inputTitle && inputAuthor && inputYear) {
      saveData(composeBookObject(inputTitle, inputAuthor, inputYear));

      // bookshelfAvailable.innerHTML += bookCardElement;
      renderBookshelf();
      alert('new data book has been created!');
    } else {
      alert('All forms must be filled!');
    }
  }

  if (e.target.className == 'overlay') {
    showModal('modal-detail', e.target.parentElement.parentElement.dataset.idbook);
  }

  if (e.target.className == 'btn-close') {
    modal.classList.remove('show-modal');
  }

  if (e.target.className == 'btn-delete') {
    let agree = confirm('are you sure want to detele it?');
    if (agree) {
      removeBookCard(e.target.parentElement.parentElement);
      alert('book data has been deleted!');
    }
  }

  if (e.target.className == 'btn-edit') {
    showModal('form-edit', e.target.parentElement.parentElement.dataset.idbook);
  }

  if (e.target.className == 'btn-update') {
    let inputTitle = document.getElementById('update-title').value;
    let inputAuthor = document.getElementById('update-author').value;
    let inputYear = Number(document.getElementById('update-year').value);
    let inputId = document.getElementById('idbook').value;
    let inputIsComplete = document.getElementById('status').value;
    let objectBookData = {
      id: inputId,
      title: inputTitle,
      author: inputAuthor,
      year: inputYear,
      isComplete: (inputIsComplete == 'false') ? false : true
    };
    // updateBookById(inputId, objectBookData);
    if (inputTitle && inputAuthor && inputYear && inputId && inputIsComplete) {
      updateBookById(objectBookData);
      renderBookshelf();
      alert('book data has been updated!');
      modal.classList.remove('show-modal');
    } else {
      alert('All forms must be filled!');
    }
  }

  if (e.target.className == 'btn-read') {
    changeBookshelf(e.target.parentElement.parentElement.dataset.idbook);
    alert('successfully move the book to the bookshelf being read')
  }

  if (e.target.className == 'btn-finished-reading') {
    changeBookshelf(e.target.parentElement.parentElement.dataset.idbook);
    alert('successfully move the book to the available bookshelf');
  }
})

iconSearch.addEventListener('click', function (e) {
  renderBookshelf(inputSearch.value);
})

inputSearch.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    iconSearch.click();
  }
});