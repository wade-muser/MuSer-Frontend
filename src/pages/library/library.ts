import {Component, ViewChild} from '@angular/core';
import {AlertController, LoadingController, NavController, Slides, ToastController} from 'ionic-angular';
import {PlaylistProvider} from "../../providers/playlist/playlist";
import {Playlist} from "../../models/playlist";
import {Song} from "../../models/song";
import {SongPage} from "../song/song";
import {Artist} from "../../models/artist";
import {DiscoverProvider} from "../../providers/discover/discover";

@Component({
    selector: 'page-library',
    templateUrl: 'library.html'
})
export class LibraryPage {

    @ViewChild('mySlider')

    slider: Slides;
    currentSegmentPage: string;
    pages: Array<string>;
    pagesToPagesIndex: Map<string, number>;
    userPlaylists: Array<Playlist>;

    // Generate Playlists using tags
    searchArtistValue: string;
    autocompleteArtists: Array<Artist>;
    showAutocompleteList: boolean;
    searchedArtistTags: Array<Artist>;
    generatedPlaylistSongs: Array<Song>;

    // Generate Playlists without tags
    noTagsGeneratedPlaylistSongs: Array<Song>;


    constructor(public navCtrl: NavController,
                public playlistService: PlaylistProvider,
                public discoverService: DiscoverProvider,
                public toastController: ToastController,
                public loadingController: LoadingController,
                public alertController: AlertController) {

        this.initializeSegmentComponent();
        this.retrieveUserPlaylists();
        this.generateSmartPlaylistWithoutTags();
        // for (let pageIndex = 0; pageIndex < this.pages.length; pageIndex++) {
        //     this.pagesToPagesIndex.set(this.pages[pageIndex], pageIndex);
        // }
        this.currentSegmentPage = this.pages[0];

        this.searchArtistValue = "";
        this.searchedArtistTags = [];
        this.autocompleteArtists = [];
        this.generatedPlaylistSongs = [];
        this.showAutocompleteList = false;

    }

    initializeSegmentComponent() {
        this.pages = ["Playlists Page", "Generate Playlists", "Smart Playlists"];
        this.pagesToPagesIndex = new Map<string, number>();
        this.pages.forEach((page, pageIndex) => {
            this.pagesToPagesIndex.set(page, pageIndex);
        });
        console.log(this.pagesToPagesIndex);
        console.log(this.pages)
    }

    retrieveUserPlaylists() {

        let loading = this.showLoading();

        this.playlistService.getPlaylists()
            .subscribe(data => {
                console.log("Playlists");
                const playlists = data.body['results'];
                console.log(playlists);

                let size = Object.keys(playlists).length;
                this.userPlaylists = [];
                Object.keys(playlists).forEach(key => {
                    console.log(key);
                    // Get songs for each playlist
                    this.playlistService.getPlaylistSongs(key)
                        .subscribe(response => {
                            const playlistSongs = response.body['results'];

                            const songs = [];
                            Object.keys(playlistSongs).forEach(songKey => {
                                const songId = playlistSongs[songKey].entity[0];
                                const songName = playlistSongs[songKey].name[0];
                                const songImageURL = playlistSongs[songKey].imageURL[0];
                                const performer = playlistSongs[songKey].performer[0];
                                const performerName = playlistSongs[songKey].performerName[0];
                                const performerImageURL = playlistSongs[songKey].performerImageURL[0];

                                const artist = new Artist(performer, performerName, performerImageURL);
                                const song = new Song(songId, songName, [artist], songImageURL);

                                songs.push(song);
                            })

                            this.userPlaylists.push(
                                new Playlist(playlists[key].entity[0], playlists[key].name[0], songs));

                            size--;
                            if (size == 0) {
                                loading.dismiss();
                                console.log("Lambda Playlists");
                                console.log(this.userPlaylists)
                            }
                        }, err => {
                            console.log(err);
                            size--;
                            loading.dismiss()
                            this.showAlertDialog("Ups...", "Some error occurred");
                        })
                })
            }, err => {
                console.log(err);
            });
    }

    onSegmentChanged(segmentButton) {
        console.log("Segment changed to", segmentButton.value);
        this.currentSegmentPage = segmentButton.value;
    }

    //#region Gesture Event

    // swipeEvent(event: Gesture) {
    //     console.log(event.direction);
    //     const currentPageIndex = this.pagesToPagesIndex.get(this.currentSegmentPage);
    //     if (event.direction == SwipeGestures.LEFT) {
    //         console.log("Left Swipe");
    //         this.setSegmentPage(currentPageIndex + 1);
    //     } else if (event.direction == SwipeGestures.RIGHT) {
    //         console.log("Right Swipe");
    //         this.setSegmentPage(currentPageIndex - 1);
    //     }
    // }
    //
    // setSegmentPage(pageIndex: number) {
    //     if (pageIndex < 0 || pageIndex >= this.pages.length) {
    //         return;
    //     }
    //     this.currentSegmentPage = this.pages[pageIndex];
    // }

    //#endregion

    goToSongPage(song: Song) {
        this.navCtrl.push(SongPage, {data: song});
    }

