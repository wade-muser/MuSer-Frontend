import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Song} from "../../models/Song";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    genres: Array<{ name: string }>;
    charts: Array<{ name: string }>;
    popularSongs: Array<Song>;

    constructor(public navCtrl: NavController) {
        this.genres = [];
        this.genres.push({name: "Pop"});
        this.genres.push({name: "R'N'B"});
        this.genres.push({name: "Party"});
        this.genres.push({name: "Rock"});
        this.genres.push({name: "Rap"});

        this.charts = []
        this.charts.push({name: "Popular"})
        this.charts.push({name: "New Release"})

        this.popularSongs = [];
        this.popularSongs.push(new Song(
            "1",
            "PostMalone Rockstar",
            "https://i1.sndcdn.com/artworks-oJdxXcIn59Yo-0-t500x500.jpg"));
        this.popularSongs.push(new Song(
            "2",
            "Dua Lipa New Rules",
            "https://www.iomoio.com/covers/src/19/436719.jpg"
        ));
    }

    goToGenrePage(genre) {
        console.log(`Navigate to genre:${genre}`);
    }

    goToChartPage(chart) {
        console.log(`Navigate to chart:${chart}`);
    }

    goToMadeForYou() {
        console.log("Go to made for you")
    }

    goToSongPage(popularSong) {
        console.log(popularSong);
    }

}
