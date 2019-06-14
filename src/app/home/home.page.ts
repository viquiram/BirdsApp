import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  constructor(private navCtrl: NavController,) {
  }

  ngOnInit() {
  }

  displayBirds() {
    this.navCtrl.navigateForward('/list');
  }

  addBird() {
    this.navCtrl.navigateForward('/add-bird');
  }

  displayInfo() {
    // Nothing
  }

  logOff() {
    RestService.deleteUserId();
    this.navCtrl.navigateRoot('/login');
  }
}
