import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  constructor(public homeService: HomeService) {  }

  public username:string;

  onSubmit(user) {
    this.username = user;
    this.loadLanguages();
  }

  loadLanguages () {
      this.homeService.getUrl(this.username).subscribe(res => {
        let label = []
        let data = [];

        for(let key of Object.keys(res.languages)){
          label.push(key)
          data.push(res.languages[key])
        }

        this.label = label;
        this.data = data;

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
              labels: this.label,
              datasets: [
                {
                    label: "Languages Stats",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.data,
                    spanGaps: false,
                }
              ]
          }
      });
   }, err => console.log(err));
 }

  public label:any = [];
  public data:any = [];


  ionViewDidLoad() {  }
}
