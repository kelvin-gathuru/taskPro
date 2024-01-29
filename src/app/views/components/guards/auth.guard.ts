import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GuardService } from './guard.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const guard = inject( GuardService);
  //if(localStorage.getItem('token')){
  if(guard.isLogged()){
    return true
  }else{
  sessionStorage.removeItem('token');
  router.navigate(['']);
  return false
}
};