import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllRecipeComponent } from './components/all-recipe/all-recipe.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { OneRecipeComponent } from './components/one-recipe/one-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeDatilesComponent } from './components/recipe-datiles/recipe-datiles.component';

export const routes: Routes = [
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'signUp',component:RegisterComponent},
    {path:'all-recipe',component:AllRecipeComponent},
    {path:'recipe-form',component:RecipeFormComponent},
    {path:'one-recipe',component:OneRecipeComponent},
    {path:'my-recipes',component:AllRecipeComponent},
    {path:'recipeDatiles/:id',component:RecipeDatilesComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full' },
    {path:'**', redirectTo: '/login'},
  ]

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
   export class AppRoutingModule { }
