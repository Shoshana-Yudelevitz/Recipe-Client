import { Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Recipe } from '../../shared/models/recipe';
import { Route, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-one-recipe',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule],
  templateUrl: './one-recipe.component.html',
  styleUrl: './one-recipe.component.scss'
})
export class OneRecipeComponent implements OnInit{

  constructor(private router:Router,private userService:UserService,private auth:AuthService){}
  @Input('oneItem')
  one:Recipe={}
  id:number|undefined
  isLoggedIn: boolean = false;


  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  
  }
  datiles(id:number|undefined){
   this.id=id
   this.router.navigate(['/recipeDatiles',id])
  }
}
