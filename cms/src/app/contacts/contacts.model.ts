export class Contact {
    public id: string;
    public name:string;
    public email:string;
   public imageUrl: string;
   public phone: string;
   public group: Contact[];
   constructor(id, name, email, imageUrl, phone, group) {
       this.id = id
       this.name = name
       this.email =email
       this.imageUrl = imageUrl
       this.phone = phone
       this.group = group
   }
}