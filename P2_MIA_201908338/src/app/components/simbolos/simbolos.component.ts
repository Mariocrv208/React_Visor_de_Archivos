import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-simbolos',
  templateUrl: './simbolos.component.html',
  styleUrls: ['./simbolos.component.css']
})
export class SimbolosComponent implements OnInit {

  usuario: string = "";
  pass: string = "";
  carga: any = cargaJson;
  contactForm: FormGroup;
  contador = 0;

  createFormGroup(){
    return new FormGroup({
      user: new FormControl(''),
      pass: new FormControl('')
    });
  }


  constructor(
    public router: Router,
    private http: HttpClient,
  ) {
    this.contactForm = this.createFormGroup();
   }

  ngOnInit(): void {
  }






  validarDatos(): void{
    let permiso = false;
    const newContact = {
      user: this.contactForm.controls["user"].value,
      pass:this.contactForm.controls["pass"].value
    }
    let indexnum = "";
    let ind = -1;
    var admin = false;
    //para usuarios administradores
    for (let index = 0; index < this.carga.usuarios.length; index++) {
      if (this.carga.usuarios[index].User == newContact.user && this.carga.usuarios[index].Password == newContact.pass) {
        permiso = true;
        indexnum = index.toString();
        ind = index;
        admin = true;
        break;
      }else if(this.carga.usuarios[index].User == newContact.user && this.carga.usuarios[index].Password != newContact.pass){
        ind = index;
        admin = true;
        break;
      }
    }

    if(admin == false){
      for (let index = 0; index < this.carga.ingresoUsers.length; index++) {
        if (this.carga.ingresoUsers[index].User == newContact.user && this.carga.ingresoUsers[index].Password == newContact.pass) {
          permiso = true;
          indexnum = index.toString();
          ind = index;
          break;
        }else if(this.carga.ingresoUsers[index].User == newContact.user && this.carga.ingresoUsers[index].Password != newContact.pass){
          ind = index;
          break;
        }
      }
    }

    if(newContact.user == "" && newContact.pass == ""){
      alert("Identifiquese amigo :V");
      this.router.navigate(['/ast']);
      return;
    }

    if(ind == -1 && newContact.user != "" && newContact.pass != ""){
      alert("vos registrate primero mano :V");
      this.router.navigate(['/ast']);
      return;
    }

    if (permiso == true){
      if(admin == true)
      {
        this.router.navigate(['/inicio/'+indexnum+'/'+this.carga.usuarios[ind].permisos]);
      }else{
        if(this.carga.ingresoUsers[ind].intentos < 3){
          if(this.carga.ingresoUsers[ind].baja == "1"){
            this.router.navigate(['/ast']);
          }else{
            this.router.navigate(['/inicio/'+indexnum+'/'+this.carga.ingresoUsers[ind].permisos]);
          }
        }else{
          alert("Usted tiene la cuenta desabhilitada compa :C");
        }
      }
    }else{
      this.contador = this.carga.ingresoUsers[ind].intentos;
      this.contador++;




      if(this.contador == 4){
        alert("Numero maximo de intentos alcanzado. Su cuenta a sido bloqueada");
      }else if( this.contador >4){
        alert("Cuenta desabilitada");
      }else{
        if(this.carga.ingresoUsers[ind].User == newContact.user){
          body.User = this.carga.ingresoUsers[ind].User;
          body.Nombre = this.carga.ingresoUsers[ind].Nombre;
          body.Apellido = this.carga.ingresoUsers[ind].Apellido;
          body.Email = this.carga.ingresoUsers[ind].Email;
          body.Telefono = this.carga.ingresoUsers[ind].Telefono;
          body.Password = this.carga.ingresoUsers[ind].Password;
          body.Nacimiento = this.carga.ingresoUsers[ind].Nacimiento;
          body.Registro = this.carga.ingresoUsers[ind].Registro;
          body.permisos = this.carga.ingresoUsers[ind].permisos;
          body.baja = this.carga.ingresoUsers[ind].baja;
          body.intentos = this.contador;
          ind++;
          console.log(this.carga.ingresoUsers[ind]);
          let ruta = "http://localhost:3000/ingresoUsers/" + ind;
          this.http.put<any>(ruta, body)
          .subscribe(rest=>{
            alert("Intento fallido numero "+this.contador);
          },err=>{
            alert("algo salio mal pana perdon :C");
          })
        }
      }
    }
  }

}
