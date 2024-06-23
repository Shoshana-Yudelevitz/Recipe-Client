import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { from, merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{

  private userService = inject(UserService)
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(10),
    Validators.pattern('^(?=.*[A-z])(?=.*[0-9])')
  ]);
  loginError?: string;
  errorMessage = '';
  errorUser = '';
  hide = true;
  state = { email: '' , password: ''};
  constructor(private server: UserService, private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit() {

    const state = history.state as { email: string; password: string };


  if (state) {

    this.state.email = state.email;
    this.state.password = state.password; 
  }}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'שדה חובה';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'המייל  שגוי';
    } else {
      this.errorMessage = '';
    }

  }
  enter(form: NgForm) {
    console.log("bjhbjkhb");
    
    this.userService.signUp({ userName: form.value.userName, password: form.value.password, email: form.value.email, address: form.value.address, role: 'user' }).
      subscribe({
        next: (data) => {
          console.log(data);
          this.userService.token = data.token
          this.userService.userName=data.user.userName
          this.router.navigate(['/all-recipe']);
        },
        error: (err) => {
          console.error('SignUp error', err);
          // Handle server-side error and display appropriate message
          if (err.error && err.error.message === 'User already exists') {
            this.errorUser = 'המשתמש כבר קיים במערכת'; // Set user-friendly error message
          } else {
            this.errorUser = 'אירעה שגיאה במהלך הרישום. אנא נסה שוב.'; // Generic error message
          }
        }
      });
    }}