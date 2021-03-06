import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http, Response } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import 'rxjs/Rx';
//import {  GoogleMaps,  GoogleMap,  GoogleMapsEvent,  GoogleMapOptions,  CameraPosition,  MarkerOptions,  Marker } from '@ionic-native/google-maps';

/**
 * Generated class for the RutaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare const google: any;

@IonicPage()
@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})

export class RutaPage {
  @ViewChild('map') mapElement: ElementRef;
  costlcombus: any;
  costcasetas: any;
  distancia: any;
  tiempo: any;
  tipocombus: any;
  lcombus: any;
  costcombus: any;
  costtot: any
  latLng: any;
  map: any;
  vehiculo: any;
  origen: any;
  destino: any;
  tcombustible: any;
  rendimiento: any;
  json1: any;
  orig: any;
  dest: any;
  data: any;
  combustibles: any;
  questioncombust: any;
  cargando= false;
  truta: any;
  data4:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public socialSharing:SocialSharing) {
    this.cargando=true;
    this.questioncombust=navParams.get('questioncombust');
    this.vehiculo=navParams.get('vehiculo');
    this.origen=navParams.get('origen');
    this.destino=navParams.get('destino');
    this.tcombustible=navParams.get('tcombustible');
    if(this.tcombustible==0){
      this.tipocombus="Magna";
    }else if(this.tcombustible==1){
      this.tipocombus="Premium";
    }else if(this.tcombustible==2){
      this.tipocombus="Diesel";
    }else if(this.tipocombus==3){
      this.tipocombus="Gas";
    }
    this.rendimiento=navParams.get('rendimiento');
    this.truta= navParams.get('truta');
    this.combustibles = [];
    this.GetPCombustible().subscribe(clientes => {
        for (const id$ in clientes) {
            const p = clientes[id$];
            p.id$ = id$;
            this.combustibles.push(clientes[id$]);
            }
        console.log(this.combustibles);
    this.ApiSakbeJson(this.origen).subscribe(valor => {this.orig = valor[0]
      this.ApiSakbeJson(this.destino).subscribe(valor2 => {this.dest = valor2[0]
        this.getdata1().subscribe(valor3 => {this.data = valor3[0]
          this.getdata2().subscribe(valor4 => {this.data4 = valor4[0]
            this.orig=(JSON.parse(valor[0].geojson));
            //console.log();
          var la=this.orig.coordinates[1];
          var lg=this.orig.coordinates[0];
          var latLng: any;
          latLng = new google.maps.LatLng(la, lg);
          let mapProp = {
              center: latLng,
              zoom: 7,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
          var infowindow = new google.maps.InfoWindow();
          google.maps.event.addListener(map, 'click', function () {
              infowindow.close();
          });
          map.data.addListener('click', function (event) {
            try{
              var myHTML = event.feature.getProperty("content");
              infowindow.setContent("<div style='width:150px; text-align: center;'>" + myHTML + "</div>");
              infowindow.setPosition(event.feature.getGeometry().get());
              infowindow.setOptions({
                  pixelOffset: new google.maps.Size(0, -30)
              });
              infowindow.open(map);}
              catch(e){
                
              }
          });
          var jsonDataOrigen = '{"type": "FeatureCollection","features": [{"type": "Feature","properties": {"icon": "circulo","id-intern": "1235","name": "Bellevue","content": "Punto de Partida(Origen)"},"geometry":' + valor[0].geojson + '}]}';
          var jsonDataDestino = '{"type": "FeatureCollection","features": [{"type": "Feature","properties": {"id-intern": "3216","name": "GG","content": "Destino"},"geometry":' + valor2[0].geojson + '}]}';
          //console.log(valor2[0].geojson);
          map.data.addGeoJson(JSON.parse(jsonDataOrigen));
          map.data.addGeoJson(JSON.parse(jsonDataDestino));
          let contador_casetas=0;
          for(let i=0; i<valor4.length; i++){
            var jsonData = '{"type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry":' + valor4[i].geojson + '}]}';
            if(valor4[i].punto_caseta!=null){
              contador_casetas=contador_casetas+1;
              console.log(valor4[i].punto_caseta);
              console.log(valor4[i].direccion);
              var caseta = '{"type": "FeatureCollection","features": [{"type": "Feature","properties": {"icon": "caseta","id-intern": "1236","name": "Caseta","content":"Caseta #'+contador_casetas+',  '+(valor4[i].direccion).toString() +',   Costo Caseta= $'+valor4[i].costo_caseta+' MXN '+'"},"geometry":' + valor4[i].punto_caseta + '}]}';
              map.data.addGeoJson(JSON.parse(caseta));
            }
            map.data.addGeoJson(JSON.parse(jsonData));
          }
        // console.log(valor3[0].geojson);
          
           
            map.data.setStyle(function(feature) {
              var icon = feature.getProperty('icon');
              console.log(icon);
              if (icon === 'circulo') {return {icon: {strokeColor: 'grid', path: google.maps.SymbolPath.CIRCLE, scale: 5}}
              }else  if (icon === 'caseta'){return {icon: {url: "assets/caseta.png"}}}
              else{ return {strokeColor: 'blue'} }
          });
          //console.log(JSON.parse(jsonData));
          this.costcasetas=valor3[0].costo_caseta;
          this.distancia=valor3[0].long_km;
          valor3[0].tiempo_min = Math.floor(valor3[0].tiempo_min);
         if ( this.tcombustible === '0') {
              this.costlcombus = this.combustibles[0].costo;
         }else if ( this.tcombustible === '1') {
              this.costlcombus = this.combustibles[1].costo;
         }else if ( this.tcombustible === '2') {
          this.costlcombus = this.combustibles[2].costo;
         }else {
              this.costlcombus = this.combustibles[3].costo;
          }
          this.lcombus = (valor3[0].long_km / this.rendimiento).toFixed(2);
        this.costcombus = (parseFloat(this.lcombus) * (this.costlcombus)).toFixed(2);
          var com = parseFloat(this.costcombus);
          var cas = parseFloat(this.costcasetas);
         this.costtot = (com + cas).toFixed(2);
         this.tiempo=Math.floor(valor3[0].tiempo_min / 60) + ' Horas con ' + (valor3[0].tiempo_min - ((Math.floor(valor3[0].tiempo_min / 60)) * 60) ) + ' minutos'
          this.cargando=false;
        });
    });
  });
    });
  });
  }
  GetPCombustible() {
    var urlApiBusqueda = "http://gaia.inegi.org.mx/sakbe/wservice?make=CM&type=json&key=BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC";   
    this.json1 = this.http.get(urlApiBusqueda).map( res => res.json());
    //console.log(this.json1);
    return this.json1;
  }
  getdata2() {   
    var urlApiBusqueda = "http://gaia.inegi.org.mx/sakbe/wservice?make=GD&dest_i=#orig&dest_f=#dest&p=#truta&v=#vehiculo&e=0&type=json&key=BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC";   
    var token = 'BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC';
    var urlApiBusquedaTmp = urlApiBusqueda.replace('#orig', this.orig.id_dest);
    urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#dest', this.dest.id_dest);
    //urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#prioridad', this.prioridad);
    urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#truta', this.truta);
    urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#vehiculo', this.vehiculo);
    
    //console.log(this.orig.id_dest, this.dest.id_dest,this.prioridad)
    //urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#token', token);
    console.log(urlApiBusquedaTmp);
    this.json1 = this.http.get(urlApiBusquedaTmp).map( res => res.json());
    console.log(this.json1);
    return this.json1;
}
getdata1() {   
  var urlApiBusqueda = "http://gaia.inegi.org.mx/sakbe/wservice?make=CR&dest_i=#orig&dest_f=#dest&p=#truta&v=#vehiculo&e=0&type=json&key=BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC";   
  var token = 'BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC';
  var urlApiBusquedaTmp = urlApiBusqueda.replace('#orig', this.orig.id_dest);
  urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#dest', this.dest.id_dest);
  //urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#prioridad', this.prioridad);
  urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#truta', this.truta);
  urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#vehiculo', this.vehiculo);
  
  //console.log(this.orig.id_dest, this.dest.id_dest,this.prioridad)
  //urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#token', token);
  console.log(urlApiBusquedaTmp);
  this.json1 = this.http.get(urlApiBusquedaTmp).map( res => res.json());
  console.log(this.json1);
  return this.json1;
}
  ApiSakbeJson(valor) {
    var urlApiBusqueda = "http://gaia.inegi.org.mx/sakbe/wservice?make=SD&buscar=#buscar&key=BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC&type=json";   
    var token = 'BszOJ8j5-Snwo-I9K5-bBC1-3ZmQkliBa3NC';
    var urlApiBusquedaTmp = urlApiBusqueda.replace('#buscar', valor);
    //urlApiBusquedaTmp = urlApiBusquedaTmp.replace('#token', token);
    console.log(urlApiBusquedaTmp);
    this.json1 = this.http.get(urlApiBusquedaTmp).map( res => res.json());
    console.log(this.json1);
    return this.json1;
  }

  addInfoWindow(marker, content){
    
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
    
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RutaPage');
  }
  
  compartir(){
// Share
this.socialSharing.shareViaWhatsApp('¿Vas a viajar? Usala para saber cuanto te va a costar: ','http://i63.tinypic.com/2h3tq9i.png','https://play.google.com/store/apps/details?id=com.hipersoft.viajeros').then(() => {
  // Success!
}).catch(() => {
  // Error!
});
  }
}
