import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  books : Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor(private http : HttpClient) { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  onCreateBook(book : Book){

    return this.http.post('https://book-thieves.firebaseio.com/books.json',book);   //.json only for firebase!
  }

  saveBooks(){

  }

  getBooks(){
    const token = btoa('user' + ':' + 'user');
    console.log(token);
    const headers = new HttpHeaders({
      Authorization : 'Basic ' + token
    });
    /*const headers = new HttpHeaders(Credential ? {
      authorization : 'Basic ' + token
    } : {} ) ; */
    return this.http.get('http://localhost:8080/api/produit', {headers : headers} );
    //return this.http.get('https://book-thieves.firebaseio.com/books.json')
    /*.pipe(map( reponseData => { 
      const bookArray = [];
      for ( const key in reponseData) {
        if(reponseData.hasOwnProperty(key))     //for firebase backend!!
        bookArray.push({...reponseData[key], id: key });
      }
      return bookArray;
    }
    ));*/
  }

  getSingleBook(id:number){
    const options = { params : new HttpParams().set('id', id.toString())};
    return this.http.get('https://book-thieves.firebaseio.com/books.json', options );
  }

  removeBook(book : Book){
    return this.http.delete('https://book-thieves.firebaseio.com/books.json');    
  }

  uploadFile(file : File){
    const formData = new FormData();
    formData.append('image',file,file.name);
    return this.http.post('https://www.mocky.io/v2/5185415ba171ea3a00704eed',formData,{
      reportProgress:true,  //showing progress
      observe:'events' // getting all the individual events during the file upload
    });
    //return this.http.post('https://us-central1-book-thieves.cloudfunctions.net/uploadFile',formData);
  }
}
