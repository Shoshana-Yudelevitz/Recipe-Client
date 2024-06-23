import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    RouterModule,
    MatTabsModule, MatButtonModule, MatDividerModule, MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'recipe';
  userName: string|undefined 
  selectedTabIndex = 2;
  constructor(private router: Router, public userService: UserService) { }
  ngOnInit() {
  this.selectedTabIndex=2;
 
  }
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
        this.router.navigate(['/all-recipe'], { queryParams: { myRecipes: 'false' } });
        break;
      case 4:
        this.router.navigate(['/recipe-form']);
        break;
      case 5:
        this.router.navigate(['/all-recipe'], { queryParams: { myRecipes: 'true' } });
        break;
    }
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.token;
  }

  onActivate(component: any) {
    if (component) {
      this.userName = this.userService.userName; // שימוש בשם המשתמש משירות המשתמש
      this.selectedTabIndex=3;
    }
    
  }


  logout() {
    if (this.isUserLoggedIn()) {
      this.userService.logout();
   
      this.router.navigate(['/login']);
    }
  }
}
