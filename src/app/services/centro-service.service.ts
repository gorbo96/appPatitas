import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Centro } from '../domain/centro';

@Injectable({
  providedIn: 'root'
})
export class CentroServiceService {

  constructor(public afs: AngularFirestore) { }


  getCentros(ct:string):Observable<any[]>{

    var boolValue = (ct =="Tiendas de Comida");
    console.log(boolValue);
    
    return this.afs.collection("centros",
            ref=> ref.where("tipo","==",boolValue)).valueChanges();
  }


}
