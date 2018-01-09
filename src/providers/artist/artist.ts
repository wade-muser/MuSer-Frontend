import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Song} from "../../models/song";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Artist} from "../../models/artist";
import {Album} from "../../models/album";
import {Event} from "../../models/event";

/*
  Generated class for the ArtistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArtistProvider {

    constructor(public http: HttpClient) {
        console.log('Hello ArtistProvider Provider');
    }

    getPopularSongs(id: string): Observable<Array<Song>> {

        const artist1 = new Artist("1", "The Weeknd", "https://i.scdn.co/image/a1bbafd8c21c14fd685a3d8efb0906db7c059a97");


        const popularSongs = [
            new Song("1", "Starboy", [artist1], "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1"),
            new Song("2", "I Feel It Coming I Feel It Coming I Feel It Coming", [artist1], "https://i.scdn.co/image/8cd9f71a64cd01adb3d7716f396d20408f422d1e"),
            new Song("3", "Curve", [artist1], "https://i.scdn.co/image/e874da622122a0a9b7205c876532bb2633700b35"),
            new Song("4", "Reminder", [artist1], "https://i.scdn.co/image/60f48e0d4b9031726b29309e5b4523f0e93a59a3")
        ];

        return of(popularSongs);
    }

    getRelatedArtists(id: string): Observable<Array<Artist>> {
        const relatedArtists = [
            new Artist("1", "Drake", "https://i.scdn.co/image/cb080366dc8af1fe4dc90c4b9959794794884c66"),
            new Artist("2", "Frank Ocean", "https://i.scdn.co/image/7db34c8aace6feb91f38601bb75e6b3301b4657a")

        ];
        return of(relatedArtists);
    }

    getPopularAlbums(id: string): Observable<Array<Album>> {
        const artist = new Artist("", "The Weeknd", "https://i1.sndcdn.com/artworks-oJdxXcIn59Yo-0-t500x500.jpg");
        const popularAlbums = [
            new Album("1", "Starboy", "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1", artist),
            new Album("1", "Beauty Behind The Madness", "https://i.scdn.co/image/34beaad5faf39b2deaec8da702b37ba0805bb35c", artist)
        ];
        return of(popularAlbums);
    }

    getEvents(id: string): Observable<Array<Event>> {
        const events = [
            new Event("", "Never the Bride ", "http://images.sk-static.com/images/media/profile_images/artists/249314/huge_avatar", new Date(), new Date(), "Auckland, Australia"),
        ];
        return of(events);
    }

}
