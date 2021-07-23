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

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.AuthService.getAuthorizationToken()) { 
      console.log("===here---11")
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
      localStorage.setItem('userToken', data);
      this.router.navigate(['/add-expenses']);
    });
  }

}
