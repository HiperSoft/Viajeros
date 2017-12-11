import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { RutaPage } from '../ruta/ruta';
import { Geolocation } from '@ionic-native/geolocation';


declare const google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  vehiculo: any;
  questioncombust=false;
  origen: any;
  destino: any;
  tcombustible: any;
  rendimiento: any;
  truta: any;
calcular(){
    console.log('vehiculo: '+this.vehiculo+',origen: '+this.origen+', destino: '+this.destino+ ', tcombustible: '+this.tcombustible+', Rendimiento: '+this.rendimiento);
    if (this.questioncombust==false){
      console.log('entre');
      this.tcombustible='null';
      this.rendimiento=0;
    }
    /*if (this.hola==false){
      this.ejes=2;
    }*/
    this.navCtrl.push(RutaPage,{vehiculo:this.vehiculo, origen:this.origen,destino:this.destino,tcombustible:this.tcombustible,rendimiento:this.rendimiento,questioncombust:this.questioncombust, truta: this.truta});
}
 
    
  constructor(public navCtrl: NavController,private geolocation: Geolocation) {
    //this.getLocation();
  }
  getLocation(){   
    this.geolocation.getCurrentPosition().then((resp) => {
      var la=resp.coords.latitude;
      var lg=resp.coords.longitude;
      console.log(resp.coords.latitude, resp.coords.longitude);
      var geocoder = new google.maps.Geocoder;
      this.origen = this.geocodeLatLng(geocoder,la,lg)
      return this.origen;
      }).catch((error) => {
      console.log('Error getting location', error);
    });
    console.log(this.origen);
  }
  /*f(){
  console.log(this.vehiculo);  
  if (this.vehiculo=='camion'){
    this.hola=true;
  }else if(this.vehiculo=='auto'){
    this.hola=false;
  }else if(this.vehiculo=='autobus'){
    this.hola=true;
  }else if(this.vehiculo=='moto'){
    this.hola=false;
  }
    }*/
    geocodeLatLng(geocoder,la,lg) {
      var org;
      var latlng = {
          lat: la,
          lng: lg
        };
        this.origen = geocoder.geocode({
        'location': latlng
      },(results,status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {  
            console.log(results[0]);                      
            for (var ac = 0; ac < results[0].address_components.length; ac++) {
              var component = results[0].address_components[ac];
              switch(component.types[0]) {
                  case 'locality':
                       org=(component.long_name);
                      break;
                  case 'administrative_area_level_1':
                      org=(org+','+component.long_name);
                       break;               
              }
          };
          } else {
            window.alert('No hay resultados');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
        this.origen=org;
        document.getElementById("origen").innerText=this.origen;
        console.log('1.-'+this.origen);
        return this.origen;
      });
      console.log('2.-'+this.origen);
      return this.origen=org;      
    }
}