    deleteSongFromPlaylist(song: Song, songIndex: number, playlist: Playlist, playlistIndex: number) {

        // Remove song/playlist from UI
        playlist.songs.splice(songIndex, 1);
        if (playlist.songs.length === 0) {
            this.userPlaylists.splice(playlistIndex, 1);
        }

        let toast = this.toastController.create({
            message: "Song deleted",
            position: "bottom",
            duration: 3000,
            showCloseButton: true,
            closeButtonText: "Undo",
        });
        toast.onDidDismiss((data, role) => {
            if (role === "close") {
                // Put the song/playlist back into the UI
                console.log("Undo");
                if (playlist.songs.length === 0) {
                    this.userPlaylists.splice(playlistIndex, 0, playlist);
                }
                playlist.songs.splice(songIndex, 0, song);
            } else {
                console.log("Delete song");
                this.playlistService
                    .deletePlaylistSong(playlist.id, song.id)
                    .subscribe(data => {
                        console.log("Deleted Song");

                        if (playlist.songs.length === 0) {
                            this.playlistService
                                .deletePlaylist(playlist.id)
                                .subscribe(data => {
                                    console.log("Deleted playlist");
                                }, err => {
                                    console.log(err);
                                });
                        }

                    }, err => {
                        console.log(err);
                    });


            }
        });
        toast.present();
    }

    searchArtists(event: Event) {
        const loading = this.showLoading();

        this.discoverService
            .getArtists(this.searchArtistValue)
            .subscribe(data => {
                    console.log(data);
                    const artists = data.body['results'];
                    Object.keys(artists).forEach(key => {
                        const artistId = artists[key].entity[0];
                        const artistName = artists[key].name[0];
                        const artistImageURL = artists[key].imageURL[0];
                        this.autocompleteArtists.push(new Artist(artistId, artistName, artistImageURL));
                    });
                    loading.dismiss();
                    this.showAutocompleteList = true;

                }, err => {
                    console.log(err);
                    loading.dismiss();
                    this.showAlertDialog("Ups...", "Some error occurred");
                }
            )
    }

    selectArtistAutocomplete(artist: Artist) {
        console.log("Add:" + artist.name);
        if (this.searchedArtistTags.indexOf(artist) >= 0) {
            this.showAlertDialog("Generate Playlist", "Artist was already selected");
            console.log("This artist was already selected");
            return;
        }

        this.searchedArtistTags.push(artist);
        this.showAutocompleteList = false;
        this.autocompleteArtists = [];
        this.generateSmartPlaylist();

    }

    generateSmartPlaylist() {
        const loading = this.showLoading();
        this.playlistService
            .generatePlaylist(this.searchedArtistTags)
            .subscribe(data => {
                const generatedSongs = data.body['results'];
                console.log(generatedSongs);
                this.generatedPlaylistSongs = [];
                Object.keys(generatedSongs).forEach(songKey => {
                    console.log(generatedSongs[songKey]);
                    const songId = generatedSongs[songKey].entity[0];
                    const songName = generatedSongs[songKey].name[0];
                    const songImageURL = generatedSongs[songKey].imageURL[0];
                    const performer = generatedSongs[songKey].performer[0];
                    const performerName = generatedSongs[songKey].performerName[0];
                    const performerImageURL = generatedSongs[songKey].performerImageURL[0];

                    const artist = new Artist(performer, performerName, performerImageURL);
                    const song = new Song(songId, songName, [artist], songImageURL);

                    this.generatedPlaylistSongs.push(song);
                });
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
                this.showAlertDialog("Ups...", "Some error occurred");
            });

        this.searchArtistValue = "";
    }

    generateSmartPlaylistWithoutTags() {
        this.noTagsGeneratedPlaylistSongs = [];
        const loading = this.showLoading();
        this.playlistService
            .generatePlaylist([])
            .subscribe(data => {
                const generatedSongs = data.body['results'];
                console.log(generatedSongs);
                this.generatedPlaylistSongs = [];
                Object.keys(generatedSongs).forEach(songKey => {
                    console.log(generatedSongs[songKey]);
                    const songId = generatedSongs[songKey].entity[0];
                    const songName = generatedSongs[songKey].name[0];
                    const songImageURL = generatedSongs[songKey].imageURL[0];
                    const performer = generatedSongs[songKey].performer[0];
                    const performerName = generatedSongs[songKey].performerName[0];
                    const performerImageURL = generatedSongs[songKey].performerImageURL[0];

                    const artist = new Artist(performer, performerName, performerImageURL);
                    const song = new Song(songId, songName, [artist], songImageURL);

                    this.noTagsGeneratedPlaylistSongs.push(song);
                });
                loading.dismiss();
                console.log("No tags");
                console.log(this.noTagsGeneratedPlaylistSongs);
            }, err => {
                console.log(err);
                loading.dismiss();
                this.showAlertDialog("Ups...", "Some error occurred");
            });

    }

    removeArtistTag(artist: Artist) {
        console.log(this.searchedArtistTags);
        const artistIndex = this.searchedArtistTags.indexOf(artist);
        if (artistIndex >= 0) {
            this.searchedArtistTags.splice(artistIndex, 1);
        }
        this.generatedPlaylistSongs.length = 0;

        if (this.searchedArtistTags.length === 0) {
            return;
        }

        //Regenerate the playlist
        this.generateSmartPlaylist();
    }

    showAlertDialog(title: string, message: string) {
        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: ['Ok']

        });
        alert.present();
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
