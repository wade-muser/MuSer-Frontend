import {Component, ViewChild} from '@angular/core';
import {Events, ModalController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PresentationPage} from "../pages/presentation/presentation";
import {AuthorizationProvider} from "../providers/authorization/authorization";
import {TabsPage} from "../pages/tabs/tabs";
import {SplashPage} from "../pages/splash/splash";
import {HttpErrorResponse} from "@angular/common/http";
import {LogoutProvider} from "../providers/logout/logout";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    rootPage: any = PresentationPage;

    private DISMISS_SPLASH_SCREEN_TOPIC = "dismiss:splash"

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public modalCtr: ModalController,
                public splashScreen: SplashScreen,
                public authorizationProvider: AuthorizationProvider,
                public logoutService: LogoutProvider,
                private event: Events) {

        this.initializeApp();
    }

    initializeApp() {

        this.platform.ready().then(() => {

            this.statusBar.styleDefault();

            if (!this.authorizationProvider.tokenExists()) {
                console.log("No token found");
                return;
            }

            this.showSplashScreen();
            this.validateToken();

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            // this.statusBar.styleDefault();
            // this.splashScreen.hide();
        });
    }

    logout(): void {
        this.logoutService.removeToken();
        this.rootPage = PresentationPage;
    }

    showSplashScreen(): void {
        let splash = this.modalCtr.create(SplashPage);
        splash.present();
    }

    validateToken(): void {
        console.log("Token found")
        this.authorizationProvider.check()
            .subscribe(
                response => {
                    console.log(response);
                    this.rootPage = TabsPage;
                    this.emitEvent(this.DISMISS_SPLASH_SCREEN_TOPIC);
                },
                (error: HttpErrorResponse) => {
                    console.log(error);
                    this.logoutService.removeToken();
                    this.rootPage = PresentationPage;
                    this.emitEvent(this.DISMISS_SPLASH_SCREEN_TOPIC);
                },
            );
    }

    emitEvent(topic, data = {}): void {
        console.log("Emit event");
        this.event.publish(this.DISMISS_SPLASH_SCREEN_TOPIC, data);
    }

}
