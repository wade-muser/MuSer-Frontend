import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Song} from "../../models/song";
import {Artist} from "../../models/artist";
import {Album} from "../../models/album";
import {Event} from "../../models/event";
import {ArtistProvider} from "../../providers/artist/artist";
import {SongPage} from "../song/song";
import {AlbumPage} from "../album/album";

/**
 * Generated class for the ArtistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-artist',
    templateUrl: 'artist.html',
})
export class ArtistPage {

    artist: Artist;
    popularSongs: Array<Song>;
    relatedArtists: Array<Artist>;
    popularAlbums: Array<Album>;
    events: Array<Event>;

    NAV_PARAM_ARTIST_KEY = "data";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public artistService: ArtistProvider) {

        this.artist = navParams.get(this.NAV_PARAM_ARTIST_KEY);
        this.artistService
            .getPopularSongs(this.artist.id)
            .subscribe(songs => {
                this.popularSongs = songs;
            });

        this.artistService
            .getRelatedArtists(this.artist.id)
            .subscribe(artists => {
                this.relatedArtists = artists;
            })

        this.artistService
            .getPopularAlbums(this.artist.id)
            .subscribe(albums => {
                this.popularAlbums = albums;
            });

        this.artistService
            .getEvents(this.artist.id)
            .subscribe(events => {
                this.events = events
            });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArtistPage');
    }

    goToSongPage(popularSong: Song): void {
        console.log("Go to song:", popularSong);
        this.navCtrl.push(SongPage, {data: popularSong});
    }

    goToArtistPage(artist: Artist): void {
        console.log("Go to autocompleteArtists song:", artist);
        this.navCtrl.push(ArtistPage, {data: artist});
    }

    goToAlbumPage(album: Album) {
        console.log("Go to album:", album);
        this.navCtrl.push(AlbumPage, {data: album});
    }

    goToEventPage(event: Event) {
        console.log("Go to event:", event);
    }

    formatEventDate(date: Date): string {
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        };
        const locale = "en-US";
        return date.toLocaleTimeString(locale, options);
    }

}
