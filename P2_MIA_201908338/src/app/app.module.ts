import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './backend/services/auth.service';

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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NewArchComponent } from './components/new-arch/new-arch.component';
import { ModifyArchComponent } from './components/modify-arch/modify-arch.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ErroresComponent,
    SimbolosComponent,
    ASTComponent,
    RecoveryComponent,
    IngresarComponent,
    ModificarComponent,
    AdminPageComponent,
    NewArchComponent,
    ModifyArchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    NoopAnimationsModule,
  ],
  providers: [
    AuthService,
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
