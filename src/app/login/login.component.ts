import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
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
      if(data.status && data.status === 200){
        localStorage.setItem('userToken', data);
        this.router.navigate(['/add-expenses']);
      }else{
        this.loginFailedFlag = true;
        this.loginErrorMsg = data.error;
        setTimeout(() => {
          this.loginFailedFlag = false;
          this.loginErrorMsg = "";
        }, 2000) 
      }
    });
  }
}