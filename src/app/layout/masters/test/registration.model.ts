import { BaseMasterModel } from './../masters.models'; 
export class registrationmodel extends BaseMasterModel {
  id?: number;

  UserImage: string;

  FullName?: string;

  Password?: string;

  Title: string;

  Address: string;

  Email?: string;

  Photo: string;

  Company: string;

  TypeofUser: string;


}
