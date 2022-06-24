import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import cargaJson from 'src/assets/json/Usuarios.json';



@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {

  carga: any = cargaJson;

  contactForm: FormGroup;

  createFormGroup(){
    return new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      usuario: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      pass: new FormControl(''),
      nacimiento: new FormControl(''),
      ingreso: new FormControl('')
    });
  }

  constructor(
    public router: Router
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
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
      telefono:this.contactForm.controls["telefono"].value,
      pass:this.contactForm.controls["pass"].value,
      nacimiento:this.contactForm.controls["nacimiento"].value,
      ingreso:this.contactForm.controls["ingreso"].value
    }
    console.log(newContact);
    this.carga.usuarios.push(newContact);
    console.log(this.carga);''
  }



}
