import {HttpClient} from '@angular/common/http';
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

    search(name: string, searchFilter: string): Observable<Array<Artist>> {
        switch (searchFilter) {
            case "Artist":
                return this.getArtists(name);
            case "Album":
                return this.getAlbums(name);
            case "Track":
                return this.getTracks(name);
            default:
                return of([]);
        }
    }

    getArtists(name: string): Observable<Array<Artist>> {
        console.log("Search artists:", name);
        return of(this.artists);
    }

    getAlbums(name: string): Observable<Array<Album>> {
        console.log("Search albums:", name);
        return of(this.albums);
    }

    getTracks(name: string): Observable<Array<Song>> {
        console.log("Search tracks:", name);
        return of([]);
    }

}
