import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {  GoogleMaps,  GoogleMap,  GoogleMapsEvent,  GoogleMapOptions,  CameraPosition,  MarkerOptions,  Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the RutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})

export class RutaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutaPage');
  }

  
}
