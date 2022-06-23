import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErroresComponent } from './components/errores/errores.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';
import { ASTComponent } from './components/ast/ast.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

const routes: Routes = [
  { path: 'inicio', component: NavigationComponent},
  { path: 'simbolos', component: SimbolosComponent},
  { path: 'ast', component: ASTComponent},
  { path: 'recoveryPass', component: RecoveryComponent},
  { path: '', redirectTo: 'simbolos', pathMatch:'full'},
  { path: '**', component: ErroresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
