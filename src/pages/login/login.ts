import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {TabsPage} from "../tabs/tabs";
import {HttpErrorResponse} from "@angular/common/http";

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
    private LOCALE_STORAGE_EMAIL = "email";

    credentials = {
        email: "",
        password: ""
    };


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private loginProvider: LoginProvider,
                private loadingController: LoadingController,
                private toastController: ToastController) {

        // this.menuController.swipeEnable(false);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(): void {
        const loading = this.loadingController.create({
            content: "",
            spinner: "dots",
            cssClass: "transparent",
        });
        loading.present();

        this.loginProvider
            .login(this.credentials)
            .subscribe(
                (response) => {
                    loading.dismiss();
                    if (response.status == this.HTTP_STATUS_CODE_OK) {
                        localStorage.setItem(this.LOCALE_STORAGE_TOKEN_KEY, response.body['token']);
                        localStorage.setItem(this.LOCALE_STORAGE_EMAIL, this.credentials.email);
                        this.navCtrl.setRoot(TabsPage);
                    }
                }, (error: HttpErrorResponse) => {
                    loading.dismiss();
                    console.log("Error Occurred");
                    console.log(error);
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
