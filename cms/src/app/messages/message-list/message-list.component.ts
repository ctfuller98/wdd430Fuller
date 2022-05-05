import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messagesList: Message[] = [
    new Message(1, "Meeting Today", "Hey I want to check that you are still good for our meeting today.", "Michael Scott"),
    new Message(2, "Help Please", "Can I get your help on this project please? ", "John Doe"),
    new Message(3, "Project Report", "How is the project coming? ", "Dwight Schrute")
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onAddMessage(message: Message){
    this.messagesList.push(message);
  }

}
