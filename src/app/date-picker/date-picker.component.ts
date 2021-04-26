import { Component, OnInit } from '@angular/core';
import {FormBuilder ,FormControl, FormGroup, FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoinDataService } from '../coin-data.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  datePickForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: CoinDataService, private http: HttpClient ) { 
    this.datePickForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.datePickForm = this.fb.group(
      {
        date : new FormControl(),
        time : new FormControl(),
        coinName : new FormControl() 
      });
      
  }

  getTrades()
  {
    let startTime = this.convertToTimeStamp(this.datePickForm.get('date')?.value, this.datePickForm.get('time')?.value);
    let endTime = new Date(Number(startTime));
    endTime.setMinutes((endTime.getMinutes()) + 59);

    let httpParams = new HttpParams()
                        .set('symbol', this.datePickForm.get('coinName')?.value)
	                      .set('startTime', startTime)
                        .set('endTime', endTime.valueOf().toString());
    this.http.get('https://api.binance.com/api/v3/aggTrades?', {
      params: httpParams
    }).subscribe(data => {
      this.dataService.changeData(JSON.stringify(data));
    });



  }

  convertToTimeStamp(date: Date, time: string): string{
    let chosenDate: Date = date;
    chosenDate.setHours(Number(time.split(":")[0]));
    chosenDate.setMinutes(Number(time.split(":")[1]));
    return chosenDate.valueOf().toString();
  }

  /*convertFormInputToTrades()
  {
    let trades = [];
    trades.push(this.datePickForm.get('startDate')?.value);
    trades.push(this.datePickForm.get('endDate')?.value);
    trades.push(this.datePickForm.get('startTime')?.value);
    trades.push(this.datePickForm.get('endTime')?.value);
    trades.push(this.datePickForm.get('coinName')?.value);
    
    return trades;

  }*/

}
