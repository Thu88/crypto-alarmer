import { Component } from '@angular/core';
import { AlarmServiceService } from './alarm-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoinInspector';
  constructor (private alarmService: AlarmServiceService) {
    alarmService.getAlarms()
  }
}
