import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  inicio:boolean=true;
  alma:boolean=false;
  coma:boolean=false;
  esta:boolean=false;
  pers:boolean=false;
  prod:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  mostrar(i:number)
  {
    this.inicio=false;
    this.alma=false;
    this.prod=false;
    this.pers=false;
    this.esta=false;
    switch(i)
    {
      case 0:
        this.inicio=true;
        break;
    case 1:
      this.alma=true;
      break;
    case 2:
      this.prod=true;
      break;
    case 3:
      this.pers=true;
      break;
    case 4:
      this.esta=true;
      break;
    }
  }

}
