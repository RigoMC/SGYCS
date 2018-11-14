import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

//rutas
import { APP_ROUTING } from './app.routes';

//servicios
import { MaterialService } from "./servicios/material.service";
import { PersonalService } from "./servicios/personal.service";
import { ProductoService } from "./servicios/producto.service";
import { ComandaService } from "./servicios/comanda.service";
import { PedidoService } from "./servicios/pedido.service";
import { AuthService } from "./servicios/auth.service";
import { AuthBloqService } from "./servicios/auth-bloq.service";
import { ContadorService } from "./servicios/contador.service";
import { ElaboracionService } from "./servicios/elaboracion.service";

//componentes
import { AppComponent } from './app.component';
import { BarraubComponent } from './componentes/barraub/barraub.component';

//componentes comandas
import { BodyComponent as ComandasComponent} from './paginas/comandas/body/body.component';
import { AddpedComponent } from './paginas/comandas/componentes/addped/addped.component';

//componentes Estadisticas
import { BodyComponent as EstadisticasComponent} from './paginas/estadisticas/body/body.component';

//componentes Inicio
import { BodyComponent as InicioComponent} from './paginas/inicio/body/body.component';
import { CardComponent } from './paginas/inicio/componentes/card/card.component';

//componentes Personal
import { BodyComponent as PersonalComponent} from './paginas/personal/body/body.component';
import { AddComponent as AddComponentPer } from './paginas/personal/componentes/add/add.component';
import { ModifyComponent as ModifyComponentPer} from './paginas/personal/componentes/modify/modify.component';

//componentes productos
import { BodyComponent as ProductosComponent } from './paginas/productos/body/body.component';
import { AddComponent as AddComponentProd } from './paginas/productos/componentes/add/add.component';
import { ModifyComponent as ModifyComponentProd} from './paginas/productos/componentes/modify/modify.component';
import { NvoComponent } from './paginas/productos/componentes/nvo/nvo.component';

//componentes almacen
import { BodyComponent as AlmacenComponent} from './paginas/almacen/body/body.component';
import { AddComponent as AddComponentAlm } from './paginas/almacen/componentes/add/add.component';
import { ModifyComponent as ModifyComponentAlm} from './paginas/almacen/componentes/modify/modify.component';

//pipes
import { MaterialPipe } from './pipes/material.pipe';
import { PersonalPipe } from './pipes/personal.pipe';
import { ProductosPipe } from './pipes/productos.pipe';
import { PedidoComponent } from './paginas/comandas/componentes/pedido/pedido.component';
import { ComandaPipe } from './pipes/comanda.pipe';
import { PedidoPipe } from './pipes/pedido.pipe';

//componentes manual.
import { BodyComponent as ManualComponent } from './paginas/manual/body/body.component';
import { BodyComponent as ElaboracionComponent} from './paginas/elaboracion/body/body.component';
import { MalmacenComponent } from './paginas/manual/componentes/malmacen/malmacen.component';
import { McomandasComponent } from './paginas/manual/componentes/mcomandas/mcomandas.component';
import { MestadisticasComponent } from './paginas/manual/componentes/mestadisticas/mestadisticas.component';
import { MproductosComponent } from './paginas/manual/componentes/mproductos/mproductos.component';
import { MpersonalComponent } from './paginas/manual/componentes/mpersonal/mpersonal.component';
import { BarrapedComponent } from './paginas/elaboracion/componentes/barraped/barraped.component';
import { CardsComponent } from './paginas/elaboracion/componentes/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComandasComponent,
    PersonalComponent,
    AddComponentPer,
    ModifyComponentPer,
    ProductosComponent,
    EstadisticasComponent,
    AddpedComponent,
    BarraubComponent,
    CardComponent,
    AddComponentProd,
    ModifyComponentProd,
    AlmacenComponent,
    AddComponentAlm,
    ModifyComponentAlm,
    MaterialPipe,
    PersonalPipe,
    NvoComponent,
    ProductosPipe,
    PedidoComponent,
    ComandaPipe,
    PedidoPipe,
    ManualComponent,
    ElaboracionComponent,
    MalmacenComponent,
    McomandasComponent,
    MestadisticasComponent,
    MproductosComponent,
    MpersonalComponent,
    BarrapedComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpModule
  ],
  providers: [
    MaterialService,
    PersonalService,
    ProductoService,
    ComandaService,
    PedidoService,
    AuthService,
    AuthBloqService,
    ContadorService,
    ElaboracionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
