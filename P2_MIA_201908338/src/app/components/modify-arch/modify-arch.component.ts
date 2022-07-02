import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import cargaJson from 'src/assets/json/Usuarios.json';
import { DatePipe } from '@angular/common';

const body = {
  Ruta: "",
  Fecha: "",
  Permiso: ""
}

@Component({
  selector: 'app-modify-arch',
  templateUrl: './modify-arch.component.html',
  styleUrls: ['./modify-arch.component.css']
})
export class ModifyArchComponent implements OnInit {

  carga: any = cargaJson;
  contactForm: FormGroup;
  idrecibir: any;
  permiso:any;
  idarch: any;


  createFormGroup(){
    return new FormGroup({
      Ruta: new FormControl(''),
      Fecha: new FormControl(''),
      Permiso: new FormControl(''),
    });
  }

  constructor(
    public router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
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
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    this.idrecibir = recibir?.toString();
    let permiso = this.activatedRoute.snapshot.paramMap.get("permiso");
    this.permiso = permiso?.toString();
    let adar = this.activatedRoute.snapshot.paramMap.get("idarch");
    this.idarch = adar?.toString();
  }



  onSaveForm(){
    body.Permiso = this.carga.ArchivosCarga[this.idarch].Permiso;
    body.Fecha = this.carga.ArchivosCarga[this.idarch].Fecha;
    body.Ruta = this.contactForm.value.Ruta;
    let id = Number(this.idarch);
    id++;
    let ruta = "http://localhost:3000/ArchivosCarga/" + id;
    this.http.put<any>(ruta, body)
    .subscribe(rest=>{
      alert("Datos Modificados Exitosamente");
      this.router.navigate(['/inicio/'+this.idrecibir+'/'+this.permiso]);

    },err=>{
      alert("algo salio mal pana perdon :C");
    })
    this.contactForm.reset();
  }



}
