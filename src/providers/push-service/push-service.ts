import { Injectable } from "@angular/core";
import { Platform, App } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

@Injectable()
export class PushService {

    OneSginalID: string = '0e84b5ea-8166-4ce1-b0f8-fd0b82eac0be';
    OneSignaKey: string = 'MmQ2N2YxMDAtYTFlMy00YzcyLThkNjgtYzZlNWIxNjE0ZjM3';
    private data;

    constructor(
        public platform: Platform,
        public oneSignal: OneSignal,
        private app: App) {
        this.platform.ready().then(() => {
            this.data = {
                "additionalData": {

                }
            };
            this.getProvider();
        })

    }

    setNotify(value) {
        this.oneSignal.setSubscription(value);
    }

    getProvider() {
        
        let oneSignalReturn = (data) => {
            console.log('Notification: ' + JSON.stringify(data));
            this.data.additionalData = data["notification"]["payload"]["additionalData"];
            console.log('Notification: ' + this.data.additionalData["id"]);
            console.log('Notification scene: ' + this.data.additionalData["scene"]);
            this.sceneManager(this.data.additionalData["scene"]);
        };
        
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.startInit(this.OneSginalID, this.OneSignaKey).handleNotificationOpened(oneSignalReturn)
            .endInit();
    }

    sceneManager(scene){
        this.app.getActiveNav().push(scene);
    }
}
