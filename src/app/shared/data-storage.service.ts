import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeResipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-e5f1d-default-rtdb.firebaseio.com/recipe.json',
      recipes
    ).subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes() {
      return this.http.get<Recipe[]>(
        'https://ng-course-recipe-book-e5f1d-default-rtdb.firebaseio.com/recipe.json',
      ).pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    );

  }

}
