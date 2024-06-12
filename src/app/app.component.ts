import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTabsModule,MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe';

  constructor(private router: Router, public userService: UserService) {}

  onTabChange(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/login']);
        break;
      case 1:
        this.router.navigate(['/signUp']);
        break;
      case 2:
        this.router.navigate(['/home']);
        break;
      case 3:
        this.router.navigate(['/all-recipe']);
        break;
      case 4:
        if (this.isUserLoggedIn()) {
          this.router.navigate(['/recipe-form']);
        }
        break;
      case 5:
        if (this.isUserLoggedIn()) {
          this.router.navigate(['/my-recipes']);
        }
        break;
    }
  }

  isUserLoggedIn(): boolean {
   
    return !!this.userService.token;
  }

  onActivate(component: any) {
    // Perform any necessary actions when components are activated
  }

  
  logout() {
    if (this.isUserLoggedIn()) {
    
    this.userService.logout();
    this.router.navigate(['/login']);}
  }
}
