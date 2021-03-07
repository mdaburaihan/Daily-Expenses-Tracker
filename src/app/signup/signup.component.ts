import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  selectedProfilePic: File = null;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],

      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        cpassword: ['', Validators.required],
      }, { validators: this.matchPassword}),
      
      contact_no: ['', [Validators.required, this.contactNoLengthCheck]],
      profile_pic: ['', Validators.required]
    })
  }

  onProfilePicSelected(event){
    //console.log(event);

    this.selectedProfilePic = <File>event.target.files[0];

    console.log(this.selectedProfilePic);
  }

  signup() {
    //console.log(this.signupForm.value);

    let send_obj = {
      user_name: this.signupForm.value.name,
      user_email: this.signupForm.value.email,
      user_password: this.signupForm.value.passwordGroup.password,
      contact_no: this.signupForm.value.contact_no,
      profile_pic: this.selectedProfilePic.name,
    };

    //console.log(send_obj);

    //return false

    this.AuthService.signup(send_obj).subscribe((data) => {
      //console.log(data)

      if(data.status == 409){
        this.openSnackBar(data.error);
      }else{
        localStorage.setItem('userToken', data);
        this.router.navigate(['/add-expenses']);
      }
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  matchPassword(control: AbstractControl): {[key: string]: any} | null {
    //console.log(control)
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('cpassword');

    //console.log(passwordControl)
    //console.log(confirmPasswordControl)

    if(passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine){
      return null;
    }else{
      return { 'passwordMisMatch': true }
    }
  };

  contactNoLengthCheck(control: AbstractControl): {[key: string]: any} | null {
    //console.log(control.value)
    const contactNo = (control.value) ? control.value.toString() : 0;
    //console.log(contactNo.toString())
    //console.log(contactNo.length)
    if(contactNo.length == 10 || control.pristine){
      return null;
    }else{
      return { "contactNoLengthIncorrect": true }
    }
  };
}

