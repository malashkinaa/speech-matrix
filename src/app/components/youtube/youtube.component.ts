import { Component, Input, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Link } from '../../interfaces/stats';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [YouTubePlayer],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css',
})
export class YoutubeComponent {
  constructor(private sharedDataService: SharedDataService) {}
  @Input() videoId: string = '';
  @ViewChild('ytplayer') player: YouTubePlayer | undefined;

  ngOnInit() {
    this.sharedDataService.curLink$.subscribe(this.setCurLink.bind(this));
  }

  setCurLink(curLink: Link) {
    if (this.player && this.videoId !== '') {
      this.player.seekTo(curLink.time, true);
    }
  }
}
