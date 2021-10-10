import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { take, map, retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginFailedFlag = false;
  loginErrorMsg: string = "";

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log("this.router.url", this.router.url)

    if(this.router.url === "/signup"){
      console.log("==1")
      this.router.navigate(['/signup']);
    }else if(this.AuthService.getAuthorizationToken()){
      console.log("==2")
      this.router.navigate(['/add-expenses']);
    }
   }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(): void{
    this.AuthService.login(this.loginForm.value).subscribe((data) => {
        console.log(data)
        if(data.name === "HttpErrorResponse"){
          this.loginFailedFlag = true;
            this.loginErrorMsg = data.error;
            setTimeout(() => {
              this.loginFailedFlag = false;
              this.loginErrorMsg = "";
            }, 2000) 
        }else{
          localStorage.setItem('userToken', data);
          this.router.navigate(['/add-expenses']);
        }
      }
    );
}

private httpErrorHandler (error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
     console.error("A client side error occurs. The error message is " + error.message);
     } else {
        console.error(
           "An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
     }

  return throwError("Error occurred. Pleas try again");
}
}