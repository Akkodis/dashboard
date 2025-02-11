import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { exhaustMap, from, Observable, take } from 'rxjs';

@Injectable()
export class KeycloakClientAuthInterceptor implements HttpInterceptor {
  constructor(private auth: KeycloakClientAutheService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.auth.getToken()).pipe(
      take(1),
      exhaustMap((token:string) => {
        if (!token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
