import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }
  isLogged(){
    return sessionStorage.getItem('token')!=null;
  }
  
}