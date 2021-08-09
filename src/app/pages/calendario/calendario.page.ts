import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
    frecuency:0,
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle: any;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private localNotifications: LocalNotifications,
              private router: Router,
              public notificacionesService:NotificacionesService,
              public afstore: AngularFirestore
              ) { 
    
  }
  
  vacunas:any;
  medicamentos:any;

  ngOnInit() {
    this.resetEvent();
    this.localNotifications.requestPermission();
    this.cargarEventos();
    this.cargarMedicamentos();
  }

  async cargarEventos(){  
    this.vacunas=this.notificacionesService.getVacunas();
    this.vacunas.forEach((element) => {

      for (let index = 0; index < element.length; index++) {
        let eventCopy = {
          title: element[index].nombre,
          startTime:  new Date(element[index].fechaProxima),
          endTime: new Date(element[index].fechaProxima),
          allDay: false,
          desc: element[index].utilidad,
          frecuency:1
        }   
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvent();
        let fecha=new Date(element[index].fechaProxima);
        let nombreVacuna=element[index].nombre;
    this.localNotifications.schedule({
      text: "Tiene una vacuna pendiente: "+nombreVacuna.toString(),
      trigger: {at: fecha},                 
   });
      }
    });  
  }
  async cargarMedicamentos(){  
    this.medicamentos=this.notificacionesService.getMedicamentos();
    this.medicamentos.forEach((element) => {

      for (let index = 0; index < element.length; index++) {
        let eventCopy = {
          title: element[index].nombre,
          startTime:  new Date(element[index].fechaInicio),
          endTime: new Date(element[index].fechaFin),
          allDay: false,
          frecuency:element[index].frecuency
        }   
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvent();
        let fecha=new Date(element[index].fechaInicio);
        let frecuencia=element[index].frecuency;
        let nombreMedicamento=element[index].nombre;
    this.localNotifications.schedule({
      text: "Tiene una vacuna pendiente: "+nombreMedicamento.toString(),
      trigger: { count:frecuencia ,firstAt:fecha, every:ELocalNotificationTriggerUnit.HOUR}                 
   });
      }
    });  
  }

  schedulebasic(){    
    let fecha=new Date();
    fecha.setMinutes(10)
    fecha.setHours(9)
    this.localNotifications.schedule({
      text: fecha.toString(),
      trigger: {at: fecha},                 
   });
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      frecuency:0,
    };
  }
 
  
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc,
      frecuency:this.event.frecuency
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  
  changeMode(mode: string) {
    this.calendar.mode = mode;
  }
   
  
  today() {
    this.calendar.currentDate = new Date();
  }
   
  
  onViewTitleChanged(title: any) {
    this.viewTitle = title;
  }
   
  
  async onEventSelected(event: { startTime: string | number | Date; endTime: string | number | Date; frecuency: any; title: any; desc: any; }) {
    
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    let frecuencia=event.frecuency
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'Inicio: ' + start + '<br><br>Final: ' +end +'<br><br>Frecuencia del Medicamento: cada ' + frecuencia + ' horas',
      buttons: ['OK']
    });
    alert.present();
  }
   
  
  onTimeSelected(ev: { selectedTime: string | number | Date; }) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  regresar(){
    this.router.navigate(["/menu-p"]);
  }

}
