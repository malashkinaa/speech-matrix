import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WordListComponent } from '../word-list/word-list.component';
import { WordUsageComponent } from '../word-usage/word-usage.component';
import { SharedDataService } from '../../services/shared-data.service';
import { ListItem } from '../../interfaces/listitem';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';
import { StatsSummary } from '../../interfaces/stats';
import { WordCloudComponent } from '../word-cloud/word-cloud.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css',
  imports: [
    MatTabsModule,
    SearchBarComponent,
    WordListComponent,
    WordUsageComponent,
    SpinnerComponent,
    CommonModule,
    NgIf,
    WordCloudComponent,
  ],
})
export class RightPanelComponent implements OnChanges {
  constructor(
    private sharedDataService: SharedDataService,
    private spinnerService: SpinnerService
  ) {}

  words: ListItem[] = [];
  filteredWords: ListItem[] = [];
  selectedWord: string = '';
  typedWord: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.sharedDataService.statsSummary$.subscribe(
      (statsSummary: StatsSummary) => {
        console.log('WordListComponent.ngOnInit', statsSummary);
        this.words = statsSummary.stats
          .map((s) => ({
            id: s.word,
            name: `${s.word.toUpperCase()} (${s.links.length})`,
          }))
          .sort((a, b) => a.id.localeCompare(b.id));
      }
    );
    this.spinnerService.loading$.subscribe((isLoading: boolean) => {
      console.log('spinnerService.loading$');
      this.isLoading = isLoading;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterWords.length === 0) {
      this.selectedWord = ''; //reset
    }
  }

  filterWords(input: string) {
    this.typedWord = input;
    this.selectedWord = ''; //reset
    if (this.words && input) {
      this.filteredWords = this.words.filter((word) =>
        word.name.toLowerCase().includes(input.toLowerCase())
      );
    } else {
      this.filteredWords = [];
      // this.selectedWord = "" //reset
    }
    console.log('RightPanel.filterWords: ', this.filteredWords.length);
  }

  handleWordSelected(word: string) {
    this.selectedWord = word;
  }
}
