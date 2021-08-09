import { Component, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-p',
  templateUrl: './menu-p.page.html',
  styleUrls: ['./menu-p.page.scss'],
})
export class MenuPPage implements OnInit {

  constructor(public user: UserService, public readonly auth: AngularFireAuth,public router: Router) { }

  ngOnInit() {
  }

  nombre = this.user.getName()


  logout(){
    console.log("OUT")
    this.auth.signOut();
    this.router.navigate(['/inicio-sesion'])
  }

  test(){
    console.log("Funciona")
  }
 
  
  centro(ste:boolean){
    if(ste){
      this.router.navigate(['/listacentros/Tiendas de Comida'])
    }else{
      this.router.navigate(['/listacentros/Centros Veterinarios'])
    }
  
  }

  misMascotas(){
    this.router.navigate(['/mascotas'])
  }

}
