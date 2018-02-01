import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Album} from "../../models/album";
import {AlbumProvider} from "../../providers/album/album";
import {Song} from "../../models/song";
import {SongsProvider} from "../../providers/songs/songs";
import {SongPage} from "../song/song";
import {Constants} from "../../utils/constants";
import {Artist} from "../../models/artist";

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
    recommendedAlbumsTypes = {
        "artist": "sameartist",
        "year_genre": "sameyearandgenre",
        "related_artists": "relatedartist",
    }
    recommendedAlbumsByArtist: Array<Album>;
    recommendedAlbumsByYearAndGenre: Array<Album>;
    recommendedAlbumsByRelatedArtists: Array<Album>;


    NAV_PARAM_ALBUM_KEY = "data";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingController: LoadingController,
                public albumService: AlbumProvider,
                public songsService: SongsProvider) {
        this.album = this.navParams.get(this.NAV_PARAM_ALBUM_KEY);

        let loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: 'transparent',
            // duration: 2500
        });
        loading.present();

        this.albumService
            .getAlbum(this.album.id)
            .subscribe(data => {
                this.songs = [];
                console.log(data.body["results"]);
                let size = Object.keys(data.body['results']).length;
                Object.keys(data.body["results"]).forEach(key => {
                    for (let song of data.body["results"][key].song) {
                        this.songsService
                            .getSong(song)
                            .subscribe(data => {
                                const songInfo = data.body['results'];
                                if (songInfo[song]) {
                                    const songId = songInfo[song].entity[0];
                                    const songName = songInfo[song].name[0];
                                    const songArtists = songInfo[song].performedBy;
                                    const songImageURL = songInfo[song].imageURL ? songInfo[song].imageURL[0] : Constants.ALBUM_IMAGE_ALT;
                                    this.songs.push(new Song(songId, songName, songArtists, songImageURL));

                                    size--;
                                    if (size == 0) {
                                        console.log("Dismiss");
                                        loading.dismiss();
                                    }
                                }
                            }, err => {
                                console.log(err);
                                size--;
                                if (size == 0) {
                                    console.log("Dismiss");
                                    loading.dismiss();
                                }
                            })
                    }
                });
            }, err => {
                console.log(err);
            });

        this.albumService
            .getRecommendedAlbums(this.album.id, this.recommendedAlbumsTypes.artist)
            .subscribe(data => {
                console.log(this.recommendedAlbumsTypes.artist);
                console.log(JSON.stringify(data.body['results']));

                this.recommendedAlbumsByArtist = [];
                Object.keys(data.body['results']).forEach(key => {
                    const albumInfo = data.body['results'][key];

                    const albumId = albumInfo.entity[0];
                    const albumName = albumInfo.name[0];
                    const albumImageURL = albumInfo.imageURL ? albumInfo.imageURL[0] : Constants.ALBUM_IMAGE_ALT;
                    const artistId = albumInfo.performer[0];
                    const artistName = albumInfo.performerName[0];
                    const artistImageURL = albumInfo.performerImageURL ? albumInfo.performerImageURL[0] : Constants.ARTIST_IMAGE_ALT;

                    const artist = new Artist(artistId, artistName, artistImageURL);
                    const album = new Album(albumId, albumName, albumImageURL, artist);

                    this.recommendedAlbumsByArtist.push(album);
                })
                console.log(this.recommendedAlbumsByArtist);


            }, err => {
                console.log(err);
            })

        this.albumService
            .getRecommendedAlbums(this.album.id, this.recommendedAlbumsTypes.year_genre)
            .subscribe(data => {
                console.log(this.recommendedAlbumsTypes.year_genre);
                console.log(JSON.stringify(data.body['results']));

                this.recommendedAlbumsByYearAndGenre = [];
                Object.keys(data.body['results']).forEach(key => {
                    const albumInfo = data.body['results'][key];

                    const albumId = albumInfo.entity[0];
                    const albumName = albumInfo.name[0];
                    const albumImageURL = albumInfo.imageURL ? albumInfo.imageURL[0] : Constants.ALBUM_IMAGE_ALT;
                    const artistId = albumInfo.performer[0];
                    const artistName = albumInfo.performerName[0];
                    const artistImageURL = albumInfo.performerImageURL ? albumInfo.performerImageURL[0] : Constants.ARTIST_IMAGE_ALT;

                    const artist = new Artist(artistId, artistName, artistImageURL);
                    const album = new Album(albumId, albumName, albumImageURL, artist);

                    this.recommendedAlbumsByYearAndGenre.push(album);
                });
            }, err => {
                console.log(err);
            })

        this.albumService
            .getRecommendedAlbums(this.album.id, this.recommendedAlbumsTypes.related_artists)
            .subscribe(data => {
                console.log(this.recommendedAlbumsTypes.related_artists);
                console.log(JSON.stringify(data.body['results']));

                this.recommendedAlbumsByRelatedArtists = [];
                Object.keys(data.body['results']).forEach(key => {
                    const albumInfo = data.body['results'][key];

                    const albumId = albumInfo.entity[0];
                    const albumName = albumInfo.name[0];
                    const albumImageURL = albumInfo.imageURL ? albumInfo.imageURL[0] : Constants.ALBUM_IMAGE_ALT;
                    const artistId = albumInfo.performer[0];
                    const artistName = albumInfo.performerName[0];
                    const artistImageURL = albumInfo.performerImageURL ? albumInfo.performerImageURL[0] : Constants.ARTIST_IMAGE_ALT;

                    const artist = new Artist(artistId, artistName, artistImageURL);
                    const album = new Album(albumId, albumName, albumImageURL, artist);

                    this.recommendedAlbumsByRelatedArtists.push(album);
                })
            }, err => {
                console.log(err);
            })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AlbumPage');
    }

    goToSongPage(song: Song): void {
        console.log("Go to song page", song);
        this.navCtrl.push(SongPage, {"data": song});
    }

    goToAlbumPage(album: Album): void {
        console.log("Go to album page", album);
        this.navCtrl.push(AlbumPage, {"data": album});
    }

}
