import { Injectable } from '@angular/core';


interface centroVis{
  centro:any
}


@Injectable({
  providedIn: 'root'
})
export class CentroinfoService {
  private centroVis:centroVis
  constructor() { }

  setcentro(centroVis:centroVis){
    this.centroVis = centroVis
  }

  getcentro(){
    return this.centroVis
  }

  limpiar(){
    this.centroVis = null
  }

}

