import { Component, Input } from '@angular/core';
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
export class RegisterComponent {

  private userService = inject(UserService)
  @Input()
  userData: { email: string; password: string } | null = null;
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
enter(form:NgForm){
this.userService.signUp({userName:form.value.userName,password:form.value.password,email:form.value.email,address:form.value.address,role:'user'}).
subscribe((data)=>{
  console.log(data);
  this.userService.token=data.token
  this.router.navigate(['/all-recipe']); 
})
}
}
