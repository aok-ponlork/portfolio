import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/env.development';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public thirdPartySerive: string = '';
  private baseUrl = environment.apiUrl;
  private defaultHeaders = new HttpHeaders({
    Authorization: `Bearer ${
      localStorage.getItem('access_token') ||
      'd9385ffb4c9c4532a93c49a8e4ad676bf4f1101d96db89a02cfb1a0c44dc1f36'
    }`,
  });

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }

  get<T>(
    uri: string,
    params?: HttpParams,
    customHeaders?: HttpHeaders
  ): Observable<HttpResponse<T>> {
    return this.http
      .get<T>(`${this.thirdPartySerive || this.baseUrl}/${uri}`, {
        headers: customHeaders || this.defaultHeaders,
        observe: 'response',
        params,
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(
    uri: string,
    data: any,
    customHeaders?: HttpHeaders
  ): Observable<HttpResponse<T>> {
    const url = this.thirdPartySerive || `${this.baseUrl}/${uri}`;
    return this.http
      .post<T>(url, data, {
        headers: customHeaders || this.defaultHeaders,
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  postForm<T>(uri: string, formData: FormData): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${uri}`, formData, {})
      .pipe(catchError(this.handleError));
  }

  postBlob<T>(uri: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${uri}`, data, {
        responseType: 'blob' as 'json',
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(uri: string, data: any, customHeaders?: HttpHeaders): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${uri}`, data, {
        headers: customHeaders || this.defaultHeaders,
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(uri: string, customHeaders?: HttpHeaders): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${uri}`, {
        headers: customHeaders || this.defaultHeaders,
      })
      .pipe(catchError(this.handleError));
  }
}
