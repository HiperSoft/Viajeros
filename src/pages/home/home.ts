import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { RutaPage } from '../ruta/ruta';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  vehiculo: any;
  questioncombust = false;
  origen: any;
  destino: any;
  tcombustible: any;
  rendimiento: any;
  truta: any;
  myForm: FormGroup;
  gg1=false;
  gg2=false;
  tcomchange(){
    console.log('combus');
    this.setdata();
    if (this.questioncombust==true){
      if (this.myForm.get('tcombustible').value==""){
      this.gg1=true;
      (<HTMLInputElement> document.getElementById("btncalc")).disabled = true;
      }
    else if (this.myForm.get('rendimiento').value!="" && this.origen!="" && this.destino!="" && this.vehiculo!="" && this.truta!=""){
      this.gg1=false;
      (<HTMLInputElement> document.getElementById("btncalc")).disabled = false;
      
    }
  }
  }
  rendimientochange(){
    this.setdata();
    if (this.questioncombust==true){
      console.log(this.myForm.get('rendimiento'));
      if (this.myForm.get('rendimiento').value==""){
      this.gg2=true;
      (<HTMLInputElement> document.getElementById("btncalc")).disabled = true;
      
      console.log('rendim');
    }
    else if (this.myForm.get('tcombustible').value!="" && this.origen!="" && this.destino!="" && this.vehiculo!="" && this.truta!=""){
      this.gg2=false;
      (<HTMLInputElement> document.getElementById("btncalc")).disabled = false;
      
    }
  }
  }
  updatetoggle(){
    this.setdata();
    console.log(this.myForm.get('questioncombust').value)
    this.questioncombust=this.myForm.get('questioncombust').value;
    if (this.questioncombust==true){
      if(this.myForm.get('rendimiento').value=="" || this.myForm.get('tcombustible').value=="" ){
        (<HTMLInputElement> document.getElementById("btncalc")).disabled = true;
      }else if(this.origen!="" && this.destino!="" && this.vehiculo!="" && this.truta!=""){
        (<HTMLInputElement> document.getElementById("btncalc")).disabled = false; 
      }
    }else if(this.origen!="" && this.destino!="" && this.vehiculo!="" && this.truta!=""){
      (<HTMLInputElement> document.getElementById("btncalc")).disabled = false;      
    }
    
  }
  setdata(){
    this.origen=this.myForm.get('origen').value;
    this.destino=this.myForm.get('destino').value;
    this.vehiculo=this.myForm.get('vehiculo').value;    
    this.questioncombust=this.myForm.get('questioncombust').value;  
    this.tcombustible=this.myForm.get('tcombustible').value;  
    this.rendimiento=this.myForm.get('rendimiento').value;  
    this.truta=this.myForm.get('truta').value;      
  }
  calcular() {
    this.setdata();
    console.log(
      "vehiculo: " +
        this.vehiculo +
        ",origen: " +
        this.origen +
        ", destino: " +
        this.destino +
        ", tcombustible: " +
        this.tcombustible +
        ", Rendimiento: " +
        this.rendimiento
    );
    if (this.questioncombust == false) {
      console.log("entre");
      this.tcombustible = "null";
      this.rendimiento = 0;
    }
    /*if (this.hola==false){
      this.ejes=2;
    }*/
    this.navCtrl.push(RutaPage, {
      vehiculo: this.vehiculo,
      origen: this.origen,
      destino: this.destino,
      tcombustible: this.tcombustible,
      rendimiento: this.rendimiento,
      questioncombust: this.questioncombust,
      truta: this.truta
    });
  }

  constructor(public fb: FormBuilder,
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public alertCtrl: AlertController
  ) {
    //this.getLocation();
    this.myForm = this.fb.group({
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]],
      truta: ['', [Validators.required]],
      tcombustible: ['', []],
      rendimiento: ['', []],
      questioncombust: ['', []],
    });
    this.myForm.patchValue({
      questioncombust: false, 
      // formControlName2: myValue2 (can be omitted)
    });
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Campo inválido",
      subTitle:
        "Uno de los campos no ha recibído ninguna entrada, favor de verificar!",
      buttons: ["Aceptar"]
    });
    alert.present();
  }
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
        this.myForm.patchValue({
          origen: this.origen, 
          // formControlName2: myValue2 (can be omitted)
        });
        //document.getElementById("origen").innerText = this.origen;
        console.log("1.-" + this.origen);
        return this.origen;
      }
    );
    console.log("2.-" + this.origen);
    return (this.origen = org);
  }
}
