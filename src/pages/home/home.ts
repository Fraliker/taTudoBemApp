import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, Platform, AlertController, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms'
import { Storage } from '@ionic/storage';
import { WelcomePage } from "../welcome/welcome";

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public name;
  public phone: string;
  public contacts;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private callNumber: CallNumber,
    private sms: SMS,
    public storage: Storage
  ) {
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

    this.loading();
  }

  loading() {
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
        error => this.name = null
      );
      loading.dismiss();
    });
  }

  helpMeAbout() {
    let alert = this.alertCtrl.create({
      title: 'Sobre o 141',
      subTitle: 'Ao clicar no botão "Preciso conversar com alguém!" você estará ligando automaticamente para o CVV - Centro de Valorização da Vida, uma ONG que oferece apoio emocional e prevenção do suicídio de forma gratuita sob total sigilo por telefone.',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('clicou ok para ligar 141');
          }
        }
      ]
    });
    alert.present();
  }


  launchDialer(n: string) {
    this.callNumber.callNumber(n, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));

    if (this.phone != null) {
      this.sms.send(this.phone, 'Oi ' + this.name + ', ' + 'tudo bem? Infelizmente não estou me sentindo bem. Você pode entrar em contato comigo?' + ' - ' +'Enviado através do app Tá tudo bem?').then((result) => {
        let successToast = this.toastCtrl.create({
          message: "Mensagem enviada com sucesso",
          duration: 3000,
          position: 'top'
        })
        successToast.present();
      }, (error) => {
        let errorToast = this.toastCtrl.create({
          message: "Ocorreu um erro ao enviar a mensagem",
          duration: 3000,
          position: 'top'          
        })
        errorToast.present();
      });
    }
  }
}
