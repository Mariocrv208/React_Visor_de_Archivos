import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import cargaJson from 'src/assets/json/Usuarios.json';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/backend/services/auth.service';



@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css'],
  providers: [AuthService]
})
export class IngresarComponent implements OnInit {

  carga: any = cargaJson;
  showPasword = true;
  password:any = "";
  contactForm: FormGroup;
  invalidPassword = false;
  passPatter: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{6,}$/;


  createFormGroup(){
    return new FormGroup({
      User: new FormControl(''),
      Nombre: new FormControl(''),
      Apellido: new FormControl(''),
      Email: new FormControl(''),
      Telefono: new FormControl(''),
      Password: new FormControl('', [Validators.minLength(6),Validators.maxLength(20),Validators.pattern(this.passPatter), Validators.required]),
      Nacimiento: new FormControl(''),
      Registro: new FormControl(''),
      permisos: new FormControl(''),
      intentos: new FormControl(''),
      baja: new FormControl('')
    });
  }

  constructor(
    public router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.contactForm = this.createFormGroup();
  }
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayPipe:string | null = null ;
  mandar:string = "";


  ngOnInit(): void {
    this.todayPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    if(this.todayPipe != null){
      this.mandar = this.todayPipe.toString();
    }

  }


  checkPassword(): boolean{
    let errores = false;
    this.invalidPassword = false;
    if(this.contactForm.value.Password.errors){
      if(this.contactForm.value.Password.errors.minLengt){
        this.invalidPassword = this.contactForm.value.Password.errors.minLengt;
      }
      if(this.contactForm.value.Password.errors.maxLength){
        this.invalidPassword = this.contactForm.value.Password.errors.maxLength;
      }
      if(this.contactForm.value.Password.errors.pattern){
        this.invalidPassword = this.contactForm.value.Password.errors.pattern;
      }
      errores= true;
    }
    return errores;
  }


  onSaveForm(){

    this.contactForm.value.Registro = this.mandar;
    this.contactForm.value.permisos = "0";
    this.todayPipe = null;
    this.todayPipe = this.pipe.transform(this.contactForm.value.Nacimiento, 'dd/MM/yyyy')
    this.contactForm.value.Nacimiento = this.todayPipe;
    this.contactForm.value.intentos = 0;
    this.contactForm.value.baja = "0";
    console.log(this.contactForm);
    if(this.contactForm.valid){
      this.http.post<any>("http://localhost:3000/ingresoUsers", this.contactForm.value)
      .subscribe(rest=>{
        alert("Usuario ingresado exitosamente");
        this.router.navigate(['/simbolos']);
      },err=>{
        alert("algo salio mal pana perdon :C");
      })
    }else{
      alert("password no valida :C");
    }
    this.contactForm.reset();
  }


  get Password(){return this.contactForm.get('Password');}

}
