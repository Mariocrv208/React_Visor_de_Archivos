import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import cargaJson from 'src/assets/json/Usuarios.json';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  idrecibir: any;
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

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    let permiso = this.activatedRoute.snapshot.paramMap.get("permiso");
    this.idrecibir = recibir?.toString();
    this.nombre = this.carga.usuarios[this.idrecibir].Nombre;
    this.apellido = this.carga.usuarios[this.idrecibir].Apellido;
    this.user = this.carga.usuarios[this.idrecibir].User;
    this.mail = this.carga.usuarios[this.idrecibir].Email;
    this.telefono = this.carga.usuarios[this.idrecibir].Telefono;
    if(recibir?.toString() == "0"){
      this.router.navigate(['/ast']);
    }
  }

  onResteForm(){
    this.contactForm.reset();
  }

  onSaveForm(){
    console.log('Saved');
    const newContact = {
      nombre: this.contactForm.controls["nombre"].value,
      apellido:this.contactForm.controls["apellido"].value,
      usuario:this.contactForm.controls["usuario"].value,
      email:this.contactForm.controls["email"].value,
      telefono:this.contactForm.controls["telefono"].value
    }
    console.log(newContact);
    this.carga.usuarios.push(newContact);
    console.log(this.carga);''
  }

}







