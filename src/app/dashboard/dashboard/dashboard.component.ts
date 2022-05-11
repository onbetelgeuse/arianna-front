import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../shared/components/base.component';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private readonly eventsService: EventsService) {
    super();
  }

  ngOnInit(): void {
    this.eventsService.init();
    this.eventsService
      .fromEvent('events')
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => console.log(value));

    this.eventsService
      .fromEvent('message-event')
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => console.log(value));

    this.eventsService
      .fromEvent('job-event')
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => console.log(value));

    this.eventsService.connect();
  }
}
