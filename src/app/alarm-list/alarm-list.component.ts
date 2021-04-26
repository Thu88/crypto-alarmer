import { Component, OnInit } from '@angular/core';
import { AlarmServiceService } from '../alarm-service.service';
import { alarm } from '../entities/alarm';
import { jsontrade } from '../entities/jsontrade';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss']
})

//A container component holding all the alarms
export class AlarmListComponent implements OnInit {

  alarms: alarm[];
  id: number = 0;
  trades: jsontrade[]

  constructor(private alarmService: AlarmServiceService) {
    this.alarms = [];
    this.trades = [];
   }
  
  ngOnInit(): void {

    //Subscribes to the alarm service and adds new alarm when recieving a new alarm.
    this.alarmService.currentData.subscribe((data) => {
      this.trades = JSON.parse(data);
      if (this.trades.length > 1)
      {
        //Only adding the alarm if there doesnt exists an alarm with the coin name in the alarms array already.
        if ((this.alarms.filter(alarm => alarm.name === this.trades[0].s)).length !== 1)
        this.addAlarm(this.trades[0].s, this.trades);
      }
    })
  }

  //Plays a sound when an alarm is recieved.
  playAudio(){
    let audio = new Audio();
    audio.src = "/../../assets/sonar.ogg";
    audio.load();
    audio.play();
  }

  //Adds an alarm to the alarm array.
  addAlarm(name: string,trades: any) {
    this.playAudio();
    this.alarms.push({"name": name, "id": ++this.id, "trades": trades});
  }

  //Removes an alarm
  removeAlarm(id: number)
  {
    this.alarms = this.alarms.filter(alarm => alarm.id !== id);
  }

}
