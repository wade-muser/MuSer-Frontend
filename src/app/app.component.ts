import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PresentationPage} from "../pages/presentation/presentation";
import {AuthorizationProvider} from "../providers/authorization/authorization";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    rootPage: any = PresentationPage;


    private LOCALE_STORAGE_TOKEN_KEY = "token";
    private HTTP_STATUS_CODE_OK = 200;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                public authorizationProvider: AuthorizationProvider) {

        this.initializeApp();
    }

    initializeApp() {
        const token = localStorage.getItem(this.LOCALE_STORAGE_TOKEN_KEY);

        this.platform.ready().then(() => {

            if (token != null) {
                console.log("Token found")
                this.authorizationProvider.check(token)
                    .subscribe(response => {
                        console.log(response);
                        if (response.status !== this.HTTP_STATUS_CODE_OK) {
                            localStorage.removeItem(this.LOCALE_STORAGE_TOKEN_KEY);
                            this.rootPage = PresentationPage;
                        } else {
                            this.rootPage = TabsPage;
                        }
                    });
            } else {
                console.log("No token found");
            }

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    logout(): void {
        localStorage.removeItem(this.LOCALE_STORAGE_TOKEN_KEY);
        this.rootPage = PresentationPage;
    }
}
