import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from "rxjs/observable/of";
import {Song} from "../../models/song";
import {Observable} from "rxjs/Observable";
import {Artist} from "../../models/artist";
import {Playlist} from "../../models/playlist";

/*
  Generated class for the PlaylistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaylistProvider {

    artist1: Artist;
    songs1: Array<Song>;
    songs2: Array<Song>;


    constructor(public http: HttpClient) {
        this.artist1 = new Artist("1", "The Weeknd", "https://i.scdn.co/image/a1bbafd8c21c14fd685a3d8efb0906db7c059a97");
        this.songs1 = [
            new Song("1", "Starboy", [this.artist1], "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1"),
            new Song("2", "I Feel It Coming I Feel It Coming I Feel It Coming", [this.artist1], "https://i.scdn.co/image/8cd9f71a64cd01adb3d7716f396d20408f422d1e"),
            new Song("3", "Curve", [this.artist1], "https://i.scdn.co/image/e874da622122a0a9b7205c876532bb2633700b35"),
            new Song("4", "Reminder", [this.artist1], "https://i.scdn.co/image/60f48e0d4b9031726b29309e5b4523f0e93a59a3")
        ];

        this.songs2 = [
            new Song("1", "Starboy", [this.artist1], "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1"),
            new Song("2", "I Feel It Coming I Feel It Coming I Feel It Coming", [this.artist1], "https://i.scdn.co/image/8cd9f71a64cd01adb3d7716f396d20408f422d1e"),
            new Song("4", "Reminder", [this.artist1], "https://i.scdn.co/image/60f48e0d4b9031726b29309e5b4523f0e93a59a3")
        ]
    }

    getUserPlaylists(): Observable<Array<Playlist>> {
        return of([new Playlist("Playlist1", this.songs1), new Playlist("Playlist2", this.songs2)]);
    }

    generatePlaylist(artists: Array<string>): Observable<Array<Song>> {
        console.log("Generate playlist for artists:" + artists);
        console.log(this.songs1);
        return of(this.songs1);
    }

    generateSmartPlaylist(): Observable<Array<Song>> {
        return of([]);
    }

    removeSongFromPlaylist(song: Song, playlist: Playlist) {

    }

}
