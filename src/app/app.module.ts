import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SetLocationPage} from '../pages/set-location/set-location';
import {PlacePage} from '../pages/place/place';
import {AddPlacePage} from '../pages/add-place/add-place';
import {AgmCoreModule} from 'angular2-google-maps/core';
import {PlacesService} from '../services/places.service';
import {Storage} from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'paste your google map api key here'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    PlacePage,
    SetLocationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PlacesService, Storage]
})
export class AppModule {}
