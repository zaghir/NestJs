export class User {
    id : number ;
    login : string ;
    password : string 
    salt :string ;
    deactivated : boolean ;
    createdAt : Date ;
    updatedAt : Date ;
}