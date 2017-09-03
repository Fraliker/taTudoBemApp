import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, ToastController } from 'ionic-angular'
import { PushService } from "../../providers/push-service/push-service";

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [PushService]
})

export class ConfigPage {

  public data: any;
  public canBeNotify: boolean;

  constructor(
    public navController: NavController,
    public loadingController: LoadingController,
    public storage: Storage,
    public pushService: PushService,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    this.storage = storage;
    this.data = {};

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

        toast.present();
      }

    })

  }

  ionViewDidLoad() {
    this.loading();
    this.notify();
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

    notify() {
      this.storage.get('notifications').then(
        data => this.canBeNotify = data,
        error => console.error(error)
      );
    }

    saveNotify() {
      this.storage.set('notifications', this.canBeNotify).then(res => {
        console.log("save: " + res)
        this.pushService.setNotify(res);
      });
    }
  }
