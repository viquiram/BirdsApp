import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-sighting',
  templateUrl: './add-sighting.page.html',
  styleUrls: ['./add-sighting.page.scss']
})
export class AddSightingPage implements OnInit {
  isLoading = false;
  longDisabled = true;
  latDisabled = true;

  birdId: string;
  longitude: number;
  latitude: number;

  sightingForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private route: ActivatedRoute,
              private navCtrl: NavController,
              private service: RestService,
              private geolocation: Geolocation) {
    this.sightingForm = this.formBuilder.group({
      place: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.birdId = this.route.snapshot.paramMap.get('id');
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // Success
      this.dismissLoading();
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
    }).catch((error) => {
      // Error
      const message = 'Se ha producido un error: ' + error +
          '. Se deberá introducir la localización manualmente.';
      this.dismissLoading();
      this.showError(message);
      this.longDisabled = false;
      this.latDisabled = false;
    });
    this.presentLoading();
  }

  submitSighting() {
    console.log('Place:' + this.sightingForm.value.place);
    console.log('Longitude:' + this.sightingForm.value.longitude);
    console.log('Latitude:' + this.sightingForm.value.latitude);

    this.service.addSighting(this.birdId,
        this.sightingForm.value.place,
        this.sightingForm.value.longitude,
        this.sightingForm.value.latitude)
        .subscribe(
            (data) => { // Success
              this.dismissLoading();
              this.processResponse(data);
            },
            (error) => { // Error
              this.dismissLoading();
              this.showError(error.message);
              this.sightingForm.reset();
            }
        );
    this.presentLoading();
  }

  processResponse(response) {
    const status = response.status;

    if (status === 'OK') {
      this.showSuccess();
      this.navCtrl.pop();
    } else {
      const error = response.message;
      this.showError(error);
      this.sightingForm.reset();
    }
  }

  async showSuccess() {
    const alert = await this.alertCtrl.create({
      message: 'El avistamiento se ha añadido correctamente',
      buttons: [{text: 'OK', role: 'cancel'}]
    });
    await alert.present();
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
