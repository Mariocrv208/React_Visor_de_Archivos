import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ErroresComponent } from './components/errores/errores.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';
import { ASTComponent } from './components/ast/ast.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { SendEmailComponent } from './backend/send-email/send-email.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NewArchComponent } from './components/new-arch/new-arch.component';
import { ModifyArchComponent } from './components/modify-arch/modify-arch.component';

const routes: Routes = [
  { path: 'inicio/:id/:permiso', component: NavigationComponent},
  { path: 'simbolos', component: SimbolosComponent},
  { path: 'ast', component: ASTComponent},
  { path: 'recoveryPass', component: RecoveryComponent},
  { path: 'ingresarUsu', component: IngresarComponent},
  { path: 'actualizar/:id/:permiso', component: ModificarComponent},
  { path: 'archivo/:id/:permiso', component: NewArchComponent},
  { path: 'modify/:id/:permiso/:idarch', component: ModifyArchComponent},
  { path: 'verificationEmail', component: SendEmailComponent},
  { path: 'adminPage', component: AdminPageComponent},
  { path: '', redirectTo: 'simbolos', pathMatch:'full'},
  { path: '**', component: ErroresComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
