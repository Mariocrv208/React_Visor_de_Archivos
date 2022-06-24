import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  idrecibir: any;
  nombreArchivo: string = "Archivo...";
  resultado: any = 'Contenido...';
  selectedFile = null;
  consola:string = "Esperando Accion...";




  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let recibir = this.activatedRoute.snapshot.paramMap.get("id");
    this.idrecibir = recibir?.toString();
    console.log(this.idrecibir);
  }


  ValidarExtension(event:any) {
    const archivo:File = event.target.files[0];

    if (archivo) {
      var extension = archivo.name.split(".", 2);
      if(extension[1]=="txt"||extension[1]=="cst"){
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
  this.router.navigate(['/actualizar/'+this.idrecibir]);
}

}
