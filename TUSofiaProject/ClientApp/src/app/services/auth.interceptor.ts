import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.cookieService.get('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(cloned)
    } else {
      return next.handle(req)
    }
  }
} 
