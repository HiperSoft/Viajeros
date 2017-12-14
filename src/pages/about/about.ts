import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from "ionic-angular";
declare const google: any;
@Component({
  selector: "page-about",
  templateUrl: "about.html"
})
export class AboutPage {
  vehiculo: any;
  questioncombust = false;
  origen: any;
  destino: any;
  tcombustible: any;
  rendimiento: any;
  truta: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController
  ) {}

  getLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        var la = resp.coords.latitude;
        var lg = resp.coords.longitude;
        console.log(resp.coords.latitude, resp.coords.longitude);
        var geocoder = new google.maps.Geocoder();
        this.origen = this.geocodeLatLng(geocoder, la, lg);
        return this.origen;
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
    console.log(this.origen);
  }
  geocodeLatLng(geocoder, la, lg) {
    var org;
    var latlng = {
      lat: la,
      lng: lg
    };
    this.origen = geocoder.geocode(
      {
        location: latlng
      },
      (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            console.log(results[0]);
            for (var ac = 0; ac < results[0].address_components.length; ac++) {
              var component = results[0].address_components[ac];
              switch (component.types[0]) {
                case "locality":
                  org = component.long_name;
                  break;
                case "administrative_area_level_1":
                  org = org + "," + component.long_name;
                  break;
              }
            }
          } else {
            window.alert("No hay resultados");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
        this.origen = org;
        document.getElementById("origen").innerText = this.origen;
        console.log("1.-" + this.origen);
        return this.origen;
      }
    );
    console.log("2.-" + this.origen);
    return (this.origen = org);
  }
}
