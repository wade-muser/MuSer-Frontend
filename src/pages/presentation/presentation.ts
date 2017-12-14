import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the PresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-presentation',
    templateUrl: 'presentation.html',
})
export class PresentationPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PresentationPage');
    }

    goToLoginPage() {
        this.navCtrl.push(LoginPage);
    }

    goToRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }

}
