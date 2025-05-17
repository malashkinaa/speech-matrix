import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StatsSummary } from '../interfaces/stats';
import { env } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}
  curVideoId: string = '';

  emptyStatsSummary(url: string): StatsSummary {
    return { url: url, stats: [] };
  }
  getStatsSummary(id: string): Observable<StatsSummary> {
    console.log('getStatsSummary', id);
    return this.http.get<any>(
      `${env.s2tServiceURL}/transcripts/${id}/stats?minfreq=1`
    );
  }
  getStatsSummary2(mediaUrl: string): Observable<StatsSummary> {
    this.curVideoId = this.extractVideoId(mediaUrl);
    const url: string = `${env.processingFunctionURL}/GetYoutubeStats?v=${this.curVideoId}&minfreq=1`;
    return this.http.get<StatsSummary>(url);
  }

  searchTranscript(url: string): Observable<any> {
    console.log('searchTranscript', url);
    return this.http.post<any>(
      `${env.s2tServiceURL}/transcripts/bytemplate`,
      { originalURL: url },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  createTranscript(url: string): Observable<any> {
    console.log('createTranscript', url);
    let result = this.http.post<any>(
      `${env.s2tServiceURL}/transcripts`,
      { originalURL: url },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return result;
  }
  getIdByMediaId(mediaId: string): Observable<string> {
    console.log('getIdByMediaId', mediaId);
    try {
      console.log(`${env.s2tServiceURL}/transcripts/GetIdByMediaId/${mediaId}`);
      return this.http.get(
        `${env.s2tServiceURL}/transcripts/GetIdByMediaId/${mediaId}`,
        { responseType: 'text' }
      );
    } catch (error) {
      console.log('getIdByMediaId error', error);
      return of('');
    }
  }
  getIdByMediaUrl(mediaUrl: string): Observable<string> {
    return this.getIdByMediaId(this.extractVideoId(mediaUrl));
  }
  extractVideoId(url: string): string {
    if (!url || url.length === 0) return '';
    const u = new URL(url);
    const urlParams = new URLSearchParams(u.search);
    const videoId = urlParams.get('v');
    if (videoId) return videoId;
    else if (url?.startsWith('https://youtu.be/'))
      return u.pathname.substring(1).trimEnd();
    // Remove leading '/' to get the video ID
    else console.log('Invalid URL', url);
    return '';
  }
}
