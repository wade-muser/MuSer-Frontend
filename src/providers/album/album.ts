import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Song} from "../../models/song";
import {Artist} from "../../models/artist";

/*
  Generated class for the AlbumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlbumProvider {

    constructor(public http: HttpClient) {
        console.log('Hello AlbumProvider Provider');
    }

    getSongs(id: string): Observable<Array<Song>> {

        const artist1 = new Artist("1", "The Weeknd", "https://i.scdn.co/image/a1bbafd8c21c14fd685a3d8efb0906db7c059a97");


        const albumSongs = [
            new Song("1", "Starboy", [artist1], "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1"),
            new Song("2", "I Feel It Coming I Feel It Coming I Feel It Coming", [artist1], "https://i.scdn.co/image/8cd9f71a64cd01adb3d7716f396d20408f422d1e"),
            new Song("3", "Curve", [artist1], "https://i.scdn.co/image/e874da622122a0a9b7205c876532bb2633700b35"),
            new Song("4", "Reminder", [artist1], "https://i.scdn.co/image/60f48e0d4b9031726b29309e5b4523f0e93a59a3")
        ];

        return of(albumSongs);
    }


}
