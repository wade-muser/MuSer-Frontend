import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private HTTP_STATUS_CODE_OK = 200;
    private LOCALE_STORAGE_TOKEN_KEY = "token";

    credentials = {
        email: "",
        password: ""
    };


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loginProvider: LoginProvider,
                private loadingController: LoadingController,
                private toastController: ToastController) {

        console.log("Init");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(): void {
        const loading = this.loadingController.create({
            content: "Please wait..."
        });
        loading.present();

        this.loginProvider
            .login(this.credentials)
            .subscribe((response) => {
                loading.dismiss();
                if (response.status == this.HTTP_STATUS_CODE_OK) {
                    localStorage.setItem(this.LOCALE_STORAGE_TOKEN_KEY, response.body['token']);
                    this.navCtrl.setRoot(TabsPage);
                }
            });
    }

    showToastMessage(message: string, duration: number, position: string = "bottom") {
        const toast = this.toastController.create({
            message: message,
            duration: duration,
            position: position,

        });
        toast.present();
    }

}
