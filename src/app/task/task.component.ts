import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Transcript } from '../interfaces/trancript';
import { SignalRService } from '../services/signalr.service';
import { SharedDataService } from '../services/shared-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  constructor(
    private statsService: StatsService,
    private signalRService: SignalRService,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute
  ){}
  url: string = '';
  externalVParam = '';
  // ngOnInit() {
  //   this.route.queryParamMap.subscribe((params) => {
  //     const vParam = params.get('v');
  //     if (vParam) {
  //       this.externalVParam = vParam;
  //       this.url = `https://www.youtube.com/watch?v=${vParam}`;
  //       this.addTask();
  //     }
  //   });
  // }
  addTask(url: string) {
    this.url = url;
    this.setEmptyStatsSummary(this.url);
    console.log('addTask', this.url);
    this.statsService
      .getIdByMediaUrl(this.url) // to do: extract video id from url
      .subscribe((id: any) => {
        console.log('searchTranscript', id);
        if (id && id.length > 0) {
          this.setStatsSummary(id);
        } else {
          this.statsService
            .createTranscript(this.url)
            .subscribe((res: Transcript) => {
              console.log('createTranscript', res);
              this.signalRService.startConnection();
              this.signalRService.addMessageListener<string>((id) => {
                this.setStatsSummary(id);
              });
            });
        }
      });
  }
  setEmptyStatsSummary(url: string): void {
    this.sharedDataService.setStatsSummary(
      this.statsService.emptyStatsSummary(url)
    );
  }
  setStatsSummary(id: string): void {
    console.log('saveStatsSummary', id);
    this.statsService.getStatsSummary(id).subscribe((statsSummary) => {
      this.sharedDataService.setStatsSummary(statsSummary);
    });
  }
}
