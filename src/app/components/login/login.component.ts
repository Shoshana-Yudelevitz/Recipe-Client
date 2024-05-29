import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})



export class LoginComponent {
  
  private userService = inject(UserService)

  email = new FormControl('', [Validators.required, Validators.email]);
  loginError?: string;
  errorMessage = '';
  errorUser = '';
  hide = true;
  constructor(private server: UserService, private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }


updateErrorMessage() {
  if (this.email.hasError('required')) {
    this.errorMessage = 'שדה חובה';
  } else if (this.email.hasError('email')) {
    this.errorMessage = 'המייל  שגוי';
  } else {
    this.errorMessage = '';
  }

}
@Output()
moveTo: EventEmitter<{email:string,password:string}>= new EventEmitter<{email:string,password:string}>();

move(form: NgForm){
  this.moveTo.emit({email:form.value.email,password:form.value.password})
  this.router.navigate(['/signUp']);
}
signIn(form: NgForm) {
  console.log(form.value.password);
  console.log(form.value.email);
  this.userService
    .signIn({ password: form.value.password, email: form.value.email }).
    subscribe((data) => {
      console.log(data);
      console.log("התחברת בהצלחה:)");
      this.userService.token = data.token
      if (this.userService.token) {
        this.router.navigate(['/all-recipe']);
      }
    }
      ,
      (error) => {
        this.errorUser = "שם משתמש או סיסמה לא חוקיים. אנא נסה שוב.";
      }
    )
}
}

