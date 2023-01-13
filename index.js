import { bookData } from "./js/book-data.js"

// Book class - to process the book-data array
class Book {
    constructor(author, language, subject, title){
      this.author = author,
      this.language = language
      this.subject = subject;
      this.title = title;
      this.toComment = document.createElement('button');
    }
  }
//list of books - book cart - imported from book data
let BookShelfArr = [];
for(let property of bookData){ 
    const newBook = new Book(property["author"], property["language"], property["subject"], property["title"]);
    // console.log(newBook)
    BookShelfArr.push(newBook);
}

//Bookshelf class : for storage of Books
class Bookshelf {
    constructor(book){
      // this.booksArr = booksArr;
      this.book = book
      //keep track of favorites
   }
   // add books after inputting required arguments
   bookRender(){
    const bookList = document.querySelector('#booklist');

    BookShelfArr.forEach((element,index)=>{
      //variables
      this.ele = document.createElement('div');
      this.book = document.createElement('div');
      this.commRender = document.createElement('ul');
      const bookEle = document.createElement('div');
      //rendering books
      this.book.innerHTML = `<strong>Title:</strong> ${element.title} <br> <strong>Author:</strong> ${element.author} <br> <strong>Language:</strong> ${element.language} <br> <strong>Subject:</strong> <br> ${element.subject}<hr> `;
      this.ele.appendChild(this.book);
      //create button to unhide comment section
      this.addComment = document.createElement('button');
      this.addComment.innerHTML = 'click to add comment'
      this.ele.appendChild(this.addComment);
      //create div for input box and submit button
      this.commentDiv = document.createElement('div');
      this.commentInput = document.createElement('textarea');
      
      //create unique ID for each input
      this.commentInput.setAttribute('id', 'input'+ index)
          this.commentInput.setAttribute('type', 'text');
          this.commentInput.setAttribute('maxlength', 270);
          this.commentButt = document.createElement('button');
          this.commentButt.innerHTML = 'Submit';
      this.commentDiv.appendChild(this.commentInput);
      this.commentDiv.appendChild(this.commentButt);
      this.commentDiv.setAttribute('class', 'commentDiv') ;
      this.commentDiv.setAttribute('id', 'commentDiv'+index)
      //create unique ID for each comment to pop up later
      this.commRender.setAttribute('id', 'comm'+index)
      this.commRender.setAttribute('class', 'commRender')

      // set items that we want to hide and reappear when button is clicked
      this.commentDiv.style.display = 'none';
      this.commRender.style.display = 'none';
      
      //click to display 
      this.addComment.addEventListener('click',()=>{
        let currDiv = document.querySelector(`#commentDiv${index}`);
        let currComm = document.querySelector(`#comm${index}`);
        currDiv.style.display = 'flex';
        currComm.style.display = 'inline';
      })
      //create event listener to take in value from the input box
      this.commentButt.addEventListener('click', ()=>{
        let currInput = document.querySelector(`#input${index}`).value;
        let currComm = document.querySelector(`#comm${index}`);
        //create list item to store input value then append them to the respective ol parent
        let newLi = document.createElement('li');
        newLi.innerText = currInput;
        currComm.appendChild(newLi)
        currInput = '';
     })

     //append everything into booklist Div
      bookEle.appendChild(this.ele);
      bookEle.appendChild(this.commentDiv);
      bookEle.appendChild(this.commRender);
      bookEle.setAttribute('class', 'bookEle')
      bookList.appendChild(bookEle);

    })
   }

   addBook (){
    let addButton = document.querySelector('#addBook');
    addButton.addEventListener('click',(event)=>{
      event.preventDefault();
      const title_input = document.querySelector('#title-input').value;
      const author_input= document.querySelector('#author-input').value;
      const lang_input = document.querySelector('#lang-input').value;
      const subj_input = document.querySelector('#subj-input').value;
      //construct new book according to user input
      const newBook = new Book (author_input, lang_input[0]+lang_input[1], subj_input, title_input);
      BookShelfArr.push(newBook);
      this.bookRender();
      //set input box to be empty after
      document.querySelector('#title-input').value = '';
      document.querySelector('#author-input').value = '';
      document.querySelector('#lang-input').value = '';
      document.querySelector('#subj-input').value= '';
    })
   }
  }
  


new Bookshelf().bookRender();
new Bookshelf().addBook();
