import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  createNewUser(email:string, password:string){
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk
    // API KEY : AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk',
    { email : email ,
      password : password,
      returnSecureToken: true
    });   // )
  }

  
  signInUser(email:string, password:string) {
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk',
    { email : email ,
      password : password,
      returnSecureToken: true
    });
  }
  
  // TO DO Later
  signOutUser(){

  }

}
