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

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            NgCalendarModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
		        AngularFirestoreModule,
            CrearMascotasPageRoutingModule],

  providers: [CallNumber, Camera,LocalNotifications,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}