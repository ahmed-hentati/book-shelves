import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub : Subscription ;
  isAuth : boolean = false;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => (this.isAuth = !user ? false : true ) 
    );
  }
  ngOnDestroy(){
    this.authService.user.unsubscribe();
  }

}
