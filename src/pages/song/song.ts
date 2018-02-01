import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Song} from "../../models/song"
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser";
import {SongsProvider} from "../../providers/songs/songs";
import {Artist} from "../../models/artist";
import {PlaylistProvider} from "../../providers/playlist/playlist";


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

    recommendedSongsSameArtist: Array<Song>;
    recommendedSongsSameGenre: Array<Song>;

    recommendedSongsType = {
        "artist": "artist",
        "genre": "genre",
    };

    NAV_PARAM_SONG_KEY = "data";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingController: LoadingController,
                private alertController: AlertController,
                private inAppBrowser: InAppBrowser,
                private songService: SongsProvider,
                private playlistService: PlaylistProvider) {

        this.song = this.navParams.get(this.NAV_PARAM_SONG_KEY);

        let loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: 'transparent',
            duration: 7500
        });
        loading.present();

        this.songService
            .getSong(this.song.id)
            .subscribe(data => {
                this.spotifyUrl = data.body['results'][this.song.id].idSpotify[0];
                loading.dismiss();
            }, err => {
                console.log(err);
            });

        this.recommendedSongsSameArtist = [];

        this.songService
            .getRecommendedSongs(this.song.id, this.recommendedSongsType.artist)
            .subscribe(data => {
                const songs = data.body['results'];
                console.log(songs);

                Object.keys(songs).forEach(key => {

                    const songId = songs[key].entity[0];
                    const songName = songs[key].name[0];
                    const songImageURL = songs[key].imageURL[0];
                    const performerId = songs[key].performer[0];
                    const performerName = songs[key].performerName[0];
                    const performerImageURL = songs[key].performerImageURL[0];
                    const recommendedSongArtist = new Artist(performerId, performerName, performerImageURL);
                    const recommendedSong = new Song(songId, songName, [recommendedSongArtist], songImageURL);

                    this.recommendedSongsSameArtist.push(recommendedSong);
                });
            }, err => {
                console.log(err);
            })

        this.recommendedSongsSameGenre = [];

        this.songService
            .getRecommendedSongs(this.song.id, this.recommendedSongsType.genre)
            .subscribe(data => {
                const songs = data.body['results'];
                console.log(songs);

                Object.keys(songs).forEach(key => {
                    console.log(songs[key]);

                    const songId = songs[key].entity[0];
                    const songName = songs[key].name[0];
                    const songImageURL = songs[key].imageURL[0];
                    const performerId = songs[key].performer[0];
                    const performerName = songs[key].performerName[0];
                    const performerImageURL = songs[key].performerImageURL[0];
                    const recommendedSongArtist = new Artist(performerId, performerName, performerImageURL);
                    const recommendedSong = new Song(songId, songName, [recommendedSongArtist], songImageURL);

                    this.recommendedSongsSameGenre.push(recommendedSong);
                });
            }, err => {
                console.log(err);
            });
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
        let loading = this.showLoading();

        this.playlistService
            .getPlaylists()
            .subscribe(data => {
                const playlists = data.body['results'];
                console.log(playlists);
                if (Object.keys(playlists).length === 0) {
                    this.showCreatePlaylistDialog();
                } else {
                    console.log("Show select option");
                    this.showSelectPlaylistOption(playlists);
                }
                loading.dismissAll();
            }, err => {
                console.log(err);
                loading.dismissAll();
            })
    }

    goToSongPage(song: Song) {
        console.log("Go to page", song);
        this.navCtrl.push(SongPage, {"data": song});
    }

    showAlertDialog(title: string, message: string) {
        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: ['Ok']

        });
        alert.present();
    }

    showCreatePlaylistDialog() {
        let alert = this.alertController.create({
            title: "Playlist Create",
            message: "No playlists found. Enter the name for a new playlist",
            inputs: [
                {
                    name: 'name',
                    placeholder: "Playlist Name",
                },
            ],
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel",
                },
                {
                    text: "Create",
                    handler: data => {
                        let loading = this.loadingController.create({
                            content: '',
                            spinner: 'dots',
                            cssClass: 'transparent',
                            duration: 7500
                        });
                        loading.present();

                        const playlistName = data.name;
                        this.playlistService
                            .createPlaylist(playlistName)
                            .subscribe(data => {
                                loading.dismissAll();
                                console.log(data);
                            }, err => {
                                loading.dismissAll();
                                this.showAlertDialog("Ups...", "Some error occurred");
                            })
                    }
                }
            ]
        });
        alert.present();
    }

    insertSongToPlaylist(playlistEntityId, callback) {
        console.log(`Insert ${this.song.id} to playlist ${playlistEntityId}`);
        let loading = this.showLoading();

        this.playlistService
            .insertSongToPlaylist(playlistEntityId, this.song.id)
            .subscribe(data => {
                    loading.dismissAll()
                    console.log(data);
                    callback(null);
                }, err => {
                    loading.dismissAll();
                    callback(err);
                }
            )
    }


    showSelectPlaylistOption(playlists) {
        let alert = this.alertController.create();
        alert.setTitle("Select Playlist");
        Object.keys(playlists).forEach(key => {
            const playlist = playlists[key];
            alert.addInput({
                type: "radio",
                label: playlist.name,
                value: playlist,
            });
        })

        alert.addButton({
            text: "Ok",
            handler: (data: any) => {
                if (data === undefined) {
                    return;
                }
                console.log("Selected Playlist:" + JSON.stringify(data));
                this.insertSongToPlaylist(data.entity[0], err => {
                    if (err) {
                        console.log(err);
                        this.showAlertDialog("Ups...", "Some error occurred");
                        return;
                    }
                    console.log("Song inserted");
                    console.log(data);
                })
            }
        })
        alert.addButton({
            text: "New",
            handler: (data: any) => {
                this.showCreatePlaylistDialog();
            }
        })
        alert.present()
    }

    showLoading() {
        let loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: 'transparent',
        });
        loading.present();
        return loading;
    }

}
