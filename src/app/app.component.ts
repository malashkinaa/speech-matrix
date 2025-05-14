import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LeftPanelComponent,
    HeaderComponent,
    RightPanelComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
