import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { CentroinfoService } from '../../services/centroinfo.service';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {


  
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
    this.startNavigating()
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
}
