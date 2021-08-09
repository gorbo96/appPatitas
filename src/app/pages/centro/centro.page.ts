import { Component, OnInit } from '@angular/core';
import { CentroinfoService } from '../../services/centroinfo.service';
import { Router } from '@angular/router';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { UserService } from 'src/app/user.service';
import { Comentario } from 'src/app/domain/comentario';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.page.html',
  styleUrls: ['./centro.page.scss'],
})
export class CentroPage implements OnInit {

  constructor(public centroinf: CentroinfoService,
              public imagenesService: ImagenesService,
              public router: Router,
              public user: UserService,
              public comentarioService:ComentariosService) { }

  addComent=false;
  info:any
  nombre:string;
  horario:string;
  dias:string;
  contacto1:string;
  contacto2:string;
  descripcion:string;
  imagenes:any;

  comentario: Comentario = new Comentario();

  usuario=this.user.getUser();

  comentarios:any;

  sliderOpts={
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween:20
  }

  ngOnInit() {
    this.info = this.centroinf.getcentro();
    this.nombre = this.info.nombre; 
    this.horario = "De " + this.info.horaIniAten + " a " + this.info.horaFinAten;
    this.dias = this.info.diasAtencion;
    this.contacto1 = this.info.numero1;
    this.contacto2 = this.info.numero2;
    this.descripcion = this.info.acercaDe;
    console.log(this.info.uid);
    this.imagenes= this.imagenesService.getImagenes(this.info.uid);
    this.comentarios=this.comentarioService.getComentarios(this.info.uid);
  }

  addComentario(){
    this.addComent=true;
  }

  guardarComentario(){
    this.addComent=false;
    this.comentario.uidCentro=this.info.uid;
    this.comentario.uidUsuario=this.usuario.uid;
    this.comentario.nombreUsuario=this.usuario.nombre;
    this.comentarioService.save(this.comentario)
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
