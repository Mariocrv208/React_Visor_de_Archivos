import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErroresComponent } from './components/errores/errores.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';
import { ASTComponent } from './components/ast/ast.component';
import { FormsModule } from '@angular/forms';
import { RecoveryComponent } from './components/recovery/recovery.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ErroresComponent,
    SimbolosComponent,
    ASTComponent,
    RecoveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
