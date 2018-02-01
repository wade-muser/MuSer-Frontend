import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Song} from "../../models/song";
import {Artist} from "../../models/artist";
import {APIUtils} from "../APIProvider";
import {Constants} from "../../utils/constants";

/*
  Generated class for the AlbumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumProvider {

    ALBUMS_URL = Constants.API_URL + "/albums";

    constructor(public http: HttpClient) {
        console.log('Hello AlbumProvider Provider');
    }

    getAlbum(albumEntityId: string): Observable<HttpResponse<Object>> {

        const id = encodeURI(APIUtils.extractId(albumEntityId));
        const url = `${this.ALBUMS_URL}/${id}`;
        console.log(url);

        return this.http.get(url, {
            observe: "response"
        });
    }

    getRecommendedAlbums(albumEntityId: string, type: string): Observable<HttpResponse<Object>> {
        const id = encodeURI(APIUtils.extractId(albumEntityId));
        const url = `${this.ALBUMS_URL}/${id}/recommendations?type=${type}`;

        return this.http.get(url, {
            observe: "response"
        });
    }
}
