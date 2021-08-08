import { Component, OnInit } from '@angular/core';
import { CentroinfoService } from '../../services/centroinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.page.html',
  styleUrls: ['./centro.page.scss'],
})
export class CentroPage implements OnInit {

  constructor(public centroinf: CentroinfoService,
              public router: Router,) { }

  info:any
  nombre:string;
  horario:string;
  dias:string;
  contacto1:string;
  contacto2:string;
  descripcion:string;

  ngOnInit() {
    this.info = this.centroinf.getcentro();
    this.nombre = this.info.nombre; 
    this.horario = "De " + this.info.horaIniAten + " a " + this.info.horaFinAten;
    this.dias = this.info.diasAtencion;
    this.contacto1 = this.info.numero1;
    this.contacto2 = this.info.numero2;
    this.descripcion = this.info.acercaDe;
  }

  mapa(){
    this.router.navigate(['/mapa'])
    
  }

  volver(){

    if (this.info.tipo == true){
      this.router.navigate(['/listacentros/Tiendas de Comida'])
    }else{
      this.router.navigate(['/listacentros/Centros Veterinarios'])
    }
  }

}
