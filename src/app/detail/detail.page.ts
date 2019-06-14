import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit {
  isLoading = false;

  bird: any;

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private service: RestService
              ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getBirdDetails(id);
  }

  getBirdDetails(birdId) {
    this.service.getBirdDetails(birdId)
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
      this.bird = response[0];
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

  addSighting(birdId) {
    this.navCtrl.navigateForward('/add-sighting/' + birdId);
  }
}
