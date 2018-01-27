import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

    private REGISTER_URL = "https://mawk0772fg.execute-api.eu-west-1.amazonaws.com/dev/register";

    constructor(private http: HttpClient,) {
        console.log('Hello RegisterProvider Provider');
    }

    register(credentials): Observable<HttpResponse<Object>> {
        return this.http
            .post(this.REGISTER_URL, credentials, {observe: "response"});
    }

}
