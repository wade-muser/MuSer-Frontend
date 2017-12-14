import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PresentationPage} from "../pages/presentation/presentation";
import {AuthorizationProvider} from "../providers/authorization/authorization";
import {HomePage} from "../pages/home/home";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    private LOCALE_STORAGE_TOKEN_KEY = "token";
    private HTTP_STATUS_CODE_OK = 200;
    rootPage: any = PresentationPage;


    @ViewChild(Nav) nav: Nav;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public authorizationProvider: AuthorizationProvider) {

        const token = localStorage.getItem(this.LOCALE_STORAGE_TOKEN_KEY);


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            if (token != null) {
                console.log("Token found")
                authorizationProvider.check(token)
                    .subscribe(response => {
                        console.log(response);
                        if (response.status !== this.HTTP_STATUS_CODE_OK) {
                            localStorage.removeItem(this.LOCALE_STORAGE_TOKEN_KEY);
                            this.rootPage = PresentationPage;
                        } else {
                            this.rootPage = HomePage;
                        }
                    });
            } else {
                console.log("No token found");
            }


            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    logout(): void {
        localStorage.removeItem(this.LOCALE_STORAGE_TOKEN_KEY);
        this.rootPage = PresentationPage;
    }
}
