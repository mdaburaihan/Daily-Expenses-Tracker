import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err: HttpErrorResponse){
    let errorMessage = "";

    if(!err.error || !err.error.error){
      errorMessage = "This is some unkonwn error. Please try again after some time.";
    }else{
      if(err.error.error === "Permission denied"){
        errorMessage = "You don't have permission to access the page.";
      }
    }

    return throwError(errorMessage);
  }
}
