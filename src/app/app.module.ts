import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { CrearMascotasPageRoutingModule } from './pages/crear-mascotas/crear-mascotas-routing.module';



//Imports Floro
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './user.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],


  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
		        AngularFirestoreModule,
            CrearMascotasPageRoutingModule],
  providers: [Camera,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
