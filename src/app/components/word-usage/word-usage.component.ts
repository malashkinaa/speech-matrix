import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Link, Stats, StatsSummary } from '../../interfaces/stats';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-word-usage',
  standalone: true,
  templateUrl: './word-usage.component.html',
  styleUrl: './word-usage.component.css',
  imports: [CommonModule, SpinnerComponent],
})
export class WordUsageComponent implements OnChanges {
  constructor(private sharedDataService: SharedDataService) {}
  @Input() selectedWord: string = '';
  @Input() typedWord: string = '';
  selectedLinks: Link[] | undefined = [];
  statsSummary: StatsSummary = {
    url: '',
    stats: [],
  };

  stats: Stats[] = [];
  ngOnInit(): void {
    this.sharedDataService.statsSummary$.subscribe((statsSummary) => {
      console.log('WordUsageComponent.ngOnInit', statsSummary);
      this.updateSelectedLinks(statsSummary);
      this.statsSummary = statsSummary;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if(this.selectedWord || this.typedWord){
    this.updateSelectedLinks(this.statsSummary);
    //}
  }

  updateSelectedLinks(statsSummary: StatsSummary) {
    this.selectedLinks = [];
    this.selectedLinks = statsSummary.stats
      .filter(
        (stat) =>
          this.selectedWord.length === 0 || stat.word === this.selectedWord
      )
      .flatMap((stat) =>
        stat.links.filter(
          (link) => link !== undefined && link.text.includes(this.typedWord)
        )
      );
    console.log('WordUsageComponent.typedWord', this.typedWord);
    console.log('WordUsageComponent.selectedWord', this.selectedWord);
    console.log('WordUsageComponent.selectedLinks', this.selectedLinks);
  }

  handleLinkClick(link: Link) {
    this.sharedDataService.setCurLink(link);
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  }
}
