import { Component, Input, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { Link } from '../interfaces/stats';
import { SharedDataService } from '../services/shared-data.service';


@Component({
  selector: 'app-youtube',
  standalone: true,
  imports: [YouTubePlayer],
  templateUrl: './youtube.component.html',
  styleUrl: './youtube.component.css',
})
export class YoutubeComponent {

  constructor (private sharedDataService: SharedDataService) {}
  @Input() currentLink: Link = { start: 0, text: '' };
  @Input() videoId: string = '';
  @ViewChild('ytplayer', { static: false }) player: YouTubePlayer | undefined;
  curStart : string = "0";

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    this.sharedDataService.curLink$.subscribe(this.setCurLink);
  }

  setCurLink(curLink: Link){
    this.currentLink = curLink
    this.curStart = curLink.start.toString()
    console.log("Yeees, I got it", curLink, this)
    if (this.player && this.videoId !== '') {
      console.log("I am inside", this.player)
      this.player.seekTo(this.currentLink.start, true);
    }
  }
  
  
  ngOnChanges() {
    console.log("YoutubeComponent.ngOnChanges", this.player)
    if (this.player && this.videoId !== '') {
      //this.player.seekTo(this.currentLink.start, true);
    }
  }
}