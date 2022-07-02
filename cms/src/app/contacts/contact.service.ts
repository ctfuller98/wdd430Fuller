import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
contacts: Contact[] = [];
contactListChangedEvent = new Subject<Contact[]>();
maxId: number;
currentId: number;
maxContactId: number;
  constructor(private httpClient: HttpClient) {}
   getContacts(): Contact[]{
     this.fetchContacts();
     return ;
   }
   getContact(id: string): Contact {
    for (let i = 0; i < this.contacts.length; i++) {
      if(this.contacts[i].id == id){
        return this.contacts[i];
      }
      
    }
    return null;
   } 
   deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.storeContacts();
        }
      );
  }
 getMaxId(): number {
  this.maxId = 0;
  this.contacts.forEach(contact => {
    this.currentId = parseFloat(contact.id)
    if (this.currentId > this.maxId){
      this.maxId = this.currentId;
    }
  });
  return this.maxId
}
addContact(contact: Contact) {
  if (!contact) {
    return;
  }
  contact.id = '';
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  // add to database
  this.httpClient.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    contact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        console.log(this.contacts)
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.storeContacts();
      }
    );
}
updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === originalContact.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newContact.id = originalContact.id;
  //newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.httpClient.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.storeContacts();
      }
    );
}
private fetchContacts(){
  this.httpClient.get('http://localhost:3000/contacts')
      .subscribe ({
        next: (contacts: any) => {
          this.contacts = contacts.contacts
          this.maxContactId = this.getMaxId()
          let list = this.contacts.sort();
          this.contactListChangedEvent.next(list)
        },
        error: (e) => console.log(e.message),
      });
  }
storeContacts() {
  const contactList = JSON.stringify(this.contacts);
  this.httpClient.put('http://localhost:3000/contacts/', contactList,
  {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  })
  .subscribe(response=>{
    let documentsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(documentsListClone)
  })
}
}
