import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simbolos',
  templateUrl: './simbolos.component.html',
  styleUrls: ['./simbolos.component.css']
})
export class SimbolosComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

}
