import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book.model';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  book: Book;
  errorMessage: string;
  selectedFile = null;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }


  onSaveBook() {
    //const email = this.signInFrom.value('email');
    const title = this.bookForm.get('title').value;
    console.log(title);
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const book = new Book(title, author);
    book.synopsis = synopsis;
    this.booksService.onCreateBook(book).subscribe(
      () => {//this.router.navigateByUrl('/books');
        this.router.navigate(['/books']);
        console.log(this.router);
      },
      (error) => { //console.log(error);
        this.errorMessage = error;
        console.log(this.errorMessage);
      }
    )

    /*this.authService.signInUser(email, password).subscribe(
      () => { this.router.navigateByUrl('/books') },
      (error) => { //console.log(error);
                  this.errorMessage = error;
      } 
    )*/

    this.booksService.uploadFile(this.selectedFile).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {// si en cours d'upload
          console.log('Upload Progress:'+ Math.round((event.loaded / event.total) * 100) + '%' )
        }
        else if (event.type === HttpEventType.Response) {
          console.log(event);
        }

      }
    )
  }

  detectFiles(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

}
