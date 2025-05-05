import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'token';
  constructor(private http: HttpService) {}
  result: boolean = false;
  isLoading: boolean = true;

  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  // verify token with Cloudflare function
  verifyToken(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }
    return this.http.get<any>(`secure-image?token=${token}`).pipe(
      map((rs) => {
        return rs.status === 200;
      }),
      catchError(() => {
        this.clearToken();
        return of(false);
      })
    );
  }

  getImages(): any {
    const token = this.getToken();
    if (!token) {
      return [''];
    }
    return this.http.get<any>(`secure-image?token=${token}`).pipe(
      map((rs) => {
        return rs;
      }),
      catchError(() => {
        this.clearToken();
        return [''];
      })
    );
  }
}
