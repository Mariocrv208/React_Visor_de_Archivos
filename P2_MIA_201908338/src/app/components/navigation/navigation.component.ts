import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import cargaJson from 'src/assets/json/Usuarios.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

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
const body2 = {
  Ruta: "",
  Fecha: "",
  Permiso: ""
}


interface Listausuarios{
  id:string;
  Ruta:string;
  Fecha:string;
  Modificar:string;
  Eliminar:string;
  Permiso:string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  carga: any = cargaJson;
  idrecibir: any;
  permiso:any;
  nombreArchivo: string = "Archivo...";
  resultado: any = 'Contenido...';
  selectedFile = null;
  consola:string = "Esperando Accion...";
  archivos: Listausuarios[];



  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {
    this.archivos = this.carga.ArchivosCarga;
  }

  ngOnInit(): void {
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    this.idrecibir = recibir?.toString();
    let permiso = this.activatedRoute.snapshot.paramMap.get("permiso");
    this.permiso = permiso?.toString();
    this.todayPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
    if(this.todayPipe != null){
      this.mandar = this.todayPipe.toString();
    }
  }

  jsonObj = {
    paths : []
  } // json object

  ValidarExtension(event:any) {
    const archivo:File = event.target.files[0];

    if (archivo) {
      var extension = archivo.name.split(".", 2);
      if(extension[1]=="json"){
        this.nombreArchivo = archivo.name;
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.resultado=fileReader.result;
          this.jsonObj=(JSON.parse(this.resultado.toString()));
          console.log(this.jsonObj.paths);
          for(let i = 0;i<this.jsonObj.paths.length;i++){
            body2.Ruta = this.jsonObj.paths[i]['path'];
            body2.Fecha = this.mandar;
            body2.Permiso = "0";
            this.http.post<any>("http://localhost:3000/ArchivosCarga", body2)
            .subscribe(rest=>{
            },err=>{
              alert("algo salio mal pana perdon :C");
            })
          }
        }
        fileReader.readAsText(archivo);
      }else{
        window.alert("Debe seleccionar un archivo json")
        this.consola = "Esperando Accion";
      }
      this.consola = "Archivo Cargado Exitosamente";
    }
}

mandarModificar(){
  console.log(this.idrecibir);
  if(this.permiso == "0"){
    this.router.navigate(['/actualizar/'+this.idrecibir+'/'+this.permiso]);
  }else{
    alert("Los usuarios maestro no se pueden modificar amigo :C son maestros :C");
  }

}

darBaja(){
  body.User = this.carga.ingresoUsers[this.idrecibir].User;
  body.Nombre = this.carga.ingresoUsers[this.idrecibir].Nombre;
  body.Apellido = this.carga.ingresoUsers[this.idrecibir].Apellido;
  body.Email = this.carga.ingresoUsers[this.idrecibir].Email;
  body.Telefono = this.carga.ingresoUsers[this.idrecibir].Telefono;
  body.Password = this.carga.ingresoUsers[this.idrecibir].Password;
  body.Nacimiento = this.carga.ingresoUsers[this.idrecibir].Nacimiento;
  body.Registro = this.carga.ingresoUsers[this.idrecibir].Registro;
  body.permisos = this.carga.ingresoUsers[this.idrecibir].permisos;
  body.baja = "1";
  body.intentos = this.carga.ingresoUsers[this.idrecibir].intentos;
  console.log(this.carga.ingresoUsers[this.idrecibir]);
  let vconvert = Number(this.idrecibir)
  let ruta = "http://localhost:3000/ingresoUsers/" + (vconvert +1);
  this.http.put<any>(ruta, body)
  .subscribe(rest=>{
    alert("Usuario dado de baja");
  },err=>{
    alert("algo salio mal pana perdon :C");
  })

}

mandarAdmin()
{
  if(this.permiso == "1"){
    this.router.navigate(['/adminPage']);
  }else{
    alert("usted no es admin pana, disculpe :c");
  }
}

Modificar(idt:string)
{
  let id = Number(idt);
  id--;
  this.router.navigate(['/modify/'+this.idrecibir+'/'+this.permiso+'/'+id]);
}

Eliminar(idt:string){
  let id = Number(idt);
  this.http.delete<any>("http://localhost:3000/ArchivosCarga/"+id)
    .subscribe(rest=>{
      alert("Archivo eliminado exitosamente");
    },err=>{
      alert("algo salio mal pana perdon :C");
    })
}

Permiso(idt:string){
  let id = Number(idt);
}

today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayPipe:string | null = null ;
  mandar:string = "";

NuevoArch(){
  this.router.navigate(['/archivo/'+this.idrecibir+'/'+this.permiso]);
}



}
