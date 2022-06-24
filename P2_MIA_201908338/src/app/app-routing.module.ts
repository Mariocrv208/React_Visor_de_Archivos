import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErroresComponent } from './components/errores/errores.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';
import { ASTComponent } from './components/ast/ast.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { ModificarComponent } from './components/modificar/modificar.component';

const routes: Routes = [
  { path: 'inicio/:id', component: NavigationComponent},
  { path: 'simbolos', component: SimbolosComponent},
  { path: 'ast', component: ASTComponent},
  { path: 'recoveryPass', component: RecoveryComponent},
  { path: 'ingresarUsu', component: IngresarComponent},
  { path: 'actualizar/:id', component: ModificarComponent},
  { path: '', redirectTo: 'simbolos', pathMatch:'full'},
  { path: '**', component: ErroresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
