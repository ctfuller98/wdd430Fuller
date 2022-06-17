import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts:Contact[] = [];
  term: string;
  private subscription: Subscription;
  constructor(private contactService: ContactService) {

  }
  
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  search(value: string) {

  this.term = value;
  
  }
 

}
