/**
 * Created by Ciprian at 1/4/2018
 */


import {Injectable, Injector} from "@angular/core";
import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from "@angular/common/http";
import {AuthorizationProvider} from "./authorization";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    whiteList = ["/login", "/register"]
    HTTP_STATUS_CODE_UNAUTHORIZED = 401;

    constructor(public inj: Injector) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Request is intercepted");
        const url = request.url;
        const isWhiteListRequest = this.urlIsInWhiteList(url);
        if (!isWhiteListRequest) {
            const authorizationService = this.inj.get(AuthorizationProvider);
            const token = authorizationService.getToken();
            request = request.clone({
                setHeaders: {
                    "Authorization": token
                }
            });
        }

        return next.handle(request).do(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }

            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status == this.HTTP_STATUS_CODE_UNAUTHORIZED) {
                        console.log("Unauthorized");
                    }
                }
            }
        )

    }

    urlIsInWhiteList(url: string): boolean {
        for (let path of this.whiteList) {
            if (url.endsWith(path)) {
                console.log("WhiteList Request");
                return true;
            }
        }
        return false;
    }
}
