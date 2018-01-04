import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the LogoutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LogoutProvider {

    private LOCALE_STORAGE_TOKEN_KEY = "token";

    constructor(public http: HttpClient) {
    }

    removeToken(): void {
        localStorage.removeItem(this.LOCALE_STORAGE_TOKEN_KEY);
    }

}
