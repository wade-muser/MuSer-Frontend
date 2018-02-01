import {Component} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {Song} from "../../models/song";
import {Artist} from "../../models/artist";
import {SongPage} from "../song/song";
import {GenrePage} from "../genre/genre";
import {Genre} from "../../models/genre";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    genres: Array<{ name: string }>;
    charts: Array<{ name: string }>;
    popularSongs: Array<Song>;

    constructor(public navCtrl: NavController, public menuController: MenuController) {

        this.menuController.swipeEnable(true);


        this.genres = [];
        this.genres.push(new Genre("http://example.com/muser#Hip_hop_music", "Hip hop"));
        this.genres.push(new Genre("http://example.com/muser#Heavy_metal_music", "Heavy metal"));
        this.genres.push(new Genre("http://example.com/muser#Rock_and_roll", "Rock and roll"));
        this.genres.push(new Genre("http://example.com/muser#Pop_music", "Pop"));
        this.genres.push(new Genre("http://example.com/muser#Disco", "Disco"));

        this.charts = []
        this.charts.push({name: "Popular"})
        this.charts.push({name: "New Release"})

        const artist1 = new Artist("1", "The Weeknd", "https://i.scdn.co/image/a1bbafd8c21c14fd685a3d8efb0906db7c059a97");


        this.popularSongs = [];
        this.popularSongs.push(new Song(
            "1",
            "PostMalone Rockstar",
            [artist1],
            "https://i1.sndcdn.com/artworks-oJdxXcIn59Yo-0-t500x500.jpg"
        ));
        this.popularSongs.push(new Song(
            "2",
            "Dua Lipa New Rules",
            [artist1],
            "https://www.iomoio.com/covers/src/19/436719.jpg"
        ))
        ;
    }

    goToGenrePage(genre) {
        console.log(`Navigate to genre:${genre}`);
        this.navCtrl.push(GenrePage, {"data": genre});
    }

    goToChartPage(chart) {
        console.log(`Navigate to chart:${chart}`);
    }

    goToMadeForYou() {
        console.log("Go to made for you")
    }

    goToSongPage(popularSong) {
        console.log("Go to song:", popularSong);
        this.navCtrl.push(SongPage, {"data": popularSong});
    }

}
