import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  message:string="";
  constructor() { }

  clearMessage(){
    this.message="";
  }
}
