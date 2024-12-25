import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

export const recipeResolver: ResolveFn<Recipe[] | Observable<Recipe[]> | void> =

(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | void => {

  const dataStorageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);

  const recipes = recipeService.getRecipes();

  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipes;
  }

}
