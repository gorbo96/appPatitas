import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface user{
    uid:string,
    nombre:string,
    correo:string,
    clave:string,
    activo:boolean,
    tipo:boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:user

  constructor(public afs: AngularFirestore) { }

  setUser(user:user){
    this.user = user
  }

  getUID(){
    return this.user.uid
  }

  getName(){
    return this.user.nombre
  }


  getData(uid:string):Observable<any[]>{
    console.log(uid);
    
    return this.afs.collection("usuarios",
            ref=> ref.where("uid","==",uid)).valueChanges();
  }

  getActivo(){
    return this.user.activo
  }
  
  getUser(){
    return this.user
  }

  

}
