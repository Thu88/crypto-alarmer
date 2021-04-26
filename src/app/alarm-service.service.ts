import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class AlarmServiceService {
  //BehaviorSubject sends a message at initiation by default. The program makes the default message a json trade in string format.
  private dummyTrade: any = JSON.stringify([{'a':1,'p':'test','q':'test','f':1,'l':1,'T':1,'m':false,'M':false,'s':'empty','E':1}]);
  private dataSource = new BehaviorSubject(this.dummyTrade);
  currentData = this.dataSource.asObservable();

  constructor() { }
  changeData(data: string)
  {
    this.dataSource.next(data);
  }

  //Listning for alarms from a websocket server. In this case, the server is a python program.
  getAlarms() {
    let myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8000');
    myWebSocket.asObservable().subscribe((data) => {
      this.changeData(JSON.stringify(data));
    });
  }
}
