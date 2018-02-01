import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {of} from "rxjs/observable/of";
import {Song} from "../../models/song";
import {Observable} from "rxjs/Observable";
import {Artist} from "../../models/artist";
import {Playlist} from "../../models/playlist";
import {APIUtils} from "../APIProvider";
import {Constants} from "../../utils/constants";

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

    PLAYLISTS_URL = `${Constants.API_URL}/playlists`;
    SMART_PLAYLIST_URL = `${Constants.API_URL}/playlists/smartgens`;
    private LOCALE_STORAGE_EMAIL = "email";


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

    generatePlaylist(artists: Array<Artist>): Observable<HttpResponse<Object>> {
        console.log("Generate playlist for artists:" + artists);

        const artistIds = [];
        artists.forEach(artist => {
            artistIds.push(APIUtils.extractId(artist.id));
        })
        const url = this.SMART_PLAYLIST_URL;
        const body = {
            emailCreator: localStorage.getItem(this.LOCALE_STORAGE_EMAIL),
            artists: artistIds,
        }
        console.log(url);

        return this.http.post(url, body, {
            observe: "response"
        });
    }

    generateSmartPlaylist(): Observable<Array<Song>> {
        return of([]);
    }

    createPlaylist(playlistName: string): Observable<HttpResponse<Object>> {
        const url = `${this.PLAYLISTS_URL}`;
        const email = localStorage.getItem(this.LOCALE_STORAGE_EMAIL);

        const body = {
            "name": playlistName,
            "emailCreator": email
        };

        return this.http.post(url, body, {
            observe: "response",
        });
    }

    getPlaylists(): Observable<HttpResponse<Object>> {
        const email = localStorage.getItem(this.LOCALE_STORAGE_EMAIL);
        const url = `${this.PLAYLISTS_URL}?emailCreator=${email}`;

        return this.http.get(url, {
            observe: "response"
        });
    }

    getPlaylistSongs(entityPlaylistId: string): Observable<HttpResponse<Object>> {
        const id = APIUtils.extractId(entityPlaylistId);
        const url = `${this.PLAYLISTS_URL}/${id}/songs`;

        return this.http.get(url, {
            observe: "response"
        });
    }

    insertSongToPlaylist(entityPlaylistId: string, songEntityId): Observable<HttpResponse<Object>> {
        const id = APIUtils.extractId(entityPlaylistId);
        const songId = APIUtils.extractId(songEntityId);
        const url = `${this.PLAYLISTS_URL}/${id}/songs`

        const body = {
            idSong: songId
        };

        return this.http.post(url, body, {
            observe: "response"
        });
    }

    deletePlaylistSong(entityPlaylistId: string, songEntityId: string): Observable<HttpResponse<Object>> {
        const id = APIUtils.extractId(entityPlaylistId);
        const songId = APIUtils.extractId(songEntityId);
        const url = `${this.PLAYLISTS_URL}/${id}/songs/${songId}`;
        console.log(url)

        return this.http.delete(url, {
            observe: "response"
        });

    }

    deletePlaylist(entityPlaylistId: string): Observable<HttpResponse<Object>> {
        const id = APIUtils.extractId(entityPlaylistId);
        const url = `${this.PLAYLISTS_URL}/${id}`;
        console.log(url);

        return this.http.delete(url, {
            observe: "response",
        });
    }

}
