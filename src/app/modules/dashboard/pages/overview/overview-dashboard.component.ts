import {Component, OnInit} from '@angular/core'
import { ThemeConstantService } from '../../../../shared/services/theme-constant.service';
import {ShowcaseService} from "../../../../shared/services/core/showcase.service";
import {View} from "../../../../shared/interfaces/view.typs";

@Component({
    templateUrl: './overview-dashboard.component.html'
})

export class OverviewDashboardComponent implements OnInit{

    themeColors = this.colorConfig.get().colors;
    blue = this.themeColors.blue;
    blueLight = this.themeColors.blueLight;
    cyan = this.themeColors.cyan;
    cyanLight = this.themeColors.cyanLight;
    gold = this.themeColors.gold;
    purple = this.themeColors.purple;
    purpleLight = this.themeColors.purpleLight;
    red = this.themeColors.red;

    taskListIndex: number = 0;

    constructor(
      private colorConfig:ThemeConstantService,
      private showcaseService: ShowcaseService
    ) {}

    ngOnInit(){
      this.showcaseService.getSatistics().subscribe((res) => {
        if([200].includes(res.status) && res.body.result) {
          this.propertiesChartData[0] = res.body.result.totalResidences;
          this.propertiesChartData[1] = res.body.result.totalBuildings;
          this.propertiesChartData[2] = res.body.result.totalProperties;
          res.body.result.views.map((view: View) => {
            this.viewChartData[0].data.push(view.count);
            this.viewChartLabels.push(view.date);
          });
        }
      });
    }

    revenueChartFormat: string = 'revenueMonth';
    viewChartData: Array<any> = [{
        data: [],
        label: 'Views'
    }];
    viewChartLabels:Array<any> = [];
    viewChartOptions: any = {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
            mode: 'nearest',
            intersect: true
        },
        tooltips: {
            mode: 'index'
        },
        scales: {
            xAxes: [{
                gridLines: [{
                    display: false,
                }],
                ticks: {
                    display: true,
                    fontColor: this.themeColors.grayLight,
                    fontSize: 13,
                    padding: 10
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    drawTicks: false,
                    borderDash: [3, 4],
                    zeroLineWidth: 1,
                    zeroLineBorderDash: [3, 4]
                },
                ticks: {
                    display: true,
                    max: 40,
                    stepSize: 20,
                    fontColor: this.themeColors.grayLight,
                    fontSize: 13,
                    padding: 10
                }
            }],
        }
    };
    viewChartColors: Array<any> = [
        {
            backgroundColor: this.themeColors.transparent,
            borderColor: this.blue,
            pointBackgroundColor: this.blue,
            pointBorderColor: this.themeColors.white,
            pointHoverBackgroundColor: this.blueLight,
            pointHoverBorderColor: this.blueLight
        }
    ];
    viewChartType = 'line';

    propertiesChartLabels: string[] = ['Residences', 'Buildings', 'Properties'];
    propertiesChartData: number[] = [];
    customersChartColors: Array<any> =  [{
        backgroundColor: [this.cyan, this.purple, this.gold],
        pointBackgroundColor : [this.cyan, this.purple, this.gold]
    }];
    customersChartOptions: any = {
        cutoutPercentage: 75,
        maintainAspectRatio: false
    }
    customersChartType = 'doughnut';

}
