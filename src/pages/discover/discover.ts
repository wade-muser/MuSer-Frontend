import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ArtistPage} from "../artist/artist";
import {AlbumPage} from "../album/album";
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {SongPage} from "../song/song";
import {DiscoverProvider} from "../../providers/discover/discover";
import {Artist} from "../../models/artist";

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
    searchValue: "";
    filterIsSelected = false;
    selectedFilter: string;
    filterToComponentPage: Map<string, Page>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private alertController: AlertController,
                private discoverService: DiscoverProvider,
                private loadingController: LoadingController) {

        this.selectedFilter = "";
        this.initializeSearchFilters();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DiscoverPage');
    }

    initializeSearchFilters(): void {
        this.filterToComponentPage = new Map();
        this.filterToComponentPage.set("Artist", ArtistPage);
        this.filterToComponentPage.set("Album", AlbumPage);
        this.filterToComponentPage.set("Track", SongPage);
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
        this.searchResults.length = 0;
    }

    search(event: Event) {
        if (!this.filterIsSelected) {
            this.showAlertDialog("Filter Select", "A filter must be selected to perform the search");
            return;
        }

        let loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: 'transparent',
        });
        loading.present();

        this.discoverService
            .search(this.searchValue, this.selectedFilter)
            .subscribe(
                data => {
                    this.searchResults = [];
                    Object.keys(data.body["results"]).forEach(key => {
                        const searchResult = {
                            "id": key,
                            "name": data.body["results"][key].name[0],
                            "imageUrl": data.body["results"][key].imageURL[0]
                        };

                        switch (this.selectedFilter) {

                            case "Artist":
                                break;
                            case "Album":
                                const artistID = data.body["results"][key].performer[0];
                                const artistName = data.body["results"][key].performerName[0];
                                const artistImageURL = data.body["results"][key].performerImageURL[0]
                                searchResult["artist"] = new Artist(artistID, artistName, artistImageURL);
                                break;
                            case "Track":
                                searchResult["artists"] = [];
                                for (let i = 0; i < data.body["results"][key].performer.length; i++) {
                                    console.log(data.body["results"][key].performer[i]);
                                    console.log(data.body["results"][key].performerName[i]);
                                    console.log(data.body["results"][key].performerImageURL[i]);

                                    searchResult['artists'].push(
                                        new Artist(
                                            data.body["results"][key].performer[i],
                                            data.body["results"][key].performerName[i],
                                            data.body["results"][key].performerImageURL[i]
                                        ));
                                }
                                break;
                        }
                        this.searchResults.push(searchResult);
                    })
                    console.log(this.searchResults);
                    loading.dismiss();
                }, err => {
                    console.log("Some error occur during the search");
                    console.log(err);
                    this.showAlertDialog("Ups..", "Some error occurred. Please try again.")
                    loading.dismiss();
                }
            );
    }

    showAlertDialog(title: string, message: string) {
        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: ['Ok']

        });
        alert.present();
    }

    goToResultPage(searchResult: any) {
        console.log(searchResult);
        console.log("Navigate to ArtistPage")
        const pageToNavigate = this.filterToComponentPage.get(this.selectedFilter);
        if (pageToNavigate) {
            this.navCtrl.push(pageToNavigate, {"data": searchResult});

        }
    }

}
