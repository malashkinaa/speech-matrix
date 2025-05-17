import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
import { Link } from '../../interfaces/stats';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { env } from '../../app.config';

@Component({
  selector: 'app-word-cloud',
  standalone: true,
  imports: [],
  templateUrl: './word-cloud.component.html',
  styleUrl: './word-cloud.component.css',
})
export class WordCloudComponent implements OnInit, OnDestroy {
  constructor(
    private sharedDataService: SharedDataService,
    private sanitizer: DomSanitizer
  ) {}
  private messageListener = this.handleMessage.bind(this);
  videoId: string = '';
  safeIframeUrl: SafeResourceUrl = '';

  ngOnInit(): void {
    window.addEventListener('message', this.messageListener);
    this.sharedDataService.curId$.subscribe((videoId) => {
      this.videoId = videoId;
      this.safeIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${env.wordCloudServiceURL}?v=${this.videoId}&noplayer&src=sm`
      );
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageListener);
  }

  setVideoId(): void {
    this.sharedDataService.curId$.subscribe((videoId) => {
      console.log('WordCloudComponent.setVideoId', videoId);
      this.videoId = videoId;
    });
  }

  private handleMessage(event: MessageEvent): void {
    const { type, videoId, start } = event.data;
    if (type === 'PLAY') {
      const link: Link = {
        time: start,
        text: '',
      };
      this.sharedDataService.setCurLink(link);
    }
  }
}
