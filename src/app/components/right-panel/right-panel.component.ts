import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WordListComponent } from '../word-list/word-list.component';
import { WordUsageComponent } from '../word-usage/word-usage.component';
import { SharedDataService } from '../../services/shared-data.service';
import { ListItem } from '../../interfaces/listitem';
import { SpinnerComponent } from "../spinner/spinner.component";
import { SpinnerService } from '../../services/spinner.service';
import { StatsSummary } from '../../interfaces/stats';

@Component({
    selector: 'app-right-panel',
    standalone: true,
    templateUrl: './right-panel.component.html',
    styleUrl: './right-panel.component.css',
    imports: [SearchBarComponent, WordListComponent, WordUsageComponent, SpinnerComponent, CommonModule, NgIf]
})

export class RightPanelComponent {
  constructor(private sharedDataService: SharedDataService, private spinnerService: SpinnerService) {}
  words: ListItem[] = [];
  filteredWords: ListItem[] = [];
  selectedWord: string = "";
  typedWord: string = "";
  isLoading: boolean = true;

  ngOnInit(): void {
    this.sharedDataService.statsSummary$.subscribe((statsSummary: StatsSummary) => {
      console.log('WordListComponent.ngOnInit', statsSummary);
      this.words = statsSummary.stats
        .map((s) => ({
          id: s.word,
          name: `${s.word.toUpperCase()} (${s.links.length})`,
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
    });
    this.spinnerService.loading$.subscribe((isLoading: boolean) => {
      console.log("spinnerService.loading$")
      this.isLoading = isLoading;
    })
  }
  filterWords(input: string) {
    this.typedWord = input
    if(this.words && input){
      this.filteredWords = this.words.filter(word => 
        word.name.toLowerCase().includes(input.toLowerCase())
      )
    }
    else {
      this.filteredWords = [];
    }
  }
  handleWordSelected(word: string){
    this.selectedWord = word
  }
}
