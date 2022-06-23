import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errores',
  templateUrl: './errores.component.html',
  styleUrls: ['./errores.component.css']
})
export class ErroresComponent implements OnInit {

  error:string = "ESTA PAGINA NO EXISTE PANA :C DISCULPA :C";

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
