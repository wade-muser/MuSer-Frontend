import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Artist} from "../../models/Artist";

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
    searchValue;
    filterIsSelected = false;
    selectedFilter: string;

    searchResults: Array<Artist>;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertContoller: AlertController) {
        this.selectedFilter = "";
        this.searchResults = [];
        this.searchResults.push(new Artist(
            "The Weeknd",
            "https://i1.sndcdn.com/artworks-oJdxXcIn59Yo-0-t500x500.jpg"
        ));
        this.searchResults.push(new Artist(
            "Dua Lipa",
            "https://www.iomoio.com/covers/src/19/436719.jpg"
        ));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DiscoverPage');
    }

    showSelectSearchFilterDialog() {
        let alert = this.alertContoller.create();
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
    }

}
