import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  isLoading = false;

  birds: any[] = [];

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router,
              private service: RestService) { }

  ngOnInit() {
    this.getBirds();
  }

  getBirds() {
    this.service.getBirds()
        .subscribe(
            (data) => { // Success
              this.dismissLoading();
              this.processResponse(data);
            },
            (error) => { // Error
              this.dismissLoading();
              this.showError(error.message);
            }
        );
    this.presentLoading();
  }

  processResponse(response) {
    const status = response.status;

    if (status != null) {
      const error = response.message;
      this.showError(error);
    } else {
      this.birds = response;
    }
  }

  async showError(error) {
    const alert = await this.alertCtrl.create({
      message: error,
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    await alert.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({ }).then(a => {
      a.present().then(() => {
        console.log('Loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('Abort presenting loading'));
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('Loading dismissed'));
  }
}
