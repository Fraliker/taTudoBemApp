import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform, MenuController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { WelcomePage } from "../welcome/welcome";

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-how-to',
  templateUrl: 'how-to.html',
})

export class HowToPage {

  howToHelps: FirebaseListObservable<any[]>;
  suicideSigns: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public loadingCtrl: LoadingController, public firebaseProvider: FirebaseProvider, public toastCtrl: ToastController, public platform: Platform) {

    this.howToHelps = this.firebaseProvider.getHowToHelp();
    this.suicideSigns = this.firebaseProvider.getSuicideSigns();
    this.checkNetwork();
  }

  checkNetwork() {

    this.platform.ready().then(() => {

      var networkState = navigator.connection.type;
      var states = {};

      states[Connection.NONE] = 'Sem conexão com a internet. Por favor, verifique sua rede Wi-Fi ou a do seu celular.';

      if (states[networkState] == states[Connection.NONE]) {
        let toast = this.toastCtrl.create({
          message: states[Connection.NONE],
          duration: 3000,
          showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'bottom'
        });

        this.navCtrl.setRoot(WelcomePage);

        toast.present();
      }

    })

  }

  ionViewDidLoad() {
    this.loading();
    this.menu.close();
    this.menu.enable(true);
  }

  loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 300
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

}
