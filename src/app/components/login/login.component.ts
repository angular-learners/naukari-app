import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NaukariConstants } from 'src/app/constants/naukari.constants';
import { User } from 'src/app/models/user.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user:User[]=[];
  usersList:User[]=[];


  constructor(private fb: FormBuilder,
    private userService:UserService,
    public sharedService:SharedService,
    private router:Router) {

  }
  ngOnInit(): void {
    this.onInitLoginForm();
    this.getAllUsers();
  }


  onInitLoginForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  invalidFeild(fieldName: string) {
    return (
      this.loginForm.get(fieldName)?.invalid &&
      this.loginForm.get(fieldName)?.touched
    );
  }

  feildError(fieldName: string, errorType: string) {
    return this.loginForm.get(fieldName)?.errors?.[errorType];
  }

  get getValidations() {
    return NaukariConstants;
  }

  getAllUsers(){
     this.userService.getAllUsers().subscribe(
      {next:(res:any)=>{
        console.log(res);
        this.usersList=[...res];
      },
      error:(err:any)=>{
        console.log(err);
      }   
     }
     )
  }

  login() { 
    this.user=this.usersList.filter((user:any)=>{
        const {email,password}=user;
          if(email===this.loginForm.get('email')?.value && password===this.loginForm.get('password')?.value){
            return user;
          }
      });
  //  (this.user.length==1) ? this.sharedService.message=NaukariConstants.LOGIN_SUCCESS:this.sharedService.message=NaukariConstants.LOGIN_FAILURE;
     if(this.user.length==1){
      this.sharedService.message=NaukariConstants.LOGIN_SUCCESS;
      this.router.navigate(['user-home']);
      localStorage.setItem('user',JSON.stringify(this.user))
     } else{
      this.sharedService.message=NaukariConstants.LOGIN_FAILURE;
     }
 
}
}
