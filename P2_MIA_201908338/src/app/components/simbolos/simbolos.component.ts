import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import cargaJson from 'src/assets/json/Usuarios.json';

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

  createFormGroup(){
    return new FormGroup({
      user: new FormControl(''),
      pass: new FormControl('')
    });
  }

  constructor(
    public router: Router
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
    console.log(this.carga);
    console.log(newContact);
    let indexnum = "";
    for (let index = 0; index < this.carga.usuarios.length; index++) {
      console.log(this.carga.usuarios[index].User);
      console.log(this.carga.usuarios[index].Password);
      console.log("--------------------");
      if (this.carga.usuarios[index].User == newContact.user && this.carga.usuarios[index].Password == newContact.pass) {
        permiso = true;
        indexnum = index.toString();
        break;
      }
    }

    if (permiso == true){
      this.router.navigate(['/inicio/'+indexnum]);
    }else{
      this.router.navigate(['/ast']);
    }

  }
}
