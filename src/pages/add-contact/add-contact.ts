import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { MyContactsPage } from "../my-contacts/my-contacts";


@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {

  contacts: FormGroup;

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public toastCtrl: ToastController, private formBuilder: FormBuilder, public storage: Storage) {

    this.contacts = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.maxLength(11)],
    });
  }

  ionViewDidLoad() { 
    this.menu.close();
    this.menu.enable(true);
  }

  save() {
    this.storage.set('contactInfo', {
      name: this.contacts.value.name,
      phone: '55'+this.contacts.value.phone.replace(/\D+/g, ''),
    })
      .then(
      () => {
        let toast = this.toastCtrl.create({
          message: 'Contato salvo com sucesso!',
          duration: 3000,
          position: 'top'
        });
        this.navCtrl.setRoot(MyContactsPage);
        toast.onDidDismiss(() => { });

        toast.present();
        error =>
          console.error('Ocorreu um erro ao salvar o contato', error)
      });
  }

}
