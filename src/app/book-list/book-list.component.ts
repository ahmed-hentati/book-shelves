import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] ;

  constructor(private booksService : BooksService, private router:Router) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe( 
      (response) =>  console.log(response)
      /*(books:Book[]) => { this.books = books} */
      )
    
  }

  onNewBook(){
    this.router.navigate(['/books','new']);
    console.log('button working')
  }

  onDeleteBook(book:Book){
    this.booksService.removeBook(book);
  }

  onViewBook(id:number){
    this.router.navigate(['/books','view',id]);

  }

}
