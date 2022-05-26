import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  id: string;
  contact: Contact;
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=> {
        this.id = params['id']
        this.contact = this.contactService.getContact(this.id)
      })
  }
  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts'])
 }

}
