import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import cargaJson from 'src/assets/json/Usuarios.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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




  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    this.idrecibir = recibir?.toString();
    let permiso = this.activatedRoute.snapshot.paramMap.get("permiso");
    this.permiso = permiso?.toString();
  }


  ValidarExtension(event:any) {
    const archivo:File = event.target.files[0];

    if (archivo) {
      var extension = archivo.name.split(".", 2);
      if(extension[1]=="json"){
        this.nombreArchivo = archivo.name;
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.resultado=fileReader.result;
        }
        fileReader.readAsText(archivo);
      }else{
        window.alert("Debe seleccionar un archivo cst")
        this.consola = "Esperando Accion";
      }
      this.consola = "Archivo Cargado Exitosamente";
    }
}

mandarModificar(){
  console.log(this.idrecibir);
  this.router.navigate(['/actualizar/'+this.idrecibir+'/'+this.permiso]);
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


}
