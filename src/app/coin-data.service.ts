import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


//This service is used to tranfer data between the alarm component and the coin-chart component.
@Injectable({
  providedIn: 'root'
})
export class CoinDataService {
  private dataSource = new BehaviorSubject("{}");
  currentData = this.dataSource.asObservable();

  constructor() { }
  changeData(data: string)
  {
    this.dataSource.next(data);
  }
}
