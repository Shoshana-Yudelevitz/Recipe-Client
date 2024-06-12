import { Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  // הוספת ה-CommonModule
import { MatIconModule } from '@angular/material/icon';
import { Pipe, PipeTransform } from '@angular/core';
import { PipeTimePipe } from '../../shared/pipes/pipe-time.pipe';
import { StarDirectiveDirective } from '../../shared/directives/star-directive.directive';  // ייבוא ה-Directive
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-recipe-datiles',
  standalone: true,
  imports: [MatSnackBarModule, MatTooltipModule, MatDividerModule, StarDirectiveDirective, PipeTimePipe, MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './recipe-datiles.component.html',
  styleUrl: './recipe-datiles.component.scss',
  providers: [DatePipe],

})
export class RecipeDatilesComponent implements OnInit {
  private recipeService = inject(RecipeService)
  private snackBar = inject(MatSnackBar);
  id: number | undefined
  constructor(private route: ActivatedRoute, private datePipe: DatePipe, private router: Router, private userService: UserService,private auth:AuthService) {
    this.id = this.route.snapshot.params['id'];
  }
  user: any = {}

  isOwner = false;
  foundRecipe: Recipe = {}
  ngOnInit():void {
    this.recipeService.getDetailsById(this.id).subscribe((recipes) => {
      this.user = recipes.userRecipe
     
      this.foundRecipe = recipes

      this.auth.isRecipeOwner(this.userService.token, this.user[0]?._id).subscribe((isOwner: boolean) => {
        this.isOwner = isOwner;
        
    });
    });
    
 


  }

  
  getFormattedDate(date: Date | string | undefined): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return this.datePipe.transform(dateObj, 'dd/MM/yyyy') || '';
  }

  getStars(level: number): number[] {
    return Array.from({ length: level }, (_, i) => i);
  }
  deleteRecipe(id: number | string | undefined) {
    this.recipeService.deleteRecipe(id).subscribe({
      next: (response) => {
        console.log('Recipe deleted:', response);
        this.openSnackBar('!המתכון נמחק בהצלחה', 'סגור');
        this.router.navigate(['/all-recipe']);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  editRecipe() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}  