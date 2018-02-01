import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Song} from "../../models/song";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Artist} from "../../models/artist";
import {Album} from "../../models/album";
import {Event} from "../../models/event";
import {Constants} from "../../utils/constants";
import {APIUtils} from "../APIProvider";

/*
  Generated class for the ArtistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArtistProvider {

    public ARTISTS_URL = Constants.API_URL + "/artists";

    constructor(public http: HttpClient) {
        console.log('Hello ArtistProvider Provider');
    }

    getArtist(id: string): Observable<HttpResponse<Object>> {
        const artistId = APIUtils.extractId(id);
        const url = `${this.ARTISTS_URL}/${artistId}`;

        return this.http.get(url, {
            observe: "response",
        });
    }

    getPopularSongs(artistEntityId: string): Observable<HttpResponse<Object>> {

        const id = APIUtils.extractId(artistEntityId);
        const url = `${this.ARTISTS_URL}/${id}/songs`

        return this.http.get(url, {
            observe: "response"
        })
    }

    getRelatedArtists(artistEntityId: string): Observable<HttpResponse<Object>> {

        const id = APIUtils.extractId(artistEntityId);
        const url = `${this.ARTISTS_URL}/${id}/features`

        return this.http.get(url, {
            observe: "response"
        });

    }

    getPopularAlbums(artistEntityId: string): Observable<HttpResponse<Object>> {

        const id = APIUtils.extractId(artistEntityId);
        const url = `${this.ARTISTS_URL}/${id}/albums`;
        console.log(url);

        return this.http
            .get(url, {
                observe: "response",
            });

    }

    getRecommendedArtists(artistEntityId: string, type: string): Observable<HttpResponse<Object>> {

        const id = APIUtils.extractId(artistEntityId)
        const url = `${this.ARTISTS_URL}/${id}/recommendations?type=${type}`;
        console.log(url)

        return this.http.get(url, {
            observe: "response",
        });
    }
}
