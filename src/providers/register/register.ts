import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Constants} from "../../utils/constants";

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

    private REGISTER_URL = Constants.API_URL + "/register";

    constructor(private http: HttpClient,) {
        console.log('Hello RegisterProvider Provider');
    }

    register(credentials): Observable<HttpResponse<Object>> {
        return this.http
            .post(this.REGISTER_URL, credentials, {observe: "response"});
    }

}
