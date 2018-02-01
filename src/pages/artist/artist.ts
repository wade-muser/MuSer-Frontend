import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Song} from "../../models/song";
import {Artist} from "../../models/artist";
import {Album} from "../../models/album";
import {Event} from "../../models/event";
import {ArtistProvider} from "../../providers/artist/artist";
import {SongPage} from "../song/song";
import {AlbumPage} from "../album/album";
import {EventsProvider} from "../../providers/events/events";

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
    recommendedArtists: Array<Artist>;
    events: Array<Event>;

    recommendedSongsTypes = {
        "album": "album",
        "genre": "genre",
    }
    NAV_PARAM_ARTIST_KEY = "data";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingController: LoadingController,
                public artistService: ArtistProvider,
                public eventsService: EventsProvider) {

        let loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: 'transparent',
        });
        loading.present();

        this.artist = navParams.get(this.NAV_PARAM_ARTIST_KEY);
        this.artistService
            .getPopularSongs(this.artist.id)
            .subscribe(data => {
                this.popularSongs = [];
                const songs = data.body['results'];
                console.log(songs);
                Object.keys(songs).forEach(key => {
                    const songId = data.body['results'][key].entity[0];
                    const songName = data.body['results'][key].name[0];
                    const songImageURL = data.body['results'][key].imageURL[0];

                    this.popularSongs.push(new Song(songId, songName, [this.artist], songImageURL));
                });
                loading.dismiss();
            });

        this.artistService
            .getRelatedArtists(this.artist.id)
            .subscribe(data => {
                console.log("FEATURES:" + data);
                const artists = data.body['results'];
                this.relatedArtists = [];
                Object.keys(data.body['results']).forEach(key => {
                    console.log("[FEATURE]" + key);
                    const artistId = artists[key].entity[0];
                    const artistName = artists[key].name[0];
                    const artistImageURL = artists[key].imageURL[0];

                    this.relatedArtists.push(
                        new Artist(
                            artistId, artistName, artistImageURL
                        ));
                });

            })

        this.artistService
            .getPopularAlbums(this.artist.id)
            .subscribe(data => {
                this.popularAlbums = [];
                const albums = data.body['results'];
                Object.keys(albums).forEach(key => {
                    const songId = data.body['results'][key].entity[0];
                    const songName = data.body['results'][key].name[0];
                    const songImageURL = data.body['results'][key].imageURL[0];

                    this.popularAlbums.push(new Album(
                        songId, songName, songImageURL, this.artist
                    ));
                })
            });

        this.recommendedArtists = [];

        this.artistService
            .getRecommendedArtists(this.artist.id, this.recommendedSongsTypes.album)
            .subscribe(data => {
                const songs = data.body['results'];
                console.log(songs);
                Object.keys(songs).forEach(key => {
                    const artistId = songs[key].entity[0];
                    const artistName = songs[key].name[0];
                    const artistImageURL = songs[key].imageURL[0];
                    const recommendedArtist = new Artist(artistId, artistName, artistImageURL);

                    this.recommendedArtists.push(recommendedArtist);
                });
                console.log("RECOMMENDED",this.recommendedArtists)
            });

        this.artistService
            .getRecommendedArtists(this.artist.id, this.recommendedSongsTypes.genre)
            .subscribe(data => {
                const songs = data.body['results'];
                console.log(songs);
                Object.keys(songs).forEach(key => {
                    const artistId = songs[key].entity[0];
                    const artistName = songs[key].name[0];
                    const artistImageURL = songs[key].imageURL[0];
                    const recommendedArtist = new Artist(artistId, artistName, artistImageURL);

                    this.recommendedArtists.push(recommendedArtist);
                    console.log("RECOMMENDED",this.recommendedArtists)
                });
            });

        this.eventsService
            .getEvents(this.artist.id)
            .subscribe(data => {
                this.events = [];
                const events = data.body["results"];
                Object.keys(events).forEach(key => {

                    console.log(events[key]);
                    const id = events[key].entity[0];
                    const title = events[key].eventName[0];
                    const imageUrl = "http://images.sk-static.com/images/media/profile_images/artists/249314/huge_avatar";
                    const startDate = new Date(events[key]["eventStartDate"][0]);
                    const endDate = events[key]["eventEndDate"] ? events[key]["eventEndDate"][0] : startDate;
                    const city = events[key]["eventCity"][0];
                    if (startDate < new Date()) {
                        return;
                    }

                    const event = new Event(id, title, imageUrl, startDate, new Date(endDate), city);
                    this.events.push(event);
                })
                console.log(events);
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
