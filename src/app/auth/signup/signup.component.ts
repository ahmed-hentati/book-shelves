import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 
import { map } from 'rxjs/operators' ;
//import { AuthResponseData } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  isAuth: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
    console.log(this.isAuth);
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,}/)]]
    });
    //console.log(this.signUpForm.valid);
  }



  onSubmit() {
    const email = this.signUpForm.get('email').value;
    console.log(email);
    const password = this.signUpForm.get('password').value;
    console.log(password);
    this.authService.createNewUser(email, password).subscribe(
      () => { this.router.navigateByUrl('/books') },
      (error) => { this.errorMessage = error;
      console.log(error);}
    )

  }
}
