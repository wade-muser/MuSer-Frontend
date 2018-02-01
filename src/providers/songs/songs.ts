import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Constants} from "../../utils/constants";
import {APIUtils} from "../APIProvider";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the SongsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SongsProvider {

    SONGS_URL = Constants.API_URL + "/songs";

    constructor(public http: HttpClient) {
        console.log('Hello SongsProvider Provider');
    }

    getSong(songEntityId: string): Observable<HttpResponse<Object>> {
        const id = encodeURI(APIUtils.extractId(songEntityId));
        const url = `${this.SONGS_URL}/${id}`;
        console.log(url);

        return this.http.get(url, {
            observe: "response"
        });
    }

    getRecommendedSongs(songEntityId: string, type: string): Observable<HttpResponse<Object>> {
        const id = APIUtils.extractId(songEntityId);
        const url = `${this.SONGS_URL}/${id}/recommendations?type=${type}`;
        console.log(url);

        return this.http.get(url, {
            observe: "response"
        });
    }

}
