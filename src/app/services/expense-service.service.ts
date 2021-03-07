import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  errorData: { error: number; };

  constructor(
    private http: HttpClient,
    private AuthService: AuthService,
    private error: ErrorService
    ) { }
  public expenseDetails: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public monthlyLimitDetails: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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

  addExpense(data: any): Observable<any> {
    const headers = new HttpHeaders().set("token", this.AuthService.getAuthorizationToken());
    return this.http.post<any>("http://localhost:3000/expense/add", data, {headers}).pipe(tap(() => {
        catchError(this.handleError);
      })
    );
  }

  getExpenseDetails(): Observable<any> {
    const headers = new HttpHeaders().set("token", this.AuthService.getAuthorizationToken());
    return this.http.get("http://localhost:3000/expense/details", {headers}).pipe(map((res) => {
      this.expenseDetails.next(res as any);
    }), catchError(err => of(err)));
  }

  getExpenseList(): Observable<any> {
    const headers = new HttpHeaders().set("token", this.AuthService.getAuthorizationToken());
    return this.http.get("http://localhost:3000/expense/list", {headers}).pipe(map((res) => {
      return res;
    }), catchError(err => of(err)));
  }

  addMonthlyLimit(data: any): Observable<any> {
    const headers = new HttpHeaders().set("token", this.AuthService.getAuthorizationToken());
    return this.http.post<any>("http://localhost:3000/expense/addMonthlyLimit", data, {headers}).pipe(tap(() => {
        //catchError(this.handleError);
        catchError(this.error.handleError);
      })
    );
  }

  getMonthlyLimit(): Observable<any> {
    const headers = new HttpHeaders().set("token", this.AuthService.getAuthorizationToken());
    return this.http.get("http://localhost:3000/expense/getMonthlyLimit", {headers}).pipe(map((res) => {
      this.monthlyLimitDetails.next(res as any);
    }), catchError(err => of(err)));
  }
  
}
