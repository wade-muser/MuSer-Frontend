import {Component, ViewChild} from '@angular/core';
import {Gesture, NavController, Slides, ToastController} from 'ionic-angular';
import {SwipeGestures} from "../../utils/gestures";
import {PlaylistProvider} from "../../providers/playlist/playlist";
import {Playlist} from "../../models/playlist";
import {Song} from "../../models/song";
import {SongPage} from "../song/song";

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
    userPlaylists: Array<Playlist>

    constructor(public navCtrl: NavController,
                public playlistService: PlaylistProvider,
                public toastController: ToastController) {

        this.initializeSegmentComponent()
        this.retrieveUserPlaylists();
        // for (let pageIndex = 0; pageIndex < this.pages.length; pageIndex++) {
        //     this.pagesToPagesIndex.set(this.pages[pageIndex], pageIndex);
        // }
        this.currentSegmentPage = this.pages[0];
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

    swipeEvent(event: Gesture) {
        console.log(event.direction);
        const currentPageIndex = this.pagesToPagesIndex.get(this.currentSegmentPage);
        if (event.direction == SwipeGestures.LEFT) {
            console.log("Left Swipe");
            this.setSegmentPage(currentPageIndex + 1);
        } else if (event.direction == SwipeGestures.RIGHT) {
            console.log("Right Swipe");
            this.setSegmentPage(currentPageIndex - 1);
        }
    }

    setSegmentPage(pageIndex: number) {
        if (pageIndex < 0 || pageIndex >= this.pages.length) {
            return;
        }
        this.currentSegmentPage = this.pages[pageIndex];
    }

    goToSongPage(song: Song) {
        this.navCtrl.push(SongPage, {data: song});
    }

    deleteSong(song: Song, songIndex: number, playlist: Playlist, playlistIndex: number) {
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


}
