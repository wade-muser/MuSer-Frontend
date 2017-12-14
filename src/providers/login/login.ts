import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

    private LOGIN_URL = "https://1jxyzst870.execute-api.eu-west-1.amazonaws.com/dev/login";

    constructor(public http: HttpClient) {
        console.log('Hello LoginProvider Provider');
    }

    login(credentials: Object): Observable<HttpResponse<Object>> {
        return this.http
            .post(this.LOGIN_URL, credentials, {observe: "response"});

    }

}
