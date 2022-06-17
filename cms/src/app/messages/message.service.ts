import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageSelectedEvent = new EventEmitter<Message>();
  maxId: number;
  currentId: number;
  maxMessageId: number;
  constructor(private httpClient: HttpClient) {
    this.messages = MOCKMESSAGES;
   }
   getMessages(): Message[]{
    this.fetchMessages();
    let list = this.messages.sort();
    return list.slice();
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageSelectedEvent.emit(message);
  }
  getMaxId(): number {
    this.maxId = 0;
    this.messages.forEach(messages => {
      this.currentId = parseFloat(messages.id)
      if (this.currentId > this.maxId){
        this.maxId = this.currentId;
      }
    });
    return this.maxId
}
  private fetchMessages(){
    this.httpClient.get('https://wdd430cms-e579c-default-rtdb.firebaseio.com/documents.json')
    .subscribe (
      (messages:Message[]) => {
        this.messages = messages
        this.maxMessageId = this.getMaxId()
        let list = this.messages.sort();
      },
      (error:any) => {
        console.log(error)
        }
      )
    }
}
