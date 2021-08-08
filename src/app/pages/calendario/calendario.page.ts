import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,private localNotifications: LocalNotifications) { 
    ;
  }
 
  ngOnInit() {
    this.resetEvent();
    this.localNotifications.requestPermission()    
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
   
  
  changeMode(mode) {
    this.calendar.mode = mode;
  }
   
  
  today() {
    this.calendar.currentDate = new Date();
  }
   
  
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   
  
  async onEventSelected(event) {
    
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
   
  
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
}
