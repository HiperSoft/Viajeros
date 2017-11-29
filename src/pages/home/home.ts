import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RutaPage } from '../ruta/ruta';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

calcular(){

    this.navCtrl.push(RutaPage);
}
 

  constructor(public navCtrl: NavController) {

  }

}
