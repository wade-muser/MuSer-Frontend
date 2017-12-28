import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../models/Artist";
import {ArtistPage} from "../artist/artist";

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
    searchResults: Array<Artist>;

    searchValue;
    filterIsSelected = false;
    selectedFilter: string;

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

    goToResultPage(searchResult: Artist) {
        console.log(searchResult);
        console.log("Navigate to ArtistPage")
        this.navCtrl.push(ArtistPage, {"artist": searchResult});
    }

}
