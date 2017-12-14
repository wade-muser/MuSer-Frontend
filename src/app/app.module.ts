import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DiscoverPage} from '../pages/discover/discover';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {PresentationPage} from "../pages/presentation/presentation";
import {RegisterProvider} from '../providers/register/register';
import {HttpClientModule} from "@angular/common/http";
import {LoginProvider} from '../providers/login/login';
import {IonicStorageModule} from "@ionic/storage";
import {AuthorizationProvider} from '../providers/authorization/authorization';


@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        DiscoverPage,
        LoginPage,
        RegisterPage,
        PresentationPage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        DiscoverPage,
        LoginPage,
        RegisterPage,
        PresentationPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RegisterProvider,
        LoginProvider,
        AuthorizationProvider
    ]
})
export class AppModule {
}
