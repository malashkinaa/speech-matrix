import { Component } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { Transcript } from '../../interfaces/trancript';
import { SignalRService } from '../../services/signalr.service';
import { SharedDataService } from '../../services/shared-data.service';
import { SpinnerService } from '../../services/spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StatsSummary } from '../../interfaces/stats';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  constructor(
    private statsService: StatsService,
    private signalRService: SignalRService,
    private sharedDataService: SharedDataService,
    private spinnerService: SpinnerService
  ) {}
  url: string = '';
  externalVParam = '';
  addTask(url: string) {
    this.url = url;
    this.setEmptyStatsSummary();
    console.log('addTask', this.url);
    this.spinnerService.set(true);
    this.statsService
      .getIdByMediaUrl(this.url) // to do: extract video id from url
      .subscribe((id: string) => {
        console.log('searchTranscript', id);
        if (id && id.length > 0) {
          this.setStatsSummary(id, () => this.spinnerService.set(false));
        } else {
          this.statsService
            .createTranscript(this.url)
            .subscribe((res: Transcript) => {
              console.log('createTranscript', res);
              this.signalRService.startConnection();
              this.signalRService.addMessageListener<string>((id) => {
                this.setStatsSummary(id, () => this.spinnerService.set(false));
              });
            });
        }
      });
  }
  addTask2(url: string) {
    this.url = url;
    if (!this.url) return;
    this.setCurId();
    this.setEmptyStatsSummary();
    this.spinnerService.set(true);
    this.setStatsSummary2(() => {
      this.spinnerService.set(false);
    });
  }

  setCurId(): void {
    const id = this.statsService.extractVideoId(this.url);
    this.sharedDataService.setCurId(id);
  }

  setStatsSummary2(callback?: Function): void {
    this.statsService.getStatsSummary2(this.url).subscribe({
      next: (statsSummary: StatsSummary) => {
        this.sharedDataService.setStatsSummary(statsSummary);
        if (callback) callback();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        if (callback) callback();
      },
    });
  }
  setEmptyStatsSummary(): void {
    const url = this.url;
    this.sharedDataService.setStatsSummary(
      this.statsService.emptyStatsSummary(url)
    );
  }
  setStatsSummary(id: string, callback?: Function): void {
    console.log('saveStatsSummary', id);
    this.statsService.getStatsSummary(id).subscribe((statsSummary) => {
      this.sharedDataService.setStatsSummary(statsSummary);
      if (callback) callback();
    });
  }
}
