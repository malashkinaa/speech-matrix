import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WordListComponent } from '../word-list/word-list.component';
import { WordUsageComponent } from '../word-usage/word-usage.component';
import { SharedDataService } from '../services/shared-data.service';

@Component({
    selector: 'app-right-panel',
    standalone: true,
    templateUrl: './right-panel.component.html',
    styleUrl: './right-panel.component.css',
    imports: [SearchBarComponent, WordListComponent, WordUsageComponent]
})

export class RightPanelComponent {
  constructor(private sharedDataService: SharedDataService) {}
  words: any[] = [];
  filteredWords: any[] = [];
  ngOnInit(): void {
    this.sharedDataService.statsSummary$.subscribe((statsSummary) => {
      console.log('WordListComponent.ngOnInit', statsSummary);
      this.words = statsSummary.stats
        .map((s) => ({
          id: s.word,
          name: `${s.word.toUpperCase()} (${s.links.length})`,
        }))
        .sort((a, b) => a.id.localeCompare(b.id));
    });
  }
  filterWords(input: string) {
    if(this.words && input){
      this.filteredWords = this.words.filter(word => 
        word.name.toLowerCase().includes(input.toLowerCase())
      )
    }
    else {
      this.filteredWords = [];
    }
  }
}
