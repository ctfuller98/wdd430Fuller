import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageSelectedEvent = new EventEmitter<Message>();
  constructor() {
    this.messages = MOCKMESSAGES;
   }
   getMessages(): Message[]{
    let list = this.messages.sort();
    return list.slice();
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageSelectedEvent.emit(message);
    console.log(this.messages)

  }
}
