import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messagesList: Message[] = [];
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messagesList = this.messageService.getMessages();
    this.messageService.messageSelectedEvent
    .subscribe(
      (message: Message) => {
        this.messagesList.push(message)
      }
    );
  }
  onAddMessage(message: Message){
    this.messagesList.push(message);
  }

}
