// signalr.service.ts


import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { env } from '../app.config';


@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection = null as any;


  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(env.signalRServiceURL)
      .configureLogging(signalR.LogLevel.Error)
      .build();
  }


  startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started');
      })
      .catch((err) => console.error('Error while starting connection: ' + err));
  }


  addMessageListener<T>(callback: (message: T) => void) {
    this.hubConnection.on('newMessageId', callback);
  }
}





