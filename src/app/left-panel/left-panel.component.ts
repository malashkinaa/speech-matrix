import { Component } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [YouTubePlayer, TaskComponent],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})

export class LeftPanelComponent {
 
}
