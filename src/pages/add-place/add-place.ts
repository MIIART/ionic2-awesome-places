import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {SetLocationPage} from '../set-location/set-location';
import {Location} from '../../app/models/location.model';
import {Geolocation, Camera, File, Entry, FileError} from 'ionic-native';
import {PlacesService} from '../../services/places.service';

declare var cordova: any;

@Component({
  selector   : 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };

  locationIsSet: boolean = false;
  imageUrl               = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private loading: LoadingController, private toast: ToastController, private placesService: PlacesService) {
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location      = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl      = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location      = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onTakePhoto() {
    Camera.getPicture({
      encodingType      : Camera.EncodingType.JPEG,
      correctOrientation: true,
    })
      .then(imageData => {
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path        = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
          .then(
            (data: Entry) => {
              this.imageUrl = data.nativeURL;
              Camera.cleanup();
            }
          )
          .catch(
            (error: FileError) => {
              this.imageUrl = '';
              const toast   = this.toast.create({
                message : 'Could not save the image. Please try again!',
                duration: 2500
              });
              toast.present();
              Camera.cleanup();
            }
          );
        this.imageUrl = imageData;
      })
      .catch(
        error => {
          const toast = this.toast.create({
            message : 'Could not save the image. Please try again!',
            duration: 2500
          });
          toast.present();
        }
      );
  }


  onLocate() {
    const loading = this.loading.create({
      content: 'Getting your location'
    });
    loading.present();
    Geolocation.getCurrentPosition()
      .then(
        location => {
          loading.dismiss();
          this.location.lat  = location.coords.latitude;
          this.location.lng  = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loading.dismiss();
          const toast = this.toast.create({
            message : 'Cannot get location, please pick it manually',
            duration: 2500
          });
          toast.present();
        }
      );
  }

}
