//IMPORTAR LOS MODULOS NECESARIOS PARA LAS FUNCIONES.

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { CentroinfoService } from '../../services/centroinfo.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {


  map: any;
  address:string;
   
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  mapOptions: any;
  latLng:any;

  info:any;

  lat: string ;
  long: string ; 
  
  latdes: string ;
  longdes: string ;  

  constructor(
    public centroinf: CentroinfoService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,
    public router: Router,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }


 
  //CARGAMOS EL MAPA EN ONINIT
  ngOnInit() {
    
    this.info = this.centroinf.getcentro();
    this.latdes = this.info.lat;
    this.longdes = this.info.lng;
    console.log("lat " +this.latdes+", long "+this.longdes );

    this.loadMap();
    
  }


 //CARGAR EL MAPA TIENE DOS PARTES 
  loadMap() {
    
    //OBTENEMOS LAS COORDENADAS DESDE EL TELEFONO.


      this.geolocation.getCurrentPosition({ enableHighAccuracy: true,timeout: 5000,maximumAge: 0 }).then((resp) => {
        this.lat = (resp.coords.latitude).toString();
        this.long = (resp.coords.longitude).toString();
      }).catch((error) => {
        console.log('Error getting location', error);
      });


      

      //let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);              //resp.coords.latitude, resp.coords.longitude);
      

      this.mapOptions = {
        center: {lat: +this.lat , lng: +this.long },
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 


    
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, this.mapOptions);
    
    
    
    
  }


  startNavigating(){
    
    let directionsService = new google.maps.DirectionsService;
    
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsDisplay.setPanel(document.getElementById("directionsPanel") as HTMLElement);

    //let latLngdes = new google.maps.LatLng( this.latdes , this.longdes );

    //console.log(latLngdes);
    

    directionsService.route({
          origin: {lat: +this.lat , lng: +this.long }, 
          destination: {lat: +this.latdes , lng: +this.longdes },
          travelMode: google.maps.TravelMode['DRIVING']
        }, 
    
        (res:any) => {
          
              directionsDisplay.setDirections(res);
              //console.log(res);
              
          
              
          }
    );


    
}

  
  

  //FUNCION DEL BOTON INFERIOR PARA QUE NOS DIGA LAS COORDENADAS DEL LUGAR EN EL QUE POSICIONAMOS EL PIN.
  ShowCords(){
    //alert('lat ' +this.lat+', long '+this.long )
    this.startNavigating()
  }
  
  
  volver(){
    //alert('lat ' +this.lat+', long '+this.long )
    this.router.navigate(['/centro'])
  }

}