'use strict';
var gCurrBookId;
function onInit() {
    renderBooks()
}
function renderBooks() {
    var books = getBooks()
    var strHTMLs = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${getPrice(book.price)}</td>
        <td data-trans="butt-read" class="green butt" onclick="onReadBook('${book.name}','${book.img}')">Read</td><td data-trans="butt-update" class="orange butt" onclick="toggleUpdateModal('${book.id}')">Update</td><td data-trans="butt-delete" class="red butt" onclick="onRemoveBook('${book.id}')">Delete</td>
        </tr>`
    })
    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}

function onAddBook() {
    var name = document.querySelector('.book-name').value
    var price = document.querySelector('.book-price').value
    if (!price) return
    submitForm()
    addBook(name, price)
    renderBooks()
}

function submitForm() {
    var frm = document.querySelector('form');
    frm.submit(); // Submit the form
    frm.reset();  // Reset all form data
    return false; // Prevent page refresh
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook() {
    var newPrice = document.querySelector('.AAA').value;
    updateBook(gCurrBookId, newPrice)
    toggleUpdateModal(gCurrBookId)
    renderBooks()
}

function toggleUpdateModal(bookId) {
    gCurrBookId = bookId
    var elModal = document.querySelector('.hiding-modal')
    elModal.classList.toggle('hide')
}

function onSetSort(val) {
    sortBy(val)
    renderBooks();
}


function onReadBook(name, image) {
    var strHTML = `
    <button class="modal-butt" onclick="closeModal()">x</button>
    <h2>${name}</h2>
    <p>
        Description:${makeLorem()}
    </p>
    <div class="modal-image">
        <img src="${image}">
        <div class="rate">
        <div class="decrease" onclick="decreaseRate('${name}')">-</div>
        <div class="display-rate">0</div>
        <div class="decrease" onclick="increaseRate('${name}')">+</div>
        </div>
    </div>`
    var elModal = document.querySelector('.modal-read')
    elModal.classList.remove('hide')
    elModal.innerHTML = strHTML
}

function closeModal() {
    var elModal = document.querySelector('.modal-read')
    elModal.classList.add('hide')

}
function decreaseRate(name) {

    var obj = gBooks.find(function (book) {
        return book.name === name
    })
    var num = decrease(obj)
    document.querySelector('.display-rate').innerText = num
}

function increaseRate(name) {
    var obj = gBooks.find(function (book) {
        return book.name === name
    })
    var num = increase(obj)
    document.querySelector('.display-rate').innerText = num
}

function onSetLang(lang) {
    setLang(lang);
    renderBooks();
    doTrans();
}

function onNextPage() {
    nextPage();
    onSetLang('en')
    renderBooks();
}

function onPrevPage() {
    prevPage();
    onSetLang('en')
    renderBooks();
}