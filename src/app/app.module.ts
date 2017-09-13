import { Firebase } from '@ionic-native/firebase';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SMS } from "@ionic-native/sms";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { CallNumber } from "@ionic-native/call-number";
import { OneSignal } from "@ionic-native/onesignal";
import { IonicStorageModule } from "@ionic/storage/es2015";
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { FirebaseProvider } from './../providers/firebase/firebase';
import { PushService } from "../providers/push-service/push-service";

import { WelcomePage } from "../pages/welcome/welcome";
import { AboutPage } from "../pages/about/about";
import { FaqPage } from "../pages/faq/faq";
import { ConfigPage } from "../pages/config/config";
import { ReasonsLivePage } from "../pages/reasons-live/reasons-live";
import { AddReasonPage } from "../pages/add-reason/add-reason";
import { MyContactsPage } from "../pages/my-contacts/my-contacts";
import { AddContactPage } from "../pages/add-contact/add-contact";
import { HowToPage } from "../pages/how-to/how-to";

const firebaseConfig = {
  apiKey: "AIzaSyAaYhj0YJhDP8YtdidxebiSlM_nEtv7Hnc",
  authDomain: "domain.firebaseapp.com",
  databaseURL: "https://tatudobemapp.firebaseio.com/",
  projectId: "tatudobemapp",
  storageBucket: "tatudobemapp.appspot.com",
  messagingSenderId: "494295368226"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    AboutPage,
    FaqPage,
    ConfigPage,
    ReasonsLivePage,
    HowToPage,
    AddReasonPage,
    MyContactsPage,
    AddContactPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    AboutPage,
    FaqPage,
    ConfigPage,
    ReasonsLivePage,
    HowToPage,
    AddReasonPage,    
    MyContactsPage,    
    AddContactPage,    
  ],
  providers: [
    StatusBar,
    Camera,    
    OneSignal,
    CallNumber,    
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    PushService, 
    Firebase,
    SMS,
    Storage,
   ]
})
export class AppModule { }
