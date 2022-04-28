export class Contact {
    public id: number;
    public name:string;
    public email:string;
   public imgUrl: string;
   public phone: string;
   public group: [];
   constructor(id, name, email, imgUrl, phone, group) {
       this.id = id
       this.name = name
       this.email =email
       this.imgUrl = imgUrl
       this.phone = phone
       this.group=group
   }
}