import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Song} from "../../models/song"
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";


/**
 * Generated class for the SongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-song',
    templateUrl: 'song.html',
})
export class SongPage {

    song: Song;
    youtubeUrl = "https://www.youtube.com/watch?v=34Na4j8AVgA";
    spotifyUrl = "https://open.spotify.com/track/5aAx2yezTd8zXrkmtKl66Z";

    NAV_PARAM_SONG_KEY = "data";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private inAppBrowser: InAppBrowser) {

        this.song = this.navParams.get(this.NAV_PARAM_SONG_KEY);
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad SongPage');
    }

    listenOnSpotify() {
        console.log("Listen on spotify");
        let browser = this.inAppBrowser.create(this.spotifyUrl, "_system", {location: 'no'});
        browser.show();
    }

    watchOnYoutube() {
        console.log("Watch on youtube");
        let browser = this.inAppBrowser.create(this.youtubeUrl, "_system", {location: 'no'});
        browser.show();
    }

    showPlaylistsOptions() {
        console.log("Show playlist to choose from");
    }

}
