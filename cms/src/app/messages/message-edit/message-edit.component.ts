import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild ('subject') subjectRef : ElementRef;
  @ViewChild ('msgText') msgTextRef : ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "Cameron Fuller";

  ngOnInit(): void {
  }
  onSendMessage(){
    const msgSubject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(1, msgSubject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    
  }
  onClear(){
    const msgSubject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    console.log(new Message(1, msgSubject, msgText, this.currentSender))
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
