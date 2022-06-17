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
      console.log(id)
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
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
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
 addContact(newContact: Contact) {
  if(!newContact || newContact == null){
    return
  }
  this.maxContactId++;
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact)
  this.storeContacts();
}
updateContact(originalContact: Contact, newContact: Contact) {
  if(!originalContact || !newContact || originalContact == null || newContact == null) {
    return
  }
  let pos = this.contacts.indexOf(originalContact);
  if (pos < 0) {
    return
  }
  newContact.id = originalContact.id
  this.contacts[pos] = newContact
  this.storeContacts();
}
private fetchContacts(){
  this.httpClient.get('https://wdd430cms-e579c-default-rtdb.firebaseio.com/contacts.json')
      .subscribe ({
        next: (contacts: Contact []) => {
          this.contacts = contacts
          this.maxContactId = this.getMaxId()
          let list = this.contacts.sort();
          this.contactListChangedEvent.next(list)
        },
        error: (e) => console.log(e.message),
      });
  }
storeContacts() {
  const contactList = JSON.stringify(this.contacts);
  this.httpClient.put('https://wdd430cms-e579c-default-rtdb.firebaseio.com/contacts.json', contactList,
  {
    headers: new HttpHeaders({"Content-Type" : "application/json"})
  })
  .subscribe(response=>{
    let documentsListClone = this.contacts.slice()
    this.contactListChangedEvent.next(documentsListClone)
  })
}
}
