import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ContactosService } from 'src/app/services/contactos.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-contactos-totales',
  templateUrl: './contactos-totales.page.html',
  styleUrls: ['./contactos-totales.page.scss'],
})
export class ContactosTotalesPage implements OnInit {

  contactos : any;

  constructor(private router: Router,
              private callNumber: CallNumber,
              public user: UserService,
              private contactosService: ContactosService) { }

  ngOnInit() {
    this.contactos=this.contactosService.getContactosUsuario(this.user.getUser().uid);
  }

  regresar(){
    this.router.navigate(["/menu-p"]);
  }

  llamar(contacto:any){
    this.callNumber.callNumber(""+contacto.tlfMovil+"", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  
  eliminarContacto(contacto:any){
    contacto.activo=false;
    this.contactosService.save(contacto);
  }

}
