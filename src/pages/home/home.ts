import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { RutaPage } from '../ruta/ruta';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  hola = false;
  vehiculo: any;

calcular(){

    this.navCtrl.push(RutaPage);
}
 
    
  constructor(public navCtrl: NavController) {

  }
  f(){
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
    }
  


}
