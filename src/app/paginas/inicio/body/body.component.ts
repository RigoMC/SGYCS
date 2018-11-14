import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor( private router:Router, private activatedRoute:ActivatedRoute )
  {
    this.activatedRoute.params.subscribe( data=>{ if(data['id'] != 1)
                                                    return true;
                                                 else
                                                    this.cargarComandas();
                                        });
  }

  ngOnInit() {
  }

  cargarComandas()
  {
    this.router.navigate( ['/Comandas'] );
  }

}
