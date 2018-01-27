import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Artist} from "../../models/artist";
import {Observable} from "rxjs/Observable";
import {Album} from "../../models/album";
import {of} from "rxjs/observable/of";
import {Song} from "../../models/song";

/*
  Generated class for the DiscoverProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiscoverProvider {

    artists: Array<Artist>
    albums: Array<Album>

    ARTISTS_URL = "https://mawk0772fg.execute-api.eu-west-1.amazonaws.com/dev/artists";
    ALBUMS_URL = "https://mawk0772fg.execute-api.eu-west-1.amazonaws.com/dev/albums";
    SONGS_URL = "https://mawk0772fg.execute-api.eu-west-1.amazonaws.com/dev/songs";


    constructor(public http: HttpClient) {
        this.artists = [
            new Artist(
                "",
                "The Weeknd",
                "https://i1.sndcdn.com/artworks-oJdxXcIn59Yo-0-t500x500.jpg"
            ),
            new Artist(
                "",
                "Dua Lipa",
                "https://www.iomoio.com/covers/src/19/436719.jpg"
            )];
        this.albums = [
            new Album("1", "Starboy",
                "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1", this.artists[0])];
    }

    search(name: string, searchFilter: string): Observable<HttpResponse<Object>> {
        switch (searchFilter) {
            case "Artist":
                return this.getArtists(name);
            case "Album":
                return this.getAlbums(name);
            case "Track":
                return this.getTracks(name);
        }
    }

    getArtists(name: string): Observable<HttpResponse<Object>> {

        return this.http.get(this.ARTISTS_URL, {
            params: {
                name: name,
                type: "artist"
            },
            observe: "response"
        });
    }

    getAlbums(name: string): Observable<HttpResponse<Object>> {
        return this.http.get(this.ALBUMS_URL, {
            params: {
                name: name,
            },
            observe: "response"
        });
    }

    getTracks(name: string): Observable<HttpResponse<Object>> {
        return this.http.get(this.SONGS_URL, {
            params: {
                name: name,
            },
            observe: "response"
        });
    }

}
