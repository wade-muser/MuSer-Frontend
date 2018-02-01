import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TimelineEvent} from "../../models/timelineEvent";
import {Genre} from "../../models/genre";
import {GenreProvider} from "../../providers/genre/genre";

/**
 * Generated class for the GenrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-genre',
    templateUrl: 'genre.html',
})
export class GenrePage {

    genre: Genre;
    timelineEvents: Array<TimelineEvent>;

    NAV_PARAM_GENRE_KEY = "data";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loadingController: LoadingController,
                private alertController: AlertController,
                public genreService: GenreProvider) {

        this.genre = this.navParams.get(this.NAV_PARAM_GENRE_KEY);
        this.timelineEvents = [];

        let loading = this.loadingController.create({
            content: '',
            spinner: 'dots',
            cssClass: 'transparent',
        });
        loading.present();

        this.genreService.getTimeline(this.genre.id, 1992, 2017)
            .subscribe(data => {
                const results = data.body['results'];
                const aggregatedResults = [];
                for (let result of results) {
                    if (result['performer']) {
                        aggregatedResults.push(
                            new TimelineEvent(
                                result['entity'],
                                new Date(result['inceptionDate']),
                                result['performerName'],
                                `Released:${result.name}`)
                        );
                    } else {
                        aggregatedResults.push(
                            new TimelineEvent(
                                result['entity'],
                                new Date(result['inceptionDate']),
                                result['name'],
                                `${result.name} debuts`)
                        );
                        if (result['retiringDate']) {
                            aggregatedResults.push(
                                new TimelineEvent(result['entity'],
                                    new Date(result['retiringDate']),
                                    result['name'],
                                    `${result.name} retires`)
                            );
                        }
                    }
                }

                aggregatedResults.sort(this.compareDateTimelineEvents);
                this.timelineEvents = aggregatedResults;
                console.log(this.timelineEvents);
                loading.dismiss();
            }, err => {
                console.log(err);
                this.showAlertDialog("Ups..", "Some error occurred. Please try again.")
                loading.dismiss();
            })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GenrePage');
    }

    compareDateTimelineEvents(firstEvent: Object, secondEvent: Object): number {
        return firstEvent['date'] - secondEvent['date'];
    }

    showAlertDialog(title: string, message: string) {
        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: ['Ok']

        });
        alert.present();
    }

}
