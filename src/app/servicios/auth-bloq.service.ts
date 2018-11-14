import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthBloqService {

  constructor( private auth:AuthService, private router:Router ) { }

  canActivate( next:ActivatedRouteSnapshot, state:RouterStateSnapshot)
  {


    if( this.auth.isAuthenticated() )
    {
      return true;
    }
    else
    {
      alert("No estas verificado.");
      this.router.navigate( ['/Inicio'] );
      return false;
    }
  }
}
