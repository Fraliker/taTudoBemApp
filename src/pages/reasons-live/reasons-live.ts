import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, AlertController, Platform, ToastController, MenuController } from "ionic-angular";
import { AddReasonPage } from "../add-reason/add-reason";
import { WelcomePage } from "../welcome/welcome";

declare var navigator;
declare var Connection;

@Component({
    selector: 'page-reasons-live',
    templateUrl: 'reasons-live.html'
})

export class ReasonsLivePage {

    public todoList: Array<string>;

    constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public platform: Platform, public toastCtrl: ToastController) {
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
            </div>`,
            duration: 300
          });

        loading.present().then(() => {
            this.todoList = JSON.parse(localStorage.getItem("todos"));
            if (!this.todoList) {
                this.todoList = [];
                console.log("chegou aqui")
            }
            loading.dismiss();
        });
    }
    
    add() {
        this.navCtrl.push(AddReasonPage);
    }

    delete(index: number) {
        let alert = this.alertCtrl.create({
            title: 'Excluir',
            message: 'Você deseja excluir este item?',
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
                        this.todoList.splice(index, 1);
                        localStorage.setItem("todos", JSON.stringify(this.todoList));
                        console.log('sim clicked');
                    }
                }
            ]
        });
        alert.present();
    }
}
