import { RouterModule, Routes} from '@angular/router';
import { BodyComponent as inicio} from './paginas/inicio/body/body.component';
import { BodyComponent as almacen} from './paginas/almacen/body/body.component';
import { BodyComponent as comandas} from './paginas/comandas/body/body.component';
import { BodyComponent as estadisticas} from './paginas/estadisticas/body/body.component';
import { BodyComponent as personal} from './paginas/personal/body/body.component';
import { BodyComponent as productos} from './paginas/productos/body/body.component';
import { BodyComponent as elaboracion} from './paginas/elaboracion/body/body.component';
import { BodyComponent as manual} from './paginas/manual/body/body.component';

//servicio de autenticacion
import { AuthBloqService } from "./servicios/auth-bloq.service";

const APP_ROUTES: Routes = [
  { path: 'Inicio', component: inicio },
  { path: 'Inicio/:id', component: inicio , canActivate: [ AuthBloqService ]},
  { path: 'Almacen', component: almacen , canActivate: [ AuthBloqService ]},
  { path: 'Comandas', component: comandas , canActivate: [ AuthBloqService ]},
  { path: 'Estadisticas', component: estadisticas , canActivate: [ AuthBloqService ]},
  { path: 'Personal', component: personal , canActivate: [ AuthBloqService ]},
  { path: 'Productos', component: productos , canActivate: [ AuthBloqService ]},
  { path: 'Elaboracion', component: elaboracion , canActivate: [ AuthBloqService ]},
  { path: 'Manual', component: manual , canActivate: [ AuthBloqService ]},
  { path: '**', pathMatch: 'full', redirectTo: 'Inicio' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });
