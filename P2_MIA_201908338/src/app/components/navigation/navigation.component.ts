import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  nombreArchivo: string = "Archivo...";
  resultado: any = 'Contenido...';
  selectedFile = null;
  consola:string = "Esperando Accion...";

  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {
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

/*DescargarArchivo() {
  const datos = [];
  datos.push(this.resultado);
  const filepath = window.URL.createObjectURL(new Blob(datos, {type:"cst"}));
  const linkDescarga = document.createElement('a');
  linkDescarga.href = filepath;
  linkDescarga.setAttribute('download', this.nombreArchivo);
  document.body.appendChild(linkDescarga);
  linkDescarga.click();
  this.consola = "Archivo Descargado Exitosamente";
}*/


}
