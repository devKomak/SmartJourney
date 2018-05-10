import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  dataForm: FormGroup;
  error;
  success;

  ngOnInit() {
    this.dataForm = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required,  Validators.minLength(9)])
    });

    this.authService.registerError.subscribe((response: any) => {
      if (response === 'Ok') {
        console.log('Successful');
        this.success = response.message;
      } else {
        console.log(response.message);
        this.error = response.message;
      }
    });

  }

  getErrorMessage() {
    return this.dataForm.get('email').hasError('required') ? 'You must enter a value' :
    this.dataForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorMessage1() {
    return this.dataForm.get('password').hasError('required') ? 'You must enter a value' :
    this.dataForm.get('password').hasError('minlength') ? 'Password must contain minimum 9 chars' :
            '';
  }

  onSignUp() {

    if (this.dataForm.valid) {
      this.authService.signUpUser(this.dataForm.value.email, this.dataForm.value.password);
    }
  }

  login() {
    this.authService.loginWithGoogle();
  }

}
