import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map,tap, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from '../auth/user.model';

interface AuthResponseData{
  kind : string ;
  idToken : string;
  email : string ;
  refreshToken : string;
  expiresIn : string;
  localId : string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuth:boolean = true;
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  createNewUser(email:string, password:string){
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk
    // API KEY : AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk',
    { email : email ,
      password : password,
      returnSecureToken: true
    }).pipe(catchError(errRes => this.handleError(errRes) ), tap( (respData) => this.handleAuthentification(respData.email,respData.localId,respData.idToken,+respData.expiresIn) //+ Convert to a number
      ) )
    /*
    .pipe(map(
      (loacalId) => { if (loacalId) { this.isAuth = true ; console.log(this.isAuth)}}
    ));   // ) */
  }

  
  signInUser(email:string, password:string) {
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk',
    { email : email ,
      password : password,
      returnSecureToken: true
    }).pipe(
      catchError(errRes => this.handleError(errRes)), tap( (respData) => this.handleAuthentification(respData.email,respData.localId,respData.idToken,+respData.expiresIn)
      ))
    
    // changer isAuth si utilisateur connecté
    /*.pipe(map(
        (loacalId) => { if (loacalId) { this.isAuth = true ; console.log(this.isAuth)}}
      )); */
  }

  private handleError(errorRes : HttpErrorResponse){
      let messageErreur = 'An error is occured';
      if ( !errorRes.error || !errorRes.error.error ) {
        return throwError(messageErreur)
      }
      switch(errorRes.error.error.message){
        case'EMAIL_EXISTS':
        messageErreur = 'email already exists';
        break;

        case'EMAIL_NOT_FOUND' : //|| 'INVALID_PASSWORD' 
        messageErreur = 'email ou mot de passe incorrect';
        break;
        
      }
      return throwError(messageErreur) 
  }

  private handleAuthentification(email : string, userId : string, token:string, expriesIn:number){
    //const expirationDate = new Date(new Date().getTime() + +respData.expiresIn * 1000); //+convert to number
    const expirationDate = new Date(new Date().getTime() + expriesIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user); 
    console.log(user);
  }
  
  // TO DO Later
  signOutUser(){
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk',{
      
    })

  }

}
