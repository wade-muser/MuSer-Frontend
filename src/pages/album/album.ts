import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Album} from "../../models/Album";
import {AlbumProvider} from "../../providers/album/album";
import {Song} from "../../models/Song";

/**
 * Generated class for the AlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-album',
    templateUrl: 'album.html',
})
export class AlbumPage {

    album: Album;
    songs: Array<Song>;


    NAV_PARAM_ALBUM_KEY = "data";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public albumService: AlbumProvider) {
        this.album = this.navParams.get(this.NAV_PARAM_ALBUM_KEY);

        this.albumService
            .getSongs(this.album.id)
            .subscribe(songs => {
                this.songs = songs;
            });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AlbumPage');
    }

    goToSongPage(song: Song): void {
        console.log("Go to song page", song);
    }

}
