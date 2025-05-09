import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
import { TokenService } from '../services/authentication/token.service';
import { LoadingService } from '../services/common/loading-state.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private loading: LoadingService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //State
    this.loading.show();
    const token = next.queryParamMap.get('token');
    // If token exists in URL, store it first
    if (token) {
      this.tokenService.storeToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return this.tokenService.verifyToken().pipe(
      tap((isValid) => {
        if (!isValid) {
          this.router.navigate(['/app/unauthorized']);
        }
      }),
      finalize(() => {
        this.loading.hide();
      }),
      map((isValid) => isValid)
    );
  }
}
