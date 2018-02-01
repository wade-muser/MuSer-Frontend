import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Constants} from "../../utils/constants";

/*
  Generated class for the AuthorizationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthorizationProvider {

    private LOCALE_STORAGE_TOKEN_KEY = "token";
    private AUTHORIZATION_URL = Constants.API_URL + "/test";

    constructor(public http: HttpClient) {
        console.log('Hello AuthorizationProvider Provider');
    }

    check(): Observable<HttpResponse<Object>> {
        return this.http
            .get(this.AUTHORIZATION_URL, {observe: "response"});
    }

    getToken(): string {
        return localStorage.getItem(this.LOCALE_STORAGE_TOKEN_KEY);
    }

    tokenExists(): boolean {
        return this.getToken() != undefined;
    }

}
