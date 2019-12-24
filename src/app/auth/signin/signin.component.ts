import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,}/)]]
    });
    
  }

  onSubmit() {
    //const email = this.signInFrom.value('email');
    const email = this.signInForm.get('email').value;
    console.log(email);
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(email, password).subscribe(
      () => { this.router.navigateByUrl('/books') },
      (error) => { //console.log(error);
                  this.errorMessage = error;
      }
    )
  }

}
