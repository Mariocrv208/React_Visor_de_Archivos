import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import cargaJson from 'src/assets/json/Usuarios.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-arch',
  templateUrl: './new-arch.component.html',
  styleUrls: ['./new-arch.component.css']
})
export class NewArchComponent implements OnInit {

  carga: any = cargaJson;
  contactForm: FormGroup;
  idrecibir: any;
  permiso:any;


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
  }



  onSaveForm(){
    this.contactForm.value.Permiso = "0";
    this.contactForm.value.Fecha = this.mandar;
    console.log(this.contactForm);
    this.http.post<any>("http://localhost:3000/ArchivosCarga", this.contactForm.value)
    .subscribe(rest=>{
      alert("Archivo ingresado exitosamente");
      this.router.navigate(['/inicio/'+this.idrecibir+'/'+this.permiso]);
    },err=>{
      alert("algo salio mal pana perdon :C");
    })
    this.contactForm.reset();
  }



}
