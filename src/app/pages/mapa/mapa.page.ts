//IMPORTAR LOS MODULOS NECESARIOS PARA LAS FUNCIONES.

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Router } from '@angular/router';
import { CentroinfoService } from '../../services/centroinfo.service';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {


  map: any;
  address:string;
  lat: any;
  long: any;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  mapOptions: any;
  latLng:any;

  info:any;

  latdes: any;
  longdes: any;  

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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude

      this.mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      } 
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, this.mapOptions);
    
  }


  startNavigating(){
    
    let directionsService = new google.maps.DirectionsService;
    
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsDisplay.setPanel(document.getElementById("directionsPanel") as HTMLElement);

    let latLngdes = new google.maps.LatLng( this.latdes , this.longdes );

    console.log(latLngdes);
    

    directionsService.route({
          origin: this.latLng, 
          destination: latLngdes,
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

  //AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
  /*UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }*/
  
  //FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
  /*SelectSearchResult(item) {
    //AQUI PONDREMOS LO QUE QUERAMOS QUE PASE CON EL PLACE ESCOGIDO, GUARDARLO, SUBIRLO A FIRESTORE.
    //HE AÑADIDO UN ALERT PARA VER EL CONTENIDO QUE NOS OFRECE GOOGLE Y GUARDAMOS EL PLACEID PARA UTILIZARLO POSTERIORMENTE SI QUEREMOS.
    alert(JSON.stringify(item))      
    this.placeid = item.place_id
  }*/
  
  
  //LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  /*ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }*/
 
  //EJEMPLO PARA IR A UN LUGAR DESDE UN LINK EXTERNO, ABRIR GOOGLE MAPS PARA DIRECCIONES. 
  /*GoTo(){
    return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id='+this.placeid;
  }*/

}