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
  nombre: string;

  ngOnInit() {
    this.info = this.centroinf.getcentro();
    this.nombre = this.info.nombre; 
  }


  volver(){

    if (this.info.tipo == true){
      this.router.navigate(['/listacentros/Tiendas de Comida'])
    }else{
      this.router.navigate(['/listacentros/Centros Veterinarios'])
    }
  }

}
