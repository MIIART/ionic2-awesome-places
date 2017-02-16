import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from '../../app/models/location.model';

@Component({
  selector   : 'page-set-location',
  templateUrl: 'set-location.html'
})
export class SetLocationPage {

  location: Location;
  marker: Location;


  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.location = this.navParams.get('location');
    if (this.navParams.get('isSet')) {
      this.marker = this.location;
    }
  }

  onSetMarker(event: any) {
    console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm() {
    this.viewCtrl.dismiss({location: this.marker});
  }

  onAbort() {
    this.viewCtrl.dismiss();
  }
}
