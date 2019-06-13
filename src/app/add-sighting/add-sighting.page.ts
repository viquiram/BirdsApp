import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sighting',
  templateUrl: './add-sighting.page.html',
  styleUrls: ['./add-sighting.page.scss'],
})
export class AddSightingPage implements OnInit {
  isLoading = false;

  sightingForm: FormGroup;
  birdId: string;

  constructor(private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private router: Router,
              private route: ActivatedRoute,
              private service: RestService) {
    this.sightingForm = this.formBuilder.group({
      place: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.birdId = this.route.snapshot.paramMap.get('id');
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
      this.router.navigate(['/detail/' + this.birdId]);
    } else {
      const error = response.message;
      this.showError(error);
      this.sightingForm.reset();
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
