import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getAuthorizationToken();

        if(req.url !== "http://localhost:3000/auth"){
            const authRequest = req.clone({
                headers: req.headers.set("token", authToken)
            })
            return next.handle(authRequest);   
        }
        return next.handle(req);
    }
}