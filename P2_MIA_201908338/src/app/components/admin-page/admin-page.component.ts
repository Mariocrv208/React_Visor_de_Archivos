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

interface Listausuarios{
  id:string;
  User:string;
  baja:string;
  pendiente:string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit {

  idrecibir: any;
  usuarios: Listausuarios[];
  nombre:any;
  apellido:any;
  user:any;
  mail:any;
  telefono:any;

  carga: any = cargaJson;

  contactForm: FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl(this.nombre),
      apellido: new FormControl(this.apellido),
      usuario: new FormControl(this.user),
      email: new FormControl(this.mail),
      telefono: new FormControl(this.telefono)
    });
  }

  cambiarEstado(idt:string){
    console.log(idt);
    let id = Number(idt);
    id--;
    body.User = this.carga.ingresoUsers[id].User;
    body.Nombre = this.carga.ingresoUsers[id].Nombre;
    body.Apellido = this.carga.ingresoUsers[id].Apellido;
    body.Email = this.carga.ingresoUsers[id].Email;
    body.Telefono = this.carga.ingresoUsers[id].Telefono;
    body.Password = this.carga.ingresoUsers[id].Password;
    body.Nacimiento = this.carga.ingresoUsers[id].Nacimiento;
    body.Registro = this.carga.ingresoUsers[id].Registro;
    body.permisos = this.carga.ingresoUsers[id].permisos;
    let mandar = true;
    if(this.carga.ingresoUsers[id].baja == "0"){
      body.baja = "1";
    }else if(this.carga.ingresoUsers[id].baja == "1"){
      body.baja = "0";
      mandar = false;
    }
    body.intentos = this.carga.ingresoUsers[id].intentos;
    console.log(this.carga.ingresoUsers[id]);
    id++;
    let ruta = "http://localhost:3000/ingresoUsers/" + id;
    this.http.put<any>(ruta, body)
    .subscribe(rest=>{
      if(mandar == false){
        alert("Se dio de baja al usuario");
      }else{
        alert("Se dio de alta al usuario");
      }

    },err=>{
      alert("algo salio mal pana perdon :C");
    })
  }

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.contactForm = this.createFormGroup();
    this.usuarios = this.carga.ingresoUsers;
  }

  ngOnInit(): void {
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    let permiso = this.activatedRoute.snapshot.paramMap.get("permiso");
    this.idrecibir = recibir?.toString();
    if(permiso?.toString() == "0"){
      this.router.navigate(['/ast']);
    }

  }



}







