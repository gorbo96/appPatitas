import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgCalendarModule } from 'ionic2-calendar';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { CrearMascotasPageRoutingModule } from './pages/crear-mascotas/crear-mascotas-routing.module';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { AgmCoreModule } from '@agm/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClientModule } from "@angular/common/http";

//IMPORTAMOS GEOLOCATION Y GEOCODER
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            NgCalendarModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
		        AngularFirestoreModule,
            HttpClientModule,
            CrearMascotasPageRoutingModule,
            AgmCoreModule.forRoot({
              apiKey: 'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'
            }),
          
          ],
  providers: [Camera,
              //AÑADIMOS GEOLOCATION Y GEOCODER
              CallNumber,
              LocalNotifications,
              Geolocation,    
              NativeGeocoder,
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}