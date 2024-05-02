import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WordListComponent } from '../word-list/word-list.component';
import { WordUsageComponent } from '../word-usage/word-usage.component';

@Component({
    selector: 'app-right-panel',
    standalone: true,
    templateUrl: './right-panel.component.html',
    styleUrl: './right-panel.component.css',
    imports: [SearchBarComponent, WordListComponent, WordUsageComponent]
})

export class RightPanelComponent {

}
