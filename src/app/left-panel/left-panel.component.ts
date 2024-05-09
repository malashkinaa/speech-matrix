import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { YoutubeComponent } from '../youtube/youtube.component';
import { Link, StatsSummary } from '../interfaces/stats';
import { SharedDataService } from '../services/shared-data.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [TaskComponent, YoutubeComponent],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})

export class LeftPanelComponent implements OnInit {
  constructor(
    private statsService: StatsService,
    private sharedDataService: SharedDataService
  ){}
  curVideoId: string = '';
  statsSummary: StatsSummary = {url: '', stats: [] }
  ngOnInit(): void{
    this.sharedDataService.statsSummary$.subscribe((statsSummary) => {
      console.log('StatsComponent.ngOnInit', statsSummary);
      this.statsSummary = statsSummary;
      this.curVideoId = this.statsService.extractVideoId(this.statsSummary.url);
    })
  }
}

