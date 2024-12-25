import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user.pipe(take(1) , map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return router.createUrlTree(['/auth']);
        // return !!user;
    }),
    // tap(isAuth => {
    //   if (!isAuth) {
    //     router.navigate(['/auth']);
    //   }
    // })
    );
}
