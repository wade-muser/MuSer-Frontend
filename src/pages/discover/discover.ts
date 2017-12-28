import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../models/Artist";
import {ArtistPage} from "../artist/artist";
import {AlbumPage} from "../album/album";
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {Song} from "../../models/Song";
import {SongPage} from "../song/song";
import {Album} from "../../models/Album";

/**
 * Generated class for the DiscoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-discover',
    templateUrl: 'discover.html',
})
export class DiscoverPage {
    searchResults: Array<any>;

    searchValue;
    filterIsSelected = false;
    selectedFilter: string;
    filterToComponentPage: Map<string, Page>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertController: AlertController) {

        this.selectedFilter = "";

        this.searchResults = [
            new Artist(
                "",
                "The Weeknd",
                "https://i1.sndcdn.com/artworks-oJdxXcIn59Yo-0-t500x500.jpg"
            ),
            new Artist(
                "",
                "Dua Lipa",
                "https://www.iomoio.com/covers/src/19/436719.jpg"
            )

        ];
        this.searchResults.push(new Album("1", "Starboy", "https://i.scdn.co/image/818cf2dcae465de2c48c791829b1ca03606989a1", this.searchResults[0]))

        this.filterToComponentPage = new Map();
        this.filterToComponentPage.set("Artist", ArtistPage);
        this.filterToComponentPage.set("Album", AlbumPage);
        this.filterToComponentPage.set("Track", SongPage);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DiscoverPage');
    }

    showSelectSearchFilterDialog() {
        let alert = this.alertController.create();
        alert.setTitle("Search Filter");
        alert.addInput({
            type: "radio",
            label: "Artist",
            value: "Artist",
            checked: this.selectedFilter == "searchResults"
        });

        alert.addInput({
            type: "radio",
            label: "Album",
            value: "Album",
            checked: this.selectedFilter == "album"
        });

        alert.addInput({
            type: "radio",
            label: "Track",
            value: "Track",
            checked: this.selectedFilter == "track"
        });

        alert.addButton("Cancel");
        alert.addButton({
            text: "Ok",
            handler: (data: any) => {
                this.filterIsSelected = true;
                this.selectedFilter = data;

            }
        });
        alert.present();

    }

    removeFilter(filterChip: Element) {
        filterChip.remove();
        this.filterIsSelected = false;
        this.selectedFilter = "";
    }

    onInput(event) {
        console.log(this.searchValue)
    }

    onCancel(event) {
    }

    goToResultPage(searchResult: any) {
        console.log(searchResult);
        console.log("Navigate to ArtistPage")
        const pageToNavigate = this.filterToComponentPage.get(this.selectedFilter);
        if (pageToNavigate) { //To make sure that it navigates to a page
            this.navCtrl.push(pageToNavigate, {"data": searchResult});

        }
    }

}
