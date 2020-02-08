import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { AuthGuardService } from './services/auth-guard.service';




const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'books', component: BookListComponent/*, canActivate :[AuthGuardService] */},
  { path: 'books/new', component: BookFormComponent/*, canActivate :[AuthGuardService] */},
  { path: 'books/view/:id', component: SingleBookComponent/*, canActivate :[AuthGuardService] */},
  { path : '', redirectTo: 'books', pathMatch: 'full'},
  { path : '**', redirectTo: 'books'} // path wildcard 
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
