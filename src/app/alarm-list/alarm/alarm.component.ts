import { Component, Input, OnInit } from '@angular/core';
import { CoinDataService } from 'src/app/coin-data.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  @Input("alarm") alarm: any;
  constructor(private service: CoinDataService) { }

  ngOnInit(): void {
  }
  //When an alarm is clicked on the trades are sent to the service, who then sends them to the chart component.
  goToAlarm() {
    this.service.changeData(JSON.stringify(this.alarm.trades))
  }

}
