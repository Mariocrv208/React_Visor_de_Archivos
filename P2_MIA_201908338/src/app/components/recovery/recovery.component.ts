import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AuthService } from 'src/app/backend/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  contactForm: FormGroup;


  constructor(
    //public fbAuth: AuthService,
    public router: Router,
    //public fbAuth: AngularFireAuth
  ) {this.contactForm = this.createFormGroup(); }

  createFormGroup(){
    return new FormGroup({
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  openResetPasswordDialog(){
    let email = this.contactForm.value.email;
    console.log(email);

  }

}
