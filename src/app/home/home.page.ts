import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  displayBirds() {
    this.router.navigate(['/list']);
  }

  addBird() {
    this.router.navigate(['/add-bird/']);
  }

  displayInfo() {
    // Nothing
  }

  logOff() {
    RestService.deleteUserId();
    this.router.navigate(['/login']);
  }
}
