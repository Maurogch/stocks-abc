import { ModelConfig } from './../../../models/model-config';
import { ModelConfigService } from './../../../services/model-config.service';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'ngx-d3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./d3.component.scss'],
  templateUrl: './d3.component.html'
})
export class D3Component implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view = 'month';

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<any>>>;

  activeDayIsOpen = false;

  constructor(private modelConfigService: ModelConfigService) {}

  ngOnInit() {
    // @ts-ignore
    this.events$ = Observable.of({});
    this.loadCalendar();
  }

  loadCalendar() {
    const events_array = [];
    this.modelConfigService.getAll().subscribe(data => {
      data.forEach((modelConfig: ModelConfig) => {
        const date = new Date(modelConfig.lastDelivery);
        let color;
        date.setDate(date.getDate() + modelConfig.reviewPeriod);
        console.log(modelConfig);

        if (modelConfig.supplier === 'Proveedor A') {
          color = colors.blue;
        } else if (modelConfig.supplier === 'Proveedor B') {
          color = colors.yellow;
        } else {
          color = colors.red;
        }

        events_array.push({
          start: date,
          title: 'Envío de productos de ' + modelConfig.supplier,
          color: color,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true
        });

        this.events$ = Observable.of(events_array);
      });
    });
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<any>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<any>): void {
    console.log(event);
  }

  setView(view: string) {
    this.view = view;
  }
}
