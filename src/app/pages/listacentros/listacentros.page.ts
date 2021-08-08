import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CentroServiceService } from '../../services/centro-service.service';
import { Router } from '@angular/router';

import { CentroinfoService } from '../../services/centroinfo.service';

@Component({
  selector: 'app-listacentros',
  templateUrl: './listacentros.page.html',
  styleUrls: ['./listacentros.page.scss'],
})
export class ListacentrosPage implements OnInit {
  
  public tipo: string;
  
  centros: any;


  constructor(private activatedRoute: ActivatedRoute, 
              private centrooService: CentroServiceService,
              public router: Router,
              public centroinf: CentroinfoService) { }

  ngOnInit() {
    this.tipo = this.activatedRoute.snapshot.paramMap.get('id');
    this.centros =  this.centrooService.getCentros(this.tipo);
  }

  bait(uid:any){
    
    console.log(uid);
    this.centroinf.setcentro(uid);
    this.router.navigate(['/centro']);
    
  }

  volver(){
    this.router.navigate(['/menu-p']);
  }


}
