import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contacts.model';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output()  ContactWasSelected = new EventEmitter<Contact>();
  contacts:Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "../../assets/images/jacksonk.jpg", "208-496-3771", null),
    new Contact(2, "Rex Barzee", "barzeer@byui.edu", "../../assets/images/barzeer.jpg", "208-496-3768", null)
  ];
  constructor() { }
  
  ngOnInit(): void {
  }
  onContactSelected(contact: Contact) {
    this.ContactWasSelected.emit(contact)
  }

}
