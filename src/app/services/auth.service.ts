import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  errorData: { error: number; };
  public user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
    }
    // return an observable with a user-facing error message
    /*this.errorData = {
    errorTitle: 'Oops! Request for document failed',
    errorDesc: 'Something bad happened. Please try again later.',
    loginFailed:'Login Failed'
  };*/
    this.errorData = {
      error: error.status
    };
    return throwError(this.errorData);
  }
  
  login(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/auth", data, { }).pipe(map(res => {
      this.user.next(res as any);
      return res;
    }), catchError(err => of(err)));
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/auth/signup", data, { }).pipe(map(res => {
      this.user.next(res as any);
      return res;
    }), catchError(err => of(err)));
  }

  getAuthorizationToken() {
    const currentUser = localStorage.getItem("userToken");
    return currentUser;
  }
  
}
