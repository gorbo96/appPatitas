import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  constructor() { }

  calendar={
    mode:'month',
    currentDate: new Date()
  }

  minDate=new Date().toISOString();

  event={
    title:'',
    desc:'',
    startTime:'',
    endTime:'',
    allDay:false,    
  }

  @ViewChild(CalendarComponent, null) myCalendar:CalendarComponent;

  eventSource=[]
  ngOnInit() {
    this.resetEvent()
  }

  onCurrentDateChanged(){

  }
  onRangeChanged(){

  }
  onEventSelected(){

  }
  onTitleChanged(){

  }
  onTimeSelected(){

  }
  resetEvent(){
    this.event={
      title:'',
      desc:'',
      startTime:new Date().toISOString(),
      endTime:new Date().toISOString(),
      allDay:false      
    }
  }


}
