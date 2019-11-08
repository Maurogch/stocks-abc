import { ArticlesZones } from './../../../models/articles-zones';
import { ArticlesService } from './../../../services/articles.service';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  articlesZones = new ArticlesZones();

  constructor(
    private theme: NbThemeService,
    private articlesService: ArticlesService
  ) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.articlesService.getZones().subscribe(data => {
        this.articlesZones = data as ArticlesZones;

        this.options = {
          backgroundColor: echarts.bg,
          color: [
            colors.warningLight,
            colors.infoLight,
            colors.dangerLight,
            colors.successLight,
            colors.primaryLight
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Zona A', 'Zona B', 'Zona C'],
            textStyle: {
              color: echarts.textColor
            }
          },
          series: [
            {
              name: 'Zones',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                { value: this.articlesZones.zoneA.toFixed(), name: 'Zona A' },
                { value: this.articlesZones.zoneB.toFixed(), name: 'Zona B' },
                { value: this.articlesZones.zoneC.toFixed(), name: 'Zona C' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor
                }
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor
                  }
                }
              }
            }
          ]
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
