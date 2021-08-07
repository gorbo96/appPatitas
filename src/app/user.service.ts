import { Injectable } from '@angular/core';


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

  constructor() { }

  setUser(user:user){
    this.user = user
  }

  getUID(){
    return this.user.uid
  }

}
