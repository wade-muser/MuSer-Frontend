import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from "../../utils/constants";
import {APIUtils} from "../APIProvider";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

    public EVENTS_URL = Constants.API_URL + "/events";

    constructor(public http: HttpClient) {
        console.log('Hello EventsProvider Provider');
    }

    private artistId: string;

    getEvents(artistEntity: string): Observable<HttpResponse<Object>> {

        const artistId = APIUtils.extractId(artistEntity);
        const url = `${this.EVENTS_URL}/?type=performer&&keyword=${encodeURI(artistId)}`
        console.log(url);

        return this.http.get(url, {
            observe: "response"
        });
    }


}
