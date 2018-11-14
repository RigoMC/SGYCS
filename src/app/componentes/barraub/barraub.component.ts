import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../../servicios/auth.service';

@Component({
  selector: 'app-barraub',
  templateUrl: './barraub.component.html',
  styleUrls: ['./barraub.component.css']
})
export class BarraubComponent
{

  profile: any;

  constructor( private auth:AuthService )
  {
    auth.handleAuthentication();
    this.cargar_perfil();
  }

  ngOnInit() {
  }

  cargar_perfil()
  {
    if (this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
  }


  login()
  {
    this.auth.login();

  }

  logout()
  {
    this.auth.logout();
  }
}
