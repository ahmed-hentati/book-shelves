import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCqdieSSNe-CbEOWyOLUrE6CBlHpsUAmtk",
      authDomain: "book-thieves.firebaseapp.com",
      databaseURL: "https://book-thieves.firebaseio.com",
      projectId: "book-thieves",
      storageBucket: "book-thieves.appspot.com",
      messagingSenderId: "803629840273",
      appId: "1:803629840273:web:3db7e2f7fd98479ceacc30"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
