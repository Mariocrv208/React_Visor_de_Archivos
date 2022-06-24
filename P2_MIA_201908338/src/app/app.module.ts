import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErroresComponent } from './components/errores/errores.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';
import { ASTComponent } from './components/ast/ast.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { ModificarComponent } from './components/modificar/modificar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ErroresComponent,
    SimbolosComponent,
    ASTComponent,
    RecoveryComponent,
    IngresarComponent,
    ModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
