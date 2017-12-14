import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterProvider} from "../../providers/register/register";
import {HttpResponse} from "@angular/common/http";
import {PresentationPage} from "../presentation/presentation";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    credentials = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    private HTTP_STATUS_CODE_CREATED = 201;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private registerProvider: RegisterProvider,
                private loadingController: LoadingController,
                private toastController: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    register(): void {
        console.log(this.credentials);
        const loading = this.loadingController.create({
            content: "Please wait..."
        });
        loading.present();

        this.registerProvider
            .register(this.credentials)
            .subscribe((response: HttpResponse<Object>) => {
                loading.dismiss();
                console.log(response);
                if (response.status != this.HTTP_STATUS_CODE_CREATED) {
                    this.showToastMessage("Some error occurred", 3000);
                    return;
                }
                this.navCtrl.setRoot(PresentationPage);
                this.navCtrl.push(LoginPage);
            })
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
