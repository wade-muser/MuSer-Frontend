import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TimelineEvent} from "../../models/timelineEvent";

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

    timelineEvents: Array<TimelineEvent>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.timelineEvents = [];
        const event = new TimelineEvent("4/10/13", "Ricebean black-eyed pe", "Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress. Pea\n" +
            "                    sprouts wattle seed rutabaga okra yarrow cress avocado grape radish bush tomato ricebean black-eyed\n" +
            "                    pea maize eggplant. Cabbage lentil cucumber chickpea sorrel gram garbanzo plantain lotus root bok\n" +
            "                    choy squash cress potato summer purslane salsify fennel horseradish dulse. Winter purslane garbanzo\n" +
            "                    artichoke broccoli lentil corn okra silver beet celery quandong. Plantain salad beetroot bunya nuts\n" +
            "                    black-eyed pea collard greens radish water spinach gourd chicory prairie turnip avocado sierra leone\n" +
            "                    bologi.");
        this.timelineEvents.push(event)
        this.timelineEvents.push(event)
        this.timelineEvents.push(event)
        this.timelineEvents.push(event)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GenrePage');
    }

}
