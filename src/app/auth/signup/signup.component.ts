import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  ErrorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['aa', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,}/)]]
    });
    console.log(this.signUpForm.valid);
  }



  onSubmit() {
    const email = this.signUpForm.get('email').value;
    console.log(email);
    const password = this.signUpForm.get('password').value;
    console.log(password);
    this.authService.createNewUser(email, password).subscribe(
      () => { this.router.navigateByUrl('/books') },
      (error) => { console.log(error) }
    )

  }
}
