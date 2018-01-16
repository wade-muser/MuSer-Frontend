import {Component, ViewChild} from '@angular/core';
import {AlertController, Gesture, LoadingController, NavController, Slides, ToastController} from 'ionic-angular';
import {SwipeGestures} from "../../utils/gestures";
import {PlaylistProvider} from "../../providers/playlist/playlist";
import {Playlist} from "../../models/playlist";
import {Song} from "../../models/song";
import {SongPage} from "../song/song";
import {Artist} from "../../models/artist";

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
    searchedArtistTags: Array<string>;
    generatedPlaylistSongs: Array<Song>;


    constructor(public navCtrl: NavController,
                public playlistService: PlaylistProvider,
                public toastController: ToastController,
                public loadingController: LoadingController,
                public alertController: AlertController) {

        this.initializeSegmentComponent();
        this.retrieveUserPlaylists();
        // for (let pageIndex = 0; pageIndex < this.pages.length; pageIndex++) {
        //     this.pagesToPagesIndex.set(this.pages[pageIndex], pageIndex);
        // }
        this.currentSegmentPage = this.pages[0];

        this.searchArtistValue = "";
        this.searchedArtistTags = [];
        this.autocompleteArtists = [];
        this.generatedPlaylistSongs = [];
        this.autocompleteArtists.push(new Artist("1", "Dua Lipa", ""));
        this.autocompleteArtists.push(new Artist("2", "Eminem", ""));
        this.autocompleteArtists.push(new Artist("3", "The Weeknd", ""));
        this.autocompleteArtists.push(new Artist("4", "Post Malone", ""));
        this.autocompleteArtists.push(new Artist("5", "Smiley", ""));
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
        this.playlistService
            .getUserPlaylists()
            .subscribe(
                playlists => {
                    this.userPlaylists = playlists;
                },
                error => {
                    console.log(error);
                });
    }

    onSegmentChanged(segmentButton) {
        console.log("Segment changed to", segmentButton.value);
        this.currentSegmentPage = segmentButton.value;
    }

    //#region code

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
                this.playlistService.removeSongFromPlaylist(song, playlist);
            }
        });
        toast.present();
    }

    searchArtists(event: Event) {
        const loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: "transparent",
            duration: 1500
        });
        loading.present();

        setTimeout(() => {
            this.showAutocompleteList = true;
        }, 1500);
        console.log(event);
    }

    selectArtistAutocomplete(artist: Artist) {
        console.log("Add:" + artist.name);
        if (this.searchedArtistTags.indexOf(artist.name) >= 0) {
            this.showAlertDialog("Generate Playlist", "Artist was already selected");
            console.log("This artist was already selected");
            return;
        }

        this.searchedArtistTags.push(artist.name);
        this.showAutocompleteList = false;

        const loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: "transparent",
            duration: 1500
        });
        loading.present();

        this.playlistService
            .generatePlaylist(this.searchedArtistTags)
            .subscribe((songs: Array<Song>) => {
                console.log(songs);
                this.generatedPlaylistSongs = songs;
            });

        this.searchArtistValue = "";
    }

    removeArtistTag(artist: string) {
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
        this.playlistService
            .generatePlaylist(this.searchedArtistTags)
            .subscribe((songs: Array<Song>) => {
                this.generatedPlaylistSongs = songs;
            });
    }

    showAlertDialog(title: string, message: string) {
        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: ['Ok']

        });
        alert.present();
    }


}
