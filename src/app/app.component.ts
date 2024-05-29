import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule, UpperCasePipe } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,LoginComponent,HomeComponent,HttpClientModule,RouterModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recipe';
  userService=inject(UserService)
  constructor(private router: Router) {}

  onActivate(component: any) {
    if (component instanceof LoginComponent) {
      component.moveTo.subscribe((data:{email:string,password:string}) => {
        console.log(data);
        
      });
    }
}

}
