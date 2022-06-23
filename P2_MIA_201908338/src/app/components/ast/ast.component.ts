import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class ASTComponent implements OnInit {

  error:string = "NO TENES PERMISOS PARA ACCEDER A ESTA PAGINA PANA :C DISCULPA :C";

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
