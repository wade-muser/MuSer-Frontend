import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Song} from "../../models/Song";
import {Artist} from "../../models/Artist";
import {Album} from "../../models/Album";
import {Event} from "../../models/event";

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

    NAV_PARAM_ARTIST_KEY = "artist";


    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.artist = navParams.get(this.NAV_PARAM_ARTIST_KEY);
        this.popularSongs = [
            new Song("1", "Starboy", "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1"),
            new Song("2", "I Feel It Coming I Feel It Coming I Feel It Coming", "https://i.scdn.co/image/8cd9f71a64cd01adb3d7716f396d20408f422d1e"),
            new Song("3", "Curve", "https://i.scdn.co/image/e874da622122a0a9b7205c876532bb2633700b35"),
            new Song("4", "Reminder", "https://i.scdn.co/image/60f48e0d4b9031726b29309e5b4523f0e93a59a3")
        ];
        this.relatedArtists = [
            new Artist("1", "Drake", "https://i.scdn.co/image/cb080366dc8af1fe4dc90c4b9959794794884c66"),
            new Artist("2", "Frank Ocean", "https://i.scdn.co/image/7db34c8aace6feb91f38601bb75e6b3301b4657a")
        ];
        this.popularAlbums = [
            new Album("1", "Starboy", "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1"),
            new Album("1", "Beauty Behind The Madness", "https://i.scdn.co/image/34beaad5faf39b2deaec8da702b37ba0805bb35c")
        ];
        this.events = [
            new Event("", "Never the Bride ", "http://images.sk-static.com/images/media/profile_images/artists/249314/huge_avatar", new Date(), new Date(), "Auckland, Australia"),
        ];

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArtistPage');
    }

    goToSongPage(popularSong: Song): void {
        console.log("Go to song:", popularSong);
    }

    goToArtistPage(artist: Artist): void {
        console.log("Go to artist song:", artist);
    }

    goToAlbumPage(album: Album) {
        console.log("Go to album:", album);
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
