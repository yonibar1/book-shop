'use strict';
const KEY = 'books'
var gNames = ['Narnia', 'Harry Potter', 'Sherlok Holmes']
var gImages = ['img/0.jpg', 'img/1.jpg', 'img/2.jpg']
var gPrices = [40, 50, 60]
var gNextId = 4
var gBooks;
var gSortBy = 'name'
// const PAGE_SIZE = 5
// var gPageIdx = 0

_createBooks()

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 3; i++) {
            var name = gNames[i]
            var price = gPrices[i]
            var img = gImages[i]
            books.push(_createBook(name, price, img))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}


// function getBooks() {
//     var startIdx = gPageIdx * PAGE_SIZE
//     return gBooks.splice(startIdx, startIdx + PAGE_SIZE)
// }


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function addBook(name, price) {
    var newBook = _createBook(name, price)
    gBooks.push(newBook)
    _saveBooksToStorage()
}
function removeBook(id) {
    var deletedBookIdx = gBooks.findIndex(function (book) {
        return book.id == id
    })
    gBooks.splice(deletedBookIdx, 1)
    _saveBooksToStorage()
}
function updateBook(id, price) {
    var updatedBook = gBooks.find(function (book) {
        return book.id == id
    })
    updatedBook.price = price
    _saveBooksToStorage()
}

function _createBook(bookName, bookPrice, image) {
    return {
        id: gNextId++,
        name: bookName,
        price: bookPrice,
        img: image,
        rate: 0
    };
}

function decrease(object) {
    var num = object.rate
    if (num <= 0) num = 0
    else {
        num--
    }
    object.rate = num
    _saveBooksToStorage()
    return num
}
function increase(object) {
    var num = object.rate
    if (num >= 10) num = 10
    else {
        num++
    }
    object.rate = num
    _saveBooksToStorage()
    return num
}

