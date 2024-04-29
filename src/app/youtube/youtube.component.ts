import { Component, Input, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Link } from '../interfaces/stats';


@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [YouTubePlayer],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css',
})
export class YoutubeComponent {
  @Input() currentLink: Link = { start: 0, text: '' };
  @Input() videoId: string = '';
  @ViewChild('ytplayer', { static: false }) player: YouTubePlayer | undefined;


  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }


  ngOnChanges() {
    console.log("youtube component", this.videoId)
    if (this.player && this.videoId !== '') {
      this.player.seekTo(this.currentLink.start, true);
    }
  }
}