import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-add-bird',
  templateUrl: './add-bird.page.html',
  styleUrls: ['./add-bird.page.scss'],
})
export class AddBirdPage implements OnInit {
  addSighting = false;
  isLoading = false;

  birdForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router,
              private route: ActivatedRoute,
              private service: RestService) {
    this.birdForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      sighting: [],
      place: [''],
      longitude: [''],
      latitude: ['']
    });
  }

  ngOnInit() {
  }

  submitBird() {
    console.log('Name:' + this.birdForm.value.name);
    console.log('Description:' + this.birdForm.value.desc);
    console.log('Place:' + this.birdForm.value.place);
    console.log('Longitude:' + this.birdForm.value.longitude);
    console.log('Latitude:' + this.birdForm.value.latitude);

    if (this.addSighting) {
      this.service.addBird(this.birdForm.value.name,
          this.birdForm.value.desc,
          this.birdForm.value.place,
          this.birdForm.value.longitude,
          this.birdForm.value.latitude)
          .subscribe(
              (data) => { // Success
                this.dismissLoading();
                this.processResponse(data);
              },
              (error) => { // Error
                this.dismissLoading();
                this.showError(error.message);
                this.birdForm.reset();
              }
          );
    } else {
      this.service.addBird(this.birdForm.value.name,
          this.birdForm.value.desc)
          .subscribe(
              (data) => { // Success
                this.dismissLoading();
                this.processResponse(data);
              },
              (error) => { // Error
                this.dismissLoading();
                this.showError(error.message);
                this.birdForm.reset();
              }
          );
    }

    this.presentLoading();
  }

  processResponse(response) {
    const status = response.status;

    if (status === 'OK') {
      this.showSuccess();
      this.router.navigate(['/list']);
    } else {
      const error = response.message;
      this.showError(error);
      this.birdForm.reset();
    }
  }

  async showSuccess() {
    const alert = await this.alertCtrl.create({
      message: 'El ave se ha añadido correctamente',
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
