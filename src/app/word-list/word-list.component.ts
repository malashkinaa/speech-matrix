import { Component, Input } from '@angular/core';
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
  @Input() filteredWords: any[] = [];
}

