import { ApiService } from './../shared/api.service';
import { UserModel } from './user-dashboard.module';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  formValue!:FormGroup;
  userModelObj: UserModel = new UserModel();
  userData !: any;
  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name : [''],
      surname : [''],
      email : [''],
    })
    this.getAllUsers();
  }

  postUserDetails(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.surname = this.formValue.value.surname;
    this.userModelObj.email = this.formValue.value.email;

    this.api.postUser(this.userModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("confirmed");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    },
    err=>{
      alert("There is problem!");
    })
  }

  getAllUsers(){
    this.api.getUser().subscribe(res=>{
      this.userData = res;

    })
  }

}
