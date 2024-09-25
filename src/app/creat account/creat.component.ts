import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



export function matchPasswords(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { mismatch: true };
  }
  return null;
}

export function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.value;
  if (!password) return null;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUpperCase) {
    return { uppercase: true };
  }
  if (!hasLowerCase) {
    return { lowercase: true };
  }
  if (!hasNumber) {
    return { number: true };
  }
  if (!hasSpecialChar) {
    return { specialChar: true };
  }

  return null;
}




@Component({
  selector: 'app-creat',
  templateUrl: './creat.component.html',
  styleUrls: ['./creat.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],

})
export class creatcomponent  {
  isSignDivVisiable: boolean = true;
  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();
  signUpForm: FormGroup; 
  loginForm: FormGroup; 
  signUpSubmitted: boolean = false;
  showPassword = false;
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('input[formControlName="password"]');
    if (this.showPassword) {
      passwordInput?.setAttribute('type', 'text');
    } else {
      passwordInput?.setAttribute('type', 'password');
    }
  }

  
  constructor(private router: Router) {
    
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), passwordValidator]),
      confirmPassword: new FormControl('', Validators.required)
    }, matchPasswords);

    this.loginForm = new FormGroup({ // initialize loginForm
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,])
    });
  }



  onRegister() {
    this.signUpSubmitted = true; 
    if (this.signUpForm.valid) {
      
    } else {
     
    }
    if (this.signUpForm.valid) {
      const localUser = localStorage.getItem('angular17users');
      if (localUser != null) {
        const users = JSON.parse(localUser);
        users.push(this.signUpForm.value);
        localStorage.setItem('angular17users', JSON.stringify(users))
      } else {
        const users = [];
        users.push(this.signUpForm.value);
        localStorage.setItem('angular17users', JSON.stringify(users))
      }
      alert('Registration Success')
    } else {
      alert('Please fill in all required fields');
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const localUsers = localStorage.getItem('angular17users');
      if (localUsers != null) {
        const users = JSON.parse(localUsers);

        const isUserPresent = users.find((user: SignUpModel) => user.email == this.loginForm.value.email && user.password == this.loginForm.value.password);
        if (isUserPresent != undefined) {
          localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
          this.router.navigate(['/products']);
        } else {
          alert("No User Found")
        }
      }
    } else {
      alert('Please fill in all required fields');
    }
  }
}

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password = ""
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = ""
  }
}