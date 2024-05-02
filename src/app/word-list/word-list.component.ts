import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.css'
})
export class WordListComponent {
  constructor(private sharedDataService: SharedDataService) {}
  words: any[] = [];
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
}

