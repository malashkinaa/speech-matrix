import { Component, Input} from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { Link, Stats, StatsSummary } from '../interfaces/stats';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-usage.component.html',
  styleUrl: './word-usage.component.css'
})
export class WordUsageComponent {
  constructor(private sharedDataService: SharedDataService) {}
  @Input() selectedWord: string = ""
  selectedLinks: Link[] | undefined = []
  statsSummary: StatsSummary = {
    url: '',
    stats: []
  }

  stats: Stats[] = []
  ngOnInit(): void {
    this.sharedDataService.statsSummary$.subscribe((statsSummary) => {
      console.log('WordUsageComponent.ngOnInit', statsSummary)
      this.updateSelectedLinks(statsSummary)
      this.statsSummary = statsSummary
    });
  }

  ngOnChanges(): void {
    // todo: change only when selectedWord is changed
    this.updateSelectedLinks(this.statsSummary);
  }

  updateSelectedLinks(statsSummary: StatsSummary) {
    this.selectedLinks = statsSummary.stats
    .find(stats => stats.word === this.selectedWord)
    ?.links
    .filter(links => links !== undefined)
    .flat();
  }
  
  handleLinkClick(link: Link) {
    this.sharedDataService.setCurLink(link)
  }
}
