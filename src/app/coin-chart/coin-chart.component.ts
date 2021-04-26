import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CoinDataService } from '../coin-data.service';
import {jsontrade} from '../entities/jsontrade';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-coin-chart',
  templateUrl: './coin-chart.component.html',
  styleUrls: ['./coin-chart.component.scss']
})

export class CoinChartComponent implements OnInit {
  @Output() postClicked: EventEmitter<any> = new EventEmitter<any>();
  
  //Create options for the real volume chart (buy volume - sell volume).
  public volumeChartoptions: any = {
    chart: {
      type: 'spline',
      hight: 700
    },
    title: {
      text: 'Coin volume chart'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime'
    },
    series: [
      {
        name: 'Real volume (buy volume - sell volume)',
        turboThreshold: 500000,
        data: [1, 2, 3]
      }
      ]
  }


  //Create options for the real number of trades (buy trades - sell trades).
  public numberChartoptions: any = {
    chart: {
      type: 'spline',
      hight: 700
    },
    title: {
      text: 'Coin number of trades chart'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime'
    },
    series: [
      {
        name: 'Real number of trades (buy trades - sell trades)',
        turboThreshold: 500000,
        data: [1, 2, 3]
      }
      ]
  }

  volumeChart: any;
  numberChart: any;
  link: string
  constructor(private dataService: CoinDataService) { 
    this.link = "";
  }

  ngOnInit(): void {
    this.volumeChart = Highcharts.chart('volume-chart', this.volumeChartoptions);
    this.numberChart = Highcharts.chart('number-chart', this.numberChartoptions);

    //When data is recieved from the service, the charts are updated.
    this.dataService.currentData.subscribe((data => {
      let jsonObj: jsontrade[] = JSON.parse(data);
      if (jsonObj.length > 1) {
        let name = jsonObj[0].s
        //When alarms are recieved from the ws server this link will point the binance link about this coin.
        this.link = "https://www.binance.com/en/trade/"+name.toLocaleUpperCase()+"?layout=pro"; 
      }
      
      //Store buy volume
      let buyerVolumeArray: Array<any> = [];
      let buyerVolSum: number = 0;
      
      //Store sell volume
      let sellerVolumeArray: Array<any> = [];
      let sellerVolSum: number = 0;
      
      //Store number of buy trades
      let buyTradesArray: Array<any> = [];
      let numberOfbuys: number = 0;

      //Store number of sell trades
      let sellTradesArray: Array<any> = [];
      let numberOfsells: number = 0;

      //Store real volume (buy volume - sell volume)
      let realVolumeArray: Array<any> = [];
      let realVolumeSum: number = 0;

      //Store real number of trades (buy trades - sell trades)
      let realTradesArray: Array<any> = [];
      let realNumberOfTrades: number = 0;

      for (let i = 0; i < jsonObj.length; i++)
      {
        let amount: number = Number(jsonObj[i]["p"])*Number(jsonObj[i]["q"]);
        let date: number = new Date(jsonObj[i]["T"]).getTime();
        
        //If buyer maker is false, it's a buy trade and is saved as such. 
        if (jsonObj[i]["m"] === false)
        {
          buyerVolSum += amount;
          buyerVolumeArray.push([date, buyerVolSum]);

          numberOfbuys += 1;
          buyTradesArray.push([date, numberOfbuys]);

          realVolumeSum += amount;
          realVolumeArray.push([date, realVolumeSum]);

          realNumberOfTrades += 1;
          realTradesArray.push([date, realNumberOfTrades]);
        }
        else //If buyer maker is true, it's a sell trade.
        {
          sellerVolSum += amount;
          sellerVolumeArray.push([date, sellerVolSum]);
          
          numberOfsells += 1;
          sellTradesArray.push([date, numberOfsells]);

          realVolumeSum -= amount;
          realVolumeArray.push([date, realVolumeSum]);

          realNumberOfTrades -= 1;
          realTradesArray.push([date, realNumberOfTrades]);
        }
      }
      
      //Pass chart options.
      this.volumeChartoptions.series[0]["data"] = realVolumeArray;
      this.numberChartoptions.series[0]["data"] = realTradesArray;  
      
      console.log([realVolumeArray]);
      console.log([realTradesArray]);

      //Update the charts.
      this.volumeChart.update(this.volumeChartoptions);
      this.numberChart.update(this.numberChartoptions);
    }));
  }

}
