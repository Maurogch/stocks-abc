import { ArticlesConsumption } from './../../../models/articles-consumption';
import { ArticlesService } from './../../../services/articles.service';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(
    private theme: NbThemeService,
    private articlesService: ArticlesService
  ) {}

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.articlesService.getAllConsumption().subscribe(data => {
        const articles = data as ArticlesConsumption[];
        const artsCode = [];
        const artsConsumption = [];

        articles.forEach(article => {
          artsCode.push(article.code);
          artsConsumption.push(article.consumption);
        });

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: artsCode,
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor
                }
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor
                }
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor
                }
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor
                }
              }
            }
          ],
          series: [
            {
              name: 'Score',
              type: 'bar',
              barWidth: '60%',
              data: artsConsumption
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
