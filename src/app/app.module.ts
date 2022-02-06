import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ListExpensesComponent } from './list-expenses/list-expenses.component';
import { MonthlyLimitComponent } from './monthly-limit/monthly-limit.component';
import { AddPastExpenseComponent } from './add-past-expense/add-past-expense.component';
import { SignupComponent } from './signup/signup.component';
import { DisplayProfilePicComponent } from './display-profile-pic/display-profile-pic.component';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth-interceptor';
//import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    AddExpensesComponent,
    LoginComponent,
    ListExpensesComponent,
    MonthlyLimitComponent,
    AddPastExpenseComponent,
    SignupComponent,
    DisplayProfilePicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    AuthGuard, 
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MonthlyLimitComponent, AddPastExpenseComponent]
})
export class AppModule { }
