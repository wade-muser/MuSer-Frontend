import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the AuthorizationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthorizationProvider {

    private AUTHORIZATION_URL = "https://1jxyzst870.execute-api.eu-west-1.amazonaws.com/dev/test";

    constructor(public http: HttpClient) {
        console.log('Hello AuthorizationProvider Provider');
    }

    check(token): Observable<HttpResponse<Object>> {
        const headers = new HttpHeaders({"Authorization": token})
        return this.http
            .get(this.AUTHORIZATION_URL, {headers: headers, observe: "response"});
    }

}
