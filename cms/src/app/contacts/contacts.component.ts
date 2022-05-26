import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contacts.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

}
