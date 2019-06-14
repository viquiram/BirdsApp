import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private service: RestService) {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    console.log('User:' + this.loginForm.value.user);
    console.log('Password:' + this.loginForm.value.password);

    this.service.login(this.loginForm.value.user, this.loginForm.value.password)
        .subscribe(
            (data) => { // Success
              this.dismissLoading();
              this.processResponse(data);
            },
            (error) => { // Error
              this.dismissLoading();
              this.showError(error.message);
              this.loginForm.reset();
            }
        );
    this.presentLoading();
  }

  processResponse(response) {
    const status = response.status;

    if (status === 'OK') {
      RestService.setUserId(response.id);
      this.navCtrl.navigateForward('/home');
    } else {
      const error = response.message;
      this.showError(error);
      this.loginForm.reset();
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
