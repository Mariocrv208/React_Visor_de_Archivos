import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import cargaJson from 'src/assets/json/Usuarios.json';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const body = {
  User: "",
  Nombre: "",
  Apellido: "",
  Email: "",
  Telefono: "",
  Password: "",
  Nacimiento: "",
  Registro: "",
  permisos: "",
  intentos: 0,
  baja: "",
  id: 0
}

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  idrecibir: any;
  permiso:any;
  nombre:any;
  apellido:any;
  user:any;
  mail:any;
  telefono:any;

  carga: any = cargaJson;

  contactForm: FormGroup;

  createFormGroup(){
    return new FormGroup({
      Nombre: new FormControl(''),
      Apellido: new FormControl(''),
      User: new FormControl(''),
      Email: new FormControl(''),
      Telefono: new FormControl('')
    });
  }

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    let permiso2 = this.activatedRoute.snapshot.paramMap.get("permiso");
    this.idrecibir = recibir?.toString();
    this.permiso = permiso2?.toString();
    this.nombre = this.carga.ingresoUsers[this.idrecibir].Nombre;
    this.apellido = this.carga.ingresoUsers[this.idrecibir].Apellido;
    this.user = this.carga.ingresoUsers[this.idrecibir].User;
    this.mail = this.carga.ingresoUsers[this.idrecibir].Email;
    this.telefono = this.carga.ingresoUsers[this.idrecibir].Telefono;
  }

  onResteForm(){
    this.contactForm.reset();
  }

  onSaveForm(){
    body.User = this.contactForm.value.User;
    body.Nombre = this.contactForm.value.Nombre;
    body.Apellido = this.contactForm.value.Apellido;
    body.Email = this.contactForm.value.Email;
    body.Telefono = this.contactForm.value.Telefono;
    body.Password = this.carga.ingresoUsers[this.idrecibir].Password;
    body.Nacimiento = this.carga.ingresoUsers[this.idrecibir].Nacimiento;
    body.Registro = this.carga.ingresoUsers[this.idrecibir].Registro;
    body.permisos = this.carga.ingresoUsers[this.idrecibir].permisos;
    body.baja = this.carga.ingresoUsers[this.idrecibir].baja;
    body.intentos = this.carga.ingresoUsers[this.idrecibir].intentos;
    console.log(this.carga.ingresoUsers[this.idrecibir]);
    let id = this.idrecibir;
    id++
    console.log(id);
    let ruta = "http://localhost:3000/ingresoUsers/" + id;
    this.http.put<any>(ruta, body)
    .subscribe(rest=>{
      alert("Datos Modificados Exitosamente");
      this.router.navigate(['/inicio/'+this.idrecibir+'/'+this.permiso]);

    },err=>{
      alert("algo salio mal pana perdon :C");
    })
  }

}







