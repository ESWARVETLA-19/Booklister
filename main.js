//Book class: Represents a Book
class Book{
    constructor(title, author,isbn)
    {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//UI class: Handles UI Tasks
class UI {
    static DisplayBooks() {
    const books=Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
}
static addBookToList(books) {
const List=document.querySelector('#book-list');
const row= document.createElement('tr');
row.innerHTML=`
<td>${books.title}</td>
<td>${books.author}</td>
<td>${books.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
`;
List.appendChild(row);
}
static deleteBook(target) {
if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove();
}
}

static showAlert(message,className) {
    const div=document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container=document.querySelector('.container');
    const form=document.querySelector('#book-form');
    container.insertBefore(div,form);
    //vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(),2000);
}
static clearFields() {
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
}
}
//store Class: Handles Storage
class Store{
   static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
        books=[];
    }
    else{
        books=JSON.parse(localStorage.getItem('books'));
    }
    return books;
    }
    static addBook(book) {
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books=Store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
     }
}
//Event:DisplayBooks
document.addEventListener('DOMContentLoaded',UI.DisplayBooks);
//Event:AddBook

document.querySelector('#book-form').addEventListener('submit',(e) => 
{   
    //prevents actual submit
    e.preventDefault();
    //Get From values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //validate
    if(title ==="" || author==="" || isbn ===""){
        UI.showAlert('Fill all the fields','danger');
    }
    //instantiate book
    else{
    const book=new Book(title,author,isbn);
    //add book to list 
    UI.addBookToList(book);
    // add book to store
    Store.addBook(book);
    UI.showAlert('Data added successfully','success');
    //clear Fields
    UI.clearFields();
    }
});
//Event: Delete Book
document.querySelector('#book-list').addEventListener('click',(e) =>
{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book Removed','success');
});