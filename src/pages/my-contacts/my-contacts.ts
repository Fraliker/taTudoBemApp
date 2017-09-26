import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AddContactPage } from '../add-contact/add-contact';
import { WelcomePage } from "../welcome/welcome";

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-my-contacts',
  templateUrl: 'my-contacts.html',
})

export class MyContactsPage {

  public name;
  public phone;
  public contacts;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage, public alertCtrl: AlertController, public navParams: NavParams, public platform: Platform, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
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
    this.menu.close();
    this.menu.enable(true);
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`
    });

    loading.present().then(() => {
      this.storage.get('contactInfo').then(
        res => {
          this.name = res.name;
          this.phone = res.phone;
        },
        error => {
          this.name = null;
          this.phone = null;
        }
      );
      loading.dismiss();
    });
  }

  add() {
    if (!this.phone) {
      this.navCtrl.push(AddContactPage);
    }
  }

  delete(contactInfo) {
    let alert = this.alertCtrl.create({
      title: 'Excluir',
      message: 'Você deseja excluir este contato?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: `
                <div class="custom-spinner-container">
                  <div class="custom-spinner-box"></div>
                </div>`
            });
            this.storage.remove('contactInfo').then(
              res => {
                loading.present().then(() => {
                  this.name = null;
                  this.phone = null;
                  loading.dismiss();
                });
            });
          }
        }
      ]
    });
    alert.present();
  }


}
