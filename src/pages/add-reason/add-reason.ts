import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, MenuController } from 'ionic-angular';
import { WelcomePage } from "../welcome/welcome";

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-add-reason',
  templateUrl: 'add-reason.html'
})

export class AddReasonPage {

  public todoList: Array<string>;
  public todoItem: string;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public toastCtrl: ToastController, public platform: Platform) {

    this.todoList = JSON.parse(localStorage.getItem("todos"));
    if (!this.todoList) {
      this.todoList = [];
    }
    this.todoItem = "";

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

  save() {
    if (this.todoItem != "") {

      this.todoList.push(this.todoItem);
      localStorage.setItem("todos", JSON.stringify(this.todoList));

      this.navCtrl.pop();

      let toast = this.toastCtrl.create({
        message: 'Item salvo com sucesso!',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    } else {
      let toast = this.toastCtrl.create({
        message: 'Ocorreu um erro ao salvar o seu item!',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }

  }

}