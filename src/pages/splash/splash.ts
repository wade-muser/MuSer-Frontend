import {Component} from '@angular/core';
import {Events, ViewController} from 'ionic-angular';
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html',
})
export class SplashPage {

    DISMISS_SPLASH_SCREEN_TOPIC = "dismiss:splash"

    constructor(public viewCtrl: ViewController,
                public splashScreen: SplashScreen,
                public event: Events) {
        event.subscribe(this.DISMISS_SPLASH_SCREEN_TOPIC, () => {
            console.log("Event Catch");
            this.viewCtrl.dismiss()
        });
    }

    ionViewDidLoad() {
        console.log("Init Splash Page");
    }

    ionViewDidEnter() {
        this.splashScreen.hide();
    }

}
