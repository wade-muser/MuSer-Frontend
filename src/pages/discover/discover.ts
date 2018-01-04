import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ArtistPage} from "../artist/artist";
import {AlbumPage} from "../album/album";
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {SongPage} from "../song/song";
import {DiscoverProvider} from "../../providers/discover/discover";

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
            duration: 1500
        });
        loading.present();

        this.discoverService
            .search(this.searchValue, this.selectedFilter)
            .subscribe(
                data => {
                    this.searchResults = data;
                }, err => {
                    this.showAlertDialog("Ups..", "Some error occurred. Please try again.")
                }
            );

    }

    showAlertDialog(title: string, message: string) {
        let alert = this.alertController.create({
            title: "Filter select",
            message: "A filter must be selected to perform the search",
            buttons: ['Ok']

        });
        alert.present();
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
